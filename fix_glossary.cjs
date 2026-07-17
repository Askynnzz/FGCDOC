const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'glossary.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.categories = [
  { id: 'all', label: 'Tous les termes' },
  { id: 'fondamentaux', label: 'Fondamentaux' },
  { id: 'technique', label: 'Technique' },
  { id: 'defense', label: 'Défense' },
  { id: 'okizeme', label: 'Okizeme' },
  { id: 'mental', label: 'Mental' },
  { id: 'sf6', label: 'Mécanique SF6' }
];

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('Categories added back to glossary.json');
