const fs = require("fs");
const path = require("path");

const readingPlanFolderPath = path.join(__dirname, "storage", "readingPlanList");
const journeyRecordFolderPath = path.join(__dirname, "storage", "journeyRecordList");

function getAllData(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    const allData = [];

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const item = JSON.parse(fileData);
      allData.push(item);
    });

    return allData;
  } catch (error) {
    throw { code: "failedToGetData", message: error.message };
  }
}

function get(userId, readingPlanId) {
  try {
    const viewProgressList = list();
    const viewProgress = viewProgressList.find(
      (a) => a.userId === userId && a.readingPlanId === readingPlanId
    );
    return viewProgress;
  } catch (error) {
    throw { code: "failedToReadJourneyRecord", message: error.message };
  }
}

module.exports = {
  getAllReadingPlans: () => getAllData(readingPlanFolderPath),
  getAllJourneyRecords: () => getAllData(journeyRecordFolderPath),
  get
};
