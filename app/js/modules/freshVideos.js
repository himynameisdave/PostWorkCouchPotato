
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