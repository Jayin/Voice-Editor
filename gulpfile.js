var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default',function(){
    gulp.src('./src/**/*.js')
        //.pipe(uglify())
        //.pipe()
        .pipe(gulp.dest('./js/libs/'))
});


var watcher = gulp.watch('src/**/*.js',['default']);
watcher.on('change',function(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});