const gulp = require('gulp');
//-------------------sass build config---------------------

const sass = require('gulp-sass');

gulp.task('sass-build',() => {
  gulp
    .src('./public/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watchcss', ['sass-build','autoprefixer'], function () {
  gulp.watch('./public/sass/**/*.scss', ['sass-build','autoprefixer'])
});
//------------------css -------------------

const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');


gulp.task('autoprefixer', function () {
  gulp.src('public/stylesheets/style.css')
    .pipe(autoprefixer('ios 4', 'android 2.3'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/stylesheets/'))
});

//------------------iconfont build config-------------------

const iconfont    = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const fontName    = 'Icons';

gulp.task('iconfont',() => {
  gulp.src(['./public/iconfonts/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './public/sass/iconfont/_iconfont-tpl.scss',
      targetPath: '../sass/iconfont/_iconfont.scss',
      fontPath: '../iconfonts/'
    }))
    .pipe(iconfont({
      fontName: fontName
    }))
    .pipe(gulp.dest('./public/iconfonts/'));
});

//--------------------babel build es6 js file----------------------


const babel = require('gulp-babel');
 
gulp.task('es6-build', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      plugins: [
        "transform-strict-mode",
        "transform-es2015-modules-commonjs",
        "transform-es2015-spread",
        "transform-es2015-destructuring",
        "transform-es2015-parameters"
      ]
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('watches6', ['es6-build'], () => {
  gulp.watch('./src/**/*.js', ['es6-build'])
});