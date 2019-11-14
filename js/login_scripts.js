/////////////////////////////////////////////////////////////////////////////
/////* ~~~~~~~~~~~~~~~~~~~~ Scripts for login.html ~~~~~~~~~~~~~~~~~~~ */////
/////////////////////////////////////////////////////////////////////////////

var server_ip = "http://192.168.43.154";
var server_port = "3004";
var route_sendcreds = "/loginwatch";

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
	
}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

$("#login_button").click(function(){
	
	// test login
	var user = $("#login_username").val().toString();
	var pass = $("#login_password").val().toString();
	console.log("Username: " + user);
	console.log("Password: " + pass);
	var creds = {
		username: user,
		password: pass
	}
	$.post(server_ip + ":" + server_port + route_sendcreds, creds, function(data, status) {
		console.log("Login Status: " + data);
		if(data) {
			window.location.pathname = '/launcher.html';
			alert("Login success!");
		} else {
			window.location.pathname = '/login.html';
			alert("Login failed!");
		}
	});
	
	
});

/////////////////////////////////////////////////////////////////////////////


///////////////////////// HELPER/CALLBACK FUNCTIONS /////////////////////////

;

/////////////////////////////////////////////////////////////////////////////