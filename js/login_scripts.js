/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~~~~~~~ Scripts for login.html ~~~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////

////////////////////////////////// ON LOAD //////////////////////////////////

window.onload = init();

function init() {	// begin window.onload 
	
	// Debug
	console.log("Starting LOGIN scripts!");
	
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

$("#login_button").click(function(){
	
	// MQTT login
//	var user = "mansour";	// test
//	var pass = "12345678";	// test
	var user = $("#login_username").val().toString();
	var pass = $("#login_password").val().toString();
	var cap = tizen.systeminfo.getCapabilities();
	var devID = cap.duid;
	console.log("Username: " + user);
	console.log("Password: " + pass);
	console.log("Device ID: " + devID);
	var creds = {
		username: user,
		password: pass,
		devid: devID
	}
	var message = new Paho.MQTT.Message(JSON.stringify(creds));
    message.destinationName = mqtt_watch_login;
    mqttClient.send(message); // publish message
	
});

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

// MQTT onConnect
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Connected to MQTT broker!");
    mqttClient.subscribe(mqtt_watch_login);
    console.log("Subscribed to all topics!");
    
}

// MQTT onMessageArrived
function onMessageArrived(message){
	
	if(message.destinationName == mqtt_watch_login){

		console.log("Login Status: " + message.payloadString);
		if (message.payloadString == "true") {	// if login success, will receive true from server
			window.location.pathname = '/launcher.html';
			alert("Login success!");
		} else if (message.payloadString == "false") {	// if login fail, will receive false from server
			window.location.pathname = '/login.html';
			alert("Login failed!");
		} else if (message.payloadString == "registered") {	// if login fail, will receive false from server
			alert("New watch registered!");
		}
		
    }
	
}

/////////////////////////////////////////////////////////////////////////////