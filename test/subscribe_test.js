'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.done = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    var actual,
      expected = true;

    test.expect(1);

    grunt.event.on('done', function (actual) {

      test.equal(actual, expected, 'all tasks should be complete');

      test.done();
    });

    grunt.event.emit('done', true);
  }
};
