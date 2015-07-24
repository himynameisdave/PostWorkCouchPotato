
requirejs.config({
    baseUrl: './',
    paths: {
        main:          './js/main',
        watchedVideos: './js/modules/watchedVideos',
        freshVideos:   './js/modules/freshVideos',
        currentVideo:  './js/modules/currentVideo',
        dom:           './js/modules/dom'
    }
});

requirejs(['js/main.js']);
