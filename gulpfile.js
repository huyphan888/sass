//khai bao bien
gulp = require('gulp');
connect = require('gulp-connect');
sass = require('gulp-sass');
notify = require('gulp-notify');
plumber = require('gulp-plumber');
fileinclude = require('gulp-file-include');
sourcemaps = require('gulp-sourcemaps');

//connect localhost:8080
gulp.task('connect', function() {
	connect.server({
		root: 'public',
		livereload: true
	});
});
//livereload
gulp.task('reload', function () {
	gulp.src('public/**/*.html')
	.pipe(gulp.dest('public'))
	.pipe(connect.reload());
});
gulp.task('reload-include', function () {
	gulp.src(['html/index.html'])
	.pipe(plumber())
	.pipe(fileinclude({
		prefix: '@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('public'))
	.pipe(connect.reload());
});
//scss->css
gulp.task('compile', function () {
	gulp.src('sass/style.scss')
	.pipe(sourcemaps.init())
	.pipe(plumber({ errorHandler: function(err) {
		notify.onError({
			// title: "File sass bị lỗi",
			// message:  err.toString()
		})(err);
            // gutil.beep();
        }}))
	.pipe(sass())
	.pipe(sass.sync({outputStyle:'expanded'}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('public/css'))
});

gulp.task('watch', function () {
	gulp.watch(['sass/**/*.scss'], ['compile','reload']);
	gulp.watch(['html/**/*.html'], ['reload-include']);


});
//gan task default
gulp.task('default', ['connect','watch']);

