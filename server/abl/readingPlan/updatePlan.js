const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const readingPlanDao = require("../../dao/readingPlan-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
    totalPages: { type: "integer" },
    totalBooks: { type: "integer" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let readingPlan = req.body;

    readingPlan.totalPages = parseInt(readingPlan.totalPages);
    readingPlan.totalBooks = parseInt(readingPlan.totalBooks);
    
    // validate input
    const valid = ajv.validate(schema, readingPlan);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedReadingPlan = readingPlanDao.update(readingPlan);
    if (!updatedReadingPlan) {
      res.status(404).json({
        code: "readingPlanNotFound",
        message: `readingPlan ${readingPlan.id} not found`,
      });
      return;
    }

    res.json(updatedReadingPlan);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;