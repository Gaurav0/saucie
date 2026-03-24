var util = require('util');
var launcher = require('sauce-connect-launcher');

var launcherAsync = util.promisify(launcher);

module.exports = function (config) {
  if (!config.connect) {
    return Promise.resolve({ value: null, dispose: function() { return Promise.resolve(); } });
  }

  return launcherAsync(config.launcherOptions()).then(function (sauceConnectProcess) {
    console.log("# Started Sauce Connect tunnel");
    return {
      value: sauceConnectProcess,
      dispose: function() {
        return util.promisify(sauceConnectProcess.close.bind(sauceConnectProcess))().then(function() {
          console.log("# Closed Sauce Connect tunnel");
        });
      }
    };
  });
};
