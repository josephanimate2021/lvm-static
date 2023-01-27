////
//// This JS contains important Video Studio stuff
////
	
///
/// Variables
///
const previewer = document.getElementById('playerdiv');
const studio = document.getElementById('Studio');
var previewPlayerTempData = "",
    movieDataXmlStr = null,
    filmXmlStr = null,
    previewStartFrame = 0;
///
/// Previewer
///
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
function get(type) {
	fetch(`/ajax/getParams?type=${type}`).then(info => {
		return info;
	}).catch(e => console.log(e));
}
function initPreviewPlayer(dataXmlStr, startFrame) {
	previewStartFrame = startFrame;
	// New variable to be used by loadPreviewer()
	movieDataXmlStr = dataXmlStr;
	// Movie XML
	filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
	if (typeof startFrame == 'undefined') {
		startFrame = 1;
	} else {
		startFrame = Math.max(1, parseInt(startFrame));
	}
	// setup preview popup
	const attrs = {
		data: get("animationPath") + "/player.swf",
		type: "application/x-shockwave-flash",
		width: "870",
		height: "420",
	};
	const params = {
		flashvars: {
			apiserver: "/",
			storePath: get("storePath") + "/<store>",
			ut: 60,
			autostart: 1,
			isWide: 1,
			clientThemePath: get("clientThemePath") + "/<client_theme>",
			isInitFromExternal: 1,
			startFrame: previewStartFrame
		},
		allowScriptAccess: "always",
		allowFullScreen: "true",
	};
	previewer.innerHTML = toObjectString(attrs, params);
	document.getElementById('player-modal').style.display = 'block';
	// Load the Video Previewer
	loadPreviewer();
}
function loadPreviewer() {
	// I think this is in case of an error??
	if (movieDataXmlStr === null) return;
	// I don't know
	savePreviewData(movieDataXmlStr);
}
function savePreviewData(a) {
	// Set temp data variable
	previewPlayerTempData = a
}
function retrievePreviewPlayerData() {
	// Store in separate variable
	var recentPreviewPlayerTempData = previewPlayerTempData;
	// Clear original variable
	previewPlayerTempData = "";
	// Return recent temp data
	return recentPreviewPlayerTempData;
}
///
/// Other stuff
///
function exitStudio() {
	window.location = "/";
}
// interactive tutorial
interactiveTutorial = {
	neverDisplay: function() {
		const tutorialReload = (new URLSearchParams(window.location.search)).get("tutorial");
		if (!tutorialReload) {
			fetch('/ajax/getTutorialShowStatus').then(status => {
				return status ? true : false;
			}).catch(e => console.log(e));
		} else return tutorialReload ? false : true;
	}
}
// Hide Video Previewer popup
function hidePreviewer() {
	document.getElementById('player-modal').style.display = 'none';
	studio.onExternalPreviewPlayerCancel();
}
function publishStudio() {
	document.getElementById('player-modal').style.display = 'none';
	studio.onExternalPreviewPlayerPublish();
}
