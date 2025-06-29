``javascript
   // utils/healthCheck.js
   export async function runHealthChecks() {
     const results = {
       supabase: await testSupabaseConnection(),
       google: await testDialogflowConnection(),
       avalanche: await testAvalancheRPC(),
       bolt: await testBoltAPI()
     };
     return results;
   }
   ```
