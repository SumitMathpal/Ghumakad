class ExpressError extends Error {
  constructor(status, message) {
    super(message); // ✅ Pass the message to parent Error
    this.status = status;
    Error.captureStackTrace(this, this.constructor); // optional
  }
}

module.exports = ExpressError;
