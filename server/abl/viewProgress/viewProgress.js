const viewProgress = require("../../dao/viewProgress-dao.js");


async function ViewProgress(req, res) {
    try {
      const { startDate, endDate } = req.body;
  
      const readingPlanData = readingPlanDao.getByDateRange(startDate, endDate);
  
      const totalPlannedBooks = readingPlanData.reduce((total, plan) => total + plan.listOfBooks.length, 0);
      const totalPlannedPages = readingPlanData.reduce((total, plan) => total + plan.listOfBooks.reduce((acc, book) => acc + book.totalPages, 0), 0);
      const journeyRecords = journeyRecordDao.getByDateRange(startDate, endDate);
      const totalReadBooks = journeyRecords.reduce((total, record) => total + record.listOfBooks.length, 0);
      const totalReadPages = journeyRecords.reduce((total, record) => total + record.listOfBooks.reduce((acc, book) => acc + book.pagesRead, 0), 0);
      const totalTimeSpent = journeyRecords.reduce((total, record) => total + record.listOfBooks.reduce((acc, book) => acc + book.readingDuration, 0), 0);
  
      const progressData = {
        startDate,
        endDate,
        totalPlannedBooks,
        totalPlannedPages,
        totalReadBooks,
        totalReadPages,
        totalTimeSpent,
      };
  
      res.json(progressData);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = ViewProgress;
  