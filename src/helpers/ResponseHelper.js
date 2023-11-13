'use strict'
const { RESPONSE_STATUS } = require('../configurations/constants');
const { ValidationError } = require('../responses/ValidationError');

class ResponseHelper {
	handle (data) {
		return { status: RESPONSE_STATUS.SUCCESS, data };
	}

	handleError (error) {
		if (error instanceof ValidationError) {
			return { status: RESPONSE_STATUS.ERROR, message: error.message, errors: error.errors };
		}

		if (error instanceof Error) {
			return { status: RESPONSE_STATUS.ERROR, message: error.message };
		}

		return { status: RESPONSE_STATUS.ERROR, message: error };
	}

	resolveApiError(error){
		return { status: RESPONSE_STATUS.ERROR, message: error };
	}
}

module.exports = new ResponseHelper();