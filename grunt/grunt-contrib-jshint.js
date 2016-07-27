module.exports = function(grunt) {
  grunt.config('jshint', {
      all: [
        'src/js/**/*.js',
        './*.js',
        './*.json',
        'grunt/**/*.js'
      ],
      options: {
        debug: true,
        curly: true,
        eqeqeq: false,
        forin: true,
        freeze: true,
        maxdepth: 5,
        maxcomplexity: 5,
        maxparams: 5,
        maxstatements: 50,
        shadow: 'inner',
        predef: ['-Promise'],
        esnext: true,
        sub: true
      }
    });
};
