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
function get(type) {
	fetch(`/ajax/getParams?type=${type}`).then(data => {
		data.json().then(info => {
			return info.data;
		}).catch(e => console.log(e));
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
	fetch(`/ajax/getParams?type=object&subtype=previewPlayer&startFrame=${previewStartFrame}`).then(data => {
		data.json().then(object => {
			document.getElementById('playerdiv').innerHTML = object.data;
			document.getElementById('player-modal').style.display = 'block';
			// Load the Video Previewer
			loadPreviewer();
		}).catch(e => console.log(e));
	}).catch(e => console.log(e));
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
			fetch("/ajax/getTutorialShowStatus").then(info => {
				info.json().then(status => {
					return status;
				});
			});
		} else return tutorialReload ? false : true;
	}
}
// Hide Video Previewer popup
function hidePreviewer() {
	document.getElementById("obj")[0].onExternalPreviewPlayerCancel();
	document.getElementById('player-modal').style.display = 'none';
}
function publishStudio() {
	document.getElementById("obj")[0].onExternalPreviewPlayerPublish();
	document.getElementById('player-modal').style.display = 'none';
}
function showImporter() {
	document.getElementById('import-modal').style.display = 'block';
}
