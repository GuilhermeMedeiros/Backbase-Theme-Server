var THEME = 'default';
var THEME_PATH = 'theme/static/themes/'+THEME+'/';

/*****************************************/

var gulp = require('gulp'),
	less = require('gulp-less'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps'),
	connect = require('gulp-connect'),
	cors = require('cors')

gulp.task('less', function() {
	gulp.src(THEME_PATH + 'base.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(THEME_PATH))
		.pipe(livereload())
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(['**/*.less'], ['less'])
});

gulp.task('server', function(){
	connect.server({
		port: 7879,
		middleware: function(connect, opt) {
			return [cors()]
		}
	});
});

gulp.task('default', ['less', 'watch', 'server'])