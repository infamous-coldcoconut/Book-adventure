const express = require("express");
const router = express.Router();

const UpdateRecord = require("../journeyRecord/updateRecord");

router.post("/update", (req, res) => {
  UpdateRecord(req, res);
});

module.exports = router;