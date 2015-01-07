module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-bump');

    grunt.config('bump', {
        options: {
            commitMessage: 'chore: release v%VERSION%',
            pushTo: 'upstream'
        }
    });

}
