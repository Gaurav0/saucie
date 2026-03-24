var util = require('util');
var sauceConnectLauncher = require('sauce-connect-launcher');
var sauceConnectLauncherAsync = util.promisify(sauceConnectLauncher);

module.exports = function connect(opts) {
  opts = Object.assign({}, {
    detached: true,
    connectRetries: 2,
    downloadRetries: 2
  }, opts);

  return sauceConnectLauncherAsync(opts);
};
