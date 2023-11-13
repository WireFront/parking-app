'use strict';
const { v4: uuidv4 } = require('uuid');

class TicketRepository {
  constructor() {
    this.tickets = [];
  }
  create(body, vehicleObj) {
		const ticketId  = uuidv4();
		const { entryPointId, spotId } = body;
    const { vechicleId, licenseNumber } = vehicleObj;

    const ticketObj = {
			ticketId,
      entryPointId, 
      spotId,
      vechicleId,
      licenseNumber,
			entryTime: new Date(),
			exitTime: null
		};
    this.tickets = [...this.tickets, ticketObj];
    return ticketObj;
  }

  getTicket(ticketId) {
    return this.tickets.find(ticketObj => ticketObj.ticketId === ticketId);
  }
}

module.exports = TicketRepository