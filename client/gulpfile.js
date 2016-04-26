var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var print = require('gulp-print');
var Q = require('q');

// == REPLACE VARS ========

var replaceVars = {
    storageTokenVarProd: "token",
    storageUserVarProd: "user",
    storageTokenVarDev: "tokendev",
    storageUserVarDev: "userdev"
};

// == MAIN MODULE NAME =======
var mainModuleName = "app";

// == PATH STRINGS ========

var paths = {
    baseDev: '/' + process.cwd().split('\\').pop() + '/dist.dev/',
    baseProd: '/' + process.cwd().split('\\').pop() + '/dist.prod/',
    scripts: ['app/**/*.module.js', 'app/**/*.js'],
    scriptsNoTests: ['app/**/*.module.js', 'app/**/*.js', '!app/**/*.test.js'],
    styles: './app/**/*.css',
    images: './app/assets/img/**/*',
    fonts: './app/assets/fonts/**/*',
    i18n: './app/assets/i18n/**/*',
    icon: './app/favicon.ico',
    index: './app/index.html',
    // fbpixel: './app/assets/indexscripts/fbpixel.html',
    // analytics: './app/assets/indexscripts/analytics.html',
    partials: ['app/**/*.html', '!app/index.html', '!app/assets/indexscripts/*.html', 'app/**/*.svg', '!app/assets/fonts/**/*.svg'],
    distDev: './dist.dev',
    distProd: './dist.prod',
    distScriptsProd: './dist.prod/scripts',
    scriptsDevServer: 'devServer/**/*.js'
};

// == PIPE SEGMENTS ========

var pipes = {};

pipes.orderedVendorScripts = function () {
    return plugins.order(['jquery.js', 'angular.js']);
};

pipes.orderedAppScripts = function () {
    return plugins.angularFilesort();
};

pipes.minifiedFileName = function () {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

pipes.scriptedTranslationsDev = function () {
    return gulp.src(paths.i18n)
        .pipe(plugins.angularTranslate('translations.js', {module: mainModuleName + '.core', standalone: false}))
        .pipe(gulp.dest(paths.distDev + '/core'));
};

pipes.scriptedTranslationsProd = function () {
    return gulp.src(paths.i18n)
        .pipe(plugins.angularTranslate('translations.js', {module: mainModuleName + '.core', standalone: false}));
};

pipes.validatedAppScripts = function () {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.validatedAppScriptsNoTests = function () {
    return gulp.src(paths.scriptsNoTests)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.replaceStorageVarNamesDev = function () {
    return pipes.validatedAppScripts()
        .pipe(plugins.injectString.replace('@inject:storagetokenvar', replaceVars.storageTokenVarDev))
        .pipe(plugins.injectString.replace('@inject:storageuservar', replaceVars.storageUserVarDev))
};

pipes.builtAppScriptsDev = function () {
    return pipes.replaceStorageVarNamesDev()
        .pipe(gulp.dest(paths.distDev));
};

pipes.replaceStorageVarNamesProd = function () {
    return pipes.validatedAppScriptsNoTests() // excluded tests
        .pipe(plugins.injectString.replace('@inject:storagetokenvar', replaceVars.storageTokenVarProd))
        .pipe(plugins.injectString.replace('@inject:storageuservar', replaceVars.storageUserVarProd))
};

pipes.builtAppScriptsProd = function () {
    var scriptedPartials = pipes.scriptedPartials();
    var scriptedTranslations = pipes.scriptedTranslationsProd();
    var validatedAppScripts = pipes.replaceStorageVarNamesProd();

    return es.merge(scriptedPartials, validatedAppScripts, scriptedTranslations)
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.min.js'))
        .pipe(plugins.ngAnnotate({
            // true helps add where @ngInject is not used. It infers.
            // Doesn't work with resolve, so we must be explicit there
            add: true
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.builtVendorScriptsDev = function () {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist.dev/bower_components'));
};

pipes.builtVendorScriptsProd = function () {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.validatedDevServerScripts = function () {
    return gulp.src(paths.scriptsDevServer)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.validatedPartials = function () {
    return gulp.src(paths.partials)
        .pipe(plugins.htmlhint({'doctype-first': false, 'attr-lowercase': false}))
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtPartialsDev = function () {
    return pipes.validatedPartials()
        .pipe(gulp.dest(paths.distDev));
};

pipes.scriptedPartials = function () {
    return pipes.validatedPartials()
        .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(plugins.ngHtml2js({
            moduleName: mainModuleName, declareModule: false
        }));
};

pipes.builtStylesDev = function () {
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtStylesProd = function () {
    return gulp.src(paths.styles)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(pipes.minifiedFileName())
        .pipe(gulp.dest(paths.distProd));
};

pipes.processedImagesDev = function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distDev + '/assets/img/'));
};

pipes.processedImagesProd = function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distProd + '/assets/img/'));
};

pipes.processedIconDev = function () {
    return gulp.src(paths.icon)
        .pipe(gulp.dest(paths.distDev));
};

pipes.processedIconProd = function () {
    return gulp.src(paths.icon)
        .pipe(gulp.dest(paths.distProd));
};

pipes.processedFontsDev = function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.distDev + '/assets/fonts/'));
};

pipes.processedFontsProd = function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.distProd + '/assets/fonts/'));
};

pipes.processedTranslationsDev = function () {
    return gulp.src(paths.i18n)
        .pipe(gulp.dest(paths.distDev + '/assets/i18n/'));
};

