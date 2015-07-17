define(function () {
  return {
    //  the videos list that gets populated when we fetch
    videos: [],
    //  TODO: will store the lastFetched item
    lastFetched: "",
    //  fetchVideos goes and grabs a fresh round of videos
    //  is literally just the fetch and nothing more
    fetchVideos: function( cb, lastFetched ) {
      //  our base url - always want a 25 count
      var url = "https://www.reddit.com/r/videos/.json?count=25";

      //  if a lastFetched was provided, we go ahead and add that here
      if( lastFetched )
        url += "&after="+lastFetched;

      //  The fetch:
      var r = new XMLHttpRequest();
      r.open("get", url , true);
      r.onload = function(xmlEvent){
        console.log("\n\nPAYLOAD\n", JSON.parse(r.response).data.children);

        
        cb( JSON.parse(r.response).data.children );
      };
      r.send();
    },
    //  used when the user hits the prev button, to inject a video to the beginning of the videos array
    addNewFreshVideo: function( vid ){
      this.videos.unshift( vid );
      //  TODO: maybe take the item out of the localStorage object as well?
    }
  };
});