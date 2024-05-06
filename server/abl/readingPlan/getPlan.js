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

async function GetPlan(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

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

    // read readingPlan by given id
    const readingPlan = readingPlanDao.get(reqParams.id);
    if (!readingPlan) {
      res.status(404).json({
        code: "readingPlanNotFound",
        message: `plan ${reqParams.id} not found`,
      });
      return;
    }

    const journeyRecordMap = journeyRecordDao.readingPlanMap();
    readingPlan.userMap = journeyRecordMap[reqParams.id] || {};

    res.json(readingPlan);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetPlan;