# In your project directory:
cd src/bar-keep-bill
pip install -r requirements.txt  # Install dependencies
python train_llm.py --quick  # Fast training mode
#def animate_response(text):
    if "whiskey" in text.lower():
        play_animation("pour_drink")
    elif "crypto" in text.lower():
        play_animation("check_tablet")
render.yaml
services:
  - name: bar-keep-bill
    type: web
    runtime: python
    rootDirectory: src
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn bartender:app -k uvicorn.workers.UvicornWorker
    envVars:
      - key: GOOGLE_APPLICATION_CREDENTIALS_JSON
        value: ${{GCLOUD_CREDENTIALS}}
      - key: DIALOGFLOW_PROJECT_ID
        value: your-project-id
    instanceType: standard  # 2GB RAM for LLM
// In Wyoverse frontend
async function askBill(question) {
  const response = await fetch('https://bar-keep-bill.onrender.com/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  
  const { answer, animation } = await response.json();
  
  // Display in UI
  document.getElementById('bill-response').innerText = answer;
  playAnimation(animation);
}
