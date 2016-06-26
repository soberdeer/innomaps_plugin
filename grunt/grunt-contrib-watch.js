module.exports = function(grunt) {
    grunt.config('watch', {
        scripts: {
            files: [
                'src/js/**/*.js'
            ],
            tasks: [
                'jshint', 'copy:scripts'
            ]
        },
        html: {
            files: [
                'src/**/*.html',
                'src/components/**/*.html',
                'src/css/**/*.css'
            ],
            tasks: [
                'copy:html'
            ]
        }
    });
};
