////
//// This JS contains important Video Studio stuff
////
	
///
/// Variables
///
var previewPlayerTempData = "";
var previewStartFrame = "";
const previewer = $("#playerdiv");
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
	return Object.keys(table).map((key) => toAttrString(table[key])).join(" ");
}
function initPreviewPlayer(dataXmlStr, startFrame) {
	// New variable to be used by loadPreviewer()
	movieDataXmlStr = dataXmlStr;
	// Movie XML
	filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
	// Show preview popup
	$("#id01").show();
	// Load the Video Previewer
	loadPreviewer(startFrame);
}
function get(type) {
	fetch(`/ajax/getParams?type=${type}`).then(info => {
		return info;
	}).catch(e => console.log(e));
}
function loadPreviewer(startFrame) {
	if (typeof startFrame == 'undefined') previewStartFrame = 1;
	else previewStartFrame = Math.max(1, parseInt(startFrame));
	// I think this is in case of an error??
	if (movieDataXmlStr === null) return;
	// I don't know
	savePreviewData(movieDataXmlStr);
	const flashvars = {
		apiserver: "/",
		isEmbed: 1,
		tlang: "en_US",
		isInitFromExternal: 1,
		startFrame: previewStartFrame,
		autostart: 1,
		storePath: get("storePath") + "/<store>", 
		clientThemePath: get("clientThemePath") + "/<client_theme>", 
		animationPath: get("animationPath") + "/"
	}
	previewer.find("object param[name='flashvars']").attr("value", toParamString(flashvars));
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
const tutorialReload = (new URLSearchParams(window.location.search)).get("tutorial");
if (!tutorialReload) {
	var tStatus = true;
	fetch('/ajax/getTutorialShowStatus').then(status => {
		tStatus = status ? true : false;
	}).catch(e => console.log(e));
	interactiveTutorial.isShowTutorial = tStatus;
} else interactiveTutorial.isShowTutorial = tutorialReload ? true : false;
function tutorialStarted() {
}
function tutorialStep(sn) {
}
function tutorialCompleted() {
	$.ajax({
		type: 'POST',
                url: '/ajax/tutorialStatus/completed'
	});
}
function hideTutorial() {
	$("#tutorial-modal").hide();
}
var videoTutorial = new VideoTutorial($("#tutorial-modal"));
VideoTutorial.tutorials.composition = {
	title: 'Composition Tutorial',
        wistiaId: 'nuy96pslyp',
};
VideoTutorial.tutorials.enterexit = {
	title: 'Enter and Exit Effects Tutorial',
        wistiaId: 'fvjsa3jnzc',
}
