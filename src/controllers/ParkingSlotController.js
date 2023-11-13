'use strict';

const ParkingSlotService = require('../services/ParkingSlotService');

class ParkingSlot {
	getAllParkingSpots() {
		return ParkingSlotService.getAllParkingSpots();
	};
	getAvailableParkingSlot(body) {
		return ParkingSlotService.getAvailableParkingSlot(body);
	};
	assignVehicle(body) {
		return ParkingSlotService.assignVehicle(body);
	};
	removeVehicle(params, body) {
		return ParkingSlotService.removeVehicle(params, body);
	};
  createParkingSpot() {
    return ParkingSlotService.createParkingSpot();
  };
}

module.exports = ParkingSlot