
import fs from 'fs';
import { parseWhatsAppChat } from './src/utils/parser.js';

try {
  const data = fs.readFileSync('./data.txt', 'utf-8');
  console.log('Read data.txt, size:', data.length);
  
  const messages = parseWhatsAppChat(data);
  console.log('Total messages parsed:', messages.length);
  
  if (messages.length > 0) {
    console.log('First 5 messages:');
    console.log(JSON.stringify(messages.slice(0, 5), null, 2));
    
    console.log('Last message:');
    console.log(JSON.stringify(messages[messages.length - 1], null, 2));
  } else {
    console.warn('No messages parsed!');
  }

} catch (err) {
  console.error('Error reading/parsing file:', err);
}
