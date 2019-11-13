/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~~~~~ Scripts for launcher.html ~~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////


////////////////////////////////// ON LOAD //////////////////////////////////

window.onload = init();
	
function init() {	// begin window.onload 
	
	// test login
	var creds = {
		username: "Mansour",
		password: "12345678"
	}
	$.post("http://192.168.43.18:3004/loginwatch", creds, function(data, status) {
		console.log("Login Status: " + data);
	});
	
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

;

/////////////////////////////////////////////////////////////////////////////