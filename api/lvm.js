////
//// This JS contains important Video Studio stuff
////
	
///
/// Variables
///
var previewer = document.getElementById('playerdiv');
var previewPlayerTempData = "";
///
/// Previewer
///
function initPreviewPlayer(dataXmlStr, startFrame, containsChapter, themeList) {
	// New variable to be used by loadPreviewer()
	movieDataXmlStr = dataXmlStr;
	// Movie XML
	filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
	// setup preview popup
	previewer.innerHTML = `<iframe style="border: 0px; width: 870px; height: 420px;" src="/player?isInitFromExternal=1&startFrame=${startFrame}"></iframe>`;
	$("#player-modal").show();
	// Load the Video Previewer
	loadPreviewer();
}
function setupTutorial() {
	fetch('/ajax/getTutorialShowStatus').then(status => {
		return status;
	});
}
function loadPreviewer() {
	// I think this is in case of an error??
	if (movieDataXmlStr === null) return;
	// I don't know
	savePreviewData(movieDataXmlStr);
}
///
/// Other stuff
///
function exitStudio() {
	window.location = "/";
}
// interactive tutorial
interactiveTutorial.isShowTutorial = setupTutorial();
function tutorialStarted() {}
function tutorialStep(sn) {}
function tutorialCompleted() {
	$.ajax({
		type: 'POST',
		url: '/ajax/tutorialStatus/completed'
	});
}
// Hide Video Previewer popup
function hidePreviewer() {
	previewer.innerHTML = ``;
	$("#player-modal").hide();
}
