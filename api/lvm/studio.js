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
// interactive tutorial stuff
var tStatus = true;
fetch('/ajax/getTutorialShowStatus').then(status => {
	tStatus = status ? false : true;
}).catch(e => console.log(e));
interactiveTutorial.isShowTutorial = tStatus;
function tutorialStarted() {}
function tutorialStep(sn) {}
function tutorialCompleted() {
	$.ajax({
		type: 'POST',
		url: '/ajax/tutorialStatus/completed'
	});
}
// get some params not included in the flashvars.
function get(type) {
	fetch(`/ajax/getParams?type=${type}`).then(info => {
		return info;
	}).catch(e => console.log(e));
}
function initPreviewPlayer(dataXmlStr, startFrame) {
	if (typeof startFrame == 'undefined') startFrame = 1;
	else startFrame = Math.max(1, parseInt(startFrame));
	if (dataXmlStr === null) return;
	const attrs = {
		height: 360,
		width: 640,
		data: get("animationPath") + "/player.swf",
		quality: "medium",
		type: "application/x-shockwave-flash",
		allowScriptAccess: "always"
	}; 
	const params = {
		apiserver: "/",
		isEmbed: 1,
		tlang: "en_US",
		isInitFromExternal: 1,
		startFrame: startFrame,
		autostart: 1,
		storePath: flashvars.storePath, 
		clientThemePath: flashvars.clientThemePath, 
		animationPath: get("animationPath") + "/",
	};
	$('#previewWindow').css("display", "block");
	$('playerdiv').append(toObjectString(attrs, params));
}
