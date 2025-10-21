#!/usr/bin/env python3
"""
Add AI Chatbot to Qualtrics Survey using API
"""
import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration from .env
API_KEY = os.getenv('QUALTRICS_API_KEY', '').strip()
DATA_CENTER = os.getenv('QUALTRICS_DATA_CENTER', 'hkbuchtl').strip()
SURVEY_ID = 'SV_8HXjvSDuIQcuFDw'

# Railway URL - UPDATE THIS after deploying to Railway!
RAILWAY_URL = 'https://your-app-name.up.railway.app'

# Qualtrics API endpoint
# The error message suggested using syd1.qualtrics.com instead
BASE_URL = f'https://syd1.qualtrics.com/API/v3'

def get_survey():
    """Fetch current survey structure"""
    url = f'{BASE_URL}/survey-definitions/{SURVEY_ID}'
    headers = {
        'X-API-TOKEN': API_KEY,
        'Content-Type': 'application/json'
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching survey: {response.status_code}")
        print(response.text)
        return None

def create_chatbot_question():
    """Create the chatbot HTML question payload"""
    
    # Read the chatbot snippet and replace the Railway URL
    with open('qualtrics-chatbot-snippet.html', 'r') as f:
        chatbot_html = f.read()
    
    # Replace the placeholder URL with actual Railway URL
    chatbot_html = chatbot_html.replace(
        'https://your-app-name.up.railway.app',
        RAILWAY_URL
    )
    
    question_payload = {
        "QuestionText": chatbot_html,
        "DataExportTag": "Q_Chatbot",
        "QuestionType": "DB",  # Descriptive Text (Text/Graphic)
        "Selector": "TB",
        "Configuration": {
            "QuestionDescriptionOption": "UseText"
        },
        "QuestionDescription": "AI Chatbot",
        "Validation": {
            "Settings": {
                "ForceResponse": "OFF",
                "Type": "None"
            }
        }
    }
    
    return question_payload

def add_question_to_survey(question_data):
    """Add a new question to the survey"""
    url = f'{BASE_URL}/survey-definitions/{SURVEY_ID}/questions'
    headers = {
        'X-API-TOKEN': API_KEY,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, headers=headers, json=question_data)
    
    if response.status_code == 200:
        result = response.json()
        print("✅ Success! Chatbot added to survey.")
        print(f"Question ID: {result['result']['QuestionID']}")
        print(f"\nView your survey at:")
        print(f"https://{DATA_CENTER}.qualtrics.com/survey-builder/{SURVEY_ID}/edit")
        return result
    else:
        print(f"❌ Error adding question: {response.status_code}")
        print(response.text)
        return None

def main():
    print("=" * 60)
    print("Adding AI Chatbot to Qualtrics Survey")
    print("=" * 60)
    
    # Validate configuration
    if not API_KEY:
        print("❌ Error: QUALTRICS_API_KEY not found in .env file")
        return
    
    if RAILWAY_URL == 'https://your-app-name.up.railway.app':
        print("⚠️  Warning: Railway URL not updated!")
        print("Please edit this script and update RAILWAY_URL variable")
        response = input("Continue anyway? (y/n): ")
        if response.lower() != 'y':
            return
    
    print(f"\nSurvey ID: {SURVEY_ID}")
    print(f"Data Center: {DATA_CENTER}")
    print(f"Railway URL: {RAILWAY_URL}")
    
    # Get current survey
    print("\n📋 Fetching current survey...")
    survey = get_survey()
    if not survey:
        return
    
    print(f"✅ Survey found: {survey['result'].get('SurveyName', 'Unnamed')}")
    
    # Create question
    print("\n🤖 Creating chatbot question...")
    question_data = create_chatbot_question()
    
    # Add to survey
    print("\n📤 Adding to survey...")
    result = add_question_to_survey(question_data)
    
    if result:
        print("\n" + "=" * 60)
        print("🎉 Done! Your chatbot is now in the survey!")
        print("=" * 60)
        print("\nNext steps:")
        print("1. Preview your survey to test the chatbot")
        print("2. Make sure your Railway backend is running")
        print("3. Publish and share your survey!")

if __name__ == '__main__':
    main()
