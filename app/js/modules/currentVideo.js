


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