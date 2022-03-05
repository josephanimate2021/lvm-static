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

var VIDEO_CODEC='video/mp4; codecs="avc1.640029"',AUDIO_CODEC='audio/mp4; codecs="mp4a.40.2"';var FPS=24;var MediaController=function(){this.mediaSource=null;this.objectURL=null;this.videoSourceBuffer=null;this.audioSourceBuffer=null;this.audioBufferQueue=[];this.videoBufferQueue=[];this.containsAudio=true;this.mediaSourceReady=false;this.loadedAudioFragments=0;this.loadedVideoFragments=0;this.totalAudioFragments=0;this.totalVideoFragments=0;this.sourceOpened=false};function sourceOpenHandler(){if(this.sourceOpened){return}this.sourceOpened=true;this.createSourceBuffer();if(this.mediaSourceReadyHandler){this.mediaSourceReadyHandler()}}MediaController.prototype.createMedia=function(b){if(this.mediaSource){try{if(this.audioSourceBuffer){this.mediaSource.removeSourceBuffer(this.audioSourceBuffer)}this.mediaSource.removeSourceBuffer(this.videoSourceBuffer)}catch(a){}}this.audioBufferQueue=[];this.videoBufferQueue=[];this.containsAudio=b;this.mediaSource=new MediaSource();this.objectURL=URL.createObjectURL(this.mediaSource);this.sourceOpened=false;this.mediaSource.addEventListener("sourceopen",sourceOpenHandler.bind(this),false);return this.objectURL};MediaController.prototype.createSourceBuffer=function(){var a=this;this.videoSourceBuffer=this.mediaSource.addSourceBuffer(VIDEO_CODEC);this.videoSourceBuffer.addEventListener("updateend",function(){if(a.previewFragmentAddedHandler){a.previewFragmentAddedHandler()}a.tryHandleNextVideoFragment()},false);if(this.containsAudio){this.audioSourceBuffer=this.mediaSource.addSourceBuffer(AUDIO_CODEC);this.audioSourceBuffer.addEventListener("updateend",function(){if(a.previewFragmentAddedHandler){a.previewFragmentAddedHandler()}a.tryHandleNextAudioFragment()},false)}if(this.mediaDuration!==undefined){this.mediaSource.duration=this.mediaDuration;if(this.containsAudio){this.audioSourceBuffer.appendWindowEnd=this.mediaDuration}}if(this.initHandler){this.initHandler()}this.mediaSourceReady=true};MediaController.prototype.initPreview=function(a,b,d,c){this.mediaSourceReadyHandler=c;this.containsAudio=d;this.totalVideoFragments=a;if(d){this.totalAudioFragments=1}this.mediaDuration=b/FPS;this.loadedVideoFragments=0;this.loadedAudioFragments=0;return this.createMedia(d)};MediaController.prototype.addAudioFragment=function(a,b){this.audioBufferQueue[b]={offset:b,buffer:a};this.tryHandleNextAudioFragment()};MediaController.prototype.addVideoFragment=function(a,b){this.videoBufferQueue.push({offset:b,buffer:a});this.tryHandleNextVideoFragment()};MediaController.prototype.tryHandleNextAudioFragment=function(){if(this.mediaSourceReady&&(this.audioSourceBuffer.updating!==true)){this.handleNextAudioFragment()}};MediaController.prototype.tryHandleNextVideoFragment=function(){if(this.mediaSourceReady&&(this.videoSourceBuffer.updating!==true)){this.handleNextVideoFragment()}};MediaController.prototype.handleNextAudioFragment=function(){if(this.audioBufferQueue[this.loadedAudioFragments]){var a=this.audioBufferQueue[this.loadedAudioFragments];this.audioSourceBuffer.appendBuffer(a.buffer);this.loadedAudioFragments+=1}this._endOfStreamCheck()};MediaController.prototype.handleNextVideoFragment=function(){if(this.videoBufferQueue.length){var a=this.videoBufferQueue.shift();this.videoSourceBuffer.timestampOffset=a.offset;this.videoSourceBuffer.appendBuffer(a.buffer);this.loadedVideoFragments+=1}this._endOfStreamCheck()};MediaController.prototype._endOfStreamCheck=function(){if((this.loadedAudioFragments===this.totalAudioFragments)&&(this.loadedVideoFragments===this.totalVideoFragments)&&(!this.audioSourceBuffer||!this.audioSourceBuffer.updating)&&!this.videoSourceBuffer.updating&&(this.mediaSource.readyState!=="ended")){this.mediaSource.endOfStream();this.audioBufferQueue=[];if(this.previewCompleteHandler){this.previewCompleteHandler()}}};

}
/*
     FILE ARCHIVED ON 23:12:30 Apr 11, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:10 Feb 27, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 312.692
  exclusion.robots: 0.157
  exclusion.robots.policy: 0.146
  RedisCDXSource: 9.877
  esindex: 0.012
  LoadShardBlock: 276.54 (3)
  PetaboxLoader3.datanode: 244.463 (4)
  CDXLines.iter: 21.829 (3)
  load_resource: 45.927
  PetaboxLoader3.resolve: 33.631
*/