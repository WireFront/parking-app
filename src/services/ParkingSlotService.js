'use strict';

const VehicleService = require('./VehicleService');
const TicketService = require('./TicketService');
const ParkingSlotRepository = require('../repositories/ParkingSlotRepository');
const { PARKING_SLOT_STATUS, VEHICLE_AVAILABILITY_LIST } = require('../configurations/constants');

class ParkingSlotService {
  constructor() {
		this.ParkingSlotRepository = new ParkingSlotRepository();
  };

  getAllParkingSpots() {
    return this.ParkingSlotRepository.getAllParkingSpots();
  };

  getAvailableParkingSlot(body) {
    const { entryPointId, vehicleType } = body;
    const sortClosestEntry = this.ParkingSlotRepository.getAvailableParkingSlot(
      entryPointId
    );
  
    let availableSpot = {};
  
    sortClosestEntry.find(({ entryPointId, parkingSpots }) => {
      const vehicleAvailableList = VEHICLE_AVAILABILITY_LIST[vehicleType];
  
      const isParkingAvailable = parkingSpots.find(
        ({ status, type }) =>
          status === PARKING_SLOT_STATUS.AVAILABLE &&
          vehicleAvailableList.includes(type) //fetch all available
      );
  
      if (isParkingAvailable) {
        return (availableSpot = {
          ...isParkingAvailable,
          entryPointId,
        });
      }
    });
  
    return availableSpot;
  };

  assignVehicle(body) {
    const { entryPointId, spotId, vehicle } = body;

    const vehicleObj = VehicleService.create(vehicle);
  
    this.ParkingSlotRepository.updateParkingSpot(
      entryPointId,
      spotId,
      PARKING_SLOT_STATUS.OCCUPIED
    );
    const ticketObj = TicketService.create(body, vehicleObj);
  
    return ticketObj;
  };

  removeVehicle(params, body) {
    const ticketObj = TicketService.get(params);
    const vehicleObj = VehicleService.get(ticketObj);
    const rate = TicketService.calculate(ticketObj, vehicleObj, body);
    const { entryPointId, spotId } = ticketObj;
  
    this.ParkingSlotRepository.updateParkingSpot(
      entryPointId,
      spotId,
      PARKING_SLOT_STATUS.AVAILABLE
    );
  
    return rate;
  };

  createParkingSpot() {
    return this.ParkingSlotRepository.createParkingSpot();
  }
}

module.exports = new ParkingSlotService();