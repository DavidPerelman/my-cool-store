const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(
  cors({
    origin: ['http://localhost:3001', 'https://my-cool-store.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(cookieParser());
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

// Routers
const userRouter = require('./routers/userRouter');
app.use('/user', userRouter);

const productsRouter = require('./routers/productsRouter');
app.use('/products', productsRouter);

// const ALLOWED_ORIGINS = [
//   'http://localhost:3000',
//   'https://my-cool-store.herokuapp.com',
//   'https://my-cool-store.netlify.app',
// ];

app.get('/', (req, res) => {
  // if (ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
  //   res.set('Access-Control-Allow-Credentials', 'true');
  //   res.set('Access-Control-Allow-Origin', req.headers.origin);
  // } else {
  //   res.set('Access-Control-Allow-Origin', '*');
  // }
  res.send('<h1>myCoolStore Server</h1>');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
