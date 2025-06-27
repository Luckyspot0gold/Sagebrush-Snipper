// Boxing Scene with Market Integration and Bar Keep Bill Commentary
class BoxingScene extends Phaser.Scene {
  constructor() {
    super({ key: "BoxingScene" })
    this.fighters = {}
    this.marketData = {}
    this.commentary = []
    this.round = 1
    this.fightInProgress = false
  }

  preload() {
    // Load boxing assets
    this.load.image("arena", "assets/images/boxing-arena.jpg")
    this.load.image("crowd", "assets/images/crowd-background.jpg")
    this.load.image("spark", "assets/images/spark-particle.png")

    // Load audio
    this.load.audio("punch", "assets/sounds/punch.mp3")
    this.load.audio("bell", "assets/sounds/boxing-bell.mp3")
    this.load.audio("crowd-cheer", "assets/sounds/crowd-cheer.mp3")
    this.load.audio("crowd-boo", "assets/sounds/crowd-boo.mp3")

    // Load UI elements
    this.load.image("macd-indicator", "assets/ui/macd-chart.png")
    this.load.image("bill-avatar", "assets/characters/bar-keep-bill.png")
  }

  create() {
    // Set up arena
    this.setupArena()

    // Create fighters
    this.createFighters()

    // Set up market indicators
    this.setupMarketIndicators()

    // Set up commentary system
    this.setupCommentary()

    // Set up controls
    this.setupControls()

    // Set up UI
    this.setupUI()

    // Start the fight
    this.startFight()
  }

  setupArena() {
    // Arena background
    this.add.image(400, 300, "arena").setScale(1.2)

    // Crowd background
    this.add.image(400, 150, "crowd").setScale(0.8).setAlpha(0.7)

    // Boxing ring
    const ring = this.add.graphics()
    ring.lineStyle(4, 0xffffff)
    ring.strokeRect(150, 200, 500, 300)

    // Ring ropes
    for (let i = 1; i <= 3; i++) {
      ring.lineStyle(2, 0xff0000)
      ring.lineBetween(150, 200 + i * 75, 650, 200 + i * 75)
    }

    // Ring posts
    ring.fillStyle(0x8b4513)
    ring.fillCircle(150, 200, 8)
    ring.fillCircle(650, 200, 8)
    ring.fillCircle(150, 500, 8)
    ring.fillCircle(650, 500, 8)
  }

  createFighters() {
    // Create Bitcoin Bull (player)
    this.fighters.player = new window.CryptoFighter(this, 250, 350, "bull", true)

    // Create Market Bear (opponent)
    this.fighters.opponent = new window.CryptoFighter(this, 550, 350, "bear", false)

    // Set up collision detection
    this.physics.add.overlap(this.fighters.player, this.fighters.opponent, this.handleCollision, null, this)
  }

  setupMarketIndicators() {
    // BTC indicator (top left)
    this.btcIndicator = this.add.container(80, 80)

    const btcLabel = this.add
      .text(0, -30, "BTC/USD", {
        fontSize: "16px",
        fontFamily: "Arial Bold",
        color: "#F7931A",
      })
      .setOrigin(0.5)

    this.btcPrice = this.add
      .text(0, -10, "$67,234", {
        fontSize: "14px",
        fontFamily: "Arial",
        color: "#FFFFFF",
      })
      .setOrigin(0.5)

    this.btcChange = this.add
      .text(0, 10, "+2.34%", {
        fontSize: "12px",
        fontFamily: "Arial",
        color: "#00FF00",
      })
      .setOrigin(0.5)

    // MACD chart simulation
    this.btcChart = this.add.graphics()
    this.drawMACDChart(this.btcChart, 0, 25, "bull")

    this.btcIndicator.add([btcLabel, this.btcPrice, this.btcChange, this.btcChart])

    // ETH indicator (top right)
    this.ethIndicator = this.add.container(720, 80)

    const ethLabel = this.add
      .text(0, -30, "ETH/USD", {
        fontSize: "16px",
        fontFamily: "Arial Bold",
        color: "#8A92B2",
      })
      .setOrigin(0.5)

    this.ethPrice = this.add
      .text(0, -10, "$3,456", {
        fontSize: "14px",
        fontFamily: "Arial",
        color: "#FFFFFF",
      })
      .setOrigin(0.5)

    this.ethChange = this.add
      .text(0, 10, "-1.23%", {
        fontSize: "12px",
        fontFamily: "Arial",
        color: "#FF0000",
      })
      .setOrigin(0.5)

    // MACD chart simulation
    this.ethChart = this.add.graphics()
    this.drawMACDChart(this.ethChart, 0, 25, "bear")

    this.ethIndicator.add([ethLabel, this.ethPrice, this.ethChange, this.ethChart])

    // Update market data periodically
    this.marketUpdateTimer = this.time.addEvent({
      delay: 5000,
      callback: this.updateMarketData,
      callbackScope: this,
      loop: true,
    })
  }

