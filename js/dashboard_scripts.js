/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~~~~ Scripts for dashboard.html ~~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////


////////////////////////////////// ON LOAD //////////////////////////////////

window.onload = init();
	
function init() {	// begin window.onload 

	// Debug
	console.log("Starting DASHBOARD scripts!");
	
	// Attach back key listener
	window.addEventListener("tizenhwkey", function(ev) {
		var activePopup = null, page = null, pageId = "";
		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageId = page ? page.id : "";
			if (pageId === "main" && !activePopup) {
				try {
					console.log("Exiting app!");
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				console.log("Back key pressed!");
				window.history.back();
			}
		}
	});
	
	/* ~~~~~~~~~~~~~~~~~~~~~~~~ Update UI with Mood ~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	// Dashboard message, moodtext and smiley
	var dashboard_message = "";
	var smiley_src = "";
	var mood_text = "";
	console.log(current_mood);
	switch(current_mood) {
		case mood.HAPPY:
			dashboard_message = "Keep the vibe going!";
			smiley_src = "css/images/happy_smiley.png";
			mood_text = "Happy";
			break;
		case mood.SAD:
			dashboard_message = "Cheer up buddy!!";
			smiley_src = "css/images/sad_smiley.png";
			mood_text = "Sad";
			break;
		case mood.ANGRY:
			dashboard_message = "Relax...Take deep breaths...";
			smiley_src = "css/images/angry_smiley.png";
			mood_text = "Angry";
			break;
		default: // default is happy
			dashboard_message = "ERROR!";
			smiley_src = "";
			mood_text = "ERROR!";
	}
	$("#dashboard-header-message").text(dashboard_message);
	$("#dashboard_smiley").attr("src", smiley_src);
	$("#td-left-2").text(mood_text);

}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

$("#dashboard_measure").click(function(){
	window.location.pathname = '/measure.html';
});

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

;

/////////////////////////////////////////////////////////////////////////////