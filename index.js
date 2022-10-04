const fs = require('fs')
const papa = require('papaparse')

try {
  // Read data from file
  const data = fs.readFileSync('./task-data.csv', { encoding: 'utf8', flag: 'r' });
  // Parse raw CSV Data
  const originalCSVData = papa.parse(data, { header: true })
  // Extract the ColIQuestion columns
  const ColInQuestionArr = originalCSVData.data.map(item => item.ColInQuestion)
  // split all ColInQuestion items
  const ColInQuestionIndividualColArr = ColInQuestionArr.join(';').split(';');
  // Remove duplicate ColInQuestion item
  const ColInQuestionUniqueColArr = [...new Set(ColInQuestionIndividualColArr)];
  // Add new columns to csv row using the unique ColInQuestion
  const outputCSVData = originalCSVData.data.map(originalRowData=>{
    const newRowData = {}
    // loop through all unique ColInQuestion
    ColInQuestionUniqueColArr.forEach(newCol => {
      // Add new column by creating a new property to row object
      // Check if new column (added property) exists in the row's ColInQuestion
      newRowData[newCol] = originalRowData.ColInQuestion.includes(newCol) ? 1 : 2;
    })
    // add new row data to original row data
    return { ...originalRowData, ...newRowData }
  })
  // Create new csv raw data
  const outputData = papa.unparse(outputCSVData, { header: true })
  // write new csv to file system
  fs.writeFileSync('./output2.csv', outputData);

} catch (error) {
  console.error('An Error occured: ', object);
}

