'use strict';

var gulp = require('gulp'),
    //gulpif = require('gulp-if'),
    fs = require('fs'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-clean-css'),
    uncss = require('gulp-uncss'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    //ignore = require('gulp-ignore'),
    //rimraf = require('rimraf'),
    gulpRimraf = require('gulp-rimraf'),
    gSvg2png = require('gulp-svg2png' ),
    svgSprite = require('gulp-svg-sprite'),
    sass = require('gulp-sass'),
    //concat = require('gulp-concat' ),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gutil = require("gulp-util"),
    // webpack = require("gulp-webpack");
    webpack = require("webpack");

var path = {
    // Origin folder with img-s for svg sprite
    sprites: {
        spritesOrigin: 'sprites/**/*.svg'
    },
    // Builds
    build: {
        html: 'build/',
        js: 'build/js/',
        plugins: 'build/plugins/',
        style: 'build/css/',
        img: 'build/img/',
        spriteOut: 'build/img/sprites/',
        fonts: 'build/fonts/'
    },
    // Sources
    src: {
        html: 'src/*.html', // all .html
        htmlInit: 'src/',
        js: 'src/js/*.js',
        jsInit: 'src/js/',
        plugins: 'src/plugins/',
        sass: 'src/sass/**/*.scss',
        style: 'src/sass/',
        img: 'src/img/**/*.*',
        spriteOut: 'src/img/sprites/',
        sprites: 'src/img/spritesImg/',
        outputSpriteName: 'sprite.svg',
        fonts: 'src/fonts/**/*.*'
    },
    // Watch for...
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        plugins: 'src/jspm_packages/**/*.*',
        sass: 'src/sass/**/*.scss',
        bundleStyle: 'src/sass/**/*.css',
        img: 'src/img/**/*.*',
        sprites: 'src/img/spritesImg/',
        spritesOrigin: 'sprites/**/*.svg',
        fonts: 'src/fonts/**/*.*'
    },
    // Remove folder
    clean: {
        build:'./build/',
        sprites: 'src/img/spritesImg/**/*.*'
    }
};

var configSvgSprite = {
    shape: {
		//dimension		: {			// Set maximum dimensions
        //    maxWidth	: 32,
        //    maxHeight	: 32
        //},
        spacing: {
            padding: -1 // increase or decrease the size of Icon
        }
    },
    mode: {
        css: {
            dest: "./",
            layout: "diagonal", // Diagonal is the only layout where all browsers behaved the same
            sprite: path.src.outputSpriteName,
            bust: false,
            render: {
                scss: {
                    dest: "../../sass/_sprite.scss",
                    template: "template/style/sprite-template.scss"
                }
            }
        }
    },
    variables: {
        mapname: "icons"
    }
};

// Webserver config
var config = {
    server: {
        baseDir: "./build"
    },
    // Tunnel freq. sourse of errors, use for presentation only
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

// Gulp tasks

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true})); // Reload server
});

// svg sprite create
gulp.task('svg:sprite', function () {
    return gulp.src( path.src.sprites + "*.svg" )
        .pipe(svgSprite(configSvgSprite))
        .pipe(gulp.dest(path.src.spriteOut))
        .pipe(imagemin({ // Compress images
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.spriteOut))
        .pipe(gSvg2png())
        .pipe(gulp.dest(path.src.spriteOut))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.spriteOut))
        .pipe(reload({stream: true}));
});

// Copy origin svg files from source
gulp.task('sprite:reBuild', function() {
    gulp.src(path.sprites.spritesOrigin)
        .pipe(gulp.dest(path.src.sprites));
    setTimeout( function () {
        gulp.start('svg:sprite');
    }, 500);
});

