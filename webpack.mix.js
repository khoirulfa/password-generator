const mix = require('laravel-mix');

mix.js('src/js/min.js', 'js')
   .sass('src/sass/min.scss', 'css')
   .setPublicPath('public');