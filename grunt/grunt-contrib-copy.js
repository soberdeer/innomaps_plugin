module.exports = function(grunt) {
    grunt.config('copy', {
        lib: {
            files: [{
                expand: true,
                cwd: 'bower_components/jquery/dist',
                src: ['jquery.min.js'],
                dest: 'build/js/lib'
            }, {
                expand: true,
                cwd: 'src/lib/js',
                src: ['**/*.js'],
                dest: 'build/js/lib'
            }]
        },
        scripts: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.js'],
                dest: 'build'
            }]
        },
        html: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.html', '**/*.css'],
                dest: 'build'
            }]
        }
    });
};
