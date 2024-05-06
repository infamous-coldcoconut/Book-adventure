const express = require("express");
const router = express.Router();

//const GetBook = require("../abl/book/getBook");
const GetBook = require("../book/getBook");
const ListBook = require("../book/listBook");
const CreateBook = require("../book/createBook");
const UpdateBook = require("../book/updateBook");
const DeleteBook = require("../book/deleteBook");

router.get("/get", (req, res) => {
  GetBook(req, res);
});

router.get("/list", (req, res) => {
  ListBook(req, res);
});

router.post("/create", (req, res) => {
  CreateBook(req, res);
});

router.post("/update", (req, res) => {
  UpdateBook(req, res);
});

router.post("/delete", (req, res) => {
  DeleteBook(req, res);
});

module.exports = router;