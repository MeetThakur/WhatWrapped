
export const parseChat = (text) => {
    const lines = text.split('\n');
    const messages = [];

    // Regex to match the date and time pattern at the start of a line
    // Matches: 14/03/2023, 10:16 pm - Author: Message
    // Handling the narrow no-break space (U+202F) often found in these exports before pm/am
    const lineRegex = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{2})\s?([apAP]\.?[mM]\.?)\s-\s(.*?): (.*)/;
    const systemRegex = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{2})\s?([apAP]\.?[mM]\.?)\s-\s(.*)/;

    let currentMessage = null;

    lines.forEach((line) => {
        // Clean invisible characters if any (like LTR marks)
        const cleanLine = line.trim();
        if (!cleanLine) return;

        const match = cleanLine.match(lineRegex);

        if (match) {
            if (currentMessage) {
                messages.push(currentMessage);
            }

            const [_, date, time, ampm, author, content] = match;

            currentMessage = {
                date,
                time: `${time} ${ampm}`,
                author: author.trim(),
                content: content.trim(),
                timestamp: parseDate(date, time, ampm)
            };
        } else {
            // Check for system messages (like "You deleted this message" or security codes)
            // Usually format: Date, Time - Message
            const sysMatch = cleanLine.match(systemRegex);
            if (sysMatch && !currentMessage) {
                // It's a system message at the start or standalone, we might want to skip or include as 'System'
                // For now, let's ignore or treat as no-author if strictly following "Author: Message"
                // Actually, the regex above expects "Author: ", so sys messages like "Meet matched" might fall here if no colon.
                // However, let's handle multi-line messages first.
            }

            if (currentMessage) {
                // Append to previous message (multi-line)
                currentMessage.content += `\n${cleanLine}`;
            }
        }
    });

    if (currentMessage) {
        messages.push(currentMessage);
    }

    return messages;
};

const parseDate = (dateStr, timeStr, ampm) => {
    // dd/mm/yyyy
    const [day, month, year] = dateStr.split('/').map(Number);
    let [hours, minutes] = timeStr.split(':').map(Number);

    const isPM = ampm.toLowerCase().includes('pm');
    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    // Assume 20xx if year is 2 digits
    const fullYear = year < 100 ? 2000 + year : year;

    return new Date(fullYear, month - 1, day, hours, minutes);
};
