/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~ Global Variables and Functions ~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////


///////////////////////////// GLOBAL VARIABLES //////////////////////////////

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