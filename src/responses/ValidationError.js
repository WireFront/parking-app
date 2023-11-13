'use strict';
class ValidationError extends Error {
    constructor(message, code = 'ValidationError') {
      super('Validation Error');
      this.statusCode = 400;
      this.code = code;
      this.message = message;
      this.body = {
        code,
        message,
      };
    }
  }
  
  module.exports = new ValidationError();
  