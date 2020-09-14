const functions = require('firebase-functions');

module.exports = {
  stripe: functions.config().stripe.key
}
