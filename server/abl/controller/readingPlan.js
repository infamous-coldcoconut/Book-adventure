const express = require("express");
const router = express.Router();

const GetPlan = require("../readingPlan/getPlan");
const ListPlan = require("../readingPlan/listPlan");
const CreatePlan = require("../readingPlan/createPlan");
const UpdatePlan = require("../readingPlan/updatePlan");
const DeletePlan = require("../readingPlan/deletePlan");

router.get("/get", (req, res) => {
  GetPlan(req, res);
});

router.get("/list", (req, res) => {
  ListPlan(req, res);
});

router.post("/create", (req, res) => {
  CreatePlan(req, res);
});

router.post("/update", (req, res) => {
  UpdatePlan(req, res);
});

router.post("/delete", (req, res) => {
  DeletePlan(req, res);
});

module.exports = router;