const fs = require("fs");
const path = require("path");

const readingPlanFolderPath = path.join(__dirname, "storage", "readingPlanList");
const journeyRecordFolderPath = path.join(__dirname, "storage", "journeyRecordList");

function getByDateRange(startDate, endDate, folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    const filteredData = [];

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const item = JSON.parse(fileData);

      const itemDate = new Date(item.date);
      const startDate = new Date(startDate);
      const endDate = new Date(endDate);
      if (itemDate >= startDate && itemDate <= endDate) {
        filteredData.push(item);
      }
    });

    return filteredData;
  } catch (error) {
    throw { code: "failedToGetData", message: error.message };
  }
}

module.exports = {
  getReadingPlanByDateRange: (startDate, endDate) => getByDateRange(startDate, endDate, readingPlanFolderPath),
  getJourneyRecordByDateRange: (startDate, endDate) => getByDateRange(startDate, endDate, journeyRecordFolderPath),
};
