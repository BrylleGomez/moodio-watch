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
	
	// Connect to MQTT
	console.log("Attempting to Connect...");		
    mqttClient.connect({onSuccess:onConnect});			// connect to MQTT broker
    mqttClient.onMessageArrived = onMessageArrived;		// set message arrival callback

}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

;

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

//MQTT onConnect
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Connected to MQTT broker!");
    mqttClient.subscribe(mqtt_mood);
    console.log("Subscribed to all topics!");
    
    // Fetch mood from server via MQTT
    var message = new Paho.MQTT.Message("moodreq");
    message.destinationName = mqtt_mood;
    mqttClient.send(message); // publish message
    
}

// MQTT onMessageArrived
function onMessageArrived(message){
	
	if(message.destinationName == mqtt_mood && message.payloadString != "moodreq"){

		console.log("Response from server: " + message.payloadString);			// test
		updateMood(message.payloadString);										// update global variable with mood retrieved from server
		updatePlaylistUI();												// update UI due to mood change
		
    }
	
}

//Update playlist UI
function updatePlaylistUI() {
	
	// Launcher Smiley & Message
	var playlist_list = [];
	switch(current_mood) {
		case mood.HAPPY:
			playlist_list = ["Happy Playlist", "Good Vibes Songs", "1980's Classics"];
			break;
		case mood.SAD:
			playlist_list = ["Sad Playlist", "Cheer Up Tunes", "Disney Sing-alongs"];
			break;
		case mood.ANGRY:
			playlist_list = ["Angry Playlist", "Beethoven & Mozart", "Inner Peace"];
			break;
		default: // default is happy
			playlist_list = ["Happy Playlist", "Good Vibes Songs", "1980's Classics"];
	}
	$("#playlist_1").text(playlist_list[0]);
	$("#playlist_2").text(playlist_list[1]);
	$("#playlist_3").text("Hehe");
	
}

/////////////////////////////////////////////////////////////////////////////