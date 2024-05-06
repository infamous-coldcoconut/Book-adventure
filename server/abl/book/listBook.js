const bookDao = require("../../dao/book-dao.js");

async function ListBook(req, res) {
  try {
    const bookList = bookDao.list();
    res.json(bookList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListBook;
