const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Cors Configuration - Start
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://my-cool-store.netlify.app'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested, Content-Type, Accept Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});
//Cors Configuration - End

app.use(
  cors({ origin: 'https://my-cool-store.netlify.app', credentials: true })
);

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
