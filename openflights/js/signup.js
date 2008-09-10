/*
 * Create new user accounts and modify existing ones
 */
var URL_SIGNUP = "/php/signup.php";

window.onload = function init(){
  if(window.location.href.indexOf("settings") != -1) {
    xmlhttpPost(URL_SIGNUP, "LOAD");
  }
}

function xmlhttpPost(strURL, type) {
  var xmlHttpReq = false;
  var self = this;
  // Mozilla/Safari
  if (window.XMLHttpRequest) {
    self.xmlHttpReq = new XMLHttpRequest();
  }
  // IE
  else if (window.ActiveXObject) {
    self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
  }
  self.xmlHttpReq.open('POST', strURL, true);
  self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  self.xmlHttpReq.onreadystatechange = function() {
    if (self.xmlHttpReq.readyState == 4) {

      if(strURL == URL_SIGNUP) {
	if(type == "LOAD") {
	  loadUser(self.xmlHttpReq.responseText);
	} else {
	  signup(self.xmlHttpReq.responseText);
	}
      }
    }
  }
  var query = "";
  if(strURL == URL_SIGNUP) {
    var form = document.forms['signupform'];
    var privacy;

    for (r=0; r < signupform.privacy.length; r++){
      if (signupform.privacy[r].checked) {
	privacy = signupform.privacy[r].value;
      }
    }
    query = 'type=' + type + '&' +
      'pw=' + escape(form.pw1.value) + '&' +
      'email=' + escape(form.email.value) + '&' +
      'privacy=' + escape(privacy);
    switch(type) {
    case 'NEW':
      query += '&name=' + escape(form.username.value);
      document.getElementById("miniresultbox").innerHTML = "<I>Creating account...</I>";
      break;

    case 'EDIT':
      query += '&oldpw=' + escape(form.oldpw.value);
      document.getElementById("miniresultbox").innerHTML = "<I>Saving changes...</I>";
      break;

    case 'LOAD':
      // do nothing
      break;
    }
  }
  self.xmlHttpReq.send(query);
}

// Validate form
function validate(type) {
  var form = document.forms['signupform'];
  var pw1 = form.pw1.value;
  var pw2 = form.pw2.value;
  var email = form.email.value;

  if(type == 'NEW') {
    var name = form.username.value;
    if(name == "") {
      showError("Please enter a username.");
      return;
    }
    if(pw1 == "") {
      showError("Please enter a password.");
      return;
    }
  }
  if(type == 'EDIT') {
    var oldpw = form.oldpw.value;
    if(pw1 != "" && oldpw == "") {
      showError("Please enter your current password.");
      return;
    }
  }

  if(pw1 != pw2) {
    showError("Your passwords don't match, please try again.");
    return;
  }

  if(email != "" && ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    showError('Invalid e-mail address, it should be "user@example.domain"');
    return;
  }

  document.getElementById("miniresultbox").innerHTML = "<i>Processing...</i>";
  xmlhttpPost(URL_SIGNUP, type);
}

// Load up user data
function loadUser(str) {
  var code = str.split(";")[0];
  if(code == "1") {
    var name = str.split(";")[1];
    var email = str.split(";")[2];
    var privacy = str.split(";")[3];

    var form = document.forms['signupform'];
    signupform.email.value = email;
    signupform.myurl.value = "http://openflights.org/user/" + escape(name);
    for (r=0; r < signupform.privacy.length; r++){
      if (signupform.privacy[r].value == privacy) {
	signupform.privacy[r].checked = true;
      } else {
	signupform.privacy[r].checked = false;
      }
    }
  } else {
    showError(str.split(";")[1]);
  }
}


function signup(str) {
  var code = str.split(";")[0];
  var message = str.split(";")[1];
  // Operation successful
  if(code != "0") {
    document.getElementById("miniresultbox").innerHTML = message;
    if(code == "1") { // new
      var form = document.forms['signupform'];
      var name = form.username.value;
      var pw = form.pw1.value;
      parent.opener.newUserLogin(name, pw);
    }
    window.close();
  } else {
    showError(message);
  }
}

function showError(err) {
  document.getElementById("miniresultbox").innerHTML = "<font color=red>" + err + "</font>";
}
