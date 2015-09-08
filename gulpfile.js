var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
  HTML: 'src/index.html',
  ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
  JS: ['src/js/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist'
};

// TASK 1
// converted your JSX to JS, then outputted the results to a 
// new src folder in a new dist folder
gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

// TASK 2
// take index.html file and copy it over to dist folder
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// WATCH TASK
//watch will always be running so when we change either our 
//index.html or any of the JS files, our two tasks from earlier 
//will run and update the code in the dist folder
gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform', 'copy']);
});

// PRODUCTION TASKS
gulp.task('build', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(uglify({file:path.MINIFIED_OUT}))
    .pipe(gulp.dest(path.DEST_BUILD));
})

// Replace the code block enclosed in <!-- build:js --> code <!-- endbuild -->
// with <script src=”build/build.min.js”></script> without modifiying 
// the original index.html
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// DEFAULT TASK
gulp.task('default', ['watch']);

// PRODUCTION TASK
gulp.task('production', ['replaceHTML', 'build']);
