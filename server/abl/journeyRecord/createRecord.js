const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const journeyRecordDao = require("../../dao/journeyRecord-dao.js");
const readingPlanDao = require("../../dao/readingPlan-dao.js");
const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    readingPlanId:{ type: "string"},
    bookId: { type: "string"},
    date: { type: "string", format: "date-time" },
    books: { type: "integer" },
    pages: { type: "integer" },
    timeSpend: { type: "integer"}
},
  required: ["userId", "readingPlanId", "bookId"],
  additionalProperties: false,
};

async function CreateRecord(req, res) {
  try {
    let journeyRecord = req.body;

    journeyRecord.books = parseInt(journeyRecord.books);
    journeyRecord.pages = parseInt(journeyRecord.pages);
    journeyRecord.timeSpend = parseInt(journeyRecord.timeSpend);

    // validate input
    const valid = ajv.validate(schema, journeyRecord);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const user = userDao.get(journeyRecord.userId);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${journeyRecord.userId} not found`,
      });
      return;
    }

    const readingPlan = readingPlanDao.get(journeyRecord.readingPlanId);
    if (!readingPlan) {
      res.status(404).json({
        code: "readingPlanNotFound",
        message: `readingPlan ${journeyRecord.readingPlanId} not found`,
      });
      return;
    }

    journeyRecord = journeyRecordDao.create(journeyRecord);
    res.json(journeyRecord);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateRecord;