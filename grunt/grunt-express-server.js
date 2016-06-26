module.exports = function(grunt) {
    grunt.config('express', {
          options: {
            port: 8090,
          },
          dev: {
            options: {
              script: 'server.js'
            }
          }
        });
};
