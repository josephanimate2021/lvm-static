////
//// This JS contains important Video Studio stuff
////
	
///
/// Variables
///
var previewPlayerTempData = "",
    movieDataXmlStr = null,
    filmXmlStr = null,
    previewStartFrame = 0;
///
/// Previewer
///
function get(type, subtype = false, previewStartFrame) {
	if (!subtype) {
		fetch(`/ajax/getParams?type=${type}`).then(info => {
			return info;
		}).catch(e => console.log(e));
	} else if (subtype == "previewPlayer") {
		fetch(`/ajax/getParams?type=${type}&subtype=${subtype}&startFrame=${previewStartFrame}`).then(info => {
			return info;
		}).catch(e => console.log(e));
	}
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
	document.getElementById('playerdiv').innerHTML = `${get("object", "previewPlayer", previewStartFrame)}`;
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
	document.getElementById('Studio').onExternalPreviewPlayerCancel();
}
function publishStudio() {
	document.getElementById('player-modal').style.display = 'none';
	document.getElementById('Studio').onExternalPreviewPlayerPublish();
}