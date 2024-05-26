const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const journeyRecordFolderPath = path.join(__dirname, "storage", "journeyRecordList");

// Method to read an journeyRecord from a file
function get(userId, readingPlanId) {
  try {
    const journeyRecordList = list();
    const journeyRecord = journeyRecordList.find(
      (a) => a.userId === userId && a.readingPlanId === readingPlanId
    );
    return journeyRecord;
  } catch (error) {
    throw { code: "failedToReadJourneyRecord", message: error.message };
  }
}

function create(journeyRecord) {
  try {
    journeyRecord.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(journeyRecordFolderPath, `${journeyRecord.id}.json`);
    const fileData = JSON.stringify(journeyRecord);
    fs.writeFileSync(filePath, fileData, "utf8");
    return journeyRecord;
  } catch (error) {
    throw { code: "failedToCreateJourneyRecord", message: error.message };
  }
}

// // Method to update journeyRecord in a file
function update(journeyRecord) {
  try {
    const currentJourneyRecord = get(journeyRecord.userId, journeyRecord.readingPlanId);
    if (currentJourneyRecord.file) {
      const filePath = path.join(journeyRecordFolderPath, currentJourneyRecord.file);
      fs.unlinkSync(filePath);
    }
    const newJourneyRecord = { ...currentJourneyRecord, ...journeyRecord };

    const filePath = path.join(
      journeyRecordFolderPath,
      `${newJourneyRecord.userId}_${newJourneyRecord.readingPlanId}_${newJourneyRecord.journeyRecord}_${newJourneyRecord.guests}.json`
    );
    fs.writeFileSync(filePath, JSON.stringify(newJourneyRecord), "utf8");
    return newJourneyRecord;
  } catch (error) {
    throw { code: "failedToUpdateJourneyRecord", message: error.message };
  }
}

// function update(journeyRecord) {
//   try {
//     const currentJourneyRecord = get(journeyRecord.userId, journeyRecord.readingPlanId);
//     if (!currentJourneyRecord) {
//       throw new Error("Journey record not found");
//     }

//     const newJourneyRecord = { ...currentJourneyRecord, ...journeyRecord };
//     const filePath = path.join(journeyRecordFolderPath, `${currentJourneyRecord.id}.json`);
//     const fileData = JSON.stringify(newJourneyRecord);
//     fs.writeFileSync(filePath, fileData, "utf8");
//     return newJourneyRecord;
//   } catch (error) {
//     throw { code: "failedToUpdateJourneyRecord", message: error.message };
//   }
// }

function remove(userId, readingPlanId) {
  try {
    const journeyRecord = get(userId, readingPlanId);
    if (journeyRecord) {
      const filePath = path.join(journeyRecordFolderPath, `${journeyRecord.id}.json`);
      fs.unlinkSync(filePath);
    }
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveJourneyRecord", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(journeyRecordFolderPath);
    const journeyRecordList = files.map((file) => {
      const filePath = path.join(journeyRecordFolderPath, file);
      const journeyRecordData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return journeyRecordData;
    });
    return journeyRecordList;
  } catch (error) {
    throw { code: "failedToListAttendances", message: error.message };
  }
}

function readingPlanMap() {
  const journeyRecordList = list();
  const journeyRecordMap = {};
  journeyRecordList.forEach((journeyRecord) => {
    if (!journeyRecordMap[journeyRecord.readingPlanId])
      journeyRecordMap[journeyRecord.readingPlanId] = {};
    if (!journeyRecordMap[journeyRecord.readingPlanId][journeyRecord.userId])
      journeyRecordMap[journeyRecord.readingPlanId][journeyRecord.userId] = {};
    journeyRecordMap[journeyRecord.readingPlanId][journeyRecord.userId] = {
      journeyRecord: journeyRecord.journeyRecord,
    };
  });
  return journeyRecordMap;
}

function userMap() {
  const journeyRecordList = list();
  const journeyRecordMap = {};
  journeyRecordList.forEach((journeyRecord) => {
    if (!journeyRecordMap[journeyRecord.userId])
      journeyRecordMap[journeyRecord.userId] = {};
    if (!journeyRecordMap[journeyRecord.userId][journeyRecord.readingPlanId])
      journeyRecordMap[journeyRecord.userId][journeyRecord.readingPlanId] = {};
    journeyRecordMap[journeyRecord.userId][journeyRecord.readingPlanId] = {
      journeyRecord: journeyRecord.journeyRecord,
    };
  });
  return journeyRecordMap;
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  readingPlanMap,
  userMap,
};