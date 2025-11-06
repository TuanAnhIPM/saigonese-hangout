import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read Excel files
const foodFile = path.join(__dirname, 'data', 'Food.xlsx');
const historicalFile = path.join(__dirname, 'data', 'Historical Places.xlsx');
const barClubFile = path.join(__dirname, 'data', 'Bar, Club.xlsx');

function readExcel(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return data;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

function readExcelAllSheets(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const allData = [];
    
    console.log(`\n📋 Found ${workbook.SheetNames.length} sheets: ${workbook.SheetNames.join(', ')}`);
    
    workbook.SheetNames.forEach((sheetName, index) => {
      const worksheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      
      // Add district info to each item
      const dataWithDistrict = sheetData.map(item => ({
        ...item,
        district: sheetName, // Add district name from sheet name
        sheetIndex: index
      }));
      
      console.log(`  Sheet "${sheetName}": ${dataWithDistrict.length} items`);
      allData.push(...dataWithDistrict);
    });
    
    return allData;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

// Parse Food data - read all sheets
const foodData = readExcelAllSheets(foodFile);
console.log('\n=== FOOD DATA ===');
console.log(`Total found ${foodData.length} food items across all districts`);
if (foodData.length > 0) {
  console.log('Sample:', JSON.stringify(foodData[0], null, 2));
  
  // Group by district
  const byDistrict = {};
  foodData.forEach(item => {
    const district = item.district || 'Unknown';
    if (!byDistrict[district]) {
      byDistrict[district] = [];
    }
    byDistrict[district].push(item);
  });
  
  console.log('\n📊 Food items by district:');
  Object.keys(byDistrict).forEach(district => {
    console.log(`  ${district}: ${byDistrict[district].length} items`);
  });
}

// Parse Historical Places data
const historicalData = readExcel(historicalFile);
console.log('\n=== HISTORICAL PLACES DATA ===');
console.log(`Found ${historicalData.length} historical places`);
if (historicalData.length > 0) {
  console.log('Sample:', JSON.stringify(historicalData[0], null, 2));
}

// Parse Bar, Club data
const barClubData = readExcel(barClubFile);
console.log('\n=== BAR, CLUB DATA ===');
console.log(`Found ${barClubData.length} bars/clubs`);
if (barClubData.length > 0) {
  console.log('Sample:', JSON.stringify(barClubData[0], null, 2));
}

// Export parsed data
const parsedData = {
  food: foodData,
  historicalPlaces: historicalData,
  barClub: barClubData
};

fs.writeFileSync(
  path.join(__dirname, 'parsed-data.json'),
  JSON.stringify(parsedData, null, 2),
  'utf8'
);

console.log('\n✅ Parsed data saved to parsed-data.json');

