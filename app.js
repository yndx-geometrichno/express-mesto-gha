require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleWare");

const { DB_PORT, DB_URL } = process.env;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(DB_URL, {});

app.use("/", router);
app.use(errors());
app.use(errorHandler);

app.listen(DB_PORT || 3000);
