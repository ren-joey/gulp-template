const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
// const browserify = require('browserify');
// const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer');
// const uglify = require('gulp-uglify');
const sync = require('browser-sync');
const rename = require('gulp-rename');

var paths = {
  output: './dist/',
  styles: './styles/',
  js: './js/',
  pug: './views/',
  modules: './node_modules/'
};

gulp.task('pug', function(){
  return gulp.src(paths.pug + '*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.output))
    .pipe(sync.reload({
      stream: true
    }))
});

gulp.task('styles', function(){
  return gulp.src(paths.styles + 'index.scss')
  .pipe(sass({
    outputStyle: 'expanded',
    includePaths: ['./node_modules']
  }))
  .pipe(prefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
    cascade: true
  }))
  .pipe(rename('main.css'))
  .pipe(gulp.dest(paths.output + 'styles/'))
  .pipe(sync.reload({
    stream: true
  }))
});

// gulp.task('js', function(){
//   return gulp.src(paths.js + '**/*.js')
//     .pipe(gulp.dest(paths.output + 'js/'))
//     .pipe(sync.reload({
//       stream: true
//     }))
// })

gulp.task('watch', function(){
  gulp.watch(paths.styles + '**/*.scss', ['styles']);
  gulp.watch(paths.pug + '**/*.pug', ['pug']);
  // gulp.watch(paths.js + '**/*.js', ['js']);
})

gulp.task('sync', function(){
  sync({
    server: {
      baseDir: paths.output
    },
    notify: false
  });
});

gulp.task('run', ['sync', 'watch']);
