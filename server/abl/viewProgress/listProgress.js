const readingPlanDao = require("../../dao/readingPlan-dao.js");
const journeyRecordDao = require("../../dao/journeyRecord-dao.js");

async function ListProgress(req, res) {
  try {
    const readingPlanList = readingPlanDao.list();
    const journeyRecordMap = journeyRecordDao.readingPlanMap();

    const viewProgressList = readingPlanList.map((readingPlan) => {
      const journeyRecord = journeyRecordMap[readingPlan.id] || [];
      const totalBooksRead = journeyRecord.reduce((acc, record) => acc + (record.books || 0), 0);
      const totalPagesRead = journeyRecord.reduce((acc, record) => acc + (record.pages || 0), 0);
      const totalTimeSpent = journeyRecord.reduce((acc, record) => acc + (record.timeSpent || 0), 0);

      const totalBooksPlanned = readingPlan.totalBook || 0;
      const totalPagePlanned = readingPlan.totalPages || 0;

      return {
        ...readingPlan,
        totalBooksRead,
        totalPagesRead,
        totalTimeSpent,
        totalBooksPlanned,
        totalPagePlanned
      };
    });

    res.json(viewProgressList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListProgress;
