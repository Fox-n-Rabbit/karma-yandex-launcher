var fs = require('fs');

var YandexBrowser = function(baseBrowserDecorator, args) {
  baseBrowserDecorator(this);

  var flags = args.flags || [];

  this._getOptions = function(url) {
    // Yandex CLI options
    // http://peter.sh/experiments/chromium-command-line-switches/
    flags.forEach(function(flag, i) {
      if(isJSFlags(flag)) flags[i] = sanitizeJSFlags(flag);
    });

    return [
      '--user-data-dir=' + this._tempDir,
      '--no-default-browser-check',
      '--no-first-run',
      '--disable-default-apps',
      '--disable-popup-blocking',
      '--disable-translate'
    ].concat(flags, [url]);
  };
};

function isJSFlags (flag) {
  return flag.indexOf('--js-flags=') === 0;
}

function sanitizeJSFlags (flag) {
  var test = /--js-flags=(['"])/.exec(flag);
  if (!test) return flag;
  var escapeChar = test[1];
  var endExp = new RegExp(escapeChar + '$');
  var startExp = new RegExp('--js-flags=' + escapeChar);
  return flag.replace(startExp, '--js-flags=').replace(endExp, '');
}

// Return location of yandex.exe file for a given Yandex directory (available: "Yandex", "Yandex SxS").
function getYandexExe(yandexDirName) {
  // TODO (rachel.satoyama): fix windows
  if (process.platform !== 'win32') {
    return null;
  }
  var windowsYandexDirectory, i, prefix;
  var suffix = '\\Google\\'+ yandexDirName + '\\Application\\yandex.exe';
  var prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)']];

  for (i = 0; i < prefixes.length; i++) {
    prefix = prefixes[i];
    if (fs.existsSync(prefix + suffix)) {
      windowsYandexDirectory = prefix + suffix;
      break;
    }
  }

  return windowsYandexDirectory;
}

YandexBrowser.prototype = {
  name: 'Yandex',

  DEFAULT_CMD: {
    linux: 'google-yandex', //TODO (rachel.satoyama): fix linux
    darwin: '/Applications/Yandex.app/Contents/MacOS/Yandex',
    win32: getYandexExe('Yandex')
  },
  ENV_CMD: 'YANDEX_BIN'
};

YandexBrowser.$inject = ['baseBrowserDecorator', 'args'];


// PUBLISH DI MODULE
module.exports = {
  'launcher:Yandex': ['type', YandexBrowser],
};

module.exports.test = {
  isJSFlags: isJSFlags,
  sanitizeJSFlags: sanitizeJSFlags
}
