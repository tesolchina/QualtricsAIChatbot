# 🎯 Simple Guide: Add Chatbot to Qualtrics Survey (Manual Method)

**Survey URL**: https://hkbuchtl.qualtrics.com/survey-builder/SV_8HXjvSDuIQcuFDw/edit

Since the Qualtrics API requires special permissions, here's the easiest way to add the chatbot manually:

---

## Method 1: Using Rich Content Editor (Recommended)

### Step 1: Open Your Survey
1. Go to: https://hkbuchtl.qualtrics.com/survey-builder/SV_8HXjvSDuIQcuFDw/edit

### Step 2: Add Question
1. Click **"Create a new question"** or the **"+"** button
2. From the question type dropdown, select **"Text/Graphic"**

### Step 3: Add the Chatbot Code

**Option A - Source Editor:**
1. Click on the question text area
2. Look for a **"Source"** or **"<>"** button in the editor toolbar (HTML/Source button)
3. Click it to open the HTML editor
4. Paste the code from `qualtrics-chatbot-snippet.html` (see below)
5. Click **"Source"** again to close the editor

**Option B - If no Source button:**
1. Click the **gear icon** (⚙️) or **question options**
2. Look for **"Question Behavior"** or **"Advanced"**
3. Find **"Add JavaScript"** option
4. Use the JavaScript method (see below)

---

## Method 2: Using JavaScript in Question (Alternative)

If you can't find the HTML editor, use this method:

### Step 1: Create a Text/Graphic Question
1. Add a new **Text/Graphic** question
2. In the question text, just type: "Please wait while the chatbot loads..."

### Step 2: Add JavaScript
1. Click the **gear icon** (⚙️) next to the question
2. Select **"Add JavaScript"**
3. Paste this code in the JavaScript editor:

```javascript
Qualtrics.SurveyEngine.addOnReady(function() {
    // Get question container
    var container = this.getQuestionContainer();
    
    // Clear existing content
    container.innerHTML = '';
    
    // Add chatbot HTML
    var chatbotHTML = `
    <style>
      #qualtrics-chatbot-root {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 100%;
        margin: 20px 0;
      }
      #chat-container {
        height: 400px;
        overflow-y: auto;
        border: 2px solid #e0e0e0;
        padding: 15px;
        border-radius: 8px;
        background: #fff;
        margin-bottom: 10px;
      }
      .chat-message {
        padding: 10px 15px;
        margin-bottom: 10px;
        border-radius: 12px;
        max-width: 80%;
        word-wrap: break-word;
      }
      .user-msg {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin-left: auto;
        text-align: right;
      }
      .bot-msg {
        background: #f3f4f6;
        color: #333;
      }
      #chat-input-wrapper {
        display: flex;
        gap: 10px;
      }
      #qualtrics-user-input {
        flex: 1;
        padding: 12px;
        border-radius: 8px;
        border: 2px solid #e0e0e0;
        font-size: 14px;
      }
      #qualtrics-send-btn {
        padding: 12px 24px;
        border-radius: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-weight: 600;
      }
    </style>
    
    <div id="qualtrics-chatbot-root">
      <h3 style="margin-bottom: 15px; color: #333;">💬 Chat with AI Assistant</h3>
      <div id="chat-container"></div>
      <div id="chat-input-wrapper">
        <input id="qualtrics-user-input" placeholder="Type your message here..." />
        <button id="qualtrics-send-btn">Send</button>
      </div>
    </div>
    `;
    
    container.innerHTML = chatbotHTML;
    
    // Initialize chatbot
    (function(){
      // IMPORTANT: Replace with your Railway URL!
      const apiBase = 'https://your-app-name.up.railway.app';
      const model = 'anthropic/claude-3.5-sonnet';
      let history = [];
      
      const chatContainer = document.getElementById('chat-container');
      const input = document.getElementById('qualtrics-user-input');
      const sendBtn = document.getElementById('qualtrics-send-btn');
      
      function append(msg, type){
        const div = document.createElement('div');
        div.textContent = msg;
        div.className = 'chat-message ' + (type === 'user' ? 'user-msg' : 'bot-msg');
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return div;
      }
      
      append('Hello! I\\'m your AI assistant. How can I help you today?', 'bot');
      
      sendBtn.addEventListener('click', send);
      input.addEventListener('keypress', (e)=>{if(e.key==='Enter')send();});
      
      async function send(){
        const message = input.value.trim();
        if(!message) return;
        
        append(message, 'user');
        history.push({role:'user', content:message});
        input.value = '';
        sendBtn.disabled = true;
        
        const typing = append('Typing...', 'bot');
        
        try{
          const resp = await fetch(apiBase + '/api/chat', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({model, messages: history, temperature:0.7, max_tokens:1000})
          });
          
          const data = await resp.json();
          chatContainer.removeChild(typing);
          
          const assistant = data.choices?.[0]?.message?.content;
          if(assistant){
            append(assistant, 'bot');
            history.push({role:'assistant', content:assistant});
          } else {
            append('No response. Check backend configuration.', 'bot');
          }
        } catch(err){
          chatContainer.removeChild(typing);
          append('Error: ' + err.message, 'bot');
        } finally {
          sendBtn.disabled = false;
        }
      }
    })();
});
```

4. **IMPORTANT**: Replace `https://your-app-name.up.railway.app` with your actual Railway URL
5. Click **"Save"**

---

## Method 3: Copy from Working Example

I've created a working example file for you:

### File: `qualtrics-chatbot-snippet.html`

1. Open this file in the repository
2. Update line 35: Replace `https://your-app-name.up.railway.app` with your Railway URL
3. Copy the entire file contents
4. Use Method 1 or Method 2 to paste it into your survey

---

## ⚠️ Before Testing

**Deploy your backend first!** Follow `DEPLOYMENT.md`:
1. Deploy to Railway
2. Get your Railway URL
3. Update the URL in the code above
4. Test in Qualtrics preview

---

## Quick Check

✅ **Backend deployed to Railway?**
✅ **Railway URL updated in code?**  
✅ **Code pasted into Qualtrics?**
✅ **Saved and previewed?**

If all checked, your chatbot should work! 🎉

---

## Can't Find HTML Editor or JavaScript Option?

Try this:
1. Contact your Qualtrics admin - you may need elevated permissions
2. Or use the standalone form on GitHub Pages instead (see `README_GITHUB_PAGES.md`)

---

**Need help?** The chatbot works perfectly in the standalone `index.html` file - you can always use that via GitHub Pages!
