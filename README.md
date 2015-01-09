# karma-yandex-launcher

> Launcher for [Yandex Browser](http://browser.yandex.com), a Chromium-based browser from
Yandex, Russian largest search engine company.

## Installation

The easiest way is to keep `karma-yandex-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-yandex-launcher": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-yandex-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Yandex', 'Yandex_without_security'],

    // you can define custom flags, [here](http://peter.sh/experiments/chromium-command-line-switches/) you can find a list of Chromium command-line switches
    customLaunchers: {
      Yandex_without_security: {
        base: 'Yandex',
        flags: ['--disable-web-security']
      }
    }
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers Yandex
```

