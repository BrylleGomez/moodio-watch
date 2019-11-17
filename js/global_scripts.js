/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~ Global Variables and Functions ~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////


///////////////////////////// GLOBAL VARIABLES //////////////////////////////

// Server IP, port, and routes
server_ip = "http://172.20.10.2";
server_port = "3004";
route_sendcreds = "/loginwatch";
route_reqmood = "/mood";
route_sendval = "/addsensors";

// Global user variable
var uid = null;

// Enum to store different mood values
const mood = {
	HAPPY : 'happy',
	SAD : 'sad',
	ANGRY : 'angry'
};

// Global mood variable
current_mood = mood.HAPPY; // initialize current mood to HAPPY
console.log("Initial mood: " + current_mood); // debugging

// Global Music Variable
const musicinfo = {
		ARTISTNAME : 'Happy Artist',
		SONGTITLE : 'Happy Song',
		PLAYLIST : 'Happy Playlist'
			
};

/////////////////////////////////////////////////////////////////////////////


///////////////////////////// GLOBAL FUNCTIONS //////////////////////////////

//Go back to previous page
function navBack() {
	tau.back();	// navigate to previous page
}

// Update global mood variable
function updateMood(receivedMood) {
	console.log('Received mood is ' + receivedMood);
	switch(receivedMood) {
	case 'happy':
		current_mood = mood.HAPPY;
		break;
	case 'sad':
		current_mood = mood.SAD;
		break;
	case 'angry':
		current_mood = mood.ANGRY;
		break;
	default: // default is happy
		current_mood = mood.HAPPY;
	}
	//console.log(current_mood);
}

/////////////////////////////////////////////////////////////////////////////