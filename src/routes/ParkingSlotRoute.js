'use strict'

class ParkingSlotRoute {
  /**
   * @param {Object} router - Express router
   * @param {Object} context - Service context
   * @param {Object} context.controllers - Service controllers
   * @param {Object} context.controllers.parking - Parking Slot controller
   */
  constructor (router, context) {
    this.router = router
    this.controller = context.controllers.parking
  }

  setupRoutes () {
    this.router.get(
      '/parking-slots',
      this.getAllParkingSpots.bind(this)
    );
    this.router.post(
      '/parking-slots',
      this.createParkingSpot.bind(this)
    );
    this.router.get(
      '/available-parking-slot',
      this.getAvailableParkingSlot.bind(this)
    );
    this.router.post(
      '/park/vehicle',
      this.assignVehicle.bind(this)
    );
    this.router.delete(
      '/park/vehicle/:ticketId',
      this.removeVehicle.bind(this)
    );
  };

  getAllParkingSpots (req, res) {
    try {
      const data = this.controller.getAllParkingSpots();
      res.json({
        ok: true,
        data
      })
    } catch (error) {
      throw Error;
    }
  };

  getAvailableParkingSlot (req, res) {
    try {
      const data = this.controller.getAvailableParkingSlot(req.query);
      res.json({
        ok: true,
        data
      })
    } catch (error) {
      throw Error;
    }
  };

  assignVehicle (req, res) {
    try {
      const result = this.controller.assignVehicle(req.body);
      res.json({
        ok: true,
        data: result
      })
    } catch (error) {
      throw Error;
    }
  };

  removeVehicle (req, res) {
    try {
      const data = this.controller.removeVehicle(req.params, req.body);
      res.json({
        ok: true,
        data,
      })
    } catch (error) {
      throw Error;
    }
  };

  createParkingSpot (req, res) {
    try {
      this.controller.createParkingSpot();
      res.json({
        ok: true,
      })
    } catch (error) {
      throw Error;
    }
  };
}

module.exports = ParkingSlotRoute
