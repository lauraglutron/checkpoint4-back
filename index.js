const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// app.use("/", require("./"));
// app.use("/", require("./"));

app.get('/', (req, res) => {
  res.send('Welcome to Express');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
