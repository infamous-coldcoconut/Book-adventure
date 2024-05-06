// const fs = require("fs");
// const path = require("path");

// const journeyRecordFolderPath = path.join(__dirname, "storage", "journeyRecordList");

// function update(journeyRecord) {
//   try {
//     const filePath = path.join(journeyRecordFolderPath, `${journeyRecord.id}.json`);
//     const fileData = JSON.stringify(journeyRecord);
//     fs.writeFileSync(filePath, fileData, "utf8");
//     return journeyRecord;
//   } catch (error) {
//     throw { code: "failedToUpdateJourneyRecord", message: error.message };
//   }
// }

// module.exports = {
//   update,
// };

const fs = require("fs");
const path = require("path");

const journeyRecordFolderPath = path.join(__dirname, "storage", "journeyRecordList");

// Method to read an journeyRecord from a file
function get(userId, readingPlanId) {
  try {
    const jouneyRecordList = list();
    const journeyRecord = jouneyRecordList.find(
      (a) => a.userId === userId && a.readingPlanId === readingPlanId
    );
    return journeyRecord;
  } catch (error) {
    throw { code: "failedToReadAttendance", message: error.message };
  }
}

// Method to update journeyRecord in a file
function update(journeyRecord) {
  try {
    const currentJourneyRecord = get(journeyRecord.userId, journeyRecord.readingPlanId) || {};
    if (currentJourneyRecord.file) {
      const filePath = path.join(journeyRecordFolderPath, currentJourneyRecord.file);
      fs.unlinkSync(filePath);
    }
    const newJourneyRecord = { ...currentJourneyRecord, ...journeyRecord };

    const filePath = path.join(
      journeyRecordFolderPath,
      `${newJourneyRecord.userId}_${newJourneyRecord.readingPlanId}_${newJourneyRecord.journeyRecord}_${newJourneyRecord.guests}.txt`
    );
    fs.writeFileSync(filePath, "", "utf8");
    return newJourneyRecord;
  } catch (error) {
    throw { code: "failedToUpdateAttendance", message: error.message };
  }
}

// Method to remove an journeyRecord from a file
function remove(userId, readingPlanId) {
  try {
    const journeyRecord = get(userId, readingPlanId);
    if (journeyRecord) {
      const filePath = path.join(journeyRecordFolderPath, journeyRecord.file);
      fs.unlinkSync(filePath);
    }
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveAttendance", message: error.message };
  }
}

// Method to list attendances in a folder
function list() {
  try {
    const files = fs.readdirSync(journeyRecordFolderPath);
    const jouneyRecordList = files.map((file) => {
      const journeyRecordData = file.replace(".txt", "").split("_");
      return {
        userId: journeyRecordData[0],
        readingPlanId: journeyRecordData[1],
        journeyRecord: journeyRecordData[2],
        guests: Number(journeyRecordData[3]),
        file,
      };
    });
    return jouneyRecordList;
  } catch (error) {
    throw { code: "failedToListAttendances", message: error.message };
  }
}

function readingPlanMap() {
  const jouneyRecordList = list();
  const journeyRecordMap = {};
  jouneyRecordList.forEach((journeyRecord) => {
    if (!journeyRecordMap[journeyRecord.readingPlanId])
      journeyRecordMap[journeyRecord.readingPlanId] = {};
    if (!journeyRecordMap[journeyRecord.readingPlanId][journeyRecord.userId])
      journeyRecordMap[journeyRecord.readingPlanId][journeyRecord.userId] = {};
    journeyRecordMap[journeyRecord.readingPlanId][journeyRecord.userId] = {
      journeyRecord: journeyRecord.journeyRecord,
      guests: journeyRecord.guests,
    };
  });
  return journeyRecordMap;
}

function userMap() {
  const jouneyRecordList = list();
  const journeyRecordMap = {};
  jouneyRecordList.forEach((journeyRecord) => {
    if (!journeyRecordMap[journeyRecord.userId])
      journeyRecordMap[journeyRecord.userId] = {};
    if (!journeyRecordMap[journeyRecord.userId][journeyRecord.readingPlanId])
      journeyRecordMap[journeyRecord.userId][journeyRecord.readingPlanId] = {};
    journeyRecordMap[journeyRecord.userId][journeyRecord.readingPlanId] = {
      journeyRecord: journeyRecord.journeyRecord,
      guests: journeyRecord.guests,
    };
  });
  return journeyRecordMap;
}

module.exports = {
  get,
  update,
  remove,
  list,
  readingPlanMap,
  userMap,
};