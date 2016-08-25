var gulp = require("gulp");
var gulp_tsc = require("gulp-typescript");
var gulp_sass = require('gulp-sass');
var gulp_watch = require('gulp-watch');

var scriptDir = "scripts/";
var styleDir = "styles/";
var testDir = "tests/";

gulp.task('sass', sass);
function sass(){
	var files = styleDir + "*.scss";

	return gulp.src(files, {base: "."})
		.pipe(gulp_sass({outputStyle: 'compressed'}).on('error', gulp_sass.logError))
		.pipe(gulp.dest("."));
}

gulp.task('tsc', tsc);
function tsc(){
	var tsProject= gulp_tsc.createProject("tsconfig.json");
	var files = scriptDir + "*.ts";

	return gulp.src(files, { base: "." })
		.pipe(gulp_tsc(tsProject))
		.js
		.pipe(gulp.dest("."));
}

gulp.task("build", ["tsc", "sass"]);
