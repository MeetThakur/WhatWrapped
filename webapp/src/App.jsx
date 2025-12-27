import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import StoryView from './components/StoryView';
import { parseChat } from './utils/parser';
import { generateStats } from './utils/analytics';
import './styles/global.css';
import './styles/Theme.css';

function App() {
    const [stats, setStats] = useState(null);

    const handleFileUpload = (text) => {
        try {
            const messages = parseChat(text);

            // Filter for 2025
            const filteredMessages = messages.filter(msg => msg.timestamp.getFullYear() === 2025);

            if (filteredMessages.length === 0) {
                alert("No messages found for 2025. Please check your file.");
                return;
            }
            const calculatedStats = generateStats(filteredMessages);
            setStats(calculatedStats);
        } catch (e) {
            console.error(e);
            alert("Error parsing file.");
        }
    };

    const handleReset = () => {
        setStats(null);
    };

    if (stats) {
        return <StoryView stats={stats} onReset={handleReset} />;
    }

    return (
        <div className="app-container">
            <div className="background-animate"></div>
            <div className="noise-overlay"></div>
            <FileUpload onFileUpload={handleFileUpload} />
        </div>
    );
}

export default App;
