require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./api/routes/router');
const cookieParser = require('cookie-parser');


(async () => {
    const { API_PORT } = process.env;
    const port = process.env.PORT || API_PORT;
    // Setting up Express
    const app = express();
    app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api', routes);
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
  })();
//start listening

