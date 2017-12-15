/// <binding BeforeBuild='build' />
"use strict";

const fs = require('fs'),
    del = require('del'),
    path = require('path'),
    gulp = require('gulp'),
    iF = require('gulp-if'),
    less = require('gulp-less'),
    // sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    tslint = require('gulp-tslint'),
    tsc = require('gulp-typescript'),
    replace = require('gulp-replace'),
    jsMinify = require('gulp-uglify'),
    ghPages = require('gulp-gh-pages'),
    tsconfig = require('gulp-ts-config'),
    coveralls = require('gulp-coveralls'),
    sourcemaps = require('gulp-sourcemaps'),
    cssPrefixer = require('gulp-autoprefixer'),
    merge = require('merge-stream');

const SystemBuilder = require('systemjs-builder');
const tsProject = tsc.createProject('tsconfig.json');

const buildDir = "wwwroot";
var NG_ENVIRONMENT = process.env.NG_ENVIRONMENT || '';
var BUILD = process.env.BUILD || 'local';
var APIENDPOINT = process.env.APIENDPOINT || '/api/';
var LANDMARK = process.env.LANDMARK || '/api/landmark';
var ATTRACTION = process.env.ATTRACTION || '/api/attraction';
var MAPSAPI = process.env.MAPSAPI || '/api/maps';
var REPORTSAPI = process.env.REPORTSAPI || '/api/reports';

//OAuth
var AUTHORITY = process.env.AUTHORITY || '';
var CLIENT_ID = process.env.CLIENT_ID || '';
var REDIRECT_URI = process.env.REDIRECT_URI || '';
var RESPONSE_TYPE = process.env.RESPONSE_TYPE || '';
var SCOPE = process.env.SCOPE || '';
var POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI || '';

var build = false;
process.argv.forEach(function (val, index, array) {
    if ('build' === val) {
        build = true;
    }
});
/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del([buildDir, '.tmp'], cb);
});

gulp.task('ghpage', function () {
    return gulp.src('./' + buildDir + '/**/*')
        .pipe(ghPages());
});

/**
 * Compile all SASS files.
 */
gulp.task('sass', function () {
    return gulp.src('src/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(buildDir, "css")));
});

/**
 * Compile all Less files.
 */
gulp.task("less", function () {
    return gulp
        .src(["src/less/*.less", "src/less/themes/*.less"])
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(buildDir, "css")));
});

/**
 * Compile all Less files.
 */
gulp.task("addonless", function () {
    return gulp
        .src(["src/less/addons/*.less"])
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(buildDir, "css")));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});


/**
 * Compile TypeScript sources in build directory.
 */

gulp.task('shims', () => {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'
    ])
        .pipe(concat('shims.js'))
        .pipe(iF(build, jsMinify()))
        .pipe(gulp.dest(path.join(buildDir, 'js')));
});

gulp.task('ace', () => {
    return gulp.src([
        'node_modules/ace-builds/src-min/ace.js',
        'node_modules/ace-builds/src-min/ext-*.js',
        'node_modules/ace-builds/src-min/theme-eclipse.js',
        'node_modules/ace-builds/src-min/mode-xml.js',
        'node_modules/ace-builds/src-min/worker-xml.js'
    ])
        .pipe(gulp.dest(path.join(buildDir, 'js')));
});


gulp.task('tsc', ['tslint'], () => {
    var tsDest = (NG_ENVIRONMENT === 'Dev') ? (buildDir + '/app') : '.tmp/src/app';
    var tsProject = tsc.createProject('tsconfig.json'),
        tsResult = tsProject.src().pipe(tsProject());
    // .pipe(tsc(tsProject));

    return tsResult.js.pipe(gulp.dest(tsDest));
});

gulp.task('compile', ['tsc'], () => {
    if (NG_ENVIRONMENT !== 'Dev') {
        var builder = new SystemBuilder();
        return builder.loadConfig('systemjs.config.js')
            .then(() => builder.buildStatic('app', path.join(buildDir, 'js', 'bundle.js')));
    }
    return;
});


/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["!src/index.pug", "!src/less", "!src/less/**/*", "!**/*.ts", "src/**/*"])
        .pipe(gulp.dest(buildDir));
});