  drawMACDChart(graphics, x, y, trend) {
    graphics.clear()

    const width = 60
    const height = 30
    const points = 10

    // Background
    graphics.fillStyle(0x000000, 0.7)
    graphics.fillRect(x - width / 2, y, width, height)

    // Draw MACD line
    graphics.lineStyle(2, trend === "bull" ? 0x00ff00 : 0xff0000)

    let prevX = x - width / 2
    let prevY = y + height / 2

    for (let i = 1; i <= points; i++) {
      const currentX = x - width / 2 + (i * width) / points
      const variation = trend === "bull" ? Math.sin(i * 0.5) * 10 + 5 : Math.sin(i * 0.5) * 10 - 5
      const currentY = y + height / 2 + variation

      graphics.lineBetween(prevX, prevY, currentX, currentY)
      prevX = currentX
      prevY = currentY
    }

    // Draw histogram bars
    graphics.fillStyle(trend === "bull" ? 0x00ff00 : 0xff0000, 0.6)
    for (let i = 0; i < points; i++) {
      const barX = x - width / 2 + (i * width) / points
      const barHeight = Math.random() * 15 + 5
      graphics.fillRect(barX, y + height - barHeight, 3, barHeight)
    }
  }

  setupCommentary() {
    // Commentary panel
    this.commentaryPanel = this.add.graphics()
    this.commentaryPanel.fillStyle(0x000000, 0.8)
    this.commentaryPanel.fillRoundedRect(50, 520, 700, 120, 10)
    this.commentaryPanel.lineStyle(2, 0xffd700)
    this.commentaryPanel.strokeRoundedRect(50, 520, 700, 120, 10)

    // Bar Keep Bill avatar
    this.billAvatar = this.add.circle(100, 560, 25, 0x8b4513)
    this.billAvatar.setStrokeStyle(2, 0xffd700)

    // Bill's hat
    this.billHat = this.add.ellipse(100, 545, 35, 15, 0x000000)
    this.billHat.setStrokeStyle(1, 0xffd700)

    // Commentary text
    this.commentaryText = this.add.text(140, 540, "", {
      fontSize: "14px",
      fontFamily: "Arial",
      color: "#FFD700",
      wordWrap: { width: 580 },
    })

    // Commentary queue
    this.commentaryQueue = [
      "Bar Keep Bill: Welcome to the Crypto Clash Arena! Tonight's main event: Bitcoin Bull vs Market Bear!",
      "Bill: The Bull's looking strong with that +2.34% market momentum!",
      "Bill: But don't count out the Bear - those red candles are dangerous!",
      "Bill: Remember folks, this fight is linked to real market data!",
      "Bill: When BTC pumps, the Bull gets stronger! When it dumps, the Bear dominates!",
    ]

    this.currentCommentary = 0
    this.updateCommentary()

    // Commentary timer
    this.commentaryTimer = this.time.addEvent({
      delay: 8000,
      callback: this.updateCommentary,
      callbackScope: this,
      loop: true,
    })
  }

