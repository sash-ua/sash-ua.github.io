'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
	eslint = require('gulp-eslint'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
	uncss = require('gulp-uncss'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    ignore = require('gulp-ignore'),
    rimraf = require('rimraf'),
    gulpRimraf = require('gulp-rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    bower: {  // bower project packages
        components: 'bower_components'
    },
    build: { // builds
        html: 'build/',
        js: 'build/js/',
        plugins: 'build/plugins/',
        style: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { // sources
        html: 'src/*.html', // all .html
        htmlInit: 'src/',
        js: 'src/js/*.js',
        jsInit: 'src/js/',
        plugins: 'src/plugins/',
        style: 'src/css/*.css',
        styleInit: 'src/css/',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { // watch for...
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        plugins: 'src/plugins/**/*.*',
        style: 'src/css/**/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build/',  // remove folder
};

// webserver config
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

// read dependencies in bower.json and copy dep. to 'src/plugins'
function readDep(){
    var obj;
    var data  = fs.readFileSync('bower.json', 'utf8');
    if(data) {
        obj = JSON.parse(data);
    } else {
        console.log('Error 1');
    }
    for (var k in obj.dependencies) {
        var depPathFrom = 'bower_components/' + k + '/**/*.*';
        var depCheckPath = path.src.plugins + k + '/';
        copyFiles(depCheckPath, depPathFrom, k);
    }
    for (var j in obj.devDependencies) {
        var devDepPathFrom = 'bower_components/' + j + '/**/*.*';
        var devDepPheckPath = path.src.plugins + j + '/';
        copyFiles(devDepPheckPath, devDepPathFrom, j);
    }
}

function copyFiles(checkPath, from, to) {
    try  {
        return fs.statSync(checkPath).isFile() || fs.statSync(checkPath).isDirectory();
    }
    catch (e) {
        if (e.code == 'ENOENT') { // no such file or directory.
            gulp.src(from, { dot: true })
                .pipe(gulp.dest(path.src.plugins + to));
            return;
        } else if (e.code == 'EPERM'){
            console.log("Exception fs.statSync (" + checkPath + "): " + e);
            return;
        }
    }
}

// gulp tasks
gulp.task('plugin:init', function () {
    readDep();
});

// init phase, add templates to main files + index.html
gulp.task('fs:init', function () {
    gulp.src(path.src.html) // choose initial html files
        .pipe(rigger()) // apply rigger
        .pipe(gulp.dest(path.src.htmlInit)); // save into src
    gulp.src(path.src.style) // choose initial css files
        .pipe(rigger()) // apply rigger
        .pipe(gulp.dest(path.src.styleInit)); // save into src
    gulp.src(path.src.js) // choose initial js files
        .pipe(rigger()) // apply rigger
        .pipe(gulp.dest(path.src.jsInit)); // save into src
});

// init phase, include bower dependencies in project
gulp.task('proj:init', function(){
    gulp.start('plugin:init');
    setTimeout(function(){
        gulp.start('fs:init');
    }, 1000);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) // choose initial html files
        .pipe(rigger()) // apply rigger
        .pipe(gulp.dest(path.build.html)) // save into build
        .pipe(reload({stream: true})); // reload server
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({ // compress images
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('js:dev', function () {
    gulp.src(path.src.js)// choose initial js files
        .pipe(sourcemaps.init()) // initialize sourcemap
        .pipe(rigger()) // use rigger
        .pipe(sourcemaps.write()) // write sourcemap
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('css:dev', function () {
    gulp.src(path.src.style) // choose initial css files
        .pipe(sourcemaps.init())
		.pipe(rigger())
        //.pipe(sass())        // compile
        //.pipe(autoprefixer({ // add vendor pref.
        //    browsers: ['> 1%'],
        //    cascade: false
        //}))
        .pipe(gulp.dest(path.build.style))
        //remove unused CSS
        .pipe(uncss({
            html: ['build/index.html'],
            timeout: 100,
            ignore: [
                "active",
                "checked",
                "default",
                "dir",
                "disabled",
                "empty",
                "enabled",
                "first",
                "first-child",
                "first-of-type",
                "focus",
                "fullscreen",
                "hover",
                "in-range",
                "indeterminate",
                "invalid",
                "lang",
                "last-child",
                "last-of-type",
                "left",
                "link",
                "not",
                "nth-child",
                "nth-last-child",
                "nth-last-of-type",
                "nth-of-type",
                "only-child",
                "only-of-type",
                "optional",
                "out-of-range",
                "read-only",
                "read-write",
                "required",
                "right",
                "root",
                "scope",
                "target",
                "valid",
                "visited",
                "after",
                "before",
                "first-letter",
                "first-line",
                "selection",
                "/^#js/"
            ]}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

gulp.task('css:build', ['html:build'], function () {
    gulp.src(path.src.style)
		.pipe(rigger())
        //.pipe(sass())
        //.pipe(autoprefixer({
        //    browsers: ['> 1%'],
        //    cascade: false
        //}))
        .pipe(gulp.dest(path.build.style))
        .pipe(uncss({
            html: ['build/index.html'],
            timeout: 100,
            ignore: [
                "active",
                "checked",
                "default",
                "dir",
                "disabled",
                "empty",
                "enabled",
                "first",
                "first-child",
                "first-of-type",
                "focus",
                "fullscreen",
                "hover",
                "in-range",
                "indeterminate",
                "invalid",
                "lang",
                "last-child",
                "last-of-type",
                "left",
                "link",
                "not",
                "nth-child",
                "nth-last-child",
                "nth-last-of-type",
                "nth-of-type",
                "only-child",
                "only-of-type",
                "optional",
                "out-of-range",
                "read-only",
                "read-write",
                "required",
                "right",
                "root",
                "scope",
                "target",
                "valid",
                "visited",
                "after",
                "before",
                "first-letter",
                "first-line",
                "selection",
                "/^#js/"
            ]}))
		.pipe(cssmin())
		.pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

// copy fonts into build
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('plugins', function() {
	gulp.src([path.src.plugins + '**/dist/**/*.min.js', 
	path.src.plugins + '**/dist/**/*.min.css', 
	path.src.plugins + '**/*.min.css',
	path.src.plugins + '**/dist/**/*.css', 
	path.src.plugins + '**/*.css' ])  // , { dot: true } to copy .bower.json etc
    .pipe(gulp.dest(path.build.plugins))
});

//watcher's preset for dev.
gulp.task('watch:dev', function(event, cb){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('css:dev');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dev');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.plugins], function(event, cb) {
        gulp.start('plugins');
    });
});

// watcher's preset for production.
gulp.task('watch:build', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.plugins], function(event, cb) {
        gulp.start('plugins');
    });
});

// browser synchronization
gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
	gulp.src([path.clean + '**/*.*', '!' + path.clean + '/.git/**'], { read: false }) // Setting option read to false prevents gulp to read the contents of the files and makes this task much faster. 
   .pipe(gulpRimraf());
});

gulp.task('dev', [
    'html:build',
    'js:dev',
    'css:dev',
    'fonts:build',
    'plugins',
    'image:build'
]);

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'plugins',
    'image:build'
]);

// default task
gulp.task('default', [
    'dev',
    'webserver',
    'watch:dev'
]);
 // production task

gulp.task('prod', [
    'build',
    'webserver',
    'watch:dev'
]);