/**
 * Copy all required fonts into build directory.
 */
gulp.task('fonts', () => {
    return gulp.src([
        'bootstrap/fonts/**',
        'font-awesome/fonts/**',
        'simple-line-icons/fonts/**'
    ], { cwd: 'node_modules' })
        .pipe(gulp.dest(path.join(buildDir, 'fonts')));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', () => {
    gulp.watch(['src/**/**.ts'], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(['src/**/**.html', 'src/**/*.css', 'src/img/*.*'], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
    gulp.watch(['src/**/**.less'], ['less']).on('change', function (e) {
        console.log('LESS file ' + e.path + ' has been changed. Updating.');
    });
    // gulp.watch(['src/**/**.scss'], ['less']).on('change', function(e) {
    //   console.log('SASS file ' + e.path + ' has been changed. Updating.');
    // });
});

gulp.task('appsettings', function (cb) {
    var build = 'build: ' + BUILD;
    var ng2ENV = '\nng2ENV: ' + NG_ENVIRONMENT;
    var apiendpoint = '\nApiEndpoint: ' + APIENDPOINT;
    var landmark = '\nApiLandmarks: ' + LANDMARK;
    var maps = '\nApiMaps: ' + MAPSAPI;
    var reports = '\nApiReports: ' + REPORTSAPI;
    var attraction = '\nApiAttraction: ' + ATTRACTION;
    return fs.writeFile('appsettings.yml', build + ng2ENV + apiendpoint + landmark + maps + reports + attraction, cb);
});

gulp.task('api', function () {
    return gulp.src('appsettings.yml')
        .pipe(tsconfig('AppSettings', JSON.parse('{"parser": "yml"}')))
        .pipe(gulp.dest('./src/app/routes'))
});

gulp.task('bundle', function () {
    var bundleTpl;
    if (NG_ENVIRONMENT === 'Dev') {
        bundleTpl = `script(type='text/javascript', src='systemjs.config.js')
  script.
    System.import(\'app\').catch(function(err) {console.error(err);});`;
    } else {
        bundleTpl = "script(type='text/javascript', src='js/bundle.js')";
    }

    return gulp.src('src/index.pug')
            .pipe(replace('<!--bundleTpl-->', bundleTpl))
            .pipe(gulp.dest(buildDir));
});

gulp.task('systemjs', function () {
    if (NG_ENVIRONMENT === 'Dev') {
        return gulp.src('systemjs.config.js')
            .pipe(replace('.tmp/src/app', 'app'))
            .pipe(gulp.dest(buildDir));
    }
    return;
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("node_modules", () => {
    if (NG_ENVIRONMENT === 'Dev') {
        return gulp.src([
            'rxjs/**',
            'core-js/**',
            'zone.js/dist/**',
            'systemjs/dist/**',
            //'ng2-select/**',
            // 'ng2-dnd/**',
            'ngx-infinite-scroll/**',
            // 'angular2-toaster/**',
            // 'angular2-google-maps/**',
            // 'ng2-translate/**',
            //'ng2-table/**',
            'ngx-bootstrap/**',
            'screenfull/**',
            'jquery/**',
            'jquery.browser/**',
            'moment/**',
            '@angular/**',
            'ng2-ace-editor/**',
            'brace/**',
            'systemjs-plugin-babel/**',
            'angular-oauth2-oidc/**',
            'jsrsasign/**',
            'tslib/**',
            'ng2-validation/**',
            'libphonenumber-js/**'
        ], { cwd: "node_modules/**" }) /* Glob required here. */
            .pipe(gulp.dest(path.join(buildDir, "node_modules")));
    }
    return;
});

/**
 * Build the project.
 */
gulp.task("build", [
    'appsettings',
    'api',
    'compile',
    'shims',
    'ace',
    'less',
    'addonless',
    // 'sass',
    'fonts',
    'resources',
    'node_modules',
    'systemjs',
    'bundle'
], () => {
    console.log('Building the project ...');
    if (NG_ENVIRONMENT !== 'Dev') {
        return gulp.src(path.join(buildDir, 'js', 'bundle.js'))
            .pipe(iF(build, jsMinify()))
            .pipe(gulp.dest(path.join(buildDir, 'js')));
    }
    return;

});