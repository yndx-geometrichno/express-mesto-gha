const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleWare");

const PORT = /*process.env.PORT ||*/ 3000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {});

app.use((req, res, next) => {
  req.user = {
    _id: "6553e0c5587ddc812d4d5bbe",
  };

  next();
});
app.use("/", router);

app.use(errorHandler);
app.use("*", (req, res) => {
  res.status(404).send({ message: "This page is not exist" });
});

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
