const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDao = require("../../dao/user-dao.js");

const readingPlanDao = require("../../dao/readingPlan-dao.js");
const journeyRecordDao = require("../../dao/journeyRecord-dao.js");

const schema = {
  type: "object",
  properties: {
    // userId: { type: "string" },
    // readingPlanId:{ type: "string"},
    // bookId: { type: "string"},
    id: {type: "string"},
    books: { type: "integer" },
    pages: { type: "integer" },
    timeSpend: { type: "integer"}
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateRecord(req, res) {
  try {
    let dtoIn  = req.body;

    dtoIn.books = parseInt(dtoIn.books);
    dtoIn.pages = parseInt(dtoIn.pages);
    dtoIn.timeSpend = parseInt(dtoIn.timeSpend);

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

    // check if user exists
    const user = userDao.get(dtoIn.userId);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${dtoIn.userId} not found`,
      });
      return;
    }

    const readingPlan = readingPlanDao.get(dtoIn.readingPlanId);
    if (!readingPlan) {
      res.status(404).json({
        code: "readingPlanNotFound",
        message: `Reading Plan ${dtoIn.readingPlanId} not found`,
      });
      return;
    }

    let journeyRecord = journeyRecordDao.get(dtoIn.userId, dtoIn.readingPlanId);

    journeyRecord = journeyRecordDao.update(journeyRecord);

    res.json(journeyRecord);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateRecord;
