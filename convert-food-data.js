import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodFile = path.join(__dirname, 'data', 'Food.xlsx');

function readExcelAllSheets(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const allData = [];
    
    workbook.SheetNames.forEach((sheetName, index) => {
      const worksheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      
      const dataWithDistrict = sheetData.map(item => ({
        ...item,
        district: sheetName,
        sheetIndex: index
      }));
      
      allData.push(...dataWithDistrict);
    });
    
    return allData;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

// Helper function to generate Google Maps link
function generateMapLink(name, district) {
  const encodedName = encodeURIComponent(name);
  const encodedDistrict = encodeURIComponent(district);
  return `https://maps.google.com/?q=${encodedName}+${encodedDistrict}+Saigon`;
}

// Convert district name to location format
function formatLocation(district) {
  // Convert "Quận 1" to "District 1, Saigon"
  const match = district.match(/Quận\s*(\d+)/i);
  if (match) {
    return `District ${match[1]}, Saigon`;
  }
  // Keep other names as is but add Saigon
  return `${district}, Saigon`;
}

// Determine category based on specialty
function determineCategory(specialty, district) {
  const specialtyLower = (specialty || '').toLowerCase();
  const districtLower = (district || '').toLowerCase();
  
  if (districtLower.includes('vegetarian')) {
    return 'vegetarian';
  }
  if (specialtyLower.includes('banh mi') || specialtyLower.includes('street')) {
    return 'street-food';
  }
  if (specialtyLower.includes('cafe') || specialtyLower.includes('coffee')) {
    return 'cafe';
  }
  if (specialtyLower.includes('rooftop') || specialtyLower.includes('bar')) {
    return 'rooftop';
  }
  return 'restaurant';
}

// Parse price
function parsePrice(priceStr) {
  if (!priceStr) return "Varies";
  // Convert "120k/dish" to "120,000 VND"
  const price = priceStr.toString().trim();
  if (price.includes('-')) {
    // Range like "70-90k"
    return price.replace(/k/g, ',000 VND').replace(/-/g, ' - ');
  }
  if (price.includes('k')) {
    return price.replace(/k/g, ',000 VND');
  }
  return price;
}

// Convert food data to format
const foodData = readExcelAllSheets(foodFile);
const convertedFood = foodData.map((item, index) => {
  const name = item.__EMPTY || item.Name || item.name || `Food Item ${index + 1}`;
  const district = item.district || 'Unknown';
  
  return {
    id: index + 1,
    name: name.trim(),
    category: determineCategory(item.Specialty, district),
    description: `${item.Specialty || 'Vietnamese food'} - ${item['Opening Hour'] ? `Open: ${item['Opening Hour']}` : 'Check hours'}`,
    price: parsePrice(item.Price),
    location: formatLocation(district),
    mapLink: generateMapLink(name, district),
    rating: 4.5 + Math.random() * 0.4, // Random rating between 4.5-4.9
    tags: [
      ...(item.Specialty ? [item.Specialty.toLowerCase().split(' ')[0]] : []),
      ...(district.toLowerCase().includes('vegetarian') ? ['vegetarian'] : []),
      ...(district.toLowerCase().includes('michelin') ? ['michelin'] : []),
      'budget'
    ].slice(0, 3)
  };
});

console.log(`\n✅ Converted ${convertedFood.length} food items`);
console.log('\nSample converted item:');
console.log(JSON.stringify(convertedFood[0], null, 2));

// Save converted data
fs.writeFileSync(
  path.join(__dirname, 'converted-food-data.json'),
  JSON.stringify(convertedFood, null, 2),
  'utf8'
);

console.log('\n✅ Converted data saved to converted-food-data.json');

// Generate JavaScript array format
const jsArrayFormat = `const foodStops = ${JSON.stringify(convertedFood, null, 2)};`;
fs.writeFileSync(
  path.join(__dirname, 'food-stops-array.js'),
  jsArrayFormat,
  'utf8'
);

console.log('✅ JavaScript array format saved to food-stops-array.js');

