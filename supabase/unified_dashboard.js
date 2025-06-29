jsx
   // components/WalletManager.js
   export default function WalletManager() {
     return (
       <div className="wallet-dashboard">
         <h3>Your Connected Wallets</h3>
         <AvalancheStatus />
         <CoinbaseStatus />
         <PhantomStatus />
         <div className="other-wallets">
           <a href="https://deso.org/">DESO</a>
           <a href="https://muse.place/">Muse</a>
         </div>
       </div>
     )
   }
   ```
