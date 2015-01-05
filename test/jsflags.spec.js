var launcher = require('../index');

describe('isJSFlags()', function() {
  var isJSFlags = launcher.test.isJSFlags;

  it('should return true if flag begins with --js-flags=', function() {
    expect(isJSFlags('--js-flags=--expose-gc')).toBe(true);
    expect(isJSFlags('--js-flags="--expose-gc"')).toBe(true);
    expect(isJSFlags("--js-flags='--expose-gc'")).toBe(true);
  });

  it('should return false if flag does not begin with --js-flags=', function(){
    expect(isJSFlags(' --js-flags=--expose-gc')).toBe(false);
    expect(isJSFlags('--js-flags"--expose-gc"')).toBe(false);
    expect(isJSFlags('--jsflags="--expose-gc"')).toBe(false);
  });
});


describe('sanitizeJSFlags()', function() {
  var sanitizeJSFlags = launcher.test.sanitizeJSFlags;

  it('should do nothing if flags are not contained in quotes', function() {
    expect(sanitizeJSFlags('--js-flags=--expose-gc')).toBe('--js-flags=--expose-gc');
  });

  it('should symmetrically remove single or double quote if wraps all flags', function() {
    expect(sanitizeJSFlags("--js-flags='--expose-gc'")).toBe("--js-flags=--expose-gc");
    expect(sanitizeJSFlags('--js-flags="--expose-gc"')).toBe('--js-flags=--expose-gc');
  });

  it('should NOT remove anything if the flags are not contained within quote', function() {
    expect(sanitizeJSFlags('--js-flags=--expose-gc="true"')).toBe('--js-flags=--expose-gc="true"');
    expect(sanitizeJSFlags("--js-flags=--expose-gc='true'")).toBe("--js-flags=--expose-gc='true'");
  });
});

