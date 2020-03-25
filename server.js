const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


// Load env Vars
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

/// route files
const bootcamps = require('./routes/bootcamps');

const app = express();
// body parser used to get thing off of req.body

app.use(express.json());

// dev middleware only in dev enviorment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routers 
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //close server exit process
  server.close(() => process.exit(1));
});
