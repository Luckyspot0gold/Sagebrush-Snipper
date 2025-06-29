`javascript
   // pages/_app.js
   import * as Sentry from '@sentry/nextjs';

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     integrations: [new Sentry.Integrations.Http({ tracing: true })],
     tracesSampleRate: 1.0,
   });
