# grunt-subscribe

> Emits events when previous tasks have been completed

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-subscribe --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-subscribe');
```

## The "subscribe" task

### Overview
In your project's Gruntfile, add a section named `subscribe` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  subscribe: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.evt
Type: `String`
Default value: `'done'`

A string value that is used specify an event to listen for.

#### options.callback
Type: `Function`
Default value: `null`

A callback function that is used to do something when target event occurs.

### Usage Examples

#### Default Options
In this example, the default options are used. So the event which `grunt-subscribe` will listen to will be – `done`, and since there is no callback provided, you must add event handler function manually inside of your Gruntfile.

```js
grunt.initConfig({
  subscribe: {
    options: {},
    test: {}
  },
});

grunt.on('done', function () {
  // Do something
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  subscribe: {
    options: {
      evt: 'New Year',
      cb: function () {
        grunt.log.writeln('Happy New Year!!!');
      },
    },
    test: {}
  },
});
```

#### Tasks queue
Grunt-subscribe also provides an `queue` argument, passing to callback function. This argument contains current task queue and may be used for task completion checks.

```js
grunt.initConfig({
  subscribe: {
    options: {
      evt: 'New Year',
      cb: function (queue) {
        grunt.log.writeln('queue:', queue); // => will output something like: queue: [ { placeholder: true } ]
      },
    },
    test: {}
  },
});
```

#### Examples
In the example below shown usage of `grunt-subscribe` for notifications when previous tasks has been complete.

```js
grunt.initConfig({
  jshint: {
    options: {
      jshintrc: '.jshintrc'
    },
    all: [
      'Gruntfile.js',
      'tasks/*.js',
      '<%= nodeunit.tests %>'
    ]
  },
  nodeunit: {
    tests: ['test/*_test.js']
  },
  subscribe: {
    options: {
      evt: 'all done',
      cb: function () {
        grunt.log.writeln('jshint task completed, nodeunit is about to start...');
      },
    },
    dev: {}
  },
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-nodeunit');
grunt.loadNpmTasks('grunt-subscribe');

grunt.registerTask('run', ['jshint:all', 'subscribe:dev', 'nodeunit']);
```

## Release History
* 2016-02-11   v0.1.0   First official release.