  setupControls() {
    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys()
    this.wasd = this.input.keyboard.addKeys("W,S,A,D")
    this.punchKeys = this.input.keyboard.addKeys("Q,E,SPACE")

    // Control instructions
    this.add.text(50, 50, "Controls: Q - Left Punch, E - Right Punch, SPACE - Block", {
      fontSize: "12px",
      fontFamily: "Arial",
      color: "#FFFFFF",
      backgroundColor: "#000000",
      padding: { x: 10, y: 5 },
    })

    // Punch event listeners
    this.punchKeys.Q.on("down", () => {
      if (this.fightInProgress) {
        this.playerPunch("left")
      }
    })

    this.punchKeys.E.on("down", () => {
      if (this.fightInProgress) {
        this.playerPunch("right")
      }
    })

    this.punchKeys.SPACE.on("down", () => {
      if (this.fightInProgress) {
        this.fighters.player.block()
      }
    })
  }

  setupUI() {
    // Round indicator
    this.roundText = this.add
      .text(400, 30, `ROUND ${this.round}`, {
        fontSize: "24px",
        fontFamily: "Arial Black",
        color: "#FFD700",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setOrigin(0.5)

    // Fight timer
    this.fightTime = 180 // 3 minutes
    this.timerText = this.add
      .text(400, 60, this.formatTime(this.fightTime), {
        fontSize: "18px",
        fontFamily: "Arial Bold",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0.5)

    // Start timer
    this.fightTimer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    })
  }

  startFight() {
    // Ring the bell
    this.sound.play("bell")

    // Start fight
    this.fightInProgress = true

    // AI opponent behavior
    this.opponentAI = this.time.addEvent({
      delay: 2000,
      callback: this.opponentAction,
      callbackScope: this,
      loop: true,
    })

    // Add initial commentary
    this.addCommentary("Bill: DING DING! The fight has begun! Let's see some action!")
  }

  playerPunch(side) {
    const isLeft = side === "left"

    this.fighters.player.punch(isLeft, () => {
      // Check if punch connects
      const distance = Phaser.Math.Distance.Between(
        this.fighters.player.x,
        this.fighters.player.y,
        this.fighters.opponent.x,
        this.fighters.opponent.y,
      )

      if (distance < 120) {
        // Punch connects!
        const damage = Phaser.Math.Between(8, 15)
        this.fighters.opponent.takeDamage(damage)

        // Market-based damage modifier
        const btcTrend = this.getBTCTrend()
        if (btcTrend === "bull") {
          // Bull market = more damage for Bull fighter
          this.fighters.opponent.takeDamage(5)
          this.addCommentary("Bill: That Bitcoin pump is giving the Bull extra power!")
        }

        this.sound.play("crowd-cheer")
        this.addCommentary(`Bill: ${isLeft ? "Left" : "Right"} hook connects! ${damage} damage!`)
      } else {
        this.addCommentary("Bill: Swing and a miss! The Bear's got good footwork!")
      }
    })
  }

  opponentAction() {
    if (!this.fightInProgress) return

    const action = Phaser.Math.Between(1, 100)
    const ethTrend = this.getETHTrend()

    // Market-influenced AI behavior
    let aggressionBonus = 0
    if (ethTrend === "bear") {
      aggressionBonus = 20 // Bear market makes Bear fighter more aggressive
    }

    if (action + aggressionBonus > 70) {
      // Opponent punches
      const isLeft = Phaser.Math.Between(0, 1) === 0
      this.fighters.opponent.punch(isLeft, () => {
        // Check if punch connects
        const distance = Phaser.Math.Distance.Between(
          this.fighters.player.x,
          this.fighters.player.y,
          this.fighters.opponent.x,
          this.fighters.opponent.y,
        )

        if (distance < 120) {
          const damage = Phaser.Math.Between(6, 12)
          this.fighters.player.takeDamage(damage)

          if (ethTrend === "bear") {
            this.fighters.player.takeDamage(3)
            this.addCommentary("Bill: That red candle is fueling the Bear's fury!")
          }

          this.sound.play("crowd-boo")
          this.addCommentary(`Bill: The Bear lands a solid ${isLeft ? "left" : "right"}! ${damage} damage to the Bull!`)
        }
      })
    } else if (action > 50) {
      // Opponent blocks
      this.fighters.opponent.block()
      this.addCommentary("Bill: Smart defensive move by the Bear!")
    }
  }

  updateMarketData() {
    // Simulate real-time market data updates
    const btcChange = (Math.random() - 0.5) * 2 // -1% to +1%
    const ethChange = (Math.random() - 0.5) * 2

    // Update BTC data
    const currentBTC = Number.parseFloat(this.btcPrice.text.replace("$", "").replace(",", ""))
    const newBTC = Math.round(currentBTC * (1 + btcChange / 100))
    this.btcPrice.setText(`$${newBTC.toLocaleString()}`)

    const btcPercent = (btcChange > 0 ? "+" : "") + btcChange.toFixed(2) + "%"
    this.btcChange.setText(btcPercent)
    this.btcChange.setColor(btcChange > 0 ? "#00FF00" : "#FF0000")

    // Update ETH data
    const currentETH = Number.parseFloat(this.ethPrice.text.replace("$", "").replace(",", ""))
    const newETH = Math.round(currentETH * (1 + ethChange / 100))
    this.ethPrice.setText(`$${newETH.toLocaleString()}`)

    const ethPercent = (ethChange > 0 ? "+" : "") + ethChange.toFixed(2) + "%"
    this.ethChange.setText(ethPercent)
    this.ethChange.setColor(ethChange > 0 ? "#00FF00" : "#FF0000")

    // Redraw charts
    this.drawMACDChart(this.btcChart, 0, 25, btcChange > 0 ? "bull" : "bear")
    this.drawMACDChart(this.ethChart, 0, 25, ethChange > 0 ? "bull" : "bear")

    // Market commentary
    if (Math.abs(btcChange) > 0.5) {
      this.addCommentary(`Bill: BTC is ${btcChange > 0 ? "pumping" : "dumping"}! This affects the fight dynamics!`)
    }
  }

  getBTCTrend() {
    const changeText = this.btcChange.text
    return changeText.includes("+") ? "bull" : "bear"
  }

  getETHTrend() {
    const changeText = this.ethChange.text
    return changeText.includes("+") ? "bull" : "bear"
  }

  updateCommentary() {
    if (this.currentCommentary < this.commentaryQueue.length) {
      this.commentaryText.setText(this.commentaryQueue[this.currentCommentary])
      this.currentCommentary++
    } else {
      // Generate dynamic commentary based on fight state
      this.generateDynamicCommentary()
    }
  }

  addCommentary(text) {
    this.commentaryText.setText(text)

    // Add to queue for later reference
    this.commentaryQueue.push(text)
  }

  generateDynamicCommentary() {
    const playerHealth = this.fighters.player.health
    const opponentHealth = this.fighters.opponent.health

    const comments = []

    if (playerHealth > opponentHealth + 20) {
      comments.push("Bill: The Bull is dominating this fight!")
      comments.push("Bill: That Bitcoin energy is really showing!")
    } else if (opponentHealth > playerHealth + 20) {
      comments.push("Bill: The Bear is taking control!")
      comments.push("Bill: Market volatility favors the Bear tonight!")
    } else {
      comments.push("Bill: This is a close fight! Anyone's game!")
      comments.push("Bill: Both fighters are showing incredible heart!")
    }

    // Market-based commentary
    const btcTrend = this.getBTCTrend()
    const ethTrend = this.getETHTrend()

    if (btcTrend === "bull" && ethTrend === "bull") {
      comments.push("Bill: Both markets are green! This is crypto paradise!")
    } else if (btcTrend === "bear" && ethTrend === "bear") {
      comments.push("Bill: Red across the board! The bears are in control!")
    } else {
      comments.push("Bill: Mixed signals in the market - makes for an unpredictable fight!")
    }

    const randomComment = comments[Math.floor(Math.random() * comments.length)]
    this.addCommentary(randomComment)
  }

  updateTimer() {
    this.fightTime--
    this.timerText.setText(this.formatTime(this.fightTime))

    if (this.fightTime <= 0) {
      this.endRound()
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  endRound() {
    this.fightInProgress = false
    this.sound.play("bell")

    // Determine round winner
    const playerHealth = this.fighters.player.health
    const opponentHealth = this.fighters.opponent.health

    if (playerHealth > opponentHealth) {
      this.addCommentary(`Bill: Round ${this.round} goes to the Bitcoin Bull!`)
    } else if (opponentHealth > playerHealth) {
      this.addCommentary(`Bill: Round ${this.round} goes to the Market Bear!`)
    } else {
      this.addCommentary(`Bill: Round ${this.round} is a draw!`)
    }

    // Check for knockout
    if (playerHealth <= 0) {
      this.fighters.opponent.celebrate()
      this.addCommentary("Bill: KNOCKOUT! The Market Bear wins by TKO!")
      this.endFight("opponent")
    } else if (opponentHealth <= 0) {
      this.fighters.player.celebrate()
      this.addCommentary("Bill: KNOCKOUT! The Bitcoin Bull wins by TKO!")
      this.endFight("player")
    } else if (this.round < 3) {
      // Start next round
      this.round++
      this.roundText.setText(`ROUND ${this.round}`)
      this.fightTime = 180

      this.time.delayedCall(5000, () => {
        this.startFight()
      })
    } else {
      // Fight goes to decision
      this.endFight("decision")
    }
  }

  endFight(winner) {
    this.fightInProgress = false

    // Stop all timers
    if (this.fightTimer) this.fightTimer.destroy()
    if (this.opponentAI) this.opponentAI.destroy()
    if (this.marketUpdateTimer) this.marketUpdateTimer.destroy()
    if (this.commentaryTimer) this.commentaryTimer.destroy()

    // Show final results
    let resultText = ""
    if (winner === "player") {
      resultText = "BITCOIN BULL WINS!"
      this.sound.play("crowd-cheer")
    } else if (winner === "opponent") {
      resultText = "MARKET BEAR WINS!"
      this.sound.play("crowd-boo")
    } else {
      resultText = "FIGHT GOES TO DECISION!"
      // Determine winner by health
      if (this.fighters.player.health > this.fighters.opponent.health) {
        resultText += "\nBITCOIN BULL WINS BY DECISION!"
      } else {
        resultText += "\nMARKET BEAR WINS BY DECISION!"
      }
    }

    // Display result
    const resultDisplay = this.add
      .text(400, 300, resultText, {
        fontSize: "32px",
        fontFamily: "Arial Black",
        color: "#FFD700",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5)

    // Result animation
    this.tweens.add({
      targets: resultDisplay,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })

    // Final commentary
    this.addCommentary(`Bill: What a fight! Thanks for watching Crypto Clashers Boxing!`)

    // Restart option
    this.time.delayedCall(5000, () => {
      const restartText = this.add
        .text(400, 400, "Press SPACE to fight again", {
          fontSize: "18px",
          fontFamily: "Arial",
          color: "#FFFFFF",
          backgroundColor: "#000000",
          padding: { x: 20, y: 10 },
        })
        .setOrigin(0.5)

      this.input.keyboard.once("keydown-SPACE", () => {
        this.scene.restart()
      })
    })
  }

  handleCollision(player, opponent) {
    // Handle close combat interactions
    if (this.fightInProgress) {
      // Add clinch mechanics or close combat effects here
    }
  }
}

// Export for use in main game
if (typeof module !== "undefined" && module.exports) {
  module.exports = BoxingScene
}
