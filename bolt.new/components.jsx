jsx
// components/BoltCheckout.js
import { BoltCheckout } from '@boltcommerce/bolt-react';

export default function CryptoPurchase({ item }) {
  return (
    <BoltCheckout
      productId={item.id}
      amount={item.price}
      currency="USD"
      onSuccess={(transaction) => {
        // Update user balance in Supabase
        await supabase.rpc('increment_balance', {
          user_id: currentUser.id,
          amount: item.amount
        })
      }}
      onError={(error) => console.error('Payment failed:', error)}
    >
      <button className="purchase-btn">
        Buy {item.name} for ${item.price}
      </button>
    </BoltCheckout>
  )
}
```

---
