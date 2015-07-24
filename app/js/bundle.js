(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function(){

  // alert("eeeyyyy");

  //  Require in our modules
  var WatchedVideos = require('./modules/watchedVideos.js'),
      FreshVideos   = require('./modules/freshVideos.js'),
      CurrentVideo  = require('./modules/currentVideo.js'),
      DOM           = require('./modules/dom.js'),
      //  can be used to go fetch new vids anytime...?
      //  accepts a callback for when things are done
      //  TODO: lastFetchOverride should be temporary
      getFreshVideos = function( cb ){
        //  fetches the FreshVideos, while also passing in the last fetched video
        FreshVideos.fetchVideos( function ( vids ){
          console.log("JUST GRABBED VIDS!!", vids)

          //  get our list of vid.name data for comparisons
          var watched = WatchedVideos.returnSimpleWatchedList();
          //  returns a pruned array of unwatched, non mod posts
          var squeakyFreshVids = vids.filter(function(vid){
            if( vid.data.distinguished !== 'moderator' && vid.data.domain !== 'self.videos' && vid.data.media_embed.content ){
              //  if it's a watched vid, return false, otherwise its vaild
              if( watched.indexOf( vid.data.name ) > -1 )
                return false;
              else
                return vid;
            }else{ return false; }
          });
          //  reset the global freshvideos list
          FreshVideos.videos = squeakyFreshVids;
          //  and call our callback if it was provided
          if( cb ){ cb(); }

          //  TODO: lastFetch should really be like a token created at the time of a fetch... just sayin'
        }, WatchedVideos.returnLastFetched() );

      },
      //  will go and add the Event listeners to the next and prev buttons
      setupButtonEvents = function(  ){

        //  TODO: make these functions non-anon
        DOM.els.vidNextBtn.onclick = function(e){

          //  add the currentVideo to watchedVideos
          WatchedVideos.addNewWatchedVideo(CurrentVideo.video);
          //  let's set our current video
          CurrentVideo.changeCurrentVideo(FreshVideos.videos[0]);
          //  remove it drom the FreshVideos list
          FreshVideos.videos.shift();
          //  show the new currentVideo
          DOM.displayVideo(CurrentVideo.video);

          //  TODO: check if we're close to the end of FreshVideos
          if( FreshVideos.videos.length === 0 ){
            console.info("FreshVideos.videos.length is 0,", FreshVideos );
            getFreshVideos();
          }

        };
        //  TODO: make these functions non-anon
        DOM.els.vidPrevBtn.onclick = function(e){
          //  check if we even have any prev videos to go back and look at
          if( WatchedVideos.videos.length <= 0 )
            return DOM.alertUser();
            // return alert("No previous videos to check out!");

          //  add the currentVideo to freshVideos
          FreshVideos.addNewFreshVideo(CurrentVideo.video);
          //  store the length for easy use
          var l = WatchedVideos.videos.length;
          //  let's set our current video
          CurrentVideo.changeCurrentVideo(WatchedVideos.videos[l-1]);
          //  remove it drom the WatchedVideos list
          WatchedVideos.videos.pop();
          //  show the new currentVideo
          DOM.displayVideo(CurrentVideo.video);
        };

      };

      //  init should be sync/blocking with it's localStorage call, so it should have everything by the next step
      WatchedVideos.init();
      //  init CurrentVideo too
      CurrentVideo.init();

      //  if there is a currentVideo stored, we will go ahead and display it
      if( CurrentVideo.foundLocalCurrentVid ){
        console.log("found a CurrentVideo");
        DOM.displayVideo(CurrentVideo.video);
      }

      //  call the inital getFreshVideos
      getFreshVideos(function(){
        if( !CurrentVideo.foundLocalCurrentVid ){
          //  this is sort of a repeat of the nextButton function
          CurrentVideo.changeCurrentVideo(FreshVideos.videos[0]);
          FreshVideos.videos.shift();
          DOM.displayVideo(CurrentVideo.video);
        }
        //  setup our button events when videos have been
        setupButtonEvents();
      });


})();



},{"./modules/currentVideo.js":2,"./modules/dom.js":3,"./modules/freshVideos.js":4,"./modules/watchedVideos.js":5}],2:[function(require,module,exports){



module.exports = {
    //  this is the current video
    video: {},
    //  lil flag for seeing if a currentVid was found in localStorage
    foundLocalCurrentVid: false,
    //  init is what grabs the watched vids from localStorage
    init: function(){
      var currentVideo = localStorage.getItem('currentVideo');
      if( currentVideo !== null ){
        this.foundLocalCurrentVid = true;
        currentVideo = JSON.parse(currentVideo);
        this.video = currentVideo.video;
      }else{
        this.foundLocalCurrentVid = false;
      }
    },
    //  similar to WatchedVideos.addNewWatchedVideo()
    changeCurrentVideo: function( newVid ){
      this.video = newVid;
      var o = { video: newVid };
      localStorage.setItem( 'currentVideo', JSON.stringify(o) );
    },
    //  util for returning the name of the current video, should we ever need it
    returnCurrentVideoName: function() {
      return this.video.data.name;
    },
    //  TODO: not actually used, but it would be cool to move this shitstain over here.
    getMediaEmbedData: function(){
      return this.video.data.media_embed.content.replace("&lt;", "<").replace("&lt;", "<").replace("&gt;", ">").replace("&gt;", ">");
    }
  };
},{}],3:[function(require,module,exports){

module.exports =  {
    els: {
      alert:      document.querySelector('.alert'),
      vidTitle:   document.querySelector('.video-title'),
      vidNextBtn: document.querySelector('.video-button.button-next'),
      vidPrevBtn: document.querySelector('.video-button.button-prev'),
      vidBox:     document.querySelector('.video-container')
    },
    unescapeHtml: function (html) {
      var temp = document.createElement("div");
      temp.innerHTML = html;
      var result = temp.childNodes[0].nodeValue;
      temp.removeChild(temp.firstChild);
      return result;
    },
    //  empties the element passed to it
    emptyElement: function( el ){
      el.innerHTML = '';
    },
    displayVideo: function( nextVid ){
      console.log("displaying video using: ", nextVid)
      //  sanitize the media embed content
      var a = document.createElement('div');
          a.innerHTML = nextVid.data.media_embed.content;
      var sanitized = a.childNodes[0].nodeValue;
      //  clear the vid container
      this.els.vidBox.innerHTML = sanitized;
      //  resets the title
      this.els.vidTitle.innerHTML = nextVid.data.title;
    },
    isAlertVisible: false,

    alertUser: function( msg ){
      //  do nothing if the alert is already visible
      if( !this.isAlertVisible ){
        //  store the context within this fn
        var T = this;
        T.isAlertVisible = true; // the alert is now visible
        T.els.alert.classList.add('alert-s-visible'); // make the alert visible

        //  wait now, for 2.6s
        setTimeout(function(){
          T.els.alert.classList.remove('alert-s-visible');//  make the alert hidden again
          T.isAlertVisible = false; // aaand finally the alert is able to be shown again
        }, 2600 );
      }
    }
  };
},{}],4:[function(require,module,exports){

module.exports = {
    //  the videos list that gets populated when we fetch
    videos: [],
    //  TODO: will store the lastFetched item
    lastFetched: false,
    //  fetchVideos goes and grabs a fresh round of videos
    //  is literally just the fetch and nothing more
    fetchVideos: function( cb ) {
      //  our base url - always want a 25 count
      var url = "https://www.reddit.com/r/videos/.json?count=25";

      //  if a lastFetched was provided, we go ahead and add that here
      if( this.lastFetched )
        url += ("&after="+this.lastFetched);

      console.log("Fetching, using this url: ", url);

      //  The fetch:
      var r = new XMLHttpRequest(),
      //  This hoisting, ugly af
          T = this;
      r.open("get", url , true);
      r.onload = function(xmlEvent){
        var data = JSON.parse(r.response).data.children;
        console.log("Fetching data, using this to set lastFetched: ", data[data.length-1]);
        //  setting the lastFetched for future use
        T.lastFetched = data[data.length-1].data.name;
        //  fire our callback using the data
        cb( data );
      };
      r.send();
    },
    //  used when the user hits the prev button, to inject a video to the beginning of the videos array
    addNewFreshVideo: function( vid ){
      this.videos.unshift( vid );
      //  TODO: maybe take the item out of the localStorage object as well?
    }
  };
},{}],5:[function(require,module,exports){
module.exports = {

    //  Videos is our locally available list of watched videos
    videos: [],

    //  init is what grabs the watched vids from localStorage
    init: function(){
      var watchedVideos = localStorage.getItem('watchedVideos');
      if( watchedVideos !== null ){
        watchedVideos = JSON.parse(watchedVideos);
        this.videos = watchedVideos.videos;
        // this.pruneOldVideos();
      }
    },

    addNewWatchedVideo: function( video ){
      this.videos.push(video);
      this.updateWatchedVideos();
      // this.pruneOldVideos();
    },

    updateWatchedVideos: function(){
      var o = { videos: this.videos };
      localStorage.setItem( 'watchedVideos', JSON.stringify(o) );
    },

    pruneOldVideos: function() {
      //  TODO: this is ripe for an array.map/filter
      var newVidList = [],
          now        = Date.now() / 1000,
          week       = 604800; // two weeks in seconds
      this.videos.forEach(function( val ){
        if( (now - val.time) < week ){
         newVidList.push(val);
        }
      });
      this.videos = newVidList;
      this.updateWatchedVideos();
    },
    //  simplifies grabbing that last watched video
    returnLastFetched: function(){
      //  returns undefined if array is empty
      //  juxed this one-liner from here:
      //  http://stackoverflow.com/a/12099341/4060044
      return this.videos.slice(-1)[0];
    },
    //  returns a simplified list of video.name data for easier comparison later
    returnSimpleWatchedList: function(){
      return this.videos.map(function( vid ){
        return vid.data.name;
      });
    }
  };
},{}]},{},[1]);
