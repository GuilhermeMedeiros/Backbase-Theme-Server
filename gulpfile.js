var PORT = 7878;

/*****************************************/

var gulp = require('gulp'),
	less = require('gulp-less'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps'),
	connect = require('gulp-connect'),
	cors = require('cors')

gulp.task('less', function() {
	gulp.src('src/main/webapp/**/base.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.tmp/theme/'))
		.pipe(livereload())
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(['**/*.less'], ['less'])
});

gulp.task('server', function(){
	connect.server({
		port: PORT,
		root: '.tmp',
		middleware: function(connect, opt) {
			return [cors()]
		}
	});
});

gulp.task('default', ['less', 'watch', 'server'])