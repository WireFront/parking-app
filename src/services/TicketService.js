'use strict';
const TicketRepository = require('../repositories/TicketRepository');
const calculateHelper = require('../helpers/calculateHelper');

class TicketService {
  constructor() {
    this.ticketRepository = new TicketRepository();
  }
  create(body, vehicleObj) {
    const { ticketId, entryTime} = this.ticketRepository.create(body, vehicleObj);
    return { ticketId, entryTime };
  };

  get(params) {
    const { ticketId } = params;
    return this.ticketRepository.getTicket(ticketId);
  }
  
  calculate(ticketObj, vehicleObj, body) {
    const { startTime, endTime } = body;
    const entryTime = startTime ? startTime : ticketObj.entryTime;
    const exitTime = endTime? endTime : new Date();

    const calculatedHours = calculateHelper.computeDateAndTime(entryTime, exitTime); 
    const rate = calculateHelper.computeVehicleHoursParked(calculatedHours, vehicleObj.type);

    return rate;
  };

}

module.exports = new TicketService();