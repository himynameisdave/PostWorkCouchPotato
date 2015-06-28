define(function () {
  return {

    //  Videos is our locally available list of watched videos
    videos: [],

    //  init is what grabs the 
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
    }
  };
});