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
	
	// Show measuring text
	$("#measure_wrapper").hide();
	$("#measuring_wrapper").show();
		
	/* ----------------------- Heart Rate Monitor, Light, and Temperature Code ----------------------- */
	
	var counter = 0;
	var hrReadings = [];	// array to contain 20 heart rate readings
	var luxReadings = [];	// array to contain 20 heart rate readings
	tizen.ppm.requestPermission("http://tizen.org/privilege/healthinfo",
			onSuccessPermission, onErrorPermission);
	var lightSensor = tizen.sensorservice.getDefaultSensor('LIGHT');
	var luxReading = 0;		// variable to store light level reading

	function onSuccessLight() {
	    console.log('light sensor started');	// debug
	    lightSensor.getLightSensorData(onGetLightSuccess);
	    // lightSensor.stop();
	}
	
	function onGetLightSuccess(sensorData) {
	    console.log('light level: ' + sensorData.lightLevel); 	// debug
	    luxReading = sensorData.lightLevel;
	}
	
	function onSuccessPermission() {
		tizen.humanactivitymonitor.start('HRM', onChangedHRM);
		lightSensor.start(onSuccessLight);
	}

	function onErrorPermission() {
		console.log("Error getting HealthInfo permission from device!");
	}

	function onChangedHRM(hrmInfo) {
		var heartRate = hrmInfo.heartRate;		// retrieve heart rate from HRM
		var rrInterval = hrmInfo.rRInterval;	// retrieve heart rate variability from HRM
		console.log('Heart Rate: ' + heartRate);	// debug
		console.log('Peak-to-peak interval: ' + hrmInfo.rRInterval + ' milliseconds');
		if (heartRate > 25) {
			hrReadings.push(heartRate);		// if detected valid heart rate value, push to heart rate values array
			counter++;
		}
	    if (counter > 20) {		// after 20 valid readings, stop reading and send heart rate to server
	    	tizen.humanactivitymonitor.stop('HRM');		// stop HRM
	    	
	    	sendSensorVals();							// send to server
	    }
	}

//	function sendSensorVals() {
//		function getSum(total, num) { return total + num;} 			// sum all heartrate readings
//		var avg = hrReadings.reduce(getSum) / hrReadings.length;	// get avg of heartrate readings
//        console.log('Sending heartrate: ' + avg);					// debug
//        $.post(server_ip + ":" + server_port + route_sendval, {		// post sensor values to server via jQuery post
//        	heartrate: avg.toString(),								// HR value
//        	lightlevel: luxReading.toString()						// lux value
//		}, function(data, status) {
//			console.log("Response from server: " + data);			// test
//			updateMood(data)										// update global variable with mood retrieved from server
//			updateUI();												// update UI due to mood change
//			// show detected mood and hide "measuring"
//			$("#measuring_wrapper").hide();
//			$("#measure_wrapper").show();
//		});
//	}
	
	function sendSensorVals() {
		function getSum(total, num) { return total + num;} 			// sum all heartrate readings
		var avg = hrReadings.reduce(getSum) / hrReadings.length;	// get avg of heartrate readings
        console.log('Sending heartrate: ' + avg);					// debug
        $.post(server_ip + ":" + server_port + route_sendval, {		// post sensor values to server via jQuery post
        	"hrm": avg.toString(),								// HR value
        	"light": luxReading.toString()						// lux value
		}, function(data, status) {
			console.log("Response from server: " + data);			// test
			updateMood(data);										// update global variable with mood retrieved from server
			updateUI();												// update UI due to mood change
			// show detected mood and hide "measuring"
			$("#measuring_wrapper").hide();
			$("#measure_wrapper").show();
		});
	}
	
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
	
}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

;

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

;

/////////////////////////////////////////////////////////////////////////////