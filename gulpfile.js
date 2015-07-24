var gulp       = require('gulp'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    plug       = require('gulp-load-plugins')({
                  scope: ['devDependencies'],
                  replaceString: 'gulp-',
                 });

//  default gives us a watch & livereload & starts server
gulp.task( 'default', ['reload-me', 'serve-me'] )

//  Reload/Watch task
gulp.task( 'reload-me', function(){

  plug.livereload.listen();
  gulp.watch( ['app/**/*.css', 'app/**/*.js', 'app/*.html'], function(){
    console.log("Reloading the page!");
  })
  .on('change', plug.livereload.changed);

  gulp.watch( ['app/css/*.less', 'app/js/**/*.js', '!app/js/bundle.js'], ['compile-css', 'js-bundle'] )

});

//  Server, using Connect
gulp.task( 'serve-me', function(){

  plug.connect.server({
          root: './',
          port: 6969
        });

});

//  CSS compile/Autoprefix
gulp.task( 'compile-css', function(){

  return gulp.src('app/css/*.less')
          .pipe(plug.less())
          .pipe(plug.autoprefixer({
              browsers: [ 'last 2 versions' , '> 5%' ]
            }))
          .pipe(gulp.dest('app/css/'));

});

//  BUILD SHIT
gulp.task( 'build', [ 'js-bundle', 'js-minify', 'build-css', 'html-me', 'move-shit' ] )



/// JS TASKS
gulp.task( 'js-minify', [ 'js-bundle' ], function(){

  return gulp.src( 'app/js/bundle.js' )
          .pipe(plug.concat( 'app.js' ))
          .pipe(plug.uglify())
          .pipe(gulp.dest('./build/js/'));

});


/////// BROWSERIFY BUNDLE
gulp.task( 'js-bundle', function(){

  return browserify('./app/js/main.js')
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(gulp.dest('./app/js/'));

});



//  CSS TASKS
gulp.task( 'build-css', [ 'compile-css' ], function(){

  return gulp.src( './app/css/style.css' )
    .pipe( plug.minifyCss() )
    .pipe( gulp.dest( './build/css/' ) );

});



//HTMLMOVE/REPLACE
gulp.task( 'html-me', function(){

  return gulp.src( 'app/index.html' ).pipe(plug.htmlReplace({
              css: {
                src: 'css/style.css',
                tpl: '  <link rel="stylesheet" type="text/css" href="%s" />'
              },
              js: {
                src: 'js/app.js',
                tpl: '  <script type="text/javascript" src="%s"></script>'

              }
          }))
          .pipe(gulp.dest( 'build/' ));

});

gulp.task( 'move-shit', function(){

  gulp.src( './app/favicon.ico' )
    .pipe( gulp.dest( './build/' ) );

  gulp.src( './README.md' )
    .pipe( gulp.dest( './build/' ) );

  gulp.src( './app/CNAME' )
    .pipe( gulp.dest( './build/' ) );

});


/// deploy dat app
gulp.task( 'deploy', [ 'build' ], function(){

  return gulp.src('./build/**/*')
          .pipe(plug.ghPages());

});





