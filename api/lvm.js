////
//// This JS contains important Video Studio stuff
////
	
///
/// Variables
///
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
  $("#playerdiv").append(`<iframe style="border: 0px; width: 870px; height: 420px;" src="/player?isInitFromExternal=1&startFrame=${startFrame}"></iframe>`);
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
  $("#playerdiv").append(``);
  $("#player-modal").hide();
}
function hideTutorial() {
  $("#video-tutorial").hide();
}
var videoTutorial = new VideoTutorial($("#video-tutorial"));
VideoTutorial.tutorials.composition = {
  title: 'Composition Tutorial',
  wistiaId: 'nuy96pslyp',
};
VideoTutorial.tutorials.enterexit = {
  title: 'Enter and Exit Effects Tutorial',
  wistiaId: 'fvjsa3jnzc',
}
