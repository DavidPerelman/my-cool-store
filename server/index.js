const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MDB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log('Connected to MongoDB');
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Routers
const userRouter = require('./routers/userRouter');
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log(`Server running`)
});