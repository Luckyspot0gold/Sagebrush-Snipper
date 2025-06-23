// Cloudflare Worker for WyoVerse API
// Deploy this to handle game API requests

export default {
  async fetch(request, env, ctx) {
    const { pathname, searchParams } = new URL(request.url)

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders })
    }

    // Rate limiting for free tier
    const clientIP = request.headers.get("CF-Connecting-IP")
    const rateLimitKey = `rate_limit:${clientIP}`

    try {
      // Database connection
      const { Pool } = require("pg")
      const pool = new Pool({
        connectionString: env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      })

      // Routes
      switch (pathname) {
        case "/api/player":
          return handlePlayer(request, pool, corsHeaders)

        case "/api/fighters":
          return handleFighters(request, pool, corsHeaders)

        case "/api/fight":
          return handleFight(request, pool, corsHeaders)

        case "/api/leaderboard":
          return handleLeaderboard(request, pool, corsHeaders)

        case "/api/land-deeds":
          return handleLandDeeds(request, pool, corsHeaders)

        default:
          return new Response("WyoVerse API Online! 🏔️🥊", {
            headers: corsHeaders,
          })
      }
    } catch (error) {
      console.error("API Error:", error)
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }
  },
}

// Player management
async function handlePlayer(request, pool, corsHeaders) {
  const method = request.method

  if (method === "GET") {
    const url = new URL(request.url)
    const firebaseUid = url.searchParams.get("uid")

    const { rows } = await pool.query("SELECT * FROM players WHERE firebase_uid = $1", [firebaseUid])

    return new Response(JSON.stringify(rows[0] || null), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  if (method === "POST") {
    const data = await request.json()
    const { firebase_uid, username, email } = data

    const { rows } = await pool.query(
      `INSERT INTO players (firebase_uid, username, email) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (firebase_uid) DO UPDATE SET 
       username = EXCLUDED.username, email = EXCLUDED.email
       RETURNING *`,
      [firebase_uid, username, email],
    )

    return new Response(JSON.stringify(rows[0]), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
}

// Fighter data
async function handleFighters(request, pool, corsHeaders) {
  const { rows } = await pool.query("SELECT * FROM fighters ORDER BY rarity DESC, name ASC")

  return new Response(JSON.stringify(rows), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

// Fight processing
async function handleFight(request, pool, corsHeaders) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders })
  }

  const data = await request.json()
  const {
    player_id,
    fighter1_id,
    fighter2_id,
    winner_id,
    rounds,
    bet_amount,
    payout,
    fight_duration,
    wyoming_buff_applied,
  } = data

  // Start transaction
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    // Record fight
    const fightResult = await client.query(
      `INSERT INTO fights (player_id, fighter1_id, fighter2_id, winner_id, rounds, bet_amount, payout, fight_duration, wyoming_buff_applied)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        player_id,
        fighter1_id,
        fighter2_id,
        winner_id,
        rounds,
        bet_amount,
        payout,
        fight_duration,
        wyoming_buff_applied,
      ],
    )

    // Update player stats
    const isWin = winner_id === fighter1_id // Assuming player controls fighter1
    await client.query(
      `UPDATE players SET 
       total_fights = total_fights + 1,
       wins = wins + $1,
       losses = losses + $2,
       tonka_tokens = tonka_tokens + $3
       WHERE id = $4`,
      [isWin ? 1 : 0, isWin ? 0 : 1, payout - bet_amount, player_id],
    )

    await client.query("COMMIT")

    return new Response(JSON.stringify(fightResult.rows[0]), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

// Leaderboard
async function handleLeaderboard(request, pool, corsHeaders) {
  const { rows } = await pool.query(`
    SELECT username, wins, losses, total_fights, tonka_tokens, wyoming_land_deeds,
           ROUND((wins::float / NULLIF(total_fights, 0)) * 100, 1) as win_rate
    FROM players 
    WHERE total_fights > 0
    ORDER BY wins DESC, win_rate DESC
    LIMIT 50
  `)

  return new Response(JSON.stringify(rows), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

// Land deeds
async function handleLandDeeds(request, pool, corsHeaders) {
  if (request.method === "GET") {
    const url = new URL(request.url)
    const playerId = url.searchParams.get("player_id")

    const { rows } = await pool.query("SELECT * FROM land_deeds WHERE player_id = $1", [playerId])

    return new Response(JSON.stringify(rows), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  if (request.method === "POST") {
    const data = await request.json()
    const { player_id, deed_token_id, latitude, longitude, yard_size, purchase_price } = data

    const { rows } = await pool.query(
      `INSERT INTO land_deeds (player_id, deed_token_id, latitude, longitude, yard_size, purchase_price)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [player_id, deed_token_id, latitude, longitude, yard_size, purchase_price],
    )

    // Update player's land deed count
    await pool.query("UPDATE players SET wyoming_land_deeds = wyoming_land_deeds + 1 WHERE id = $1", [player_id])

    return new Response(JSON.stringify(rows[0]), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
}
