const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require("cookie-parser") 
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const psychiatristRoutes = require('./routes/psychiatrist');



// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  });
// middlewares

app.use(bodyParser.json());
app.use(cookieParser());


// routes middleware

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', psychiatristRoutes);


// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
