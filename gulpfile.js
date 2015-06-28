var gulp = require('gulp'),
    plug    = require('gulp-load-plugins')({
                scope: ['devDependencies'],
                replaceString: 'gulp-',
              });


gulp.task( 'default', ['reload-me', 'serve-me'] )


gulp.task( 'reload-me', function(){

  plug.livereload.listen();
  gulp.watch( ['app/**/*.css', 'app/**/*.js', 'app/*.html'], function(){
    console.log("Reloading the page!");
  })
  .on('change', plug.livereload.changed);

  gulp.watch( ['app/css/*.less'], ['compile-css'] )

});


gulp.task( 'serve-me', function(){

  plug.connect.server({
          root: './',
          port: 6969
        });

});


gulp.task( 'compile-css', function(){

  return gulp.src('app/css/*.less')
          .pipe(plug.less())
          .pipe(plug.autoprefixer({
              browsers: [ 'last 2 versions' , '> 5%' ]
            }))
          .pipe(gulp.dest('app/css/'));

});

//  BUILD SHIT
gulp.task( 'build', [ 'require', 'build-css', 'html-me', 'move-shit' ] )

gulp.task( 'require', function(){

  return plug.requirejs({
      baseUrl: './app/js/',
      name:    'main',
      out:     'main.js'

    })
    .pipe(plug.uglify())
    .pipe(gulp.dest('./build/js/'));
});

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
              }
          }))
          .pipe(gulp.dest( 'build/' ));

});

gulp.task( 'move-shit', function(){

  gulp.src( './app/lib/**/*' )
    .pipe( gulp.dest( './build/lib' ) );

  gulp.src( './app/config.js' )
    .pipe( gulp.dest( './build/' ) );

});




