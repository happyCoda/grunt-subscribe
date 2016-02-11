/*
 * grunt-subscribe
 * https://github.com/happyCoda/grunt-subscribe
 *
 * Copyright (c) 2016 happyCoda
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    subscribe: {
      options: {
        evt: 'foo'
      },
      dev: {}
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.event.on('foo', function (queue) {
    grunt.log.writeln('finished', queue);
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['subscribe', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
