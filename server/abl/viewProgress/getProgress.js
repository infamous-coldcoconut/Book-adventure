const Ajv = require("ajv");
const ajv = new Ajv();
const viewProgressDao = require("../../dao/viewProgress-dao");

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

    const viewProgress = viewProgressDao.get(reqParams.id);
    if (!viewProgress) {
      res.status(404).json({
        code: "viewProgressNotFound",
        message: `Record ${reqParams.id} not found`,
      });
      return;
    }

    res.json(viewProgress);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetRecord;
