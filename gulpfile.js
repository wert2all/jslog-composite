const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');
const babel = require('gulp-babel');
const minify = require('gulp-minify-fork');
const concat = require('gulp-concat');
const packageConfig = require('./package.json');

const config = {
    build: {
        folder: 'dist/',
        filename: packageConfig.name + '.' + packageConfig.version
    },
    src: {
        folder: 'src/'
    }
};

// test tasks
gulp.task('test:clean', (cb) => cb());
gulp.task('test:check', (cb) => cb());

gulp.task('test:exec:acceptance', cb => cb());
gulp.task('test:exec:unit', (cb) => cb());
gulp.task('test:exec:static', () =>
    gulp.src(['**/*.js', '*.js', '!dist/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError()));

gulp.task('test:exec', gulp.parallel('test:exec:unit', 'test:exec:acceptance', 'test:exec:static'));
gulp.task('test:run', gulp.series(
    'test:clean',
    'test:exec',
    'test:check'
));

gulp.task('test', gulp.series('test:run'));
// end test tasks

// clean tasks
gulp.task('clean', () => {
    return del([config.build.folder + "/**/*"]);
});
// end clean tasks
//build tasks
gulp.task('build:minify', () => {
    return gulp.src(config.build.folder + config.build.filename + '.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
        }))
        .pipe(gulp.dest(config.build.folder));
});

gulp.task('build:compile', () => {
    return gulp.src(config.src.folder + '**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat(config.build.filename + '.js'))
        .pipe(gulp.dest(config.build.folder));
});

gulp.task('build:run', gulp.series('build:compile', 'build:minify'));
gulp.task('build', gulp.series('clean', 'test', 'build:run'));
//end build tassks
