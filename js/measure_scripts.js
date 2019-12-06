/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~~~~~~ Scripts for measure.html ~~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////

////////////////////////////////// ON LOAD //////////////////////////////////

window.onload = init();
	
function init() {	// begin window.onload 

	// Debug
	console.log("Starting MEASURE scripts!");
	
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
	
	// Show measuring text
	$("#measure_wrapper").hide();
	$("#measuring_wrapper").show();
		
	/* ----------------------- Heart Rate Monitor & Light + MQTT Code ----------------------- */
	
	// var hrReadings = [];	
	// rrReadings = [];	// array to contain 100 rr-Intervals (heartbeat peak-to-peak intervals)
	luxReading = 0;		// variable to store light level reading
	counter = 0;			// count to keep track of how many rr-Intervals have been read
	firstReading = true;
	leftRR = 0;
	rightRR = 0;
	
}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

;

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

//MQTT onConnect
function onConnect() {

	console.log("Connected to MQTT broker!");
	mqttClient.subscribe(mqtt_mood);	// subscribe to mood topic to retrieve calculated mood by server
	// once connected to the broker, commence sensor reading
	tizen.ppm.requestPermission("http://tizen.org/privilege/healthinfo",
			onSuccessPermission, onErrorPermission);					// request to use watch sensors
    
}

// MQTT onMessageArrived
function onMessageArrived(message){
	
	if(message.destinationName == mqtt_mood && message.payloadString != "moodreq"){

		console.log("Response from server: " + message.payloadString);		// test
		updateMood(message.payloadString);									// update global variable with mood retrieved from server								// update global variable with mood retrieved from server
		updateUI();												// update UI due to mood change
		// show detected mood and hide "measuring"
		$("#measuring_wrapper").hide();
		$("#measure_wrapper").show();
		
    }
	
}

function onSuccessPermission() {
	// called when successfully retrieved permission to read from servers 
	console.log("Success permission!");
	tizen.humanactivitymonitor.start('HRM', onChangedHRM);		// start reading HRM
	lightSensor = tizen.sensorservice.getDefaultSensor('LIGHT');	// get light sensor
	lightSensor.start(onSuccessLight);							// start reading light sensor
}

function onErrorPermission() {
	// called when unsuccessful in retrieving permission to read from servers 
	console.log("Error getting HealthInfo permission from device!");
}

function onSuccessLight() {
	// called when light sensor successfully started
    console.log('light sensor started');	// debug
    lightSensor.getLightSensorData(onGetLightSuccess);
    // lightSensor.stop();
}

function onGetLightSuccess(sensorData) {
	// called when successfully retrieved light level from light sensor
    console.log('light level: ' + sensorData.lightLevel); 	// debug
    luxReading = sensorData.lightLevel;
}

function onChangedHRM(hrmInfo) {
	// called for each successive heart rate sensor reading
	// var heartRate = hrmInfo.heartRate;		// retrieve heart rate from HRM
	var rrInterval = hrmInfo.rRInterval;	// retrieve heart rate variability from HRM
	// console.log('Heart Rate: ' + heartRate);	// debug
	console.log('Peak-to-peak interval: ' + hrmInfo.rRInterval + ' milliseconds');
	if (rrInterval > 0) {
		if (firstReading) {
			rightRR = rrInterval;
			firstReading = false;
		} else {
			leftRR = rightRR;
			rightRR = rrInterval;
			var diff = Math.abs(rightRR - leftRR);	// get abs value
			sendRRInterval(diff);
		}
		counter++;
	}
	console.log("Count: " + counter);
	if (counter > 150) {
		tizen.humanactivitymonitor.stop('HRM');		// stop HRM
		sendLightLevel();							// send light level at the end of HRM reading
		firstReading = true;
	}
}

function sendRRInterval(reading) {
	
    console.log('Sending rr-Interval: ' + reading);					// debug
    // send rr-Interval
	var messageRR = new Paho.MQTT.Message(reading.toString());
	messageRR.destinationName = mqtt_sensors_hrm;
    mqttClient.send(messageRR); // publish message
    
}

function sendLightLevel() {
	
	console.log('Sending light level: ' + luxReading);					// debug
	// send light
    var messageLight = new Paho.MQTT.Message(luxReading.toString());
    messageLight.destinationName = mqtt_sensors_light;
    mqttClient.send(messageLight); // publish message
    
}

// Update UI
function updateUI() {
	
	// Measure moodtext and smiley
	var smiley_src = "";
	var mood_text = "";
	switch(current_mood) {
		case mood.HAPPY:
			smiley_src = "css/images/happy_smiley.png";
			mood_text = "Happy";
			break;
		case mood.SAD:
			smiley_src = "css/images/sad_smiley.png";
			mood_text = "Sad";
			break;
		case mood.ANGRY:
			smiley_src = "css/images/angry_smiley.png";
			mood_text = "Angry";
			break;
		default: // default is happy
			smiley_src = "";
			mood_text = "ERROR!";
	}
	$("#measure_smiley").attr("src", smiley_src);
	$("#mood_text").text(mood_text);
	
}

/////////////////////////////////////////////////////////////////////////////