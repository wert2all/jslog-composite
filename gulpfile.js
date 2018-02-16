const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('test:clean', (cb) => cb());
gulp.task('test:check', (cb) => cb());

gulp.task('test:exec:acceptance', cb => cb());
gulp.task('test:exec:unit', (cb) => cb());
gulp.task('test:exec:static', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(
        [
            '*.js'
        ])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('test:exec', gulp.parallel('test:exec:unit', 'test:exec:acceptance', 'test:exec:static'));
gulp.task('test:run', gulp.series(
    'test:clean',
    'test:exec',
    'test:check'
));

gulp.task('test', gulp.series( 'test:run'));