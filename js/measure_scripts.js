/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~~~~~~ Scripts for measure.html ~~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////


////////////////////////////////// ON LOAD //////////////////////////////////

window.onload = init();
	
function init() {	// begin window.onload 

	console.log("Measure.html screen loaded!");
	$("#measure_wrapper").hide();
	$("#measuring_wrapper").show();
		
	/* --------------------------- Heart Rate Monitor Code --------------------------- */
	
	var counter = 0;
	var hrReadings = [];	// array to contain 20 heart rate readings
	tizen.ppm.requestPermission("http://tizen.org/privilege/healthinfo",
			onSuccessPermission, onErrorPermission);

	function onSuccessPermission() {
		tizen.humanactivitymonitor.start('HRM', onChangedHRM);
	}

	function onErrorPermission() {
		console.log("Error getting HealthInfo permission from device!");
	}

	function onChangedHRM(hrmInfo) {
		var heartRate = hrmInfo.heartRate;		// retrieve heart rate from HRM
		console.log('Heart Rate: ' + heartRate);	// debug
		if (heartRate > 25) {
			hrReadings.push(heartRate);		// if detected valid heart rate value, push to heart rate values array
			counter++;
		}
		$("#test").text(hrmInfo.heartRate);	// test
	    if (counter > 20) {		// after 20 valid readings, stop reading and send heart rate to server
	    	tizen.humanactivitymonitor.stop('HRM');		// stop HRM
	    	sendHeartRate();							// send to server
	    }
	}

	function sendHeartRate() {
		function getSum(total, num) { return total + num;} 
		var avg = hrReadings.reduce(getSum) / hrReadings.length;
        console.log('Sending heartrate: ' + avg);
        $.post("http://192.168.1.104:3000/testpost", {
        	heartrate: avg.toString()
		}, function(data, status) {
			console.log("Data: " + data + "\nStatus: " + status);	// test
			updateMood(data)	// data.mood can be happy, sad, or angry
			updateUI();
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