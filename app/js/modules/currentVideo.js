define(function () {
  return {
    //  this is the current video
    video: {},

    //  TODO BIGGIE:
    //    save the currentVideo to localStorage just like you do watchedVideos


    //  TODO: not actually used, but it would be cool to move this shitstain over here.
    getMediaEmbedData: function(){
      return this.video.data.media_embed.content.replace("&lt;", "<").replace("&lt;", "<").replace("&gt;", ">").replace("&gt;", ">");
    }
  };
});