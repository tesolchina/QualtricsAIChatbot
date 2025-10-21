# 🚂 Quick Railway Deployment Guide

## ✅ Files Fixed!

I've added the necessary files for Railway deployment:
- ✅ `Procfile` - Tells Railway how to start the app
- ✅ `package.json` - Updated with Node.js version and scripts
- ✅ `.railwayignore` - Excludes unnecessary files

## 🚀 Deploy to Railway (5 minutes)

### Step 1: Push to GitHub (if not done)
```bash
git push origin alizarif
```

### Step 2: Deploy on Railway

1. **Go to**: https://railway.app
2. **Sign in** with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: `tesolchina/QualtricsAIChatbot`
6. Railway will automatically:
   - Detect it's a Node.js app
   - Run `npm install`
   - Run `npm start` (which runs `node server.js`)

### Step 3: Add Environment Variable

1. In Railway project, click on your service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add:
   - **Variable**: `OPENROUTER_API_KEY`
   - **Value**: `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`
5. Click **"Add"**

### Step 4: Get Your URL

1. Go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Copy your URL (e.g., `https://qualtricsaichatbot-production.up.railway.app`)

### Step 5: Test It!

Visit: `https://your-railway-url.up.railway.app/health`

You should see: `{"status":"ok"}`

✅ **Backend is working!**

---

## 📝 Next: Update Frontend

Now that your backend is deployed, update the frontend:

### For Qualtrics:
1. Copy the Railway URL
2. Open the JavaScript code from my previous message
3. Replace line 7: `var RAILWAY_URL = 'https://your-actual-url.up.railway.app';`
4. Add to your Qualtrics survey

### For GitHub Pages:
1. Update `index.html` line that has `PROXY_URL`
2. Replace with your Railway URL
3. Commit and push
4. Enable GitHub Pages

---

## 🎉 You're Done!

Your chatbot will now:
- ✅ Keep API keys secure on Railway
- ✅ Work from Qualtrics or GitHub Pages
- ✅ Use non-OpenAI models (Claude, Gemini, etc.)
- ✅ Be accessible from Hong Kong

---

## 💰 Costs

- **Railway Free Tier**: $5 credit/month (~500 hours)
- **OpenRouter**: Pay per API usage (~$0.001-0.01 per conversation)
- **GitHub Pages**: Free forever

---

## 🐛 Troubleshooting

**Railway build fails?**
- Check the build logs in Railway dashboard
- Make sure all files are committed and pushed

**Can't access /health endpoint?**
- Wait 1-2 minutes for Railway to deploy
- Check Railway logs for errors

**CORS errors?**
- Make sure your domain is in the CORS list in `server.js`
- Railway URL should work automatically

---

**Ready to deploy?** Just push to GitHub and follow Step 2!
