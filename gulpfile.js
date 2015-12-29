var gulp = require('gulp'),
  //压缩js
   uglify = require('gulp-uglify');

  //语法校验
   jshint = require('gulp-jshint');

  //合并
   concat = require('gulp-concat');
  
  //本地启动webserver
   connect = require('gulp-connect');

  //less 和 sass
   sass = require('gulp-sass');

  //压缩img
   image = require('gulp-image');

  //压缩html
   htmlmin = require('gulp-htmlmin');


gulp.task('serve', function () {
	connect.server({
		livereload: true,
		port:9005
	})
});

gulp.task('watch',function(){
	gulp.watch(['./app/*.html','./js/*.js','./sass/*.scss'],['html'])

});
gulp.task('concat-js',function(){
	gulp.src('js/*.js')
   	  .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
})

gulp.task('sass',function(){
  gulp.src('./sass/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./css'));
})

gulp.task('image',function(){
  gulp.src('image/*')
  .pipe(image())
  .pipe(gulp.dest('tinyImage'));
})

//一个包含任务列表的数组，这些任务会在你当前任务运行之前完成，后执行异步回调
gulp.task('html',['concat-js','sass'],function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('minify', function() {
  return gulp.src('./app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});


gulp.task('default',['serve','watch','minify','image','sass','concat-js']);