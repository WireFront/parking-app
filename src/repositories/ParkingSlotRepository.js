'use strict';
const parkingSlotsData = require('../demoData/parkingSlots.json');
const { formatParkingSpots } = require('../helpers/parkingHelper');

class ParkingSlotRepository {
  constructor() {
    this.parkingSlots = parkingSlotsData;
  }

  getAllParkingSpots() {
    return this.parkingSlots;
  };

  getAvailableParkingSlot(entryPointId) {
    const availableParkingSlot = [...this.parkingSlots].sort(
      (a, b) =>
        Math.abs(a.entryPointId - entryPointId) -
        Math.abs(b.entryPointId - entryPointId)
    );
  
    return availableParkingSlot;
  };

  updateParkingSpot(entryPointId, slotId, status) {
    this.parkingSlots.find((parking) => {
      if (parking.entryPointId === entryPointId) {
        const foundSlotIndex = parking.parkingSpots.findIndex(
          (index) => index.spotId == slotId
        );
  
        parking.parkingSpots[foundSlotIndex] = {
          ...parking.parkingSpots[foundSlotIndex],
          status,
        };
  
        return parking;
      }
    });
  };

  createParkingSpot() {
    const lastParkingEntry = this.parkingSlots.length;

    return this.parkingSlots.push({
      entryPointId: lastParkingEntry + 1,
      parkingSpots: formatParkingSpots(lastParkingEntry * 6),
    });
  }
}

module.exports = ParkingSlotRepository