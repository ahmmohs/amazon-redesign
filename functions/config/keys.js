const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  module.exports = require('./dev');
} else {
  module.exports = require('./prod');
}
  