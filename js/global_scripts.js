/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~ Global Variables and Functions ~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////

var uid = null;


// Enum to store different mood values
const mood = {
	HAPPY : 'happy',
	SAD : 'sad',
	ANGRY : 'angry'
};

// Initialize variable to store current user mood
var current_mood;
current_mood = mood.HAPPY; // initialize current mood to HAPPY
console.log(current_mood); // debugging

//// function dismisses the "div_feedback" message in the Music Player page 
//function dismissFeedback() {
//	var elem = document.getElementById("div_feedback");
//	elem.parentNode.removeChild(elem);
//}

// Dismiss feedback messages
$(".dismissFeedback").click(function(){
	  $("#div_feedback").hide();
});

// Go back to previous page
function navBack() {
	tau.back();	// navigate to previous page
}

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
	console.log(current_mood);
}