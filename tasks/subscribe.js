/*
 * grunt-subscribe
 * https://github.com/happyCoda/grunt-subscribe
 *
 * Copyright (c) 2016 happyCoda
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('subscribe', 'Notifies when previous task has finished', function () {
    var options = this.options({
        evt: 'done',
        cb: null
      }),
      evt = options.evt,
      cb = options.cb;

    if (typeof cb === 'function') {
      grunt.event.on(evt, cb);
    }

    grunt.event.emit(evt, grunt.task._queue);
  });

};
