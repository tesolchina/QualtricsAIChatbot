# QualtricsAIChatbot

This is a simple code for integrating an AI chatbot powered by OpenRouter (supporting multiple AI models) into Qualtrics surveys and standalone forms.

## 🌐 Live Demo on GitHub Pages

You can deploy this chatbot form to GitHub Pages and share the link!

### Steps to Deploy:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add OpenRouter chatbot form"
   git push origin alizarif
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/tesolchina/QualtricsAIChatbot`
   - Click **Settings** → **Pages**
   - Under "Source", select **Branch: alizarif** and folder **/ (root)**
   - Click **Save**

3. **Get your URL**:
   - After a few minutes, your form will be live at:
   - `https://tesolchina.github.io/QualtricsAIChatbot/`
   - Or directly: `https://tesolchina.github.io/QualtricsAIChatbot/index.html`

4. **Share the link** with survey participants!

## 📁 Files in this Repository

- `index.html` / `chatbot-form.html` - Standalone chatbot form (works on GitHub Pages)
- `code.js` - Original OpenAI Assistants API integration
- `code-openrouter.js` - OpenRouter integration for Qualtrics
- `qualtrics-chatbot-snippet.html` - Snippet to paste into Qualtrics surveys
- `server.js` - Proxy server (optional, for hiding API keys)
- `.env` - API keys configuration

## 🤖 Available AI Models

The chatbot supports multiple non-OpenAI models via OpenRouter:
- **Claude 3.5 Sonnet** (Anthropic) - Excellent quality, recommended
- **Claude 3 Haiku** (Anthropic) - Fast and economical
- **Google Gemini Pro 1.5**
- **Meta Llama 3.1 70B**
- **Qwen 2 72B** - Great for Chinese language

## 🔒 Security Note

⚠️ **Important**: The current `index.html` includes the API key in the client-side code for GitHub Pages demo purposes. For production use:
- Use the proxy server (`server.js`) to hide API keys
- Or use environment variables with a backend service
- Never commit real API keys to public repositories

## 📚 Original Tutorial

For the OpenAI Assistants API version, see the detailed tutorial:

[Integrating AI Chatbots into Qualtrics Surveys](https://github.com/alizarif/QualtricsAIChatbot/blob/alizarif/Integrating_AI_Chatbots_into_Qualtrics_Surveys%20(1).pdf)

## Citation

Please cite the following if you use it:

Zarifhonarvar, Ali, Integrating AI Chatbot into Qualtrics Surveys (September 10, 2024). [Available at SSRN:](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4964908)

### BibTeX:

```bibtex
@misc{zarif2023integrating,
  title={Integrating AI Chatbots into Qualtrics Surveys},
  author={Zarifhonarvar, Ali},
  year={2024},
  howpublished={\url{https://github.com/alizarif/QualtricsAIChatbot}}
}
```
