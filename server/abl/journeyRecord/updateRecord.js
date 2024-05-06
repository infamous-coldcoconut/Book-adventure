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
    bookId: { type: "string" },
    date: { type: "string", format: "date-time" },
    pages: { type: "integer" },
    time: { type: "integer" },
    
  },
  required: ["bookId", "date", "pages", "time"],
  additionalProperties: false,
};

async function UpdateRecord(req, res) {
  try {
    let journeyRecord = req.body;

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
        message: `Reading Plan ${journeyRecord.readingPlanId} not found`,
      });
      return;
    }
    journeyRecord.journeyRecord = journeyRecord.journeyRecord || "null";
    journeyRecord.guests = journeyRecord.guests || 0;

    if (journeyRecord.journeyRecord === "null" && journeyRecord.guests === 0) {
      journeyRecordDao.remove(journeyRecord.userId, journeyRecord.readingPlanId);
    } else {
      journeyRecord = journeyRecordDao.update(journeyRecord);
    }
    res.json(journeyRecord);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateRecord;
