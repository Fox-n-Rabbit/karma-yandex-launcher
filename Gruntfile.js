module.exports = function(grunt) {

    // Project configuration
    grunt.loadTasks('grunt/tasks');
    
    grunt.initConfig({
        pkgFile: 'package.json'
    });

    grunt.registerTask('release',  'Bump the version and publish to NPM.', function(type) {
        grunt.task.run(['npm-contributors', 'bump:' + (type || 'patch'), 'npm-publish'])
    });

}
