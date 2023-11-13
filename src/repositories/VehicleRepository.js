'use strict';
const { v4: uuidv4 } = require('uuid');

class VehicleRepository {
  constructor() {
    this.vehicles = [];
  }
  create(body) {
		const vechicleId  = uuidv4();
    const { licenseNumber, type, color } = body;
    const vehicleObj = {
			vechicleId,
			licenseNumber,
			type,
			color
		};
    this.vehicles = [...this.vehicles, vehicleObj];
    return vehicleObj;
  }
  get(vehicleId) {
    return this.vehicles.find(vehicleObj => vehicleObj.vehicleId === vehicleId);
  }
}

module.exports = VehicleRepository