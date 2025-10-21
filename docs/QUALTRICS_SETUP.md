# 📝 How to Add Chatbot to Your Qualtrics Survey

Survey URL: https://hkbuchtl.qualtrics.com/survey-builder/SV_8HXjvSDuIQcuFDw/edit

## Prerequisites

⚠️ **IMPORTANT**: You must deploy the backend to Railway FIRST before adding the chatbot to Qualtrics!

Follow the steps in `DEPLOYMENT.md` to:
1. Deploy `server.js` to Railway
2. Get your Railway URL (e.g., `https://your-app-name.up.railway.app`)

## Step-by-Step Guide

### Step 1: Open Your Survey
1. Go to: https://hkbuchtl.qualtrics.com/survey-builder/SV_8HXjvSDuIQcuFDw/edit
2. You should see your survey editor

### Step 2: Add a New Question for the Chatbot
1. Click the **"+ Add Question"** button where you want the chatbot
2. Select question type: **"Text/Graphic"**
3. This will be used to hold the chatbot interface

### Step 3: Switch to HTML Editor
1. In the Text/Graphic question, you'll see a rich text editor
2. Click the **"HTML View"** button (usually in the top-right or bottom-left of the editor)
3. This opens the HTML source editor

### Step 4: Paste the Chatbot Code
1. Open the file `qualtrics-chatbot-snippet.html` in this repository
2. **IMPORTANT**: First, update line 35 in the snippet:
   ```javascript
   const apiBase = 'https://your-app-name.up.railway.app';
   ```
   Replace `https://your-app-name.up.railway.app` with your actual Railway URL

3. Copy the **entire contents** of `qualtrics-chatbot-snippet.html`
4. Paste it into the HTML View in Qualtrics
5. Click **"Save"** or close the HTML editor

### Step 5: Preview and Test
1. Click **"Preview Survey"** in the top-right
2. Navigate to the chatbot question
3. Try typing a message and sending it
4. You should see a response from the AI!

### Step 6: Adjust Question Settings (Optional)
1. You may want to make the chatbot question **"Not Required"** so users can skip if they want
2. Add descriptive text above the chatbot:
   - "Please chat with our AI assistant below"
   - "Ask any questions you have"

## Troubleshooting

### Chatbot shows but doesn't respond
- **Check**: Is your Railway backend running? Visit `https://your-railway-url.up.railway.app/health` - you should see `{"status":"ok"}`
- **Check**: Did you update the `apiBase` URL in the snippet?
- **Check**: Open browser console (F12) and look for errors

### "Error: Failed to fetch"
- Your Railway backend URL is incorrect or the backend is not running
- Check CORS settings in `server.js`

### Chatbot doesn't appear
- Make sure you pasted the code in **HTML View**, not the rich text editor
- Check if Qualtrics stripped any HTML - some advanced HTML may be blocked

### Styling looks off
- Qualtrics may have its own CSS that conflicts
- Try adding `!important` to styles if needed

## Advanced: Store Chat History in Qualtrics

If you want to save the conversation to Qualtrics Embedded Data:

1. Add this JavaScript to your survey (Tools → JavaScript Editor):

```javascript
Qualtrics.SurveyEngine.addOnReady(function() {
    // Wait a bit for chatbot to load
    setTimeout(function() {
        // Store chat when user continues
        window.saveChatHistory = function(history) {
            Qualtrics.SurveyEngine.setEmbeddedData('chatHistory', JSON.stringify(history));
        };
    }, 1000);
});
```

2. In `qualtrics-chatbot-snippet.html`, add this at the end of the `send()` function:

```javascript
// After successful response
if(window.saveChatHistory) {
    window.saveChatHistory(history);
}
```

3. Create an Embedded Data field named `chatHistory` in your Survey Flow

## Testing Checklist

- [ ] Backend deployed to Railway
- [ ] Railway URL updated in snippet
- [ ] Snippet pasted into Qualtrics HTML View
- [ ] Survey preview shows chatbot
- [ ] Can send message and get response
- [ ] Conversation history persists during chat
- [ ] Survey can be submitted successfully

## Next Steps

Once everything works:
1. ✅ Test thoroughly in preview mode
2. ✅ Distribute your survey link
3. ✅ Monitor Railway logs for any issues
4. ✅ Check OpenRouter usage/costs

---

**Need help?** Check the browser console (F12 → Console) for detailed error messages.
