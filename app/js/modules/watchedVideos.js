define(function () {
  return {

    //  Videos is our locally available list of watched videos
    videos: [],

    //  init is what grabs the watched vids from localStorage
    init: function(){
      var watchedVideos = localStorage.getItem('watchedVideos');
      if( watchedVideos !== null ){
        watchedVideos = JSON.parse(watchedVideos);
        this.videos = watchedVideos.videos;
        this.pruneOldVideos();
      }
    },

    addNewWatchedVideo: function( video ){
      this.videos.push(video);
      this.updateWatchedVideos();
      this.pruneOldVideos();
    },

    updateWatchedVideos: function(){
      var o = { videos: this.videos };
      localStorage.setItem( 'watchedVideos', JSON.stringify(o) );
    },

    pruneOldVideos: function() {
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
});