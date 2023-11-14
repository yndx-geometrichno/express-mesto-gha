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
    _id: "65527e139e1b00aeae9d3e4d",
  };

  next();
});
app.use("/", router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
