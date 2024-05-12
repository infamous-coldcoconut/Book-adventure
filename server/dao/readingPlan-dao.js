const fs = require("fs");
const path = require("path");
const crypto = require("crypto");


const readingPlanFolderPath = path.join(__dirname, "storage", "readingPlanList");

function get(readingPlanId) {
    try {
      const filePath = path.join(readingPlanFolderPath, `${readingPlanId}.json`);
      const fileData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileData);
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw { code: "failedToReadReadingPlan", message: error.message };
    }
  }
  
  // Method to write an readingPlan to a file
  function create(readingPlan) {
    try {
      readingPlan.id = crypto.randomBytes(16).toString("hex");
      const filePath = path.join(readingPlanFolderPath, `${readingPlan.id}.json`);
      const fileData = JSON.stringify(readingPlan);
      fs.writeFileSync(filePath, fileData, "utf8");
      return readingPlan;
    } catch (error) {
      throw { code: "failedToCreateReadingPlan", message: error.message };
    }
  }
  
  // Method to update readingPlan in a file
  function update(readingPlan) {
    try {
      const currentReadingPlan = get(readingPlan.id);
      if (!currentReadingPlan) return null;
      const newReadingPlan = { ...currentReadingPlan, ...readingPlan };
      const filePath = path.join(readingPlanFolderPath, `${readingPlan.id}.json`);
      const fileData = JSON.stringify(newReadingPlan);
      fs.writeFileSync(filePath, fileData, "utf8");
      return newReadingPlan;
    } catch (error) {
      throw { code: "failedToUpdateReadingPlan", message: error.message };
    }
  }
  
  // Method to remove an readingPlan from a file
  function remove(readingPlanId) {
    try {
      const filePath = path.join(readingPlanFolderPath, `${readingPlanId}.json`);
      fs.unlinkSync(filePath);
      return {};
    } catch (error) {
      if (error.code === "ENOENT") {
        return {};
      }
      throw { code: "failedToRemoveReadingPlan", message: error.message };
    }
  }
  
  // Method to list readingPlans in a folder
  function list(userId) {
    try {
      const files = fs.readdirSync(readingPlanFolderPath);
      const planList = files.map((file) => {
        const fileData = fs.readFileSync(
          path.join(readingPlanFolderPath, file),
          "utf8"
        );
        return JSON.parse(fileData);
      });
  
      planList.sort((a, b) => new Date(a.date) - new Date(b.date));
      return planList;
    } catch (error) {
      throw { code: "failedToListTransaction", message: error.message };
    }
  }


function getByDateRange(startDate, endDate) {
  try {
    const files = fs.readdirSync(readingPlanFolderPath);
    const filteredPlans = [];

    files.forEach((file) => {
      const filePath = path.join(readingPlanFolderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const plan = JSON.parse(fileData);

      // Check if plan falls within the specified date range
      const planStartDate = new Date(plan.startDate);
      const planEndDate = new Date(plan.endDate);
      const queryStartDate = new Date(startDate);
      const queryEndDate = new Date(endDate);
      if (planStartDate <= queryEndDate && planEndDate >= queryStartDate) {
        filteredPlans.push(plan);
      }
    });

    return filteredPlans;
  } catch (error) {
    throw { code: "failedToGetPlans", message: error.message };
  }
}


module.exports = {
    get,
    create,
    update,
    remove,
    list,
};
      