# WhatsApp Wrapped

A web application that analyzes your WhatsApp chat exports to generate a comprehensive "Wrapped" style summary of your chat history. discover your most active days, top words, emoji usage, and more!

## Features

- **Activity Overview**: Total messages, words, emojis, and active days.
- **Participant Stats**: Who talks the most? Who sends the longest messages?
- **Time & Rhythm**: Hourly and weekly activity distribution.
- **Conversation Starters**: Who breaks the silence?
- **Word & Emoji Analysis**: Top used words and signature phrases.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## How to Use

1.  **Export Chat**: Open a chat in WhatsApp -> More -> Export Chat -> Without Media.
2.  **Upload**: Open the app and upload the exported `.txt` file.
3.  **Explore**: Scroll through the generated slides to see your chat analysis.

## Local Development

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

## Privacy

All analysis is done locally in your browser. Your chat data is never uploaded to any server.
