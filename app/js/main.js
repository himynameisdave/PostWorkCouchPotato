define(function (require) {

    var Data          = require('../js/modules/data.js'),
        WatchedVideos = require('../js/modules/watchedVideos.js'),
        Element       = require('../js/modules/elementBuilder.js');

    // this will store our list of current Videos
    var Videos;
    //  grabs the watchedVideos from localStorage and populates WatchedVideos.videos array
    WatchedVideos.init();


    //  handles the fetches
    var fetchHandler = function( d ){

      //  parses for valid links (ie: youtube ones right now)
      Videos = Data.parse( d, WatchedVideos.videos );

      //  shows the first video
      Element.displayVideo(Videos[0]);

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

      console.info("Videos.length === "+Videos.length);
      console.info("Videos === ",Videos);
      //  when we're getting close to the end...
      if( Videos.length === 1 ){
        console.info("Videos lenth is less than/equal to 1, fetching again!");
        Data.fetch( fetchHandler, Videos[0].data.name );
      }

      Element.displayVideo(Videos[0]);
    },
    prevVideoPlz = function(){

      if( !WatchedVideos.videos.length ) alert("Didn't find any previously watched videos!");

      Element.displayVideo(WatchedVideos.videos[WatchedVideos.videos.length-1]);
    };

    //  Setup click events
    Element.els.vidNextBtn.onclick = nextVideoPlz;
    //  Setup click events
    Element.els.vidPrevBtn.onclick = prevVideoPlz;



    //  go grab our reddit data
    if( WatchedVideos.videos.length  ){
      Data.fetch( fetchHandler, WatchedVideos.videos[WatchedVideos.videos.length-1].name );
    }else{
      Data.fetch( fetchHandler );
    }

});
