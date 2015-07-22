define(function () {
  return {
    els: {
      alert:       document.querySelector('.alert'),
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
      //  sanitize the media embed content
      var a = document.createElement('div');
          a.innerHTML = nextVid.data.media_embed.content;
      var sanitized = a.childNodes[0].nodeValue;
      //  clear the vid container
      this.els.vidBox.innerHTML = sanitized;
      //  resets the title
      this.els.vidTitle.innerHTML = nextVid.data.title;
    },
    isAlertVisible: false,

    alertUser: function( msg ){
      //  do nothing if the alert is already visible
      if( !this.isAlertVisible ){
        //  store the context within this fn
        var T = this;
        T.isAlertVisible = true; // the alert is now visible
        T.els.alert.classList.add('alert-s-visible'); // make the alert visible

        //  wait now, for 2.6s
        setTimeout(function(){
          T.els.alert.classList.remove('alert-s-visible');//  make the alert hidden again
          T.isAlertVisible = false; // aaand finally the alert is able to be shown again
        }, 2600 );
      }
    }
  };
});