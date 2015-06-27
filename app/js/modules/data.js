define(function () {
  return {
    data: null,
    fetchRound: 1,
    //  just sends the request to fetch the data
    //  cb - callback, mandatory
    //  lastFetch - the id/title of the last fetched item
    //  incrementFetchRound - if true, we increment which round of fetchery we are on
    fetch: function( cb, lastFetch, incrementFetchRound ){

      var url = "https://www.reddit.com/r/videos/.json";

      //  next bit just adds shit to the url if it's a fetch beyond the first page
      if( incrementFetchRound ){
        if( !lastFetch ) throw "Bitch gotta be passing me a valid lastFetch!";
        url += "?count="+(25*this.fetchRound)+"after="+lastFetch;
        this.fetchRound++;
      }

      //  The fetch:
      var r = new XMLHttpRequest();
      r.open("get", url , true);
      r.onload = function(xmlEvent){
        this.data = JSON.parse(r.response).data.children;
        cb( this.data );
      };
      r.send();

    },
    //  used as the callback for the above function to parse the provided data
    //  accepts incoming data && the list of used videos
    //  returns an unwatched video
    parse: function( data, watchedVideos ){

      //  vidlist for new vids and watchedList for old
      var vidList     = [],
          watchedList = [];
          //  quickly builds just the list of watchedVid names
          watchedVideos.forEach(function(i){ watchedList.push(i.name); });



      data.forEach( function(val){
        if( watchedList.indexOf(val.data.name) !== -1 ){
          console.info('Found a watched video!');
        } else {
          //  if it's the mod or a self post, we don't want it
          if( val.data.distinguished !== 'moderator' && val.data.domain !== 'self.videos' ){
            //  Right now just accepting youtube as the domain
            if( val.data.domain === 'youtube.com' ){
              vidList.push(val);
            }
          }
        }

      });

      return vidList;

    }
  };
});