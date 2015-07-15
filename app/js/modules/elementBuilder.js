define(function () {
  return {
    els: {
      vidTitle:   document.querySelector('.video-title'),
      vidNextBtn: document.querySelector('.video-button.button-next'),
      vidPrevBtn: document.querySelector('.video-button.button-prev'),
      vidBox:     document.querySelector('.video-container')
    },
    unescapeHtml: function (html) {
      var temp = document.createElement("div");
      temp.innerHTML = html;
      var result = temp.childNodes[0].nodeValue;
      temp.removeChild(temp.firstChild);
      return result;
    },
    //  empties the element passed to it
    emptyElement: function( el ){
      el.innerHTML = '';
    },
    displayVideo: function( nextVid ){
      //  This is ugly af
      var sanitized = nextVid.data.media_embed.content.replace("&lt;", "<").replace("&lt;", "<").replace("&gt;", ">").replace("&gt;", ">");
      //  clear the vid container
      this.els.vidBox.innerHTML = sanitized;
      //  resets the title
      this.els.vidTitle.innerHTML = nextVid.data.title;
    }
  };
});