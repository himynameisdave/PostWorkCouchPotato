define(function () {
  return {
    els: {
      vidTitle:   document.querySelector('.video-title'),
      vidNextBtn: document.querySelector('.video-next'),
      vidBox:     document.querySelector('.video-container')
    },
    buildVideoElements: function( vid ){
      var iframe    = [ "<iframe src='https://www.youtube.com/embed/", "' frameborder='0' allowfullscreen></iframe>" ],
          youtubeId = this.getYoutubeId(vid.url);
          return iframe[0]+ youtubeId +iframe[1];
    },
    //  empties the element passed to it
    emptyElement: function( el ){
      el.innerHTML = '';
    },
    //  doesn't quire fit in this module
    getYoutubeId: function( url ){
      var youtubeId = url.split('v=')[1],
          ampersandPosition = youtubeId.indexOf('&');

      if(ampersandPosition != -1)
        youtubeId = youtubeId.substring(0, ampersandPosition);

      return youtubeId;
    },
    showNextVideo: function( nextVid ){
      //  clear the vid container
      this.els.vidBox.innerHTML = nextVid.iframeElement;
      //  resets the title
      this.els.vidTitle.innerHTML = nextVid.data.title;
    }
  };
});