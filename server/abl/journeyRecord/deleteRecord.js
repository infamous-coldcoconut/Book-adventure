const Ajv = require("ajv");
const ajv = new Ajv();


const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteRecord(req, res) {
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

    const existingRecord = journeyRecordDao.get(id);
    if (!existingRecord) {
      res.status(404).json({
        code: "journeyRecordNotFound",
        message: `Record with ID ${id} not found`,
      });
      return;
    }

    journeyRecordDao.remove(id);
    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteRecord;
