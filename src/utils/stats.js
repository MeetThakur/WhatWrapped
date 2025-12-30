
/**
 * Calculates all statistics for the WhatsApp Wrapped experience.
 * @param {Array} messages - List of parsed message objects
 * @param {string} currentUser - Name of the user viewing (optional, for "You" context)
 * @returns {Object} Comprehensive stats object
 */
export const calculateStats = (messages, currentUser) => {
  if (!messages || messages.length === 0) return null;

  const stats = {
    overview: {},
    participants: {},
    time: {},
    conversations: {},
    responsiveness: {},
    media: {},
    fun: {}
  };

  // --- Helper Sets & Maps ---
  const targetYear = 2025;
  const filteredMessages = messages.filter(msg => msg.timestamp && msg.timestamp.getFullYear() === targetYear);
  
  if (filteredMessages.length === 0) {
      // Fallback or empty return if no 2025 data
      // For now, let's return a stats object with zeros to prevent crashes, 
      // or we can fallback to *all* data if strictly needed, but user asked for "just 2025".
      // Let's stick to returning "empty" stats or null to trigger a "No Data for 2025" UI if we had one.
      // But preserving structure is safer for current UI.
      return {
          overview: { totalMessages: 0, activeDays: 0, activePercentage: 0, messagesPerActiveDay: 0, longestStreak: 0, dateRange: null },
          participants: { total: 0, list: [], mostActive: 'N/A' },
          time: { mostActiveHour: 0, hourlyDistribution: new Array(24).fill(0), weeklyDistribution: new Array(7).fill(0), busiestDay: { date: 'N/A', count: 0 } },
          conversations: { totalSessions: 0, avgLengthMinutes: 0, longestSessionMinutes: 0 },
          responsiveness: { avgReplyTimeMinutes: 0, medianReplyTimeMinutes: 0 },
          media: { total: 0, ratio: 0 },
          fun: {}
      };
  }

  const senders = new Set();
  const dateSet = new Set();
  
  // Maps for aggregation
  const messagesPerSender = {};
  const messagesPerHour = new Array(24).fill(0);
  const messagesPerWeekDay = new Array(7).fill(0); // 0 = Sunday
  const messagesPerMonth = new Array(12).fill(0); // 0 = Jan
  const messagesPerDate = {}; // date string -> count
  const mediaCount = { total: 0, perSender: {} };
  const wordsPerSender = {}; 
  const emojisPerSender = {};
  const conversationStarters = {}; // sender -> count
  const maxReplyTimePerSender = {}; // sender -> minutes

  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu;

  // --- Pass 1: Basic Aggregation ---
  let totalWords = 0;
  let totalEmojis = 0;
  
  filteredMessages.forEach(msg => {
    // Participants
    const sender = msg.sender;
    senders.add(sender);
    messagesPerSender[sender] = (messagesPerSender[sender] || 0) + 1;

    // Date/Time
    const date = msg.timestamp; // Date object
    if (date) {
        messagesPerHour[date.getHours()]++;
        messagesPerWeekDay[date.getDay()]++;
        messagesPerMonth[date.getMonth()]++;
        const dateStr = msg.date;
        dateSet.add(dateStr);
        messagesPerDate[dateStr] = (messagesPerDate[dateStr] || 0) + 1;
    }

    // Media
    if (msg.isMedia) {
        mediaCount.total++;
        mediaCount.perSender[sender] = (mediaCount.perSender[sender] || 0) + 1;
    }

    // Word count (approx)
    if (!msg.isMedia && msg.content) {
        const count = msg.content.split(/\s+/).length;
        totalWords += count;
        wordsPerSender[sender] = (wordsPerSender[sender] || 0) + count;
    }

    // Emoji count
    const emojis = msg.content && msg.content.match(emojiRegex);
    if (emojis) {
        totalEmojis += emojis.length;
        emojisPerSender[sender] = (emojisPerSender[sender] || 0) + emojis.length;
    }
  });

  const totalMessages = filteredMessages.length;
  const activeDays = dateSet.size;
  const firstMessageDate = filteredMessages[0].timestamp;
  const lastMessageDate = filteredMessages[filteredMessages.length - 1].timestamp;
  
  // --- Section 1: Activity Overview ---
  // Percentage of year active (approx 365 days)
  const totalDaysSpan = (lastMessageDate - firstMessageDate) / (1000 * 60 * 60 * 24) || 1;
  const activePercentage = (activeDays / 365) * 100; // Rough calc for "year"

  // Longest active streak
  let currentStreak = 0;
  let maxStreak = 0;
  let prevDate = null;
  // Sort unique dates
  const sortedDates = Array.from(dateSet).sort((a, b) => {
      // Basic DD/MM/YYYY sort
      const [d1, m1, y1] = a.split('/').map(Number);
      const [d2, m2, y2] = b.split('/').map(Number);
      return new Date(y1, m1-1, d1) - new Date(y2, m2-1, d2);
  });
  
  sortedDates.forEach(dateStr => {
      if (!prevDate) {
          currentStreak = 1;
      } else {
          // Check if next day
           const [d1, m1, y1] = prevDate.split('/').map(Number);
           const [d2, m2, y2] = dateStr.split('/').map(Number);
           const diffTime = Math.abs(new Date(y2, m2-1, d2) - new Date(y1, m1-1, d1));
           const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
           
           if (diffDays === 1) {
               currentStreak++;
           } else {
               currentStreak = 1;
           }
      }
      if (currentStreak > maxStreak) maxStreak = currentStreak;
      prevDate = dateStr;
  });

  stats.overview = {
    totalMessages,
    totalWords,
    totalEmojis,
    activeDays,
    activePercentage: activePercentage.toFixed(1),
    messagesPerActiveDay: (totalMessages / activeDays).toFixed(0),
    longestStreak: maxStreak,
    dateRange: { start: firstMessageDate, end: lastMessageDate }
  };

  // --- Section 2: Participants ---
  const participantList = Array.from(senders).map(name => ({
      name,
      count: messagesPerSender[name],
      wordCount: wordsPerSender[name] || 0,
      emojiCount: emojisPerSender[name] || 0,
      longestWait: maxReplyTimePerSender[name] || 0,
      percentage: ((messagesPerSender[name] / totalMessages) * 100).toFixed(1)
  })).sort((a, b) => b.count - a.count);

  stats.participants = {
    total: senders.size,
    list: participantList,
    mostActive: participantList[0]?.name
  };

  // --- Section 3: Time & Rhythm ---
  // Most active hour
  const mostActiveHour = messagesPerHour.indexOf(Math.max(...messagesPerHour));
  
  // Most active active day date
  const busyDate = Object.entries(messagesPerDate).reduce((a, b) => a[1] > b[1] ? a : b);
  
  stats.time = {
      mostActiveHour,
      hourlyDistribution: messagesPerHour,
      weeklyDistribution: messagesPerWeekDay, // 0=Sun
      monthlyDistribution: messagesPerMonth,
      busiestDay: { date: busyDate[0], count: busyDate[1] },
      topBusiestDays: Object.entries(messagesPerDate)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([date, count]) => ({ date, count }))
  };

  // --- Section 4: Conversation Structure ---
  // Session: Gaps <= 30 mins
  let sessions = 0;
  let totalSessionDuration = 0; // ms
  let currentSessionDuration = 0;

  let maxSessionDuration = 0;
  let maxSessionDate = null;
  let sessionStart = null;
  let lastMsgTime = null;
  const sessionsList = []; // { duration, date }

  // Conversations per day
  // Average repy time
  
  // We need to iterate sorted messages by time
  // The parser usually returns them in order, but let's trust it for now.
  
  const replyTimes = []; // All reply times in Minutes
  let repliesCount = 0;
  let totalReplyTime = 0;
  
  let maxSilenceDuration = 0; // ms
  let longestSilenceEnd = null;

  for (let i = 0; i < filteredMessages.length; i++) {
      const msg = filteredMessages[i];
      const time = msg.timestamp;
      
      if (!lastMsgTime) {
          sessionStart = time;
          lastMsgTime = time;
          sessions++;
          continue;
      }

      const diffMs = time - lastMsgTime;
      const diffMins = diffMs / (1000 * 60);

      // Longest Silence Check
      if (diffMs > maxSilenceDuration) {
          maxSilenceDuration = diffMs;
          longestSilenceEnd = time;
      }

      // Session logic
      if (diffMins > 30) {
          // New session
          totalSessionDuration += (lastMsgTime - sessionStart);
          const dur = lastMsgTime - sessionStart;
          if (dur > maxSessionDuration) {
              maxSessionDuration = dur;
              maxSessionDate = sessionStart;
          }
          sessionsList.push({ duration: dur, date: sessionStart });
          
          sessions++;
          sessionStart = time;
      }
      
      // Reply time logic
      // Only if different sender
      if (i > 0) {
           // Conversation Starter logic (> 12 hours silence)
           // 12 hours = 12 * 60 mins
           if (diffMins > 12 * 60) {
               conversationStarters[msg.sender] = (conversationStarters[msg.sender] || 0) + 1;
           }

          if (filteredMessages[i-1].sender !== msg.sender) {
                  // Track max reply time (without thresholding for now, or maybe only if < 1 month?)
                  // Let's take specific "longest wait" as raw diff
                  const sender = msg.sender;
                  const currentMax = maxReplyTimePerSender[sender] || 0;
                  if (diffMins > currentMax) {
                      maxReplyTimePerSender[sender] = diffMins;
                  }

              if (diffMins < 6 * 60) { // Ignore > 6 hours (sleep/work) for average calc? 
                 // Specs say "Longest silence gap" separate from reply time. 
                 // "Slowest reply (excluding long silences)" -> implies we threshold
                 replyTimes.push(diffMins);
                 totalReplyTime += diffMins;
                 repliesCount++;
              }
          }
      }
      
      lastMsgTime = time;
  }
  
  // Final session closure
  if (sessionStart && lastMsgTime) {
      totalSessionDuration += (lastMsgTime - sessionStart);
      const dur = lastMsgTime - sessionStart;
      if (dur > maxSessionDuration) {
          maxSessionDuration = dur;
          maxSessionDate = sessionStart;
      }
      sessionsList.push({ duration: dur, date: sessionStart });
  }

  // Median Calc for Reply Time
  replyTimes.sort((a, b) => a - b);
  const medianReply = replyTimes.length ? replyTimes[Math.floor(replyTimes.length / 2)] : 0;
  
  stats.conversations = {
      totalSessions: sessions,
      avgLengthMinutes: (totalSessionDuration / (1000 * 60) / (sessions || 1)).toFixed(0),
      longestSessionMinutes: (maxSessionDuration / (1000 * 60)).toFixed(0),
      longestSessionDate: maxSessionDate,
      topSessions: sessionsList.sort((a, b) => b.duration - a.duration).slice(0, 3).map(s => ({
          durationMinutes: (s.duration / (1000 * 60)).toFixed(0),
          date: s.date
      })),
      starters: conversationStarters,
      longestSilence: {
          days: (maxSilenceDuration / (1000 * 60 * 60 * 24)).toFixed(1),
          date: longestSilenceEnd
      }
  };

  stats.responsiveness = {
      avgReplyTimeMinutes: (totalReplyTime / (repliesCount || 1)).toFixed(1),
      medianReplyTimeMinutes: medianReply.toFixed(1)
  };

  // --- Section 5: Media & Fun ---
  stats.media = {
      total: mediaCount.total,
      ratio: (mediaCount.total / totalMessages).toFixed(3)
  };

  // --- Section 6: Words & Emojis ---
  const stopWords = new Set(['the', 'and', 'to', 'of', 'in', 'is', 'it', 'you', 'that', 'for', 'on', 'my', 'at', 'me', 'be', 'this', 'with', 'so', 'but', 'not', 'have', 'are', 'was', 'if', 'we', 'or', 'he', 'she', 'they', 'media', 'omitted', 'image', 'video', 'audio', 'sticker', 'gif', 'deleted', 'message', 'missed', 'call', 'hai', 'ki', 'ka', 'ke', 'ko', 'se', 'bhi', 'aur', 'toh', 'hi', 'ye', 'wo', 'kya', 'tha', 'thi', 'mai', 'hum', 'ab', 'phir', 'kuch', 'koi', 'karo', 'kar', 'raha', 'rhi', 'hu', 'ha', 'haan', 'na', 'nhi', 'ni', 'ok', 'okay', 'acha', 'bhai', 'yar', 'yaar']);

  const wordCounts = { global: {}, perSender: {} };
  const emojiCounts = { global: {}, perSender: {} };

  // emojiRegex is defined at top

  filteredMessages.forEach(msg => {
      if (!msg.content || msg.isMedia) return;
      const sender = msg.sender;
      const text = msg.content.toLowerCase();

      // Words
      const words = text.split(/[\s.,!?()"\-:;]+/);
      words.forEach(word => {
          if (word.length > 2 && !stopWords.has(word)) {
             wordCounts.global[word] = (wordCounts.global[word] || 0) + 1;
             
             if (!wordCounts.perSender[sender]) wordCounts.perSender[sender] = {};
             wordCounts.perSender[sender][word] = (wordCounts.perSender[sender][word] || 0) + 1;
          }
      });

      // Emojis
      const emojis = msg.content.match(emojiRegex);
      if (emojis) {
          // totalEmojis and emojisPerSender calculated in Pass 1
          
          emojis.forEach(emoji => {
              emojiCounts.global[emoji] = (emojiCounts.global[emoji] || 0) + 1;

              if (!emojiCounts.perSender[sender]) emojiCounts.perSender[sender] = {};
              emojiCounts.perSender[sender][emoji] = (emojiCounts.perSender[sender][emoji] || 0) + 1;
          });
      }
  });

  const getTopN = (map, n = 3) => {
      return Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([key, count]) => ({ item: key, count }));
  };

  const getTopPerSender = (senderMap) => {
      const result = {};
      Object.keys(senderMap).forEach(sender => {
          result[sender] = getTopN(senderMap[sender], 3);
      });
      return result;
  };

  stats.content = {
      topWords: getTopN(wordCounts.global, 5),
      topWordsPerSender: getTopPerSender(wordCounts.perSender),
      topEmojis: getTopN(emojiCounts.global, 5),
      topEmojisPerSender: getTopPerSender(emojiCounts.perSender)
  };

  return stats;
};
