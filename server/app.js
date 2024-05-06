const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const bookController = require("./abl/controller/book");
const userController = require("./abl/controller/user");
const journeyRecordController = require("./abl/controller/journeyRecord");
const readingPlanController = require("./abl/controller/readingPlan");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/book", bookController);
app.use("/user", userController);
app.use("/journeyRecord", journeyRecordController);
app.use("/readingPlan", readingPlanController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});