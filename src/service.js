'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router')
// const errorHandler = require('./responses/OperationalError');
require('dotenv').config();


//controllers
const ParkingSlotController = require('./controllers/ParkingSlotController');

class Service {
  constructor () {
    this.models = {};
    this.controllers = {};
  }
  start () {
    this.setupDependencies();
    this.setupServer();
  }

  setupDependencies () {
    this.app = express();
    this.router = express.Router();
    this.controllers.parking = new ParkingSlotController();
  }

  setupServer () {
    this.setupRoutes()
    this.startListening()
  }
  getRoutePath () {
    return path.resolve(__dirname, '../', 'src/routes');
  }
  setupRoutes () {
    router.setup(this.getRoutePath(), this.router, this);
    this.app.use(bodyParser.json());
    this.app.use(this.router);
    // this.app.use(errorHandler);
  }
  startListening () {
    const port = process.env.APP_PORT;
    this.app.listen(parseInt(port, 10));
    console.log(`Server listening on port ${port}`)
  }
}

module.exports = Service;