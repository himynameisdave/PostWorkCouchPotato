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
      Element.showNextVideo(Videos[0]);

      //  the function that is fired when next btn is clicked
      var nextVideoPlz = function(){
        //  take the first video and add it to the page
        var watchedVid = {
          name: Videos[0].data.name,
          time: Date.now() / 1000 // date in seconds
        };
        WatchedVideos.addNewWatchedVideo(watchedVid);

        //  now remove that from the Videos array
        Videos.splice(0, 1);

        console.info("Videos.length === "+Videos.length);
        console.info("Videos === ",Videos);
        //  when we're getting close to the end...
        if( Videos.length === 1 ){
          console.info("Videos lenth is less than/equal to 1, fetching again!");
          console.info("Oh and also Data.fetchRound is " + Data.fetchRound);
          Data.fetch( fetchHandler, Videos[0].data.name, true );
        }

        Element.showNextVideo(Videos[0]);
      };

      Element.els.vidNextBtn.onclick = nextVideoPlz;

    };

    //  go grab our reddit data

    //  TODO: if there is a last watched video in WatchedVideos,
    //        use it's ID/title as the lastFetch param passed to Data.fetch
    Data.fetch( fetchHandler );

});
