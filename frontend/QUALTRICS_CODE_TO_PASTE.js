/*
 * QUALTRICS CHATBOT CODE
 * 
 * HOW TO USE:
 * 1. In Qualtrics survey, add a "Text/Graphic" question
 * 2. Click the gear icon (⚙️) on the question
 * 3. Select "Add JavaScript"
 * 4. Replace ALL the code in the JavaScript editor with this code
 * 5. Save and preview your survey
 */

Qualtrics.SurveyEngine.addOnReady(function() {
    var container = this.getQuestionContainer();
    container.innerHTML = '';
    
    // Your Railway backend URL
    var RAILWAY_URL = 'https://qualtricsaichatbot-production.up.railway.app';
    
    var html = `
    <style>
      #chatbot-root {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 100%;
        margin: 20px 0;
      }
      #chat-box {
        height: 400px;
        overflow-y: auto;
        border: 2px solid #e0e0e0;
        padding: 15px;
        border-radius: 8px;
        background: #fff;
        margin-bottom: 10px;
      }
      .msg {
        padding: 10px 15px;
        margin-bottom: 10px;
        border-radius: 12px;
        max-width: 80%;
        word-wrap: break-word;
      }
      .user {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin-left: auto;
        text-align: right;
      }
      .bot {
        background: #f3f4f6;
        color: #333;
      }
      #input-box {
        display: flex;
        gap: 10px;
      }
      #msg-input {
        flex: 1;
        padding: 12px;
        border-radius: 8px;
        border: 2px solid #e0e0e0;
        font-size: 14px;
      }
      #send-btn {
        padding: 12px 24px;
        border-radius: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-weight: 600;
      }
      #send-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    </style>
    
    <div id="chatbot-root">
      <h3 style="margin-bottom: 15px; color: #333;">💬 Chat with AI Assistant</h3>
      <div id="chat-box"></div>
      <div id="input-box">
        <input id="msg-input" placeholder="Type your message here..." />
        <button id="send-btn">Send</button>
      </div>
    </div>
    `;
    
    container.innerHTML = html;
    
    var chatBox = document.getElementById('chat-box');
    var input = document.getElementById('msg-input');
    var btn = document.getElementById('send-btn');
    var history = [];
    
    function addMsg(text, type) {
        var div = document.createElement('div');
        div.textContent = text;
        div.className = 'msg ' + type;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
        return div;
    }
    
    addMsg('Hello! How can I help you today?', 'bot');
    
    btn.addEventListener('click', sendMsg);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMsg();
    });
    
    function sendMsg() {
        var msg = input.value.trim();
        if (!msg) return;
        
        addMsg(msg, 'user');
        history.push({role: 'user', content: msg});
        input.value = '';
        btn.disabled = true;
        btn.textContent = 'Sending...';
        
        var typing = addMsg('Typing...', 'bot');
        
        fetch(RAILWAY_URL + '/api/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                model: 'anthropic/claude-3.5-sonnet',
                messages: history,
                temperature: 0.7,
                max_tokens: 1000
            })
        })
        .then(function(resp) { return resp.json(); })
        .then(function(data) {
            chatBox.removeChild(typing);
            var reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
            if (reply) {
                addMsg(reply, 'bot');
                history.push({role: 'assistant', content: reply});
            } else {
                addMsg('No response. Check backend.', 'bot');
            }
        })
        .catch(function(err) {
            chatBox.removeChild(typing);
            addMsg('Error: ' + err.message, 'bot');
        })
        .finally(function() {
            btn.disabled = false;
            btn.textContent = 'Send';
        });
    }
});
