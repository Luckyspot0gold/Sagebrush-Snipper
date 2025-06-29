`bash
# 10-Minute Bolt Deployment
npx create-bolt-app@latest wyoverse --template nextjs
cd wyoverse
rm -rf src/* # Clear template
cp -R ../your-project/* src/ # Copy your code
bolt deploy --force --no-verify
```
