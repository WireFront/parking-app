'use strict';
const VehicleRepository = require('../repositories/VehicleRepository');

class VehicleService {
  constructor() {
    this.vehicleRepository = new VehicleRepository();
  }
  create(body) {
    return this.vehicleRepository.create(body)
  }
  get(body) {
    const { vehicleId } = body;
    return this.vehicleRepository.get(vehicleId);
  }

}

module.exports = new VehicleService();