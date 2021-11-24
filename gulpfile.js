const gulp = require('gulp');
const gulpFileInclude = require('gulp-file-include');
const replace = require('gulp-token-replace');
const sass = require('gulp-sass')(require('sass'));
const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');

const paths = {
	scripts: {
		src: './dev',
		dest: './dist'
	}
};

const tsProject = ts.createProject("tsconfig.json");
const tokenReplaceConfig = require('./.tokenreplacerc.js');

gulp.task('bundleHTML', function() {
	return gulp.src(`${paths.scripts.src}/**/*.html`)
	.pipe(gulpFileInclude({
		prefix: '#@',
		basepath: '@file'
	}))
	.pipe(replace({global:tokenReplaceConfig}))
	.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('bundleImages', function() {
	return gulp.src(`${paths.scripts.src}/images/**/**/**/*`)
	.pipe(gulp.dest(`${paths.scripts.dest}/images`));
});

gulp.task('bundlePublic', function() {
	return gulp.src(`${paths.scripts.src}/public/**/**/**/*`)
	.pipe(gulp.dest(`${paths.scripts.dest}`));
});

gulp.task('bundleSASS', function() {
	return gulp.src(`${paths.scripts.src}/sass/**/**/**/*`)
	.pipe(sourcemaps.init())
	.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(`${paths.scripts.dest}/css`));
});

gulp.task('bundleFonts', function() {
	return gulp.src(`${paths.scripts.src}/fonts/**/**/**/*`)
	.pipe(gulp.dest(`${paths.scripts.dest}/fonts`));
});

gulp.task("bundleTS", function() {
	return tsProject.src()
	.pipe(sourcemaps.init())
	.pipe(tsProject()).js
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(`${paths.scripts.dest}/js`));
});

// gulp.task('bundleJS', function() {
	// 	return gulp.src(`${paths.scripts.src}/js/**/**/**/*`)
	// 		.pipe(gulp.dest(`${paths.scripts.dest}/js`));
	// });



	gulp.task('default', function() {
		gulp.watch(paths.scripts.src, gulp.parallel('bundleHTML', 'bundlePublic', 'bundleTS', 'bundleSASS', 'bundleFonts', 'bundleImages'));
	});
