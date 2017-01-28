var gulp = require('gulp'),
    electron = require('electron-connect').server.create();

gulp.task('default', function () {

    // Start browser process
    electron.start();

    // Restart browser process
    gulp.watch('./index.js', electron.restart);

    // Reload renderer process
    gulp.watch(['./app/index.html', './app/css/**/*.css', './app/js/**/*.js'], electron.reload);
});
