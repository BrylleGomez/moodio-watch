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
	
	// Fetch mood
	$.post(server_ip + ":" + server_port + route_reqmood, {		// post sensor values to server via jQuery post
    	"message": "moodreq"
	}, function(data, status) {
		console.log("Response from server: " + data);			// test
		updateMood(data);										// update global variable with mood retrieved from server
		updateUI();												// update UI due to mood change
	});

}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

$("#dashboard_measure").click(function(){
	window.location.pathname = '/measure.html';
});

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

function updateUI() {
	
	// Dashboard message, moodtext and smiley
	var dashboard_message = "";
	var smiley_src = "";
	var mood_text = "";
	console.log("Updating UI with: " + current_mood);
	switch(current_mood) {
		case mood.HAPPY:
			dashboard_message = "Keep the vibe going!";
			smiley_src = "css/images/happy_smiley.png";
			mood_text = "Happy";
			console.log("UI set to HAPPY");
			break;
		case mood.SAD:
			dashboard_message = "Cheer up buddy!!";
			smiley_src = "css/images/sad_smiley.png";
			mood_text = "Sad";
			console.log("UI set to SAD");
			break;
		case mood.ANGRY:
			dashboard_message = "Relax...Take deep breaths...";
			smiley_src = "css/images/angry_smiley.png";
			mood_text = "Angry";
			console.log("UI set to ANGRY");
			break;
		default: // default is happy
			dashboard_message = "ERROR!";
			smiley_src = "";
			mood_text = "ERROR!";
			console.log("UI set to ERROR");
	}
	$("#dashboard-header-message").text(dashboard_message);
	$("#dashboard_smiley").attr("src", smiley_src);
	$("#td-left-2").text(mood_text);
	
}

/////////////////////////////////////////////////////////////////////////////