export const STOP_WORDS = new Set([
    "the",
    "and",
    "to",
    "of",
    "a",
    "in",
    "is",
    "that",
    "for",
    "it",
    "on",
    "with",
    "me",
    "you",
    "this",
    "but",
    "be",
    "at",
    "my",
    "not",
    "have",
    "he",
    "she",
    "was",
    "as",
    "do",
    "are",
    "we",
    "can",
    "if",
    "so",
    "ok",
    "okay",
    "lol",
    "yeah",
    "yes",
    "no",
    "omg",
    "like",
    "just",
    "what",
    "when",
    "where",
    "why",
    "how",
    "media",
    "omitted",
    "image",
    "video",
    "sticker",
    "gif",
]);

export const generateStats = (messages) => {
    const stats = {
        totalMessages: 0,
        participants: {},
        timeline: {}, // Messages per day
        hourlyActivity: new Array(24).fill(0),
        weeklyActivity: new Array(7).fill(0), // 0 = Sunday
        monthlyActivity: new Array(12).fill(0), // 0 = January
        emojis: {},
        words: {},
        // Advanced Stats
        responseTimes: {}, // array of response times in minutes per participant
        chatStyles: {}, // avgLength, nightOwlCount, etc.
        initiations: {}, // count of initiations

        // New Metric Placeholders
        longestSilence: { duration: 0, from: null, to: null },
        longestSession: { duration: 0, date: null },
        daysActive: 0,
        // Top 3 tracking
        topSilences: [],
        topSessions: [],
    };

    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    let prevMsg = null;

    // Session tracking
    let currentSessionStart = null;
    let currentSessionEnd = null;

    messages.forEach((msg, index) => {
        stats.totalMessages++;

        // Initialize participant stats
        if (!stats.participants[msg.author]) {
            stats.participants[msg.author] = { count: 0, words: 0, emojis: 0 };
        }
        if (!stats.responseTimes[msg.author])
            stats.responseTimes[msg.author] = [];
        if (!stats.chatStyles[msg.author])
            stats.chatStyles[msg.author] = { totalLen: 0, nightMsg: 0 };
        if (!stats.initiations[msg.author]) stats.initiations[msg.author] = 0;

        stats.participants[msg.author].count++;

        // Hourly & Weekly & Monthly Activity
        const hour = msg.timestamp.getHours();
        stats.hourlyActivity[hour]++;
        const day = msg.timestamp.getDay();
        stats.weeklyActivity[day]++;
        const month = msg.timestamp.getMonth();
        stats.monthlyActivity[month]++;

        // Timeline
        const dateKey = msg.date;
        stats.timeline[dateKey] = (stats.timeline[dateKey] || 0) + 1;

        // Content Analysis
        if (msg.content === "<Media omitted>") return;

        // Words
        const words = msg.content
            .toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
            .split(/\s+/);
        stats.participants[msg.author].words += words.length;
        stats.chatStyles[msg.author].totalLen += msg.content.length;

        words.forEach((word) => {
            if (word.length > 2 && !STOP_WORDS.has(word)) {
                stats.words[word] = (stats.words[word] || 0) + 1;
            }
        });

        // Emojis
        const emojis = msg.content.match(emojiRegex);
        if (emojis) {
            stats.participants[msg.author].emojis += emojis.length;
            emojis.forEach((emoji) => {
                stats.emojis[emoji] = (stats.emojis[emoji] || 0) + 1;
            });
        }

        // Advanced Metrics Calculation

        // Night Owl (11 PM - 5 AM)
        if (hour >= 23 || hour < 5) {
            stats.chatStyles[msg.author].nightMsg++;
        }

        if (prevMsg) {
            const timeDiff = (msg.timestamp - prevMsg.timestamp) / (1000 * 60); // minutes

            // Longest Silence (Gap between messages)
            // Convert min to days roughly for check, actual storage in ms or days
            const daysDiff = timeDiff / (60 * 24);
            if (daysDiff > stats.longestSilence.duration) {
                stats.longestSilence = {
                    duration: daysDiff,
                    from: prevMsg.date,
                    to: msg.date,
                };
            }

            // Track top silences (only if > 0.5 day / 12 hours)
            if (daysDiff > 0.5) {
                stats.topSilences.push({
                    duration: daysDiff,
                    from: prevMsg.date,
                    to: msg.date,
                    fromTimestamp: prevMsg.timestamp,
                    toTimestamp: msg.timestamp,
                });
            }

            // Session Logic (Break session if gap > 20 mins)
            if (timeDiff > 20) {
                // End current session
                if (currentSessionStart) {
                    const sessionDuration =
                        (prevMsg.timestamp - currentSessionStart) / (1000 * 60); // mins
                    if (sessionDuration > stats.longestSession.duration) {
                        stats.longestSession = {
                            duration: sessionDuration,
                            date: currentSessionStart.toDateString(), // simple date string
                        };
                    }

                    // Track top sessions (only if > 20 mins)
                    if (sessionDuration > 20) {
                        stats.topSessions.push({
                            duration: sessionDuration,
                            date: currentSessionStart.toDateString(),
                            timestamp: currentSessionStart,
                        });
                    }
                }
                currentSessionStart = msg.timestamp;
            }

            // Response Time: Different author, gap < 12 hours
            if (msg.author !== prevMsg.author && timeDiff <= 720) {
                stats.responseTimes[msg.author].push(timeDiff);
            }

            // Initiation: Gap > 12 hours (720 mins)
            if (timeDiff > 720) {
                stats.initiations[msg.author]++;
            }
        } else {
            currentSessionStart = msg.timestamp;
        }
        prevMsg = msg;
    });

    // Check last session
    if (currentSessionStart && prevMsg) {
        const sessionDuration =
            (prevMsg.timestamp - currentSessionStart) / (1000 * 60);
        if (sessionDuration > stats.longestSession.duration) {
            stats.longestSession = {
                duration: sessionDuration,
                date: currentSessionStart.toDateString(),
            };
        }

        // Track last session if > 20 mins
        if (sessionDuration > 20) {
            stats.topSessions.push({
                duration: sessionDuration,
                date: currentSessionStart.toDateString(),
                timestamp: currentSessionStart,
            });
        }
    }

    stats.daysActive = Object.keys(stats.timeline).length;

    // Sort and keep top 3 silences
    stats.topSilences.sort((a, b) => b.duration - a.duration);
    stats.topSilences = stats.topSilences.slice(0, 3);

    // Sort and keep top 3 sessions
    stats.topSessions.sort((a, b) => b.duration - a.duration);
    stats.topSessions = stats.topSessions.slice(0, 3);

    // Debug logging
    console.log("Total silences tracked:", stats.topSilences.length);
    console.log("Top silences:", stats.topSilences);
    console.log("Total sessions tracked:", stats.topSessions.length);
    console.log("Top sessions:", stats.topSessions);

    return stats;
};

