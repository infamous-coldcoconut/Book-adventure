const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const bookFolderPath = path.join(__dirname, "storage", "bookList");

// Method to read an book from a file
function get(bookId) {
  try {
    const filePath = path.join(bookFolderPath, `${bookId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadBook", message: error.message };
  }
}
function getByTitle(title) {
  try {
    const files = fs.readdirSync(bookFolderPath);
    for (const file of files) {
      const filePath = path.join(bookFolderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const book = JSON.parse(fileData);
      if (book.title === title) {
        return book;
      }
    }
    return null;
  } catch (error) {
    throw { code: "failedToReadBook", message: error.message };
  }
}

// Method to write an book to a file
function create(book) {
  try {
    book.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(bookFolderPath, `${book.id}.json`);
    const fileData = JSON.stringify(book);
    fs.writeFileSync(filePath, fileData, "utf8");
    return book;
  } catch (error) {
    throw { code: "failedToCreateBook", message: error.message };
  }
}

// Method to update book in a file
function update(book) {
  try {
    const currentBook = get(book.id);
    if (!currentBook) return null;
    const newBook = { ...currentBook, ...book };
    const filePath = path.join(bookFolderPath, `${book.id}.json`);
    const fileData = JSON.stringify(newBook);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newBook;
  } catch (error) {
    throw { code: "failedToUpdateBook", message: error.message };
  }
}

// Method to remove an book from a file
function remove(bookId) {
  try {
    const filePath = path.join(bookFolderPath, `${bookId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveBook", message: error.message };
  }
}

// Method to list books in a folder
function list() {
  try {
    const files = fs.readdirSync(bookFolderPath);
    const bookList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(bookFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return bookList;
  } catch (error) {
    throw { code: "failedToListBooks", message: error.message };
  }
}

module.exports = {
  get,
  getByTitle,
  create,
  update,
  remove,
  list,
};
