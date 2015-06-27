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
          root: 'app/',
          port: 6969
        });

});


gulp.task( 'compile-css', function(){

  return gulp.src('app/css/*.less')
          .pipe(plug.less())
          .pipe(gulp.dest('app/css/'));

});
