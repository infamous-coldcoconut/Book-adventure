const Ajv = require("ajv");
const ajv = new Ajv();
const readingPlanDao = require("../../dao/readingPlan-dao.js");
const journeyRecordDao = require("../../dao/journeyRecord-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeletePlan(req, res) {
  try {
    // get request query or body
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const journeyRecordMap = journeyRecordDao.readingPlanMap();
    if (journeyRecordMap[reqParams.id]) {
      res.status(400).json({
        code: "readingPlanHasAttendances",
        message: `Event ${reqParams.id} has journeyRecords`,
      });
      return;
    }

    readingPlanDao.remove(reqParams.id);
    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeletePlan;