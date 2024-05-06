const readingPlanDao = require("../../dao/readingPlan-dao.js");
const journeyRecordDao = require("../../dao/journeyRecord-dao.js");

async function ListPlan(req, res) {
  try {
    const readingPlanList = readingPlanDao.list();

    const journeyRecordMap = journeyRecordDao.readingPlanMap();

    readingPlanList.forEach((readingPlan) => {
      readingPlan.userMap = journeyRecordMap[readingPlan.id] || {};
    });

    res.json(readingPlanList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListPlan;