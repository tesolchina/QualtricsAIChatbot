# 🚀 Deployment Guide: Secure AI Chatbot with Railway + GitHub Pages

This guide shows you how to deploy the chatbot **securely** without exposing your API key.

## Architecture

```
GitHub Pages (Frontend)  →  Railway (Backend Proxy)  →  OpenRouter API
    index.html                   server.js                (Your API key stays here)
```

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub (free tier available)

### Step 2: Deploy the Proxy Server
1. Click **"New Project"** → **"Deploy from GitHub repo"**
2. Select this repository: `tesolchina/QualtricsAIChatbot`
3. Railway will auto-detect Node.js and deploy `server.js`

### Step 3: Add Environment Variables
1. In Railway, go to your project → **Variables** tab
3. Add this variable:
   - **Key**: `OPENROUTER_API_KEY`
   - **Value**: `YOUR_OPENROUTER_API_KEY` (paste your key from openrouter.ai — do NOT commit it)
3. Click **Save**

### Step 4: Get Your Backend URL
1. Go to **Settings** tab → **Domains**
2. Click **Generate Domain**
3. Copy the URL (e.g., `https://your-app-name.up.railway.app`)

---

## Part 2: Update Frontend to Use Backend

### Step 5: Update the Frontend Files
1. Open `index.html` and `chatbot-form.html`
2. Find this line:
   ```javascript
   const PROXY_URL = "https://your-app-name.railway.app";
   ```
3. Replace with your actual Railway URL from Step 4

### Step 6: Commit and Push
```bash
git add index.html chatbot-form.html
git commit -m "Connect frontend to Railway backend"
git push origin alizarif
```

---

## Part 3: Deploy Frontend to GitHub Pages

### Step 7: Enable GitHub Pages
1. Go to `https://github.com/tesolchina/QualtricsAIChatbot/settings/pages`
2. Under **Source**:
   - Branch: `alizarif`
   - Folder: `/ (root)`
3. Click **Save**

### Step 8: Get Your Public URL
- After 1-2 minutes, your form will be live at:
  - `https://tesolchina.github.io/QualtricsAIChatbot/`

---

## ✅ Testing

1. Open `https://tesolchina.github.io/QualtricsAIChatbot/`
2. Type a message in the chatbot
3. You should get a response from the AI!

---

## 🔒 Security Checklist

- ✅ API key is in Railway environment variables (not in code)
- ✅ `.env` is in `.gitignore` (not committed to GitHub)
- ✅ CORS is configured to only allow your domains
- ✅ Frontend files have no API keys

---

## 💰 Cost Estimate

- **Railway**: Free tier includes 500 hours/month (enough for testing)
- **GitHub Pages**: Free forever
- **OpenRouter**: Pay per API usage (typically $0.001-0.01 per conversation)

---

## Alternative: Deploy to Render.com

If you prefer Render over Railway:

1. Go to [Render.com](https://render.com)
2. Create a **New Web Service**
3. Connect your GitHub repo
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start`
6. Add environment variable: `OPENROUTER_API_KEY`
7. Deploy!

---

## Troubleshooting

### "Failed to fetch" error
- Check that Railway URL is correct in `index.html`
- Check Railway logs for errors
- Make sure CORS is configured correctly

### Backend not starting
- Check Railway logs
- Verify `OPENROUTER_API_KEY` is set in Railway variables
- Run `npm install` locally to test

### GitHub Pages not updating
- Wait 2-3 minutes after pushing
- Clear browser cache
- Check GitHub Actions tab for build status

---

## 📝 Summary

✅ **Backend (Railway)**: Runs `server.js`, keeps API key secret
✅ **Frontend (GitHub Pages)**: Serves `index.html`, talks to backend
✅ **Secure**: No API keys in public code
✅ **Free**: Both services have free tiers
✅ **Fast**: Deploy in under 10 minutes