pipes.processedTranslationsProd = function () {
    return gulp.src(paths.i18n)
        .pipe(gulp.dest(paths.distProd + '/assets/i18n/'));
};

pipes.validatedIndex = function () {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

pipes.getFbPixelScript = function () {
    return gulp.src(paths.fbpixel);
};

pipes.getAnalyticsScript = function () {
    return gulp.src(paths.analytics);
};

pipes.builtIndexDev = function () {

    var orderedVendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    var orderedAppScripts = pipes.builtAppScriptsDev()
        .pipe(pipes.orderedAppScripts());

    var appStyles = pipes.builtStylesDev();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
        .pipe(plugins.injectString.replace('<!-- baserender -->', '<base href="' + paths.baseDev + '">'))
        .pipe(plugins.injectString.replace('<!-- mainModuleName -->', mainModuleName))
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtIndexProd = function () {

    var vendorScripts = pipes.builtVendorScriptsProd();
    var appScripts = pipes.builtAppScriptsProd();
    var appStyles = pipes.builtStylesProd();

    /*
     var fbpixelScript = pipes.getFbPixelScript();
     var analyticsScript = pipes.getAnalyticsScript();
     */

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
        .pipe(plugins.injectString.replace('<!-- baserender -->', '<base href="' + paths.baseProd + '">'))
        .pipe(plugins.injectString.replace('<!-- mainModuleName -->', mainModuleName))
        /*
         .pipe(plugins.inject(fbpixelScript, {
         starttag: '<!-- inject:fbpixel -->',
         transform: function (filePath, file) {
         return file.contents.toString('utf8');
         }
         }))
         .pipe(plugins.inject(analyticsScript, {
         starttag: '<!-- inject:analytics -->',
         transform: function (filePath, file) {
         return file.contents.toString('utf8');
         }
         }))
         */
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};

pipes.builtAppDev = function () {
    return es.merge(pipes.builtIndexDev(), pipes.builtPartialsDev(), pipes.scriptedTranslationsDev(), pipes.processedFontsDev(), pipes.processedImagesDev(), pipes.processedIconDev());
};

pipes.builtAppProd = function () {
    return es.merge(pipes.builtIndexProd(), pipes.processedFontsProd(), pipes.processedImagesProd(), pipes.processedIconProd());
};

// == TASKS ========

// removes all compiled dev files
gulp.task('clean-dev', function () {
    var deferred = Q.defer();
    del(paths.distDev, function () {
        deferred.resolve();
    });
    return deferred.promise;
});

// removes all compiled production files
gulp.task('clean-prod', function () {
    var deferred = Q.defer();
    del(paths.distProd, function () {
        deferred.resolve();
    });
    return deferred.promise;
});

// checks html source files for syntax errors
gulp.task('validate-partials', pipes.validatedPartials);

// checks index.html for syntax errors
gulp.task('validate-index', pipes.validatedIndex);

// moves html source files into the dev environment
gulp.task('build-partials-dev', pipes.builtPartialsDev);

// converts partials to javascript using html2js
gulp.task('convert-partials-to-js', pipes.scriptedPartials);

// runs jshint on the dev server scripts
gulp.task('validate-devserver-scripts', pipes.validatedDevServerScripts);

// runs jshint on the app scripts
gulp.task('validate-app-scripts', pipes.validatedAppScripts);

// moves app scripts into the dev environment
gulp.task('build-app-scripts-dev', pipes.builtAppScriptsDev);

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task('build-app-scripts-prod', pipes.builtAppScriptsProd);

// compiles app sass and moves to the dev environment
gulp.task('build-styles-dev', pipes.builtStylesDev);

// compiles and minifies app sass to css and moves to the prod environment
gulp.task('build-styles-prod', pipes.builtStylesProd);

// moves vendor scripts into the dev environment
gulp.task('build-vendor-scripts-dev', pipes.builtVendorScriptsDev);

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task('build-vendor-scripts-prod', pipes.builtVendorScriptsProd);

// validates and injects sources into index.html and moves it to the dev environment
gulp.task('build-index-dev', pipes.builtIndexDev);

// validates and injects sources into index.html, minifies and moves it to the dev environment
gulp.task('build-index-prod', pipes.builtIndexProd);

// builds a complete dev environment
gulp.task('build-app-dev', pipes.builtAppDev);

// builds a complete prod environment
gulp.task('build-app-prod', pipes.builtAppProd);

// cleans and builds a complete dev environment
gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtAppDev);

// cleans and builds a complete prod environment
gulp.task('clean-build-app-prod', ['clean-prod'], pipes.builtAppProd);

// clean, build, and watch live changes to the dev environment
gulp.task('watch-dev', ['clean-build-app-dev', 'validate-devserver-scripts'], function () {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV: 'development'}})
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function () {
        return pipes.builtIndexDev()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function () {
        return pipes.builtAppScriptsDev()
            .pipe(plugins.livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function () {
        return pipes.builtPartialsDev()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function () {
        return pipes.builtStylesDev()
            .pipe(plugins.livereload());
    });

});

// clean, build, and watch live changes to the prod environment
gulp.task('watch-prod', ['clean-build-app-prod', 'validate-devserver-scripts'], function () {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV: 'production'}})
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function () {
        return pipes.builtIndexProd()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function () {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    // watch hhtml partials
    gulp.watch(paths.partials, function () {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function () {
        return pipes.builtStylesProd()
            .pipe(plugins.livereload());
    });

});

// default task builds for prod
gulp.task('default', ['clean-build-app-prod']);
