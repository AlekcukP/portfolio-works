const { dest, src, parallel, watch, series, gulp } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();

function copyScss (){
    return src('./src/css/*.scss').pipe(sass()).pipe(concat('style.css')).pipe(csso()).pipe(dest('./dist'));
}

function copyHtml(){
    return src('./src/index.html').pipe(dest('./dist'));
}

function copyJs(){
    return src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('./dist'))
}

function copyFonts (){
    return src('./src/fonts/*.ttf').pipe(dest('./dist/fonts'));
}

function copySvg(){
    return src('./src/pics/svg/*.svg').pipe(dest('./dist/pics/svg'));
}

function copyPng(){
    return src('./src/pics/png/*.png').pipe(dest('./dist/pics/png'));
}

function watchFiles(cb) {
    watch('./src/js/*.js', copyJs);
    watch('./src/*.html', copyHtml);
    watch('./src/css/*.scss', copyScss);
    cb();
}

function server(cb) {
    browsersync.init({
        server: {
            baseDir: './dist',
        },
    });

    watch('./src/js/*.js', series(copyJs, reloadBrowser));
    watch('./src/*.html', series(copyHtml, reloadBrowser));
    watch('./src/css/*.scss', series(copyScss, reloadBrowser));
    cb();
}

function copyCss(){
    return src('./src/css/*.css').pipe(csso()).pipe(concat('reset.css')).pipe(dest('./dist'));
}

function reloadBrowser(cb) {
    browsersync.reload();
    cb();
}

function copyVendors(){
    return src('./node_modules/jquery/dist/jquery.min.js').pipe(rename('vendor.js')).pipe(dest('./dist'))
}

module.exports.watch = series([
    copyHtml,
    copyScss,
    copyVendors,
    copyJs,
    copyFonts,
    copyPng,
    copySvg,
    copyCss,
    watchFiles
]);

module.exports.serve = series(copyHtml, copyScss, copyVendors, copyJs, copyPng, copySvg, copyFonts, copyCss, server);