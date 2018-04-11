"use strict";

// Modules
const gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  util = require('gulp-util'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  inlinesvg = require('postcss-inline-svg'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  gulpStylelint = require('gulp-stylelint'),
  tildeImporter = require('node-sass-tilde-importer'),
  changed = require('gulp-changed'),
  browserSync = require('browser-sync').create();

// Paths
const pathSrc = './src/**/*.scss';
const pathDist = './dist';
const production = !!util.env.production;

// SCSS
gulp.task('scss', function() {
  // Preprocessor
  let processors = [
    autoprefixer({ // Autoprefixer
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      remove: true
    }),
    inlinesvg({ // Inline SVG's
      path: './public/svg'
    }),
  ];

  if (production) {
    processors.push(
      cssnano({ // Minify
        zindex: false,
        reduceIdents: {
          keyframes: false
        },
        discardUnused: {
          keyframes: false
        }
      })
    )
  }

  return gulp.src(pathSrc)
      
             // Plumber prevents Gulp from breaking because of errors
             .pipe(plumber({
               errorHandler: function(error) {
                 console.log(error.message);
                 this.emit('end');
               }
             }))

             // Only compile the changed files
             .pipe(changed(pathDist))

             // Style Compiling Config.
             // TODO: Fix the massive amount of issues so we can renable this
             //.pipe(gulpStylelint({ // Linting
             //  reporters: [
             //    {
             //      formatter: 'string',
             //      console: true
             //    }
             //  ]
             //}))

             // Initiate Source Map
             .pipe(sourcemaps.init())

             // SASS Compiling
             .pipe(sass({
               importer: tildeImporter,
             }))

             // PostCSS Preprocessing
             .pipe(postcss(processors))

             // Write the Source Map
             .pipe(sourcemaps.write('.'))

             // Plumber Stop
             .pipe(plumber.stop())

             // Output
             .pipe(gulp.dest(pathDist));
});

// The Default Watcher
gulp.task('default', function() {
  gulp.watch(pathSrc, ['scss']);
});
