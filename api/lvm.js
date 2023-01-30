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
const previewer = $("#playerdiv"),
      player = $("#player-modal"),
      importer = $("#import-modal"),
      studio = $("#obj")[0];
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
			previewer.innerHTML = object.data;
			player.show();
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
			fetch("/ajax/settings/list").then(info => {
				info.json().then(data => {
					return data.tutorial;
				});
			});
		} else return false;
	}
}
// Hide Video Previewer popup
function hidePreviewer() {
	studio.onExternalPreviewPlayerCancel();
	player.hide();
}
function publishStudio() {
	studio.onExternalPreviewPlayerPublish();
	player.hide();
}
function showImporter() {
	importer.show();
}
