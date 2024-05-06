
const Ajv = require("ajv");
const ajv = new Ajv();
const userDao = require("../../dao/user-dao.js");
const journeyRecordDao = require("../../dao/journeyRecord-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteUser(req, res) {
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

    const existingUser = userDao.get(id);
    if (!existingUser) {
      res.status(404).json({
        code: "userNotFound",
        message: `User with ID ${id} not found`,
      });
      return;
    }

    userDao.remove(id);
    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteUser;
