'use strict';
const moment = require('moment-timezone');
const {
    PARKING_RATE_BY_TYPE,
    FLAT_AND_EXCESS_PARKING_RATES
} = require('../configurations/constants');

const computeDateAndTime = (startDateTime, endDateTime) => {
    const start = moment.tz(startDateTime, 'Asia/Manila');
    const end = moment.tz(endDateTime, 'Asia/Manila');
    const days = end.diff(start, 'days');
    const hours = end.diff(start, 'hours');
    const minutes = end.diff(start, 'minutes');
  
    return { days, hours, minutes };
};

const computeVehicleHoursParked = (time, slotType) => {
  const { days, hours, minutes } = time;

  if (days >= 1) {   
    const hoursSpent = (minutes / 60);
    const remainingHoursSpent =  Math.floor(hoursSpent / 24);
    const minsSpent = (hoursSpent - Math.floor(hoursSpent)) * 60;
    const remainingMinsSpent = Math.round(minsSpent);
    
    const rate = FLAT_AND_EXCESS_PARKING_RATES.EXCESS_HOURS * days;
    const remainingHoursRate = (remainingHoursSpent) * PARKING_RATE_BY_TYPE[slotType];

    return {
      rate: rate + remainingHoursRate,
      hours: {
        days,
        hours: remainingHoursSpent,
        minutes: remainingMinsSpent
      }
    };
  }
 
  if (hours < 3 || (hours === 3) & (minutes == 180)) {
    const rate = FLAT_AND_EXCESS_PARKING_RATES.FLAT_RATE;
    return {
      rate,
      hours
    }
  }

  if (hours >= 3) {
    const rate = (
      FLAT_AND_EXCESS_PARKING_RATES.FLAT_RATE +
      (hours - 3) * PARKING_RATE_BY_TYPE[slotType]
    );
    return {
      rate,
      hours
    }
  }
}

module.exports = { 
  computeDateAndTime, 
  computeVehicleHoursParked
};