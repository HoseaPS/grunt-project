module.exports = function(grunt) {
  grunt.initConfig({
    /* Copia os arquivos para o diretório 'dist' */
    copy: {
      public: {
        expand: true,
        cwd: "public",
        src: "**",
        dest: "dist"
      }
    },

    /* exclui a pasta dist */
    clean: {
      dist: {
        src: "dist"
      }
    },

    /* minifica e concatena os arquivos css e js */
    useminPrepare: {
      html: "dist/**/*.html"
    },

    /* aponta para os novos arquivos concatenados e minificados */
    usemin: {
      html: "dist/**/*.html"
    },

    imagemin: {
      public: {
        expand: true,
        cwd: "dist/img",
        src: "**/*.{png,jpg,gif}",
        dest: "dist/img"
      }
    }
  });

  //registrando task para exclusao e copia
  grunt.registerTask("dist", ["clean", "copy"]);

  //registrando task para minificação e concatenação
  grunt.registerTask("minifica", [
    "useminPrepare",
    "concat",
    "uglify",
    "cssmin",
    "usemin",
    "imagemin"
  ]);

  // registrando default tasks
  grunt.registerTask("default", ["dist", "minifica"]);

  // carregando tasks
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-usemin");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
};
