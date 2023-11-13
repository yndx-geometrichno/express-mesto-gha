const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const path = require('path');

const PORT = 5000;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
});

app.use(cors());
app.use(express.json);

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
