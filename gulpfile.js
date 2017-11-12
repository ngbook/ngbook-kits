const inlineTemplates = require('gulp-inline-ng2-template');
const lazypipe = require('lazypipe');
const sass = require('node-sass');
const gulp = require('gulp');
// const del = require('del')
const exec = require('child_process').exec;
const gulpSequence = require('gulp-sequence');

// 如果使用 ng2-inline-template 这个工具的话，运行：
// ng2inline --outDir=dist "src/**/*.ts"

const PATHS = {
    tsSrc: [
        'src/**/*.ts', '!src/**/*.spec.ts'
    ],
    tsInlinePath: './dist'
}

var inlineTemplatesTask = lazypipe()
.pipe(inlineTemplates, {
    base: './src',
    useRelativePaths: true,
    styleProcessor: function (filepath, ext, file, cb) {
        let rendered = file;
        if (ext && ext[0] === '.scss' && file) {
            rendered = sass.renderSync({
                data: rendered,
            }).css;
        }
        // console.log(rendered);
        cb(null, rendered);
    },
});

gulp.task('inline', function () {
    return gulp.src(PATHS.tsSrc, { base: 'src' })
        .pipe(inlineTemplatesTask())
        .pipe(gulp.dest(PATHS.tsInlinePath));
});

gulp.task('_ngc', ['inline'], function __ngc(cb) {
    exec(`ngc -p ./tsconfig-aot.json`, (e) => {
        if (e) console.error(e);
        cb();
    }).stdout.on('data', (data) => {
        console.log(data); // 把命令运行的结果输出
    });
});

gulp.task('compile', gulpSequence('_ngc'));