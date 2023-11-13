'use strict'

function operationalHandler (error, _req, res, _next) {
  res.status(error.statusCode).json({
    ok: false,
    error: {
      code: error.code,
      message: error.message || ''
    }
  })
}

module.exports = operationalHandler
  