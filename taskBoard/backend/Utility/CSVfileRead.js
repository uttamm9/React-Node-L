const fs = require('fs');
const csv = require('csv-parser');

exports.readCSVFile = (filePath) => {
  const results = [];

  // Create a readable stream from the CSV file
  fs.createReadStream(filePath)
    // Pipe the stream through the csv-parser
    .pipe(csv())
    // On each row of data, push the data into the results array
    .on('data', (data) => results.push(data))
    // When the stream ends, log the results to the console
    .on('end', () => {
      console.log(results);
    });

  return results;
}

