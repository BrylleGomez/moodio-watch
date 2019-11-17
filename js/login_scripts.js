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
	
}	// end window.onload 

/////////////////////////////////////////////////////////////////////////////


////////////////////////////// EVENT LISTENERS //////////////////////////////

$("#login_button").click(function(){
	
//	// login
//	var user = $("#login_username").val().toString();
//	var pass = $("#login_password").val().toString();
//	console.log("Username: " + user);
//	console.log("Password: " + pass);
//	var creds = {
//		username: user,
//		password: pass
//	}	// create JSON object to store credentials
//	$.post(server_ip + ":" + server_port + route_sendcreds, creds, function(data, status) {
//		// send credentials to server
//		console.log("Login Status: " + data);
//		if(data) {	// if login success, will receive true from server
//			window.location.pathname = '/launcher.html';
//			alert("Login success!");
//		} else {	// if login fail, will receive false from server
//			window.location.pathname = '/login.html';
//			alert("Login failed!");
//		}
//	});
	
	// test login
	var user = "Mansour";
	var pass = "12345678"
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