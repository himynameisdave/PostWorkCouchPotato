define(function (require) {

    var Data          = require('../js/modules/data.js'),
        WatchedVideos = require('../js/modules/watchedVideos.js'),
        Element       = require('../js/modules/elementBuilder.js');

    // this will store our list of current Videos
    var Videos,
    //  this will be our active video so that we always have it available
        activeVideo;


    //  grabs the watchedVideos from localStorage and populates WatchedVideos.videos array
    WatchedVideos.init();



    //  handles the fetches
    var fetchHandler = function( d ){

      //  only if we actually get results
      if( d.length > 0 ){
        //  parses for valid links (ie: youtube ones right now)
        Videos = Data.parse( d, WatchedVideos.videos );

        //  shows the first video
        activeVideo = Videos[0];
        Element.displayVideo(Videos[0]);
      }else{
        console.warn("fetchHandler found no data! ");
        Data.fetch( fetchHandler );
      }

    },
    //  the function that is fired when next btn is clicked
    nextVideoPlz = function(){
      console.log(Videos[0]);
      //  take the first video and add it to the page
      var watchedVid = Videos[0];
          watchedVid.time = Date.now() / 1000; // date in seconds

      WatchedVideos.addNewWatchedVideo(watchedVid);

      //  now remove that from the Videos array
      Videos.splice(0, 1);

      //  when we're getting close to the end...
      if( Videos.length === 1 ){
        console.info("Videos lenth is less than/equal to 1, fetching new videos!");
        Data.fetch( fetchHandler, Videos[0].data.name );
      }

      activeVideo = Videos[0];
      Element.displayVideo(Videos[0]);
    },
    prevVideoPlz = function(){

      if( !WatchedVideos.videos.length )
        return alert("Didn't find any previously watched videos!");

      //  coding, whaaaaat?
      var activeId        = activeVideo.data.name,
          watchedInOrder  = WatchedVideos.videos,
          lastWatchedVideo;

      //  swap the order for chronologicality
          // watchedInOrder.reverse();

      watchedInOrder.forEach(function(val, i){
        if( val.data.name === activeId )
          lastWatchedVideo = watchedInOrder[i+1];
      });

      if( !lastWatchedVideo ){
        activeVideo = WatchedVideos.videos[WatchedVideos.videos.length-1];
        Element.displayVideo(WatchedVideos.videos[WatchedVideos.videos.length-1]);
      }else{
        activeVideo = WatchedVideos.videos[lastWatchedVideo];
        Element.displayVideo(WatchedVideos.videos[lastWatchedVideo]);
      }

    };

    //  Setup click events
    Element.els.vidNextBtn.onclick = nextVideoPlz;
    //  Setup click events
    Element.els.vidPrevBtn.onclick = prevVideoPlz;

    //  go grab our reddit data
    if( WatchedVideos.videos.length  ){
      Data.fetch( fetchHandler, WatchedVideos.videos[WatchedVideos.videos.length-1].data.name );
    }else{
      Data.fetch( fetchHandler );
    }

});
