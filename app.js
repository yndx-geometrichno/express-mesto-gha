const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleWare");

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect(DB_URL, {});

app.use("/", router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
