class ExpressError extends Error {
  constructor(status, message) {
    super(message); // ✅ Pass the message to the base Error class
    this.status = status;
  }
}

module.exports = ExpressError;
