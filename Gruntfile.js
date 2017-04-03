"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);
  grunt.initConfig({

    // Компиляция sass в css
    sass: {
      dist: {
        files: {
          "build/css/style.css": "sass/style.scss"
        }
      },
    },

    // Задаем префиксы производителей для браузеров
    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]}),
            require("css-mqpacker")({
              sort: true
            })
          ]
        },
        src: "build/css/*.css"
      }
    },

    // минифицируем скомпилированный CSS
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    // минификация файлов JS
    uglify: {
      my_target: {
        files: {
        "build/js/scripts.min.js": ["js/adaptive-menu.js","js/reviews_slider.js","js/script-popup.js"],
        "build/js/picturefill.min.js": ["js/picturefill.js"],
        }
      }
    },

    // сжатие картинок
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    // минифицируем SVG
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/icons/*.svg"]
        }]
      }
    },

    // собираем SVG спрайт
    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "build/img/symbols.svg": ["img/icons/*.svg"]
        }
      }
    },

    // копирование файлов в папку - build
    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      }
    },

    // очистка папки - build
    clean: {
      build: ["build"]
    },

    // просматриваем внесенные изменения на лету через "живой" сервер
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    // отслеживаем изменения в файлах SASS
    watch: {
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss"]
      }
    }
  });

/*  // Подключаем плагин
  grunt.loadNpmTasks("grunt-svgmin");
  grunt.loadNpmTasks("grunt-svgstore");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-csso");
  grunt.loadNpmTasks("css-mqpacker");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks('grunt-contrib-sass');*/

  // какие задачи выполняются, когда в терминале вводим (grunt symbols) и т.п

  // Собираем SVG-спрайт
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);

  // Запуск (локального) сервера c наблюдениеv за файлами
  grunt.registerTask("serve", ["browserSync", "watch"]);

  // Сборка проекта в папке (build)
  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "postcss",
    "csso",
    "uglify",
    "symbols",
    "imagemin"
  ]);
};
