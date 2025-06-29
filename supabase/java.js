`javascript
// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
)

// Wallet linking function
export async function linkWalletToProfile(userId, walletData) {
  const { data, error } = await supabase
    .from('player_wallets')
    .upsert({
      user_id: userId,
      wallets: JSON.stringify(walletData),
      last_updated: new Date().toISOString()
    })
  
  if (error) throw new Error('Wallet linking failed')
  return data
}
```
