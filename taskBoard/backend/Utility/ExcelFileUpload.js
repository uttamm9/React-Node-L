const xlsx = require('xlsx')

exports.excelFileRead = async(file)=>{

          const workbook = xlsx.read(file.data, { type: 'buffer' });
          // console.log('WORKBOOK >>>>',workbook);
          const sheetName = workbook.SheetNames[0];
          // console.log("sheetname>>>>",sheetName);
          const worksheet = workbook.Sheets[sheetName];
          // console.log("worksheet>>>",worksheet)
          const jsonData = xlsx.utils.sheet_to_json(worksheet);
          console.log('jsonData>>>',jsonData)
          return jsonData;
}