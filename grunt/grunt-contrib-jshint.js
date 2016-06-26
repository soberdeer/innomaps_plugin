module.exports = function(grunt) {
  grunt.config('jshint', {
      all: [
        'src/js/**/*.js',
        './*.js',
        './*.json',
        'grunt/**/*.js'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        forin: true,
        freeze: true,
        maxdepth: 5,
        maxcomplexity: 5,
        maxparams: 3,
        maxstatements: 50,
        shadow: 'inner',
        predef: ['-Promise'],
        esnext: true,
        sub: true
      }
    });
};
