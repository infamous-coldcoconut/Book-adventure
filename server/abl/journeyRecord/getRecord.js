const Ajv = require("ajv");
const ajv = new Ajv();
const journeyRecordDao = require("../../dao/journeyRecord-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetRecord(req, res) {
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

    const journeyRecord = journeyRecordDao.get(reqParams.id);
    if (!journeyRecord) {
      res.status(404).json({
        code: "journeyRecordNotFound",
        message: `Record ${reqParams.id} not found`,
      });
      return;
    }

    res.json(journeyRecord);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetRecord;
