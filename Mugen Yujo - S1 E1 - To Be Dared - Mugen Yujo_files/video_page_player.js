var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var PreviewPlayerConstants={STATE_DISCONNECTED:0,STATE_CONNECTED:1,STATE_READY:2,USER_OPT_IN:"in",USER_OPT_OUT:"out",USE_H5_PREVIEW_PREFERENCE_KEY:"useH5Preview"};var PreviewPlayerEvent={ANIMATION_INCOMPATIBLE:"PreviewPlayerEvent.ANIMATION_INCOMPATIBLE",USER_OPT_IN:"PreviewPlayerEvent.USER_OPT_IN",USER_OPT_OUT:"PreviewPlayerEvent.USER_OPT_OUT"};var FPS=24,AUDIO_CHUNK_SIZE=500*1024;var PreviewPlayer=function(c,a,d){var b=this;this.host=c;this._encryptedMovieId=a;this._connection=null;this._connectionId=null;this._pendingAudioToken=null;this._pendingPreviewMessage=null;this._userAuthenticationToken=null;this._shouldOptInAtBeginning=d;this._connectionState=PreviewPlayerConstants.STATE_DISCONNECTED;this._mediaController=new MediaController();this._startingPreview=false;this._autoplay=false;this._mediaController.previewFragmentAddedHandler=function(){function e(){var g=b._videoElem.buffered.end(0);if((g>(b._startFrame/FPS))&&(b._startingPreview===true)){b._videoElem.currentTime=b._startFrame/FPS;b._startingPreview=false;if(b._autoplay){b._videoElem.play()}else{var h=$(".video-player-viewport").data("h5VideoControl");if(h){h.reset()}}}}try{e()}catch(f){b._videoElem.addEventListener("loadedmetadata",e)}};this._objectURL=this._mediaController.createMedia();this._visualScenes=null;this._startFrame=null};PreviewPlayer.prototype.setVideoElement=function(a){this._videoElem=a;this._updateVideoSource()};PreviewPlayer.prototype.setUserType=function(a){this._userType=a};PreviewPlayer.prototype.setUserAuthenticationToken=function(a){this._userAuthenticationToken=a};PreviewPlayer.prototype.connect=function(){this._connection=new WebSocket(this.host);if(this._connection){this._connection.onopen=this._connectionOpenHandler.bind(this);this._connection.onerror=this._connectionErrorHandler.bind(this);this._connection.onmessage=this._connectionMessageHandler.bind(this);this._connection.onclose=this._connectionCloseHandler.bind(this)}};PreviewPlayer.prototype.send=function(a){if(this._connection){if(this._connectionState===PreviewPlayerConstants.STATE_DISCONNECTED){throw"WebSocket disconnected"}this._connection.send(a)}};PreviewPlayer.prototype.authenticate=function(){var a=JSON.stringify({eventName:"AUTH",data:this._userAuthenticationToken,userType:this._userType});this.send(a)};PreviewPlayer.prototype.preview=function(e,a,d,b){var c=JSON.stringify({eventName:"PREVIEW_BY_MOVIE_ID",data:{id:this._encryptedMovieId,ts:e,autosave:b}});this._autoplay=!!d;this._startingPreview=true;this._startFrame=a;if(this._connectionState!==PreviewPlayerConstants.STATE_READY){this._pendingPreviewMessage=c;this.connect()}else{this.send(c)}};PreviewPlayer.prototype._handlePendingPreviewRequest=function(){if(this._pendingPreviewMessage!==null){this.send(this._pendingPreviewMessage);this._pendingPreviewMessage=null}};PreviewPlayer.prototype._updateVideoSource=function(){if(this._videoElem&&this._objectURL&&(this._videoElem.src!==this._objectURL)){this._videoElem.src=this._objectURL}};PreviewPlayer.prototype._disconnect=function(){this._connectionState=PreviewPlayerConstants.STATE_DISCONNECTED};PreviewPlayer.prototype.userOptIn=function(){var b=JSON.stringify({eventName:"AUTH",data:this._userAuthenticationToken,opt:PreviewPlayerConstants.USER_OPT_IN});try{this.send(b)}catch(a){this._handleUserOptIn()}};PreviewPlayer.prototype.userOptOut=function(){var b=JSON.stringify({eventName:"AUTH",data:this._userAuthenticationToken,opt:PreviewPlayerConstants.USER_OPT_OUT});try{this.send(b)}catch(a){this._handleUserOptOut()}};PreviewPlayer.prototype._connectionOpenHandler=function(){};PreviewPlayer.prototype._connectionErrorHandler=function(a){this._disconnect()};PreviewPlayer.prototype._connectionCloseHandler=function(a){this._disconnect()};PreviewPlayer.prototype._connectionMessageHandler=function(b){var a=JSON.parse(b.data);switch(a.eventName){case"CONNECT_ACK":this._handleConnectAck(a);break;case"AUTH_ACK":this._handleAuthAck(a);break;case"PREVIEW_ACK":this._handlePreviewAck(a);break;case"PREVIEW_NCK":this._handlePreviewNck(a);break;case"AUDIO_READY":this._handleAudioReady(a);break;case"VISUAL_READY":this._handleVisualReady(a);break;case"USER_OPT_IN":this._handleUserOptIn(a);break;case"USER_OPT_OUT":this._handleUserOptOut(a);break}};PreviewPlayer.prototype._handleConnectAck=function(a){this._connectionId=a.connectionId;this._connectionState=PreviewPlayerConstants.STATE_CONNECTED;this.authenticate()};PreviewPlayer.prototype._handleAuthAck=function(a){this._connectionState=PreviewPlayerConstants.STATE_READY;this._handlePendingPreviewRequest()};PreviewPlayer.prototype._handlePreviewAck=function(e){var a=this;var b=e.data;var c=b.audio;var d=(c!==undefined);this._visualScenes=b.visual;var f=this._getSubFragmentCount();this._objectURL=this._mediaController.initPreview(f,b.duration,d,function(){for(var l in a._visualScenes){if(!a._visualScenes.hasOwnProperty(l)){continue}var k=a._visualScenes[l].frags,i=a._visualScenes[l].offset;for(var g in k){var h=k[g].url,m=parseInt(g)+i;if(h){a._fetchVideo(h,m/FPS)}}}if(c){var j=c.url;if(j){a._fetchAudio(j,c.size)}}});this._updateVideoSource()};PreviewPlayer.prototype._handlePreviewNck=function(a){this._triggerEvent(PreviewPlayerEvent.ANIMATION_INCOMPATIBLE)};PreviewPlayer.prototype._handleAudioReady=function(a){var b=a.url;this._fetchAudio(b,a.size)};PreviewPlayer.prototype._handleVisualReady=function(a){var d=this._visualScenes[a.token],c=d.offset+a.startFrame;var b=a.url;this._fetchVideo(b,c/FPS)};PreviewPlayer.prototype._handleUserOptIn=function(a){window.localStorage.setItem(PreviewPlayerConstants.USE_H5_PREVIEW_PREFERENCE_KEY,PreviewPlayerConstants.USER_OPT_IN);this._triggerEvent(PreviewPlayerEvent.USER_OPT_IN)};PreviewPlayer.prototype._handleUserOptOut=function(a){window.localStorage.setItem(PreviewPlayerConstants.USE_H5_PREVIEW_PREFERENCE_KEY,PreviewPlayerConstants.USER_OPT_OUT);this._triggerEvent(PreviewPlayerEvent.USER_OPT_OUT)};PreviewPlayer.prototype._triggerEvent=function(a){$(document).trigger(a)};PreviewPlayer.prototype._fetchVideo=function(b,d){var a=this;var c=new XMLHttpRequest();c.open("get",b);c.responseType="arraybuffer";c.onload=function(){a._mediaController.addVideoFragment(c.response,d)};c.send()};PreviewPlayer.prototype._fetchAudio=function(a,d){var c,f,b,e=Math.ceil(d/AUDIO_CHUNK_SIZE);this._mediaController.totalAudioFragments=e;for(c=0;c<e;c++){f=c*AUDIO_CHUNK_SIZE;b=((c+1)*AUDIO_CHUNK_SIZE)-1;b=Math.min(b,d);this._fetchAudioPartial(c,a,f,b)}};PreviewPlayer.prototype._fetchAudioPartial=function(a,c,f,d){var b=this,e=new XMLHttpRequest();e.open("get",c);e.setRequestHeader("range","bytes="+f+"-"+d);e.responseType="arraybuffer";e.onload=function(){b._mediaController.addAudioFragment(e.response,a)};e.send()};PreviewPlayer.prototype._getSubFragmentCount=function(){var a=0;for(var b in this._visualScenes){if(!this._visualScenes.hasOwnProperty(b)){continue}a+=Object.keys(this._visualScenes[b].frags).length}return a};function checkBrowser(){return window.WebSocket&&window.MediaSource}function checkTheme(a){if(a===undefined){return true}var c=a.length,d={common:true,infographics:true,business:true,whiteboard:true,commoncraft:true};for(var b=0;b<c;b++){if(d[a[b]]===undefined){return false}}return true}function checkPreviewServer(){return previewPlayer._connectionState===PreviewPlayerConstants.STATE_READY}function loadH5Preview(c,b,a){previewPlayer.preview(c,0,b,a)}var flashPlayerApi=function(d){var c;function a(){c="go"+(""+Math.random()).slice(3,15);$[c]=function(h,g){var i=$.Event(h);setTimeout(function(){d.trigger(i,g)},1)};var f=$(".video-info");b.bind("pause end reset",function(g){f.show()}).bind("play",function(){f.hide()}).bind("ready",function(){b.ready=true;f.show()})}var e=d.data("playerApi");var b=e||{ready:false,paused:false,playing:false,bind:function(g,f){d.bind(g,f);return b},one:function(g,f){d.one(g,f);return b},unbind:function(g,f){d.unbind(g,f);return b},trigger:function(g,f){d.trigger(g,[b,f]);return b},reset:function(){b.paused=false;b.playing=false;b.ready=false;return b.trigger("reset")},bindPlayerEvents:function(){var f="jQuery."+c,g=b.getPlayer();g.bind("ready",f);g.bind("play",f);g.bind("pause",f);g.bind("end",f);g.bind("scene",f);return b},unbindPlayerEvents:function(){var f="jQuery."+c,g=b.getPlayer();g.unbind("ready",f);g.unbind("play",f);g.unbind("pause",f);g.unbind("end",f);g.unbind("scene",f);return b},getPlayer:function(){return $("object",d)[0]},getScenesInfo:function(){return b.getPlayer().getSceneInfoArray()},getSceneGuid:function(){return b.getPlayer().getSceneGuid()},seek:function(f){return b.getPlayer().seek(f)},seekScene:function(f){return b.getPlayer().seekScene(f)},pause:function(){return b.getPlayer().pause()}};if(!d.data("playerApi")){a()}d.data("playerApi",b);return b};function flashPlayerLoaded(){playerApiReady=true;$(document).trigger("playerApiReady")}function loadFlashPlayer(){var a=false;$("#flash-player").flash({id:"Player",swf:flashPlayerUrl,height:"100%",width:"100%",bgcolor:"#000000",scale:"exactfit",allowScriptAccess:"always",allowFullScreen:"true",wmode:"opaque",hasVersion:"10.3",flashvars:flashPlayerVars});$("#video-loading").hide()}function switchToFlashPlayer(){if(!$(".video-player-viewport").hasClass("using-flash")){loadFlashPlayer();$(".video-player-viewport").addClass("using-flash");$(".player-container > .notification").addClass("hidden").filter(".using-flash").removeClass("hidden");$(".shortcut-instruction, #h5-player").addClass("hidden");$("#flash-player").removeClass("hidden");$(".video-player-viewport").data("h5VideoControl").reset()}}function switchToH5Player(){if($(".video-player-viewport").hasClass("using-flash")){if(previewPlayer){loadH5Preview()}$(".video-player-viewport").removeClass("using-flash");$(".player-container > .notification").addClass("hidden").filter(".using-h5").removeClass("hidden");$(".shortcut-instruction").removeClass("hidden");$("#flash-player").addClass("hidden")}}$(document).on(PreviewPlayerEvent.ANIMATION_INCOMPATIBLE,function(){switchToFlashPlayer();$(".player-container > .notification").addClass("hidden").filter(".incompatible").removeClass("hidden")}).on(PreviewPlayerEvent.USER_OPT_OUT,switchToFlashPlayer).on(PreviewPlayerEvent.USER_OPT_IN,switchToH5Player);

}
/*
     FILE ARCHIVED ON 23:12:31 Apr 11, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:13 Feb 27, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 60.065
  exclusion.robots: 0.085
  exclusion.robots.policy: 0.077
  RedisCDXSource: 0.67
  esindex: 0.009
  LoadShardBlock: 34.147 (3)
  PetaboxLoader3.datanode: 38.498 (4)
  CDXLines.iter: 22.834 (3)
  load_resource: 34.905
  PetaboxLoader3.resolve: 27.966
*/