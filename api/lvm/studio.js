// functions for creating an object string
function toAttrString(table) {
	return typeof table == "object"
		? Object.keys(table)
				.filter((key) => table[key] !== null)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`)
				.join("&")
		: table.replace(/"/g, '\\"');
}
function toParamString(table) {
	return Object.keys(table)
		.map((key) => `<param name="${key}" value="${toAttrString(table[key])}">`)
		.join(" ");
}
function toObjectString(attrs, params) {
	return `<object ${Object.keys(attrs)
		.map((key) => `${key}="${attrs[key].replace(/"/g, '\\"')}"`)
		.join(" ")}>${toParamString(params)}</object>`;
}
// functions for interactive tutorial
function tutorialStarted() {}
function tutorialStep(sn) {}
function tutorialCompleted() {
  $.ajax({
    type: 'POST',
    url: '/ajax/tutorialStatus/completed'
  });
}
// setup interactive tutorial
fetch('/ajax/getTutorialShowStatus').then(status => {
  interactiveTutorial.isShowTutorial = status ? false : true;
}).catch(e => console.log(e));
// get some params not included in the flashvars.
function get(type) {
  fetch(`/ajax/getParams?${type}=true`).then(info => {
  }).catch(e => console.log(e));
}
function initPreviewPlayer(dataXmlStr, startFrame) {
  if (typeof startFrame == 'undefined') startFrame = 1;
  else startFrame = Math.max(1, parseInt(startFrame));
  if (dataXmlStr === null) return;
  const attrs = {
    height: 360,
    width: 640,
    player_url: get("animationPath") + "/player.swf",
    quality: "medium"
  }; 
  const params = {
    movieOwner: "", 
    movieOwnerId: "", 
    movieId: flashvars.movieId || "", 
    ut: "-1",
    movieLid: "8", 
    movieTitle: "", 
    movieDesc: "", 
    userId: "", 
    username: "", 
    uemail: "",
    apiserver: "https://gowdpk.ga/", 
    thumbnailURL: "", 
    copyable: "0", 
    isPublished: "0", 
    ctc: "go", 
    tlang: "en_US", 
    is_private_shared: "0",
    autostart: "1", 
    appCode: "go", 
    is_slideshow: "0", 
    originalId: "0", 
    is_emessage: "0", 
    isEmbed: "0", 
    refuser: "",
    utm_source: "", 
    uid: "", 
    isTemplate: "1", 
    showButtons: "0", 
    chain_mids: "", 
    showshare: "0", 
    averageRating: "",
    s3base: "https://gowdpk.ga/movie_thumbs/",
    ratingCount: "", 
    fb_app_url: "https://gowdpk.ga/", 
    numContact: 0, 
    isInitFromExternal: 1, 
    storePath: flashvars.storePath, 
    clientThemePath: flashvars.clientThemePath, 
    animationPath: get("animationPath") + "/",
    startFrame: startFrame
  };
  document.getElementById('previewWindow').style.display='block';
  document.getElementById('playerdiv').innerHTML = toObjectString(attrs, params);
}
