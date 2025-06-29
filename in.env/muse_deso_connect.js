``jsx
// components/WalletConnect.js
export default function WalletConnect() {
  return (
    <div className="wallet-grid">
      <WalletButton 
        name="DESO" 
        onClick={() => window.open('https://deso.org/', '_blank')}
        icon="/deso-logo.png"
      />
      <WalletButton 
        name="Muse" 
        onClick={() => window.open('https://muse.place/', '_blank')}
        icon="/muse-logo.png"
      />
      {/* Other wallets */}
    </div>
  )
}
```

---
