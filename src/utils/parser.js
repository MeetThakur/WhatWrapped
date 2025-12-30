/**
 * Parses a standard WhatsApp Text export file.
 * Format expected: DD/MM/YYYY, HH:MM am/pm - Sender: Message
 *
 * @param {string} textContent - Raw text content of the file
 * @returns {Array} List of parsed message objects
 */
export const parseWhatsAppChat = (textContent) => {
  const lines = textContent.split("\n");
  const messages = [];

  // Regex to identify the start of a message
  // Supports formats like:
  // 14/03/2023, 10:16 pm - Sender: Message
  // Matches date, time (with varied spaces), spacer, sender, message
  const messageRegex =
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}\s*[\u202f\u0020]?[ap]m)\s*-\s*([^:]+):\s*(.*)/i;

  // Regex for system messages (e.g., "Messages to this group are now secured with end-to-end encryption.")
  // Format: Date, Time - Message (no sender)
  const systemMessageRegex =
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}\s*[\u202f\u0020]?[ap]m)\s*-\s*(.*)/i;

  let currentMessage = null;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    const match = line.match(messageRegex);

    if (match) {
      // New message found
      if (currentMessage) {
        messages.push(currentMessage);
      }

      const [_, dateStr, timeStr, sender, content] = match;

      // Parse timestamp
      // Combine date and time to parse it deterministically if needed,
      // but for now we store raw parts and a normalized Date object
      const timestamp = parseDateTime(dateStr, timeStr);

      currentMessage = {
        date: dateStr,
        time: timeStr,
        timestamp: timestamp,
        sender: sender.trim(),
        content: content,
        isMedia: content.includes("<Media omitted>"), // WhatsApp specific
        type: "message",
      };
    } else {
      // Check if it's a system message (ignorable for stats usually, but good to know)
      const sysMatch = line.match(systemMessageRegex);
      if (sysMatch && !line.includes(":")) {
        // It's a system message like "You were added", ignore or handle separately
        // For this app, we ignore system messages as per specs
        continue;
      }

      // Handle multi-line messages
      // If no new timestamp is found, it's part of the previous message
      if (currentMessage) {
        currentMessage.content += "\n" + line;
      }
    }
  }

  // Push the last message
  if (currentMessage) {
    messages.push(currentMessage);
  }

  return messages;
};

/**
 * Helper to parse date/time strings into JS Date object.
 * Adjust logic based on locale if needed.
 * Assumes DD/MM/YYYY format based on sample.
 */
const parseDateTime = (dateStr, timeStr) => {
  try {
    const [day, month, year] = dateStr.split("/").map(Number);

    // Normalize time
    // timeStr might be "10:16 pm" or "10:16\u202fpm"
    let [time, modifier] = timeStr.split(/[\s\u202f]+/);
    // If no modifier (24h format), modifier is undefined
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier) {
      modifier = modifier.toLowerCase();
      if (modifier === "pm" && hours < 12) hours += 12;
      if (modifier === "am" && hours === 12) hours = 0;
    }

    return new Date(year, month - 1, day, hours, minutes);
  } catch (e) {
    console.error("Error parsing date:", dateStr, timeStr, e);
    return null; // Invalid date
  }
};
