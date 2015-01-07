module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-auto-release');

    grunt.config('auto-release', {
        options: {
            checkTravisBuild: false
        }
    });

}
