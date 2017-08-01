module.exports = function(grunt) {
  grunt.initConfig({
    bower_concat: {
      all: {
        dest: 'public/javascripts/vendor/all.js',
        dependencies: {
          'underscore': 'jquery',
          'backbone': 'underscore',
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/javascripts/vendor/all.js': ['public/javascripts/vendor/all.js']
        }
      }
    },
    handlebars: {
      all: {
        files: {
          'public/javascripts/handlebar_templates.js': ["handlebars/**/*.hbs"]
        },
        options: {
          processContent: removeWhitespace,
          processName: extractFilename,
          processPartialName: extractPartialFilename,
          partialsUseNamespace: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['bower_concat', 'uglify']);
}

function removeWhitespace(content) {
  return content.replace(/ {2,}/mg, '').replace(/\r|\n/mg, '');
}

function extractFilename(path) {
  return path.match(/\/(.+)\.hbs$/).pop()
}

function extractPartialFilename(path) {
  return path.match(/\_(.+)\.hbs$/).pop()
}