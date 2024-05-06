const express = require("express");
const router = express.Router();

const GetUser = require("../user/getUser");
const ListUser = require("../user/listUser");
const CreateUser = require("../user/createUser");
const UpdateUser = require("../user/updateUser");
const DeleteUser = require("../user/deleteUser");

router.get("/get", (req, res) => {
  GetUser(req, res);
});

router.get("/list", (req, res) => {
  ListUser(req, res);
});

router.post("/create", (req, res) => {
  CreateUser(req, res);
});

router.post("/update", (req, res) => {
  UpdateUser(req, res);
});

router.post("/delete", (req, res) => {
  DeleteUser(req, res);
});

module.exports = router;