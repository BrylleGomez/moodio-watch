/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~~~~~ Scripts for launcher.html ~~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////

////////////////////////////////// ON LOAD //////////////////////////////////

window.onload = init();
	
function init() {	// begin window.onload 
	
	// Debug
	console.log("Starting LAUNCHER scripts!");
	
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
	
	/* ~~~~~~~~~~~~~~~~~~~~~~~~ Section Changer ~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	var self = this, page = document.getElementById("main"), changer = document
			.getElementById("hsectionchanger"), sectionChanger, elPageIndicator = document
			.getElementById("pageIndicator"), pageIndicator, pageIndicatorHandler;

	page.addEventListener("pagebeforeshow", function() {
		/* Create PageIndicator */
		pageIndicator = tau.widget.PageIndicator(elPageIndicator, {
			numberOfPages : 2,
			layout : "circular"
		});
		pageIndicator.setActive(0);

		sectionChanger = new tau.widget.SectionChanger(changer, {
			circular : false,
			orientation : "horizontal",
			useBouncingEffect : true
		});
	});

	page.addEventListener("pagehide", function() {
		sectionChanger.destroy();
		pageIndicator.destroy();
	});

	// Indicator setting handler
	pageIndicatorHandler = function(e) {
		pageIndicator.setActive(e.detail.active);
	};

	// Bind the callback 
	changer.addEventListener("sectionchange", pageIndicatorHandler, false);
	
	/* ~~~~~~~~~~~~~~~~~~~~~~~~ Update UI with Mood ~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	// Fetch mood
	$.post(server_ip + ":" + server_port + route_reqmood, {		// post sensor values to server via jQuery post
    	"message": "moodreq"
	}, function(data, status) {
		console.log("Response from server: " + data);			// test
		updateMood(data)										// update global variable with mood retrieved from server
		updateUI();												// update UI due to mood change
	});
	
}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

$("#launcher_smiley").click(function(){
	window.location.pathname = '/dashboard.html';
});

$("#div_playlist").click(function(){
	window.location.pathname = '/playlists.html';
});

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

//Dismiss feedback message
$(".dismissFeedback").click(function(){
	  $("#div_feedback").hide();
});

function updateUI() {
	
	// Launcher Smiley & Message
	var smiley_src = "";
	var launcher_message = "";
	switch(current_mood) {
		case mood.HAPPY:
			smiley_src = "css/images/happy_smiley.png";
			launcher_message = "Someone's in a cheerful mood!";
			break;
		case mood.SAD:
			smiley_src = "css/images/sad_smiley.png";
			launcher_message = "Why the sad face?";
			break;
		case mood.ANGRY:
			smiley_src = "css/images/angry_smiley.png";
			launcher_message = "Someone's all worked up...";
			break;
		default: // default is happy
			smiley_src = "";
			launcher_message = "ERROR!";
	}
	$("#launcher_smiley").attr("src", smiley_src);
	$("#laucher_message").text(launcher_message);
	
}

/////////////////////////////////////////////////////////////////////////////