gulp.task('image:build', function () {
    return gulp.src([path.src.img, '!' + path.src.sprites + "**", '!' + path.src.spriteOut + "**"])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('js:dev', function () {
    return gulp.src([path.src.jsInit + '*.js', path.src.jsInit + '*.ts'])
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    return gulp.src([path.src.jsInit + '*.js', path.src.jsInit + '*.ts'])
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

// gulp.task("webpack:dev", function() {
//     return gulp.src(path.src.jsInit + '*.js')
//         .pipe(webpack( require('./webpack.config.js') ));
//         // .pipe(gulp.dest(path.build.js));
// });

gulp.task('bundle_css:dev', function () {
    gulp.src( [path.src.style + '*.css'])
        .pipe(gulp.dest(path.build.style));
});

    gulp.task('css:dev', function () {
    return gulp.src(path.src.sass)
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))        // Compile
        //.pipe(autoprefixer({ // Add vendor pref.
        //    browsers: ['> 1%'],
        //    cascade: false
        //}))
        .pipe(gulp.dest(path.build.style))
        //remove unused CSS
        //.pipe(uncss({
        //    html: ['build/index.html'],
        //    timeout: 100,
        //    ignore: [
        //        "active",
        //        "checked",
        //        "default",
        //        "dir",
        //        "disabled",
        //        "empty",
        //        "enabled",
        //        "first",
        //        "first-child",
        //        "first-of-type",
        //        "focus",
        //        "fullscreen",
        //        "hover",
        //        "in-range",
        //        "indeterminate",
        //        "invalid",
        //        "lang",
        //        "last-child",
        //        "last-of-type",
        //        "left",
        //        "link",
        //        "not",
        //        "nth-child",
        //        "nth-last-child",
        //        "nth-last-of-type",
        //        "nth-of-type",
        //        "only-child",
        //        "only-of-type",
        //        "optional",
        //        "out-of-range",
        //        "read-only",
        //        "read-write",
        //        "required",
        //        "right",
        //        "root",
        //        "scope",
        //        "target",
        //        "valid",
        //        "visited",
        //        "after",
        //        "before",
        //        "first-letter",
        //        "first-line",
        //        "selection",
        //        "/^#js/"
        //    ]}))
        //.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
    return gulp.src(path.src.style)
        .pipe(sass().on('error', sass.logError))
        // .pipe(autoprefixer({
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

// Copy fonts into build
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('plugins', function() {
    return gulp.src([
        // path.src.plugins + "jspm_config.js",
        // path.src.plugins + "system.src.js"
        path.src.plugins + '**/*.*'
        //path.src.plugins + '**/npm/**/dist/**/*.min.js',
        //path.src.plugins + '**/npm/**/dist/**/*.js',
        //path.src.plugins + '*.js',
        //path.src.plugins + '**/dist/**/*.min.css',
        //path.src.plugins + '**/npm/*.min.css',
        //path.src.plugins + '**/npm/**/dist/**/*.css'
    ])  // , { dot: true } to copy .bower.json etc
        .pipe(gulp.dest(path.build.plugins));
});

//Watcher's preset for 'dev'.

gulp.task('watch:dev', function(event, cb){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('css:dev');
    });
    watch([path.watch.bundleStyle], function(event, cb) {
        gulp.start('bundle_css:dev');
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

// Browser synchronization
gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
	return gulp.src([path.clean.build + '**/*.*', path.clean.sprites, '!' + path.clean.build + '/.git/**'], { read: false }) // Setting option read to false
                                                                                  // prevents gulp to read the contents
                                                                                  // of the files and makes this task
                                                                                  // much faster.
   .pipe(gulpRimraf());
});

gulp.task('svg:clean', function (cb) {
    return gulp.src(path.clean.sprites, { read: false })
   .pipe(gulpRimraf());
});

gulp.task('dev', [
    'sprite:reBuild',
    'html:build',
    'js:dev',
    'css:dev',
    'bundle_css:dev',
    'fonts:build',
    'plugins',
    'image:build'
]);

gulp.task('build', [
    'sprite:reBuild',
    'html:build',
    'js:build',
    'css:build',
    'bundle_css:dev',
    'fonts:build',
    'plugins',
    'image:build'
]);

// Default task
gulp.task('default', [
    'dev',
    'webserver',
    'watch:dev'
]);
 // Production task

gulp.task('prod', [
    'build',
    'webserver',
    'watch:dev'
]);
