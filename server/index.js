const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.MDB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*', 'http://localhost:3000/');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Routers
const userRouter = require('./routers/userRouter');
app.use('/user', userRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(3001, () => {
  console.log(`Server running 3001`);
});
