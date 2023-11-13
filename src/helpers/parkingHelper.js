'use strict';
const {
  PARKING_SPOT_TYPE,
  PARKING_SLOT_STATUS
} = require('../configurations/constants');

const formatParkingSpots = (lastParkingSpot) => {
  const parkingSlots = [];
  const keys = Object.keys(PARKING_SPOT_TYPE);
  let keyEntry = 0;

  for (let i = 1; i < keys.length * 2; i += 2) {
    parkingSlots.push(
      {
        spotId: lastParkingSpot + i,
        status: PARKING_SLOT_STATUS.AVAILABLE,
        type: keys[keyEntry],
      },
      {
        spotId: lastParkingSpot + i + 1,
        status: PARKING_SLOT_STATUS.AVAILABLE,
        type: keys[keyEntry],
      }
    );
    keyEntry++;
  }

  return parkingSlots;
}

module.exports = { formatParkingSpots };