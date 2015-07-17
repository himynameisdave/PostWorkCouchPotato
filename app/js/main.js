define(function (require) {

    //  Require in our modules
    var WatchedVideos = require('../js/modules/watchedVideos.js'),
        FreshVideos   = require('../js/modules/freshVideos.js'),
        CurrentVideo  = require('../js/modules/currentVideo.js'),
        DOM           = require('../js/modules/dom.js'),
        //  can be used to go fetch new vids anytime...?
        //  accepts a callback for when things are done
        getFreshVideos = function( cb ){
          //  fetches the FreshVideos, while also passing in the last fetched video
          FreshVideos.fetchVideos( function ( vids ){
            //  get our list of vid.name data for comparisons
            var watched = WatchedVideos.returnSimpleWatchedList();
            //  returns a pruned array of unwatched, non mod posts
            var squeakyFreshVids = vids.filter(function(vid){
              //  if not a mod/self post/has embed content
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

          DOM.els.vidNextBtn.onclick = function(e){
            //  TODO check if we're close to the end of FreshVideos

            //  add the currentVideo to watchedVideos
            WatchedVideos.addNewWatchedVideo(CurrentVideo.video);
            //  let's set our current video
            CurrentVideo.video = FreshVideos.videos[0];
            //  remove it drom the FreshVideos list
            FreshVideos.videos.shift();
            //  show the new currentVideo
            DOM.displayVideo(CurrentVideo.video);
          };

          DOM.els.vidPrevBtn.onclick = function(e){

            //  TODO: check if we even have any prev videos to go back and look at
            if( WatchedVideos.videos.length <= 0 )
              return alert("No previous videos to check out!");

            //  add the currentVideo to freshVideos
            FreshVideos.addNewFreshVideo(CurrentVideo.video);
            //  store the length for easy use
            var l = WatchedVideos.videos.length;
            //  let's set our current video
            CurrentVideo.video = WatchedVideos.videos[l-1];
            //  remove it drom the WatchedVideos list
            WatchedVideos.videos.pop();
            //  show the new currentVideo
            DOM.displayVideo(CurrentVideo.video);
          };

        };

        //  init should be sync/blocking with it's localStorage call, so it should have everything by the next step
        WatchedVideos.init();
        //  call the inital getFreshVideos
        getFreshVideos( function(){
          //  let's set our current video
          CurrentVideo.video = FreshVideos.videos[0];
          //  remove it drom the FreshVideos list
          FreshVideos.videos.shift();
          //  show the new currentVideo
          DOM.displayVideo(CurrentVideo.video);
          //  because this is our first run, we wanna setup our click events now
          setupButtonEvents();
        });



});
