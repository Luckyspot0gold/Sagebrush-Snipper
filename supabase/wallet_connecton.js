```javascript
   // Track wallet connections in Supabase
   await supabase.from('connection_logs').insert({
     user_id: currentUser.id,
     wallet_type: provider,
     status: 'connected',
     timestamp: new Date()
   });
