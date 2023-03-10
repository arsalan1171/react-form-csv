function generateRandomName(numRows) {
  const surnames = ["Smith", "Johnson", "Brown", "Garcia", "Miller", "Davis", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Jackson", "White", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall"].slice(0, 20);
  const firstNames = ["Yamira", "Tegan", "Rosalba", "Niko", "Ishaan", "Ulyana", "Lorcan", "Oscar", "Nehemiah", "Quincy", "Evelin", "Wesley", "Aurora", "Mackenzie", "Kash", "Xavion", "Yadiel", "Kamila", "Serenity", "Daxton"].slice(0,20);
  const currentYear = new Date().getFullYear();

  const names = [];
  const usedNames = new Set();

  for (let i = 0; i < numRows; i++) {
    const id = `${i+1}`; // Adding a field id for each person
    let name,surname, initial, birthDateStr, age, birthYear, birthMonth, birthDay, birthDate, fullName;
    let duplicate = true;
    while (duplicate) {
      name = firstNames[Math.floor(Math.random() * firstNames.length)];
      surname = surnames[Math.floor(Math.random() * surnames.length)];
      initial = name[0];
      age = Math.floor(Math.random() * 60) + 18;
      birthYear = currentYear - age;
      birthMonth = Math.floor(Math.random() * 12) + 1;
      birthDay = Math.floor(Math.random() * 28) + 1;
      birthDate = new Date(birthYear, birthMonth - 1, birthDay); // Using Date constructor with parameters
      fullName = `${name} ${surname} ${initial}`;
      birthDateStr = birthDate.toISOString().split('T')[0];

      if (!usedNames.has(fullName) && !usedNames.has(birthDateStr)) {
        usedNames.add(fullName);
        usedNames.add(birthDateStr);
        duplicate = false;
      }
    }

    names.push({
      id,
      name, 
      surname,
      initial,
      age,
      birthDate
    });
  }

  return names;
}


function convertToCSV(names) {
  const rows = [];

  // Adding header row
  rows.push(['Id','Name', 'Surname', 'Initial', 'Age', 'Birth Date']);

  // Adding data rows
  for (let name of names) {
    const birthDateString = name.birthDate.toISOString().split('T')[0]; 
    const parts = birthDateString.split('-');
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

    rows.push([
      name.id,
      name.name,
      name.surname,
      name.initial,
      name.age,
      formattedDate
    ]);
  }

  // Joining the rows with commas and newlines
  const csvString = rows.map(row => row.join(',')).join('\n');

  return csvString;
}

export function downloadCSV(numRows) {
  const randomNames = generateRandomName(numRows);
  const csvString = convertToCSV(randomNames);

  // Creating a blob object from the CSV string and downloading it as a file
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) { // Checking if the "download" attribute is supported by the browser
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "output.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
