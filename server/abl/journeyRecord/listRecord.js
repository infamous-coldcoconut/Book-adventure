const journeyRecordDao = require("../../dao/journeyRecord-dao.js");

async function ListRecord(req, res) {
  try {
    const journeyRecordList = journeyRecordDao.list();
    res.json(journeyRecordList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListRecord;
