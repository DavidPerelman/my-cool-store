const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const corsOptions = {
  origin: '*',
};
// app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());
dotenv.config();

// const whitelist = ['http://localhost:3000'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) return callback(null, true);

//     callback(new Error('Not allowed by CORS'));
//   },
// };

// app.use(cors(corsOptions));

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

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://my-cool-store.herokuapp.com',
  'https://my-cool-store.netlify.app',
];

app.get('/', (req, res) => {
  if (ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    // allow other origins to make unauthenticated CORS requests
    res.set('Access-Control-Allow-Origin', '*');
  }
  res.send('<h1>myCoolStore Server</h1>');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