export const getAdvancedStats = (stats) => {
    const participants = Object.keys(stats.participants);
    const result = {};

    participants.forEach((p) => {
        const rTimes = stats.responseTimes[p] || [];
        const avgResponse = rTimes.length
            ? rTimes.reduce((a, b) => a + b, 0) / rTimes.length
            : 0;

        const style = stats.chatStyles[p];
        const count = stats.participants[p].count;
        const words = stats.participants[p].words;
        const emojis = stats.participants[p].emojis;

        const avgLen = count ? style.totalLen / count : 0;
        const avgWords = count ? words / count : 0;
        const avgEmojis = count ? emojis / count : 0;
        const nightPercent = count ? (style.nightMsg / count) * 100 : 0;

        result[p] = {
            avgResponse: Math.round(avgResponse), // minutes
            avgLength: Math.round(avgLen), // chars
            avgWords: parseFloat(avgWords.toFixed(1)),
            avgEmojis: parseFloat(avgEmojis.toFixed(1)),
            nightOwlScore: Math.round(nightPercent),
            initiations: stats.initiations[p] || 0,
        };
    });
    return result;
};

export const getTopParticipants = (stats) => {
    return Object.entries(stats.participants)
        .sort(([, a], [, b]) => b.count - a.count)
        .map(([name, data]) => ({ name, ...data }));
};

export const getTopEmojis = (stats) => {
    return Object.entries(stats.emojis)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([emoji, count]) => ({ emoji, count }));
};

export const getTopWords = (stats) => {
    return Object.entries(stats.words)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 50) // Top 50 words
        .map(([word, count]) => ({ text: word, value: count }));
};
