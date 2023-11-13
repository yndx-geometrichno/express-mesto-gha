const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { userRouter } = require("./routes/users");
const { cardRouter } = require("./routes/cards");

const PORT = 3000;

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {});

app.use((req, res, next) => {
  req.user = {
    _id: "65527e139e1b00aeae9d3e4d",
  };

  next();
});
app.use("/cards", cardRouter)

app.use(cors());
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
