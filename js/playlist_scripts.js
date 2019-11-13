/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~~~~ Scripts for playlists.html ~~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////


////////////////////////////////// ON LOAD //////////////////////////////////

window.onload = init();
	
function init() {	// begin window.onload 

	// Debug
	console.log("Starting PLAYLIST scripts!");
	
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

}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

;

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

;

/////////////////////////////////////////////////////////////////////////////