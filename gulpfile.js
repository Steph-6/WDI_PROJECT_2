const gulp        = require('gulp');
const babel       = require('gulp-babel');
const sass        = require('gulp-sass');
const nodemon     = require('gulp-nodemon');
const cleanCSS 	  = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const imagemin    = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

gulp.task('es6', () => {
  return gulp.src('src/js/*.js')
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({ compatibility: 'ie8'}))
  .pipe(gulp.dest('public/css'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*.{png,jpg,jpeg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('public/images'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('public/fonts'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['es6', 'sass'], () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    browser: 'google chrome',
    port: 7000,
    reloadDelay: 500
  });

  return nodemon({ script: 'index.js'})
    .on('start', () => browserSync.reload());
});

gulp.task('default', ['sass', 'es6', 'images', 'fonts', 'serve'], () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['es6']);
  gulp.watch('src/images/**/*.{png,jpg,jpeg,gif,ico}', ['images']);
  gulp.watch('src/fonts/**/*.{eot,svg,ttf,woff,woff2}', ['fonts']);
  gulp.watch('**/*.html', browserSync.reload);
});

gulp.task('deploy', ['sass', 'es6', 'images', 'fonts']);
