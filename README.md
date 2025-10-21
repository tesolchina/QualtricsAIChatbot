# QualtricsAIChatbot

This is a simple code for integrating an AI chatbot powered by OpenRouter (supporting multiple AI models) into Qualtrics surveys and standalone forms.

## 🌐 Live Demo

**Backend API**: https://qualtricsaichatbot-production.up.railway.app

## 📁 Project Structure

```
QualtricsAIChatbot/
├── backend/              # Railway-deployed proxy server
│   ├── server.js        # Express server with OpenRouter proxy
│   ├── package.json     # Node.js dependencies
│   ├── Procfile         # Railway deployment config
│   └── .railwayignore   # Files to exclude from deployment
│
├── frontend/            # Client-side chatbot interfaces
│   ├── index.html                    # GitHub Pages main page
│   ├── chatbot-form.html             # Standalone chatbot form
│   ├── qualtrics-chatbot-snippet.html # HTML snippet for Qualtrics
│   └── QUALTRICS_CODE_TO_PASTE.js    # Ready-to-use Qualtrics code
│
├── docs/                # Documentation
│   ├── DEPLOYMENT.md             # General deployment guide
│   ├── RAILWAY_DEPLOY.md         # Railway-specific guide
│   ├── QUALTRICS_SETUP.md        # Qualtrics integration steps
│   ├── MANUAL_QUALTRICS_SETUP.md # Manual setup without API
│   ├── README_GITHUB_PAGES.md    # GitHub Pages guide
│   └── chatHistory.md            # Session summary
│
├── scripts/             # Utility scripts
│   ├── add_chatbot_to_qualtrics.py  # Python API script
│   └── original/                     # Original code versions
│       ├── code.js                   # OpenAI Assistants version
│       └── code-openrouter.js        # OpenRouter version
│
├── .env                 # Environment variables (not committed)
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🚀 Quick Start

### Deploy Backend (Railway)
1. Push to GitHub
2. Connect Railway to repository
3. Add `OPENROUTER_API_KEY` environment variable
4. Railway auto-deploys from `backend/` folder

### Embed in Qualtrics
1. Copy code from `frontend/QUALTRICS_CODE_TO_PASTE.js`
2. In Qualtrics, add "Text/Graphic" question
3. Click gear icon → "Add JavaScript"
4. Paste the code and save

### Deploy to GitHub Pages
1. Enable GitHub Pages (Settings → Pages)
2. Select branch: `alizarif`
3. Visit: `https://tesolchina.github.io/QualtricsAIChatbot/`

## 🤖 Available AI Models

The chatbot supports multiple models via OpenRouter:
- **Claude 3.5 Sonnet** (Anthropic) - Recommended
- **Claude 3 Haiku** (Anthropic) - Fast & economical
- **Google Gemini Pro 1.5**
- **Meta Llama 3.1 70B**
- **Qwen 2 72B** - Great for Chinese language

## 📚 Documentation

All guides are in the `docs/` folder:
- **Getting Started**: `docs/RAILWAY_DEPLOY.md`
- **Qualtrics Setup**: `docs/MANUAL_QUALTRICS_SETUP.md`
- **Session Summary**: `docs/chatHistory.md`

## 🔒 Security

✅ API keys stored securely in Railway environment variables  
✅ Backend proxy prevents client-side key exposure  
✅ CORS configured for authorized domains only  
✅ `.env` file excluded from version control  

## 📖 Original Tutorial

For the OpenAI Assistants API version, see:
[Integrating AI Chatbots into Qualtrics Surveys](https://github.com/alizarif/QualtricsAIChatbot/blob/alizarif/Integrating_AI_Chatbots_into_Qualtrics_Surveys%20(1).pdf)

## Citation

Please cite if you use this project:

Zarifhonarvar, Ali, Integrating AI Chatbot into Qualtrics Surveys (September 10, 2024). [Available at SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4964908)

### BibTeX:

```bibtex
@misc{zarif2023integrating,
  title={Integrating AI Chatbots into Qualtrics Surveys},
  author={Zarifhonarvar, Ali},
  year={2024},
  howpublished={\url{https://github.com/alizarif/QualtricsAIChatbot}}
}
```

## 💰 Costs

- **Railway**: Free tier ($5 credit/month)
- **GitHub Pages**: Free forever
- **OpenRouter**: Pay-per-use (~$0.001-0.01 per conversation)

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, CORS
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Deployment**: Railway (backend), GitHub Pages (frontend)
- **AI**: OpenRouter API (multiple models)

---

**Need help?** Check the `docs/` folder for detailed guides!

