const express = require("express");
const router = express.Router();

const GetRecord = require("../journeyRecord/getRecord");
const ListRecord = require("../journeyRecord/listRecord");
const CreateRecord = require("../journeyRecord/createRecord");
const UpdateRecord = require("../journeyRecord/updateRecord");
const DeleteRecord = require("../journeyRecord/deleteRecord");

router.get("/get", (req, res) => {
  GetRecord(req, res);
});

router.get("/list", (req, res) => {
  ListRecord(req, res);
});

router.post("/create", (req, res) => {
  CreateRecord(req, res);
});

router.post("/update", (req, res) => {
  UpdateRecord(req, res);
});

router.post("/delete", (req, res) => {
  DeleteRecord(req, res);
});

module.exports = router;