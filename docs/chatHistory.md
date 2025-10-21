# Chat History - QualtricsAIChatbot Setup

## Project Summary

Successfully set up an AI chatbot for Qualtrics surveys using OpenRouter API with secure deployment to Railway.

---

## Session Overview

### Goals Achieved:
✅ Explored OpenRouter API as alternative to OpenAI  
✅ Created secure backend proxy server (Railway)  
✅ Built chatbot form for GitHub Pages  
✅ Created Qualtrics integration code  
✅ Deployed backend to Railway  
✅ Generated code snippet for Qualtrics embedding  

---

## Key Decisions Made

### 1. **API Choice: OpenRouter instead of OpenAI**
- **Reason**: User is in Hong Kong, needed non-OpenAI models
- **Models Available**: 
  - Claude 3.5 Sonnet (Anthropic) - Default choice
  - Claude 3 Haiku (fast & economical)
  - Google Gemini Pro 1.5
  - Meta Llama 3.1 70B
  - Qwen 2 72B (good for Chinese)

### 2. **Security Architecture: Two-Tier System**
- **Frontend**: Qualtrics (or GitHub Pages) - No API keys exposed
- **Backend**: Railway proxy server - Securely stores API key
- **Prevents**: API key theft from browser source code

### 3. **Deployment Platform: Railway**
- **Why Railway**: Easy deployment, auto-deploy on git push, free tier available
- **Alternative considered**: Render.com (also viable)
- **Configuration**: Auto-detects Node.js, runs on port 8080

### 4. **Qualtrics Integration: JavaScript Method**
- **Why not API**: User's Qualtrics account lacks API permissions (403 Forbidden)
- **Solution**: Manual JavaScript injection into Qualtrics question
- **Method**: Add JavaScript via gear icon → "Add JavaScript"

---

## Technical Setup

### Backend (Railway):
- **Repository**: tesolchina/QualtricsAIChatbot
- **Branch**: alizarif
- **URL**: https://qualtricsaichatbot-production.up.railway.app
- **Port**: 8080 (Railway auto-assigned)
- **Environment Variables**: OPENROUTER_API_KEY (set in Railway dashboard)
- **Endpoints**: 
  - `/health` - Health check
  - `/api/chat` - Proxy to OpenRouter

### Frontend Options:
1. **Qualtrics Survey**:
   - Survey ID: SV_8HXjvSDuIQcuFDw
   - Data Center: hkbuchtl (HKBU)
   - Integration: JavaScript injection
   
2. **GitHub Pages** (Alternative):
   - URL: https://tesolchina.github.io/QualtricsAIChatbot/
   - File: index.html

### Files Created:
- `server.js` - Express proxy server with CORS
- `package.json` - Node.js dependencies
- `Procfile` - Railway deployment config
- `.railwayignore` - Exclude unnecessary files
- `QUALTRICS_CODE_TO_PASTE.js` - Ready-to-use Qualtrics code
- `index.html` / `chatbot-form.html` - Standalone form
- `qualtrics-chatbot-snippet.html` - HTML snippet version
- Documentation files (DEPLOYMENT.md, RAILWAY_DEPLOY.md, etc.)

---

## Issues Encountered & Solutions

### Issue 1: OpenRouter API Exploration
- **Question**: Can we use OpenRouter API?
- **Solution**: Yes! Created code that uses Chat Completions API (simpler than Assistants API)

### Issue 2: API Key Security
- **Problem**: Exposing API key in client-side code
- **Solution**: Created proxy server architecture

### Issue 3: Qualtrics API 403 Forbidden
- **Problem**: User's API token lacks permissions
- **Solution**: Manual JavaScript injection instead of API-based deployment

### Issue 4: Railway Deployment - Script Not Found
- **Error**: "Script start.sh not found"
- **Solution**: Added Procfile and updated package.json with proper start script

### Issue 5: Railway 502 Bad Gateway
- **Problem**: Domain configured for port 3000, app running on 8080
- **Solution**: Regenerated domain without specifying port, let Railway auto-detect

### Issue 6: Server Not Binding Correctly
- **Problem**: Server wasn't accessible externally
- **Solution**: Changed `app.listen(PORT)` to `app.listen(PORT, '0.0.0.0')`

---

## Configuration Details

### Environment Variables Used:
```
OPENROUTER_API_KEY=[configured in Railway]
QUALTRICS_API_KEY=[configured in .env]
QUALTRICS_DATA_CENTER=hkbuchtl
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

### CORS Configuration:
Allowed origins:
- https://tesolchina.github.io
- https://hkbuchtl.qualtrics.com
- http://localhost:8000
- http://localhost:3000

---

## Final Implementation

### Qualtrics Integration Code:
- Located in: `QUALTRICS_CODE_TO_PASTE.js`
- Backend URL: https://qualtricsaichatbot-production.up.railway.app
- Model: anthropic/claude-3.5-sonnet
- Features:
  - Real-time chat with AI
  - Conversation history maintained
  - Typing indicator
  - Error handling
  - Mobile responsive

### Deployment Status:
✅ Backend deployed and running on Railway  
✅ Health endpoint responding: `{"status":"ok"}`  
✅ Code ready for Qualtrics  
✅ All files committed to GitHub  

---

## Next Steps for User

1. Open Qualtrics survey: https://hkbuchtl.qualtrics.com/survey-builder/SV_8HXjvSDuIQcuFDw/edit
2. Add "Text/Graphic" question
3. Click gear icon → "Add JavaScript"
4. Paste code from `QUALTRICS_CODE_TO_PASTE.js`
5. Save and preview

---

## Resources Created

### Documentation:
- `DEPLOYMENT.md` - Railway deployment guide
- `RAILWAY_DEPLOY.md` - Quick Railway setup
- `QUALTRICS_SETUP.md` - Qualtrics integration steps
- `MANUAL_QUALTRICS_SETUP.md` - Manual setup without API
- `README_GITHUB_PAGES.md` - GitHub Pages deployment

### Code Files:
- `QUALTRICS_CODE_TO_PASTE.js` - Final Qualtrics code
- `code-openrouter.js` - OpenRouter integration
- `add_chatbot_to_qualtrics.py` - Python API script (not used due to permissions)

---

## Lessons Learned

1. **Railway port detection**: Let Railway auto-detect port instead of hardcoding
2. **Qualtrics API restrictions**: Institutional accounts often lack API access
3. **CORS importance**: Must configure CORS for cross-origin requests
4. **OpenRouter advantages**: Good alternative to OpenAI, especially for international users
5. **Two-tier security**: Always use backend proxy for API keys in public applications

---

## Success Metrics

- ✅ Backend deployed and accessible
- ✅ Health check passing
- ✅ CORS configured correctly
- ✅ API keys secured
- ✅ Code ready for Qualtrics
- ✅ Documentation complete
- ✅ Auto-deploy configured

---

*Session completed successfully on October 21, 2025*
