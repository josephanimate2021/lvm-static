////
//// This JS contains important Video Studio stuff
////
	
///
/// Variables
///
var previewPlayerTempData = "";
///
/// functions for creating an object string
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
	return Object.keys(table).map((key) => `<param name="${key}" value="${toAttrString(table[key])}">`).join(" ");
}
function toObjectString(attrs, params) {
	return `<object ${Object.keys(attrs).map((key) => `${key}="${attrs[key].replace(/"/g, '\\"')}"`).join(" ")}>${toParamString(params)}</object>`;
}
///
/// Previewer
///
function initPreviewPlayer(dataXmlStr, startFrame) {
	// New variable to be used by loadPreviewer()
	movieDataXmlStr = dataXmlStr;
	// Movie XML
	filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
	// Show preview popup
	$("#id01").show();
	// Load the Video Previewer
	loadPreviewer();
}
function get(type) {
	fetch(`/ajax/getParams?type=${type}`).then(info => {
		return info;
	}).catch(e => console.log(e));
}
function loadPreviewer() {
	// I think this is in case of an error??
	if (movieDataXmlStr === null) return;
	// I don't know
	savePreviewData(movieDataXmlStr);
	const attrs = {
		height: 360,
		width: 640,
		data: get("animationPath") + "/player.swf",
		quality: "medium",
		type: "application/x-shockwave-flash",
		allowScriptAccess: "always"
	}; 
	const params = {
		flashvars: {
			apiserver: "/",
			isEmbed: 1,
			tlang: "en_US",
			isInitFromExternal: 1,
			startFrame: startFrame,
			autostart: 1,
			storePath: flashvars.storePath, 
			clientThemePath: flashvars.clientThemePath, 
			animationPath: get("animationPath") + "/"
		}
	};
	document.getElementById('playerdiv').innerHTML = `${toObjectString(attrs, params)}`;
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
		tStatus = status ? false : true;
	}).catch(e => console.log(e));
	interactiveTutorial.isShowTutorial = tStatus;
} else interactiveTutorial.isShowTutorial = tutorialReload ? false : true;
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
