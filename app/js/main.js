define(function (require) {

    var Data          = require('../js/modules/data.js'),
        WatchedVideos = require('../js/modules/watchedVideos.js'),
        Element       = require('../js/modules/elementBuilder.js');

    // this will store our list of current Videos
    var Videos;
    //  grabs the watchedVideos from localStorage and populates WatchedVideos.videos array
    WatchedVideos.init();

    //  go grab our reddit data
    Data.fetch( function(d){

      //  parses for valid links (ie: youtube ones right now)
      Videos = Data.parse( d, WatchedVideos.videos );

      //  builds us our lil iframe element that gets added later.
      Videos.forEach(function(val, i){
        Videos[i].iframeElement = Element.buildVideoElements(val.data);
      });

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
        Element.showNextVideo(Videos[0]);
      };

      Element.els.vidNextBtn.onclick = nextVideoPlz;

    });

});
