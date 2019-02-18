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
    },

    rev: {
      options: {
        encoding: "utf8",
        algorithm: "md5",
        length: 8
      },

      imagens: {
        src: ["dist/img/**/*.{png,jpg,gif}"]
      },

      minificados: {
        src: ["dist/js/**/*.min.js", "dist/css/**/*.min.css"]
      }
    },

    coffee: {
      compilar: {
        expand: true,
        cwd: "public/coffee",
        src: ["**/*.coffee"],
        dest: "public/js",
        ext: ".js"
      }
    },

    less: {
      compilar: {
        expand: true,
        cwd: "public/less",
        src: ["**/*.less"],
        dest: "public/css",
        ext: ".css"
      }
    },

    watch: {
      coffee: {
        options: {
          event: ["added", "changed"]
        },
        files: "public/coffee/**/*.coffee",
        tasks: "coffee:compilar"
      },

      less: {
        options: {
          event: ["added", "changed"]
        },
        files: "public/less/**/*.less",
        tasks: "less:compilar"
      },

      js: {
        options: {
          event: ["changed"]
        },
        files: "public/js/**/*.js",
        tasks: "jshint:js"
      }
    },

    jshint: {
      js: {
        src: ["public/js/**/*.js"]
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
    "rev",
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
  grunt.loadNpmTasks("grunt-rev");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
};
