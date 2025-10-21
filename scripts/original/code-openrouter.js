Qualtrics.SurveyEngine.addOnload(function() {
    var that = this;

    // OpenRouter API configuration
    // IMPORTANT: For production, use a backend proxy to keep your API key secure
    var apiKey = "YOUR_OPENROUTER_API_KEY"; // Replace with your OpenRouter API key
    
    // Recommended non-OpenAI models for Hong Kong:
    // - "anthropic/claude-3.5-sonnet" (Excellent, fast, smart)
    // - "anthropic/claude-3-haiku" (Fast and cost-effective)
    // - "google/gemini-pro-1.5" (Good performance)
    // - "meta-llama/llama-3.1-70b-instruct" (Open source, good quality)
    // - "qwen/qwen-2-72b-instruct" (Chinese company, good for Chinese language)
    var model = "anthropic/claude-3.5-sonnet";
    
    var conversationHistory = []; // Store conversation history

    // Create chat interface
    var chatContainer = document.createElement("div");
    chatContainer.id = "chat-container";
    chatContainer.style.height = "400px";
    chatContainer.style.overflowY = "scroll";
    chatContainer.style.border = "1px solid #ddd";
    chatContainer.style.borderRadius = "8px";
    chatContainer.style.padding = "15px";
    chatContainer.style.marginBottom = "15px";
    chatContainer.style.backgroundColor = "#f9f9f9";

    var inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.id = "user-input";
    inputBox.style.width = "70%";
    inputBox.style.padding = "8px";
    inputBox.style.marginRight = "10px";
    inputBox.style.borderRadius = "4px";
    inputBox.style.border = "1px solid #ccc";

    var sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.onclick = sendMessage;
    sendButton.style.padding = "8px 15px";
    sendButton.style.backgroundColor = "#4CAF50";
    sendButton.style.color = "white";
    sendButton.style.border = "none";
    sendButton.style.borderRadius = "4px";
    sendButton.style.cursor = "pointer";

    // Append elements to the question container
    var container = this.getQuestionContainer();
    container.appendChild(chatContainer);
    container.appendChild(inputBox);
    container.appendChild(sendButton);

    // Display initial greeting
    displayMessage("Assistant: Hello! How can I help you today?", "assistant-message");

    // Function to send message and get response
    function sendMessage() {
        var userInput = inputBox.value;
        if (!userInput) return;

        displayMessage("User: " + userInput, "user-message");
        inputBox.value = "";

        // Add user message to conversation history
        conversationHistory.push({
            role: "user",
            content: userInput
        });

        // Show typing indicator
        var typingIndicator = displayMessage("Assistant: Typing...", "assistant-message");
        typingIndicator.id = "typing-indicator";

        // Call OpenRouter API
        fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + apiKey,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.href, // Optional but recommended
                "X-Title": "Qualtrics AI Chatbot" // Optional but recommended
            },
            body: JSON.stringify({
                model: model,
                messages: conversationHistory,
                // Optional parameters:
                temperature: 0.7,
                max_tokens: 1000,
                // You can add more parameters like top_p, frequency_penalty, etc.
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('API request failed: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Remove typing indicator
            var indicator = document.getElementById("typing-indicator");
            if (indicator) {
                chatContainer.removeChild(indicator);
            }

            // Get assistant's response
            var assistantMessage = data.choices[0].message.content;
            
            // Add assistant message to conversation history
            conversationHistory.push({
                role: "assistant",
                content: assistantMessage
            });

            // Display assistant's response
            displayMessage("Assistant: " + assistantMessage, "assistant-message");
        })
        .catch(error => {
            console.error('Error:', error);
            // Remove typing indicator
            var indicator = document.getElementById("typing-indicator");
            if (indicator) {
                chatContainer.removeChild(indicator);
            }
            displayMessage("Assistant: Sorry, there was an error processing your request. " + error.message, "assistant-message error-message");
        });
    }

    function displayMessage(message, className) {
        var messageElement = document.createElement("p");
        messageElement.textContent = message;
        messageElement.className = className;
        messageElement.style.padding = "10px";
        messageElement.style.borderRadius = "8px";
        messageElement.style.marginBottom = "10px";
        
        if (className === "user-message") {
            messageElement.style.backgroundColor = "#e1f5fe";
            messageElement.style.alignSelf = "flex-end";
        } else if (className.includes("error")) {
            messageElement.style.backgroundColor = "#ffebee";
            messageElement.style.color = "#c62828";
        } else {
            messageElement.style.backgroundColor = "#f0f4c3";
        }
        
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto scroll to the latest message
        
        return messageElement; // Return element so we can remove it later if needed
    }

    // Add event listener for Enter key
    inputBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});
