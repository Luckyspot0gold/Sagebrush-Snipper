`javascript
// pages/api/bartender.js
import dialogflow from '@google-cloud/dialogflow';

export default async function handler(req, res) {
  const sessionClient = new dialogflow.SessionsClient({
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
  });
  
  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.GOOGLE_PROJECT_ID,
    req.sessionID
  );

  const response = await sessionClient.detectIntent({
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.question,
        languageCode: 'en-US'
      }
    }
  });

  res.status(200).json({ reply: response[0].queryResult.fulfillmentText });
}
```
