import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read cleaned food data
const foodData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'cleaned-food-data.json'), 'utf8')
);

// Convert to JavaScript array format
const jsArray = foodData.map(item => {
  return `    {
      id: ${item.id},
      name: ${JSON.stringify(item.name)},
      category: ${JSON.stringify(item.category)},
      description: ${JSON.stringify(item.description)},
      price: ${JSON.stringify(item.price)},
      location: ${JSON.stringify(item.location)},
      mapLink: ${JSON.stringify(item.mapLink)},
      rating: ${item.rating},
      tags: ${JSON.stringify(item.tags)}
    }`;
}).join(',\n');

const fullArray = `  // Food stops data - from Excel (all sheets)
  const foodStops = [
${jsArray}
  ];`;

// Read InsiderTipsThankYou.jsx
const filePath = path.join(__dirname, 'src', 'pages', 'InsiderTipsThankYou.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find and replace foodStops array
const startMarker = '  // Food stops data';
const endMarker = '  ];';

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Could not find foodStops array start marker');
  process.exit(1);
}

// Find the end of the array (next ]; after startMarker)
let endIndex = content.indexOf('  ];', startIndex);
if (endIndex === -1) {
  console.error('Could not find foodStops array end marker');
  process.exit(1);
}

// Replace the array
const before = content.substring(0, startIndex);
const after = content.substring(endIndex + 4); // +4 to skip '  ];'

content = before + fullArray + '\n' + after;

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log(`✅ Updated InsiderTipsThankYou.jsx with ${foodData.length} food items from all sheets`);

