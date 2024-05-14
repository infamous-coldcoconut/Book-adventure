const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const bookDao = require("../../dao/book-dao.js");

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    title: { type: "string"},
    pages: { type: "integer" },
    //icon: { type: "string", Format: "dropdown" },
  },
  required: ["userId", "title", "pages"],
  additionalProperties: false,
};

async function CreateBook(req, res) {
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

    const existingBook = bookDao.list().find(existingBook => existingBook.title === book.title);
    if (existingBook) {
      res.status(400).json({
        code: "bookAlreadyExists",
        message: `Book with title '${book.title}' already exists`,
      });
      return;
    }

    //book.icon = req.body.icon;
    book = bookDao.create(book);
    res.json(book);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateBook;