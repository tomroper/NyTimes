var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('default', ['browser-sync']);


gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        proxy: '192.168.33.10/project2'
    });

    gulp.watch("./src/*.js", ['uglify']);
    gulp.watch('./src/*.scss', ['scss']);
    gulp.watch(['./build/**/*.*', 'index.html']).on('change', browserSync.reload);
});


gulp.task('scss', function() {
  return gulp.src('./src/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});


gulp.task('uglify', function(){
        gulp.src('./src/*.js') // What files do we want gulp to consume?
            .pipe(uglify()) // Call the uglify function on these files
            .pipe(gulp.dest('./build')) // Where do we put the result?
});
