define('watchedVideos', [], function () {
    return {
        videos: [],
        init: function () {
            var watchedVideos = localStorage.getItem('watchedVideos');
            if (watchedVideos !== null) {
                watchedVideos = JSON.parse(watchedVideos);
                this.videos = watchedVideos.videos;
            }
        },
        addNewWatchedVideo: function (video) {
            this.videos.push(video);
            this.updateWatchedVideos();
        },
        updateWatchedVideos: function () {
            var o = { videos: this.videos };
            localStorage.setItem('watchedVideos', JSON.stringify(o));
        },
        pruneOldVideos: function () {
            var newVidList = [], now = Date.now() / 1000, week = 604800;
            this.videos.forEach(function (val) {
                if (now - val.time < week) {
                    newVidList.push(val);
                }
            });
            this.videos = newVidList;
            this.updateWatchedVideos();
        },
        returnLastFetched: function () {
            return this.videos.slice(-1)[0];
        },
        returnSimpleWatchedList: function () {
            return this.videos.map(function (vid) {
                return vid.data.name;
            });
        }
    };
});
define('freshVideos', [], function () {
    return {
        videos: [],
        lastFetched: false,
        fetchVideos: function (cb) {
            var url = 'https://www.reddit.com/r/videos/.json?count=25';
            if (this.lastFetched)
                url += '&after=' + this.lastFetched;
            console.log('Fetching, using this url: ', url);
            var r = new XMLHttpRequest(), T = this;
            r.open('get', url, true);
            r.onload = function (xmlEvent) {
                var data = JSON.parse(r.response).data.children;
                console.log('Fetching data, using this to set lastFetched: ', data[data.length - 1]);
                T.lastFetched = data[data.length - 1].data.name;
                cb(data);
            };
            r.send();
        },
        addNewFreshVideo: function (vid) {
            this.videos.unshift(vid);
        }
    };
});
define('currentVideo', [], function () {
    return {
        video: {},
        foundLocalCurrentVid: false,
        init: function () {
            var currentVideo = localStorage.getItem('currentVideo');
            if (currentVideo !== null) {
                this.foundLocalCurrentVid = true;
                currentVideo = JSON.parse(currentVideo);
                this.video = currentVideo.video;
            } else {
                this.foundLocalCurrentVid = false;
            }
        },
        changeCurrentVideo: function (newVid) {
            this.video = newVid;
            var o = { video: newVid };
            localStorage.setItem('currentVideo', JSON.stringify(o));
        },
        returnCurrentVideoName: function () {
            return this.video.data.name;
        },
        getMediaEmbedData: function () {
            return this.video.data.media_embed.content.replace('&lt;', '<').replace('&lt;', '<').replace('&gt;', '>').replace('&gt;', '>');
        }
    };
});
define('dom', [], function () {
    return {
        els: {
            alert: document.querySelector('.alert'),
            vidTitle: document.querySelector('.video-title'),
            vidNextBtn: document.querySelector('.video-button.button-next'),
            vidPrevBtn: document.querySelector('.video-button.button-prev'),
            vidBox: document.querySelector('.video-container')
        },
        unescapeHtml: function (html) {
            var temp = document.createElement('div');
            temp.innerHTML = html;
            var result = temp.childNodes[0].nodeValue;
            temp.removeChild(temp.firstChild);
            return result;
        },
        emptyElement: function (el) {
            el.innerHTML = '';
        },
        displayVideo: function (nextVid) {
            var a = document.createElement('div');
            a.innerHTML = nextVid.data.media_embed.content;
            var sanitized = a.childNodes[0].nodeValue;
            this.els.vidBox.innerHTML = sanitized;
            this.els.vidTitle.innerHTML = nextVid.data.title;
        },
        isAlertVisible: false,
        alertUser: function (msg) {
            if (!this.isAlertVisible) {
                var T = this;
                T.isAlertVisible = true;
                T.els.alert.classList.add('alert-s-visible');
                setTimeout(function () {
                    T.els.alert.classList.remove('alert-s-visible');
                    T.isAlertVisible = false;
                }, 2600);
            }
        }
    };
});
define('main', [
    'require',
    'exports',
    'module',
    'watchedVideos',
    'freshVideos',
    'currentVideo',
    'dom'
], function (require) {
    alert('eeeyyyy');
    var WatchedVideos = require('watchedVideos'), FreshVideos = require('freshVideos'), CurrentVideo = require('currentVideo'), DOM = require('dom'), getFreshVideos = function (cb) {
            FreshVideos.fetchVideos(function (vids) {
                var watched = WatchedVideos.returnSimpleWatchedList();
                var squeakyFreshVids = vids.filter(function (vid) {
                    if (vid.data.distinguished !== 'moderator' && vid.data.domain !== 'self.videos' && vid.data.media_embed.content) {
                        if (watched.indexOf(vid.data.name) > -1)
                            return false;
                        else
                            return vid;
                    } else {
                        return false;
                    }
                });
                FreshVideos.videos = squeakyFreshVids;
                if (cb) {
                    cb();
                }
            }, WatchedVideos.returnLastFetched());
        }, setupButtonEvents = function () {
            DOM.els.vidNextBtn.onclick = function (e) {
                WatchedVideos.addNewWatchedVideo(CurrentVideo.video);
                CurrentVideo.changeCurrentVideo(FreshVideos.videos[0]);
                FreshVideos.videos.shift();
                DOM.displayVideo(CurrentVideo.video);
                if (FreshVideos.videos.length === 0) {
                    console.info('FreshVideos.videos.length is 0,', FreshVideos);
                    getFreshVideos();
                }
            };
            DOM.els.vidPrevBtn.onclick = function (e) {
                if (WatchedVideos.videos.length <= 0)
                    return DOM.alertUser();
                FreshVideos.addNewFreshVideo(CurrentVideo.video);
                var l = WatchedVideos.videos.length;
                CurrentVideo.changeCurrentVideo(WatchedVideos.videos[l - 1]);
                WatchedVideos.videos.pop();
                DOM.displayVideo(CurrentVideo.video);
            };
        };
    WatchedVideos.init();
    CurrentVideo.init();
    if (CurrentVideo.foundLocalCurrentVid) {
        console.log('found a CurrentVideo');
        DOM.displayVideo(CurrentVideo.video);
    }
    getFreshVideos(function () {
        if (!CurrentVideo.foundLocalCurrentVid) {
            CurrentVideo.changeCurrentVideo(FreshVideos.videos[0]);
            FreshVideos.videos.shift();
            DOM.displayVideo(CurrentVideo.video);
        }
        setupButtonEvents();
    });
});