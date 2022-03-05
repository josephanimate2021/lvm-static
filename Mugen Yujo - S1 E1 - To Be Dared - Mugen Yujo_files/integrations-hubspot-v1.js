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

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1324);


/***/ },

/***/ 1324:
/***/ function(module, exports) {

!function(){var e,n,t,i,a,r,o,s,l;return null==window._hsq&&(window._hsq=[]),n=!1,t=function(e){return n?void 0:(_hsq.push(["identify",{wistia_visitor_key:e.visitorKey()}]),n=!0)},o=function(e,n){var t,i,a;return i=document.location.href.split("?")[0],t=(null!=(a=document.getElementsByTagName("title")[0])?a.innerHTML:void 0)||"",t=t.replace(/^[\n\s]+/,"").replace(/[\n\s]+$/,""),t=t.replace(/[^\x00-\x7F]/g,""),e.foreignData({hubspot_hutk:n.utk.visitor,wistia_visitor_key:e.visitorKey(),page_url:i,page_name:t,canonical_url:n.canonicalUrl,page_id:n.pageId,content_type:n.contentType})},s=function(e){var n,t,i,a,r,o,s,l,c,d;for(n=[],t=i=0,o=Math.floor(e.duration());o>=0?o>=i:i>=o;t=o>=0?++i:--i)n.push(!1);if("playing"===e.state())for(c=a=0,s=Math.floor(e.time());s>=0?s>=a:a>=s;c=s>=0?++a:--a)n[c]=!0;return l=Math.min(.995,(n.length-1)/n.length),r=function(){var e,t,i,a;for(a=0,t=0,i=n.length;i>t;t++)e=n[t],e&&(a+=1);return a/n.length},d=function(n){return _hsq.push(["trackEvent",{id:'Video "'+e.name()+'": '+n}])},e._hsPlayEventCallback=function(){return d("Played"),this.unbind},e._hsSecondChangeEventCallback=function(e){var t;return n[e]=!0,t=r(),n.length>0&&t>=l?(d("100% Watched"),this.unbind):void 0},"playing"===e.state()?d("Played"):e.bind("play",e._hsPlayEventCallback),e.bind("secondchange",e._hsSecondChangeEventCallback)},l=function(e){var n;return n=e.replace,e.replace=function(t,i){return null!=e._hsSecondChangeEventCallback&&e.unbind("secondchange",e._hsSecondChangeEventCallback),null!=e._hsPlayEventCallback&&e.unbind("play",e._hsPlayEventCallback),n.call(e,t,i),s(e)}},i=function(){return wistiaEmbeds.onFind(function(e){return e.ready(function(){var n;if(null!=(n=e._mediaData.integrations)?!n.hubspot:!0)return Wistia.util.poll(function(){return e.visitorKey()},function(){return t(e),e instanceof Wistia.PlaylistIframeAPI?e.bind("play",function(){return _hsq.push(["trackEvent",{id:"Played video in playlist"}]),this.unbind}):(s(e),l(e),window._hsq.push(function(n){return o(e,n)})),e instanceof Wistia.PublicApi?Wistia.Metrics.videoCount(e,"player/integrations-hubspot-v1/init-on-api-embed"):e instanceof Wistia.PlaylistIframeAPI?Wistia.Metrics.count("player/integrations-hubspot-v1/init-on-iframe-playlist",1,{href:location.href,referrer:document.referrer,hashedId:e.hashedId()}):Wistia.Metrics.count("player/integrations-hubspot-v1/init-on-iframe-embed",1,{href:location.href,referrer:document.referrer,hashedId:e.hashedId()})})})})},null!=window.wistiaEmbeds?i():(null!=window.wistiaEmbedShepherdReady?(a=window.wistiaEmbedShepherdReady,window.wistiaEmbedShepherdReady=function(){return a(),i()}):window.wistiaEmbedShepherdReady=i,e=document.createElement("script"),e.type="text/javascript",e.async=!0,e.src="//web.archive.org/web/20160411233118/http://fast.wistia.com/assets/external/embed_shepherd-v1.js",r=document.getElementsByTagName("script")[0],r.parentNode.insertBefore(e,r))}();

/***/ }

/******/ });

}
/*
     FILE ARCHIVED ON 23:31:18 Apr 11, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:44 Feb 27, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 416.924
  exclusion.robots: 0.088
  exclusion.robots.policy: 0.081
  RedisCDXSource: 1.442
  esindex: 0.007
  LoadShardBlock: 204.453 (3)
  PetaboxLoader3.datanode: 195.495 (4)
  CDXLines.iter: 55.989 (3)
  load_resource: 56.113
  PetaboxLoader3.resolve: 52.072
*/