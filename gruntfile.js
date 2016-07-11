module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: require('./package.json'),
    });
    grunt.loadTasks('grunt');

    grunt.registerTask('copyall', ['copy:html', 'copy:scripts', 'copy:lib', 'copy:img']);
    grunt.registerTask('build', ['jshint', 'clean', 'copyall']);
    grunt.registerTask('dev', ['build', 'express', 'watch']);
    grunt.registerTask('default', ['build']);
};
