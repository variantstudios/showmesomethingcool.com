'use strict';

var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    sass            = require('gulp-sass'),
    compass         = require('gulp-compass'),
    minifyCSS       = require('gulp-minify-css'),
    prefix          = require('gulp-autoprefixer'),
    cp              = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from assets/css into both _site/assets/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/**/*.scss')
        .pipe(sass({
            includePaths: ['assets/css'],
            onError: browserSync.notify
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('_site/assets/css'));
});

gulp.task('sass-deploy', function () {
    gulp.src('assets/css/**/*.scss')
        .pipe(sass({
            includePaths: ['assets/css'],
        }))
   .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(gulp.dest('assets/css'))
   .pipe(gulp.dest('_site/assets/css'));
});


gulp.task('compass', function() {
  gulp.src('assets/sass/*.scss')
    .pipe(compass({
      css: 'assets/css',
      sass: 'assets/sass',
      image: 'assets/images',
      require: ['breakpoint','singularitygs','toolkit','breakpoint']
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('assets/css'))
    .pipe(gulp.dest('_site/assets/css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    //gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
    gulp.watch(['**.md', '**.html'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

gulp.task('deploy', ['jekyll-build', 'sass-deploy']);
