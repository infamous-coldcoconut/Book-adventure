const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const bookDao = require("../../dao/book-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string"},
    pages: { type: "integer" },
    //icon: { type: "string", format: "dropdown" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateBook(req, res) {
  try {
    let book = req.body;

    book.pages = parseInt(book.pages);


    // validate input
    const valid = ajv.validate(schema, book);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedBook = bookDao.update(book); 
    if (!updatedBook) {
      res.status(404).json({
        code: "bookNotFound", 
        message: `Book ${book.id} not found`, 
      });
      return;
    }

    res.json(updatedBook);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateBook;
