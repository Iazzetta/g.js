const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const del = require("del");
const terser = require('terser');
const gulpTerser = require('gulp-terser');

const paths = {
    source: "./src",
    build: "./dist"
};
function javascriptBuild() {
    return (
        gulp.src([
            `${paths.source}/g.js`
        ])
        .pipe(gulpTerser({keep_fnames: false}, terser.minify))
        .pipe(gulp.dest(`${paths.build}`))
    );
}
function cssBuild() {
    return gulp
        .src([
            `${paths.source}/g.css`
        ])
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest(`${paths.build}`))
}

function cleanup() {
    return del([paths.build]);
}
exports.default = exports.build = gulp.series(cleanup, gulp.parallel(javascriptBuild, cssBuild));