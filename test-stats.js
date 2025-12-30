
import fs from 'fs';
import { parseWhatsAppChat } from './src/utils/parser.js';
import { calculateStats } from './src/utils/stats.js';

try {
  const data = fs.readFileSync('./data.txt', 'utf-8');
  console.log('Reading data...');
  const messages = parseWhatsAppChat(data);
  console.log(`Parsed ${messages.length} messages.`);
  
  console.log('Calculating stats...');
  const stats = calculateStats(messages);
  
  console.log('--- Stats Report ---');
  console.log(JSON.stringify(stats, null, 2));

} catch (err) {
  console.error(err);
}
