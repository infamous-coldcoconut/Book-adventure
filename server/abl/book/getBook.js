const Ajv = require("ajv");
const ajv = new Ajv();
const bookDao = require("../../dao/book-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },

  },
  anyOf: [
    { required: ["id"] },
    { required: ["title"] },
  ],
  additionalProperties: false,
};

async function GetBook(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id || req.query?.title ? req.query : req.body;

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

    let book;
    if (reqParams.id) {
      book = bookDao.get(reqParams.id);
    } else if (reqParams.title) {
      const allBooks = bookDao.list();
      book = allBooks.find(b => b.title === reqParams.title);
    }

    if (!book) {
      res.status(404).json({
        code: "bookNotFound",
        message: `Book ${reqParams.id} not found`,
      });
      return;
    }

    res.json(book);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetBook;
