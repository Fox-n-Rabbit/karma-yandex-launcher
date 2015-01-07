module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-npm');

    grunt.config('npm-contributors', {
        options: {
            commitMessage: 'chore: update contributors'
        }
    });

}
