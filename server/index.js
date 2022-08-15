const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://my-cool-store.netlify.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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
// app.use(express.json());
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Routers
const userRouter = require('./routers/userRouter');
app.use('/user', userRouter);

const adminRouter = require('./routers/adminRouter');
app.use('/admin', adminRouter);

const productsRouter = require('./routers/productsRouter');
app.use('/products', productsRouter);

const customersRouter = require('./routers/customersRouter');
app.use('/customers', customersRouter);

const categoriesRouter = require('./routers/categoriesRouter');
app.use('/categories', categoriesRouter);

const ordersRouter = require('./routers/ordersRouter');
app.use('/orders', ordersRouter);

const paymentRouter = require('./routers/paymentRouter');
app.use('/payment', paymentRouter);

const webhookRouter = require('./routers/webhookRouter');
app.use('/webhook', webhookRouter);

app.get('/', (req, res) => {
  res.send('<h1>myCoolStore Server</h1>');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
