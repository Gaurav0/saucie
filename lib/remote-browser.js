/**
 * JavaScript tests integration with Sauce
 * https://saucelabs.com/docs/javascript-unit-tests-integration
 */
var webdriver = require('wd');
var util = require('util');

module.exports = function(desired, auth, url) {
  var browser = webdriver.remote("ondemand.saucelabs.com", 80, auth.username, auth.accessKey);
  var initAsync = util.promisify(browser.init.bind(browser));

  var pendingHeartBeat;
  var heartbeat = function() {
    pendingHeartBeat = setTimeout(function() {
      browser.title();
      heartbeat();
    }, 60000);
  };

  return initAsync(desired).then(function () {
    console.log("# Created remote browser.");

    heartbeat();

    var getAsync = util.promisify(browser.get.bind(browser));

    return getAsync(url).then(function () {
      return {
        value: browser,
        dispose: function() {
          clearTimeout(pendingHeartBeat);
          return util.promisify(browser.quit.bind(browser))().then(function() {
            console.log("# Closed remote browser.");
          });
        }
      };
    });
  });
};
