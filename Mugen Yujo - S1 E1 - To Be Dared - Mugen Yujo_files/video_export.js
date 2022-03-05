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

var VideoExport=VideoExport||{};VideoExport.message={};function getVideoExportOverlay(b,a){jQuery.get("/ajax/getVideoExportOverlay/"+b+"/"+a,function(c){parseResponse(c);if(responseArray.code=="0"){var d=jQuery("#video-export-overlay");if(d.length){d.replaceWith(responseArray.html)}else{jQuery("body").append(responseArray.html)}showOverlay(jQuery("#video-export-overlay"),{position:"absolute",top:"80px"});jQuery(".convert-button,.export-button a",jQuery("#video-export-overlay")).click(doVideoExport)}else{displayFeedback("1"+responseArray.json.error)}})}function toggleComparison(){jQuery("#video-export, #video-comparison, #biz-svl").toggle()}function doVideoExport(b){var c=jQuery(this).attr("href");var a=jQuery('input[name="ct"]').val();b.preventDefault();videoExportHideMessage();c=c+"&ct="+encodeURIComponent(a);if(jQuery(this).data("type")=="youtube"){window.open(c,"_ga_youtube_export","toolbar=no,status=no,height=500,width=960")}else{jQuery.get(c,function(d){if(d.error){videoExportMessage(d.error);return}videoExportStarted(d)},"json")}}function videoExportStarted(a){if(a.resolution){jQuery("."+a.resolution+" .video-export-action").html('<span class="processing-button">'+VideoExport.message.processing+"...</span>");videoExportMessage(VideoExport.message.export_success)}}function videoExportError(a){if(a.error){videoExportMessage(a.error);return}}function videoExportMessage(a){jQuery(".video-export-message-body").html(a);jQuery(".video-export-message").css("opacity",1)}function videoExportHideMessage(){jQuery(".video-export-message").css("opacity",0)}function getVideoLicenseOverlay(b){var a=jQuery("#video-license-overlay");var c=jQuery("<iframe></iframe>",{id:"video-license-iframe",scrolling:"no",allowTransparency:"true",frameborder:"0",width:610,height:700,src:b});jQuery("#video-license-frame",a).html(c);showOverlay(a,{position:"absolute",top:"80px"})};

}
/*
     FILE ARCHIVED ON 23:12:29 Apr 11, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:07 Feb 27, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 434.691
  exclusion.robots: 0.088
  exclusion.robots.policy: 0.081
  RedisCDXSource: 62.227
  esindex: 0.007
  LoadShardBlock: 351.987 (3)
  PetaboxLoader3.resolve: 182.292 (3)
  PetaboxLoader3.datanode: 204.623 (4)
  CDXLines.iter: 18.213 (3)
  load_resource: 64.101
*/