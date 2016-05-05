import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
var count = new ReactiveVar(false);
Template.templateSignUpForm.events({
	'click #signup_register' : function(evt, t) 
	{             
		//$('#errorMsgSgnUp').html('');
	  evt.preventDefault();

						$('#errorMsgSgnUp').html('');
					var username = t.find("#signup_username").value,
					firstName = t.find("#signup_firstname").value,
					lastName = t.find("#signup_lastname").value,
					email = t.find("#signup_email").value;
					password = t.find("#signup_password").value,
					RePassword = t.find("#signup_retypePassword").value,
					userType = $("#signupwrapper #Utype").text();
					switch (userType) {
					  case 'book bands':
						type = "costumer";
					  break;
					  case 'join as a band':
					    type = "band";
					  break;
					  case 'join as an artist':
					    type = "artist";
					  break;
					  case 'join as an agent':
					    type = "agent";
					  break;  
					  default: type  ='nothing';
					     	} 
					if(username === '' || username === 'username')
					{
						$('#errorMsgSgnUp').html('username empty');
						$("#validUsername_sgnUp").addClass('glyphicon-asterisk');
					}

					if((firstName === '' || firstName === 'first name') && (username !== '') && (username !== 'username'))
					{
						$('#errorMsgSgnUp').html('first name empty');
						$("#validFisrtName_sgnUp").addClass('glyphicon-asterisk');
					}

					if(( lastName === ''|| lastName === 'last name') &&
						(firstName !== '') && (firstName !== 'first name') && (username !== '') && (username !== 'username'))
					{
						$('#errorMsgSgnUp').html('last name empty');
						$("#validLastName_sgnUp").addClass('glyphicon-asterisk');
					}
					if(( email === '' || email === 'email') && ( lastName !== '' ) && (lastName !== 'last name') &&
						(firstName !== '') && (firstName !== 'first name') && (username !== '') && (username !== 'username'))
					{
						$('#errorMsgSgnUp').html('email empty');
						$("#validEmail_sgnUp").addClass('glyphicon-asterisk');
					}
					if(( email !== '') && (email !== 'email') && ( lastName !== '' ) && (lastName !== 'last name') &&
						(firstName !== '') && (firstName !== 'first name') && (username !== '') && (username !== 'username')
						&& (!validateEmail(email) ))
						{
							$('#errorMsgSgnUp').html('incorrect email format');
						    $("#validEmail_sgnUp").removeClass('glyphicon-asterisk');
						    $("#validEmail_sgnUp").addClass('glyphicon-remove');
						}
						if((type === 'nothing')&& (email !== '') && (email !== 'email') && ( lastName !== '' ) &&
						 (lastName !== 'last name') &&(firstName !== '') && (firstName !== 'first name') && (username !== '') &&
						  (username !== 'username')&& (validateEmail(email) ))
						{
							$('#errorMsgSgnUp').html('Select choice');
						}

					if((type !== 'nothing') &&(password === '' || password == 'password') && ( email !== '') && (email !== 'email') && ( lastName !== '' ) && (lastName !== 'last name') &&
						(firstName !== '') && (firstName !== 'first name') && (username !== '') && (username !== 'username')
						&& (validateEmail(email) ))
						{
							$('#errorMsgSgnUp').html('empty password');
						    $("#validPasswd_sgnUp").addClass('glyphicon-asterisk');
						}

						if((password.length <= 6 )&& (password !== '') && (password !== 'password') && ( email !== '') && (email !== 'email') && ( lastName !== '' ) && (lastName !== 'last name') &&
						(firstName !== '') && (firstName !== 'first name') && (username !== '') && (username !== 'username')
						&& (validateEmail(email) ))
						{
							$('#errorMsgSgnUp').html('password must be > 6 characters');
						    $("#validPasswd_sgnUp").removeClass('glyphicon-asterisk');
						    $("#errorMsgSgnUp").css({"margin-left": "90px"});
						    $("#validPasswd_sgnUp").addClass('glyphicon-remove');
						}	

						if((RePassword === '' || RePassword === 'password')  && (password.length > 6 )&& (password !== '') && (password !== 'password') && ( email !== '') && (email !== 'email') && ( lastName !== '' ) && (lastName !== 'last name') &&
						(firstName !== '') && (firstName !== 'first name') && (username !== '') && (username !== 'username')
						&& (validateEmail(email) ))
						{
							$('#errorMsgSgnUp').html('Retype password');
						    $("#validRePsswd_sgnUp").addClass('glyphicon-asterisk');
						}

						if((RePassword !== password) &&(RePassword !== '') && (RePassword !== 'password')  && (password.length > 6 )&& (password !== '') && (password !== 'password') && ( email !== '') && (email !== 'email') && ( lastName !== '' ) && (lastName !== 'last name') &&
						(firstName !== '') && (firstName !== 'first name') && (username !== '') && (username !== 'username')
						&& (validateEmail(email) ))
						{
							$('#errorMsgSgnUp').html('passwords not much');
						    $("#validRePsswd_sgnUp").addClass('glyphicon-remove');
						    $("#validRePsswd_sgnUp").removeClass('glyphicon-asterisk');
						}
						if((RePassword === password) &&(RePassword !== '') && (RePassword !== 'password')  && (password.length > 6 )&& (password !== '') && (password !== 'password') && ( email !== '') && (email !== 'email') && ( lastName !== '' ) && (lastName !== 'last name') &&
						(firstName !== '') && (firstName !== 'first name') && (username !== '') && (username !== 'username')
						&& (validateEmail(email) )){
						$('#errorMsgSgnUp').html('');
						$("#validUsername_sgnUp").removeClass('glyphicon-remove');
					Accounts.createUser({
					  	 username: username,
						 email: email,
						 lastname: lastName,
						 type: type,
						 firstname: firstName,
					     password: password,
						profile:{
							name: username,
							firstname: firstName,
							lastname: lastName,
							type: type,
							registerDate: new Date(),
					     	birthdate: null,
					     	gender: null,
					     	phoneNumber: null,
					     	Status: 'active',
					     	publicityCode: 'tlzarty001u',
					     	publicityCounter: 0,
					     	buildingNumber: null,
					     	streetName: null,
					     	city: null,
					     	Country: null,
						}
					}, function(err)
						{
							$('#errorMsgSgnUp').html('');
						if(err) 
							{
							 
							var error = ""+ err.message + "";
							 if(error.indexOf('Username already exists') !==-1) 
							 	{
								$('#errorMsgSgnUp').html('Username already exists');
								$('#errorMsgSgnUp').css({"margin-left":"110px"});
								$("#validUsername_sgnUp").addClass('glyphicon-remove');
								}
								else
								{
								//Accounts.sendVerificationEmail(user._id, user.emails[0].address);
								Accounts.sendVerificationEmail(user._id, user.emails[0].address);
								Meteor.call('sendEmail', email,
            						'Welcome to giggorilla.uk.com web site',
            						'Thanks for joining us. Enjoy our service.');
								 /*Meteor.call( 'sendVerificationLink', ( error, response ) => {
          						if ( error ) {
       							     alert( error.reason, 'danger' );
          						} else {
            						alert( 'Welcome!', 'success' );
          							   }
          							});*/
								$('#errorMsgSgnUp').html('error registration');
								$('#errorMsgSgnUp').css({"margin-left":"160px"});
								$("#validUsername_sgnUp").addClass('glyphicon-remove');
								}
                        	}
						else 
						{
							$('#errorMsgSgnUp').html('');
							//Meteor.users.update({username: username}, { $set: {"emails.0" : { "verified" : true , "address": email} } });
							$("#popupSignUp").removeClass('zigmaIn').fadeOut("slow");
 							$("#LoginBackgroundPopup").fadeOut("slow");
 							$("#bgsup").fadeOut("slow");
							$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
							}
						});
					//end validations}
					return false;
				}
	}
});
Template.UserConnected.events({
'click #logOut':	function(event, t)
				{
					Meteor.call('Scheduledtask');
					event.preventDefault();
Meteor.logout( function(err)
						{
						if(err)
						{
							alert("error loggin out ... ");
						}
						else 
						{
							popupStatus = 0 ;
							Router.go('/');
						}
						});
}
});
Template.templateForm.events({
'click #signin_login ':	function(event, t)
				{

					$("#errorMsgLgn").html("");
                    $("#validUsername").removeClass('glyphicon-remove');
					$("#validPassword").removeClass('glyphicon-remove');
					$("#validUsername").removeClass('glyphicon-asterisk');
					$("#validPassword").removeClass('glyphicon-asterisk');
					event.preventDefault();
					var username = t.find("#login_username").value;
					var  password = t.find("#login_password").value;
					if(username === '' || username === 'username')
					{
					$("#errorMsgLgn").html("username empty");
					$("#validUsername").addClass('glyphicon-asterisk');
					}
					if((password === '' || password === 'password') && (username !== '' && username !== 'username'))
					{
					$("#errorMsgLgn").html("password empty");
					$("#validPassword").addClass('glyphicon-asterisk');
					}
					if((username !== '') && (username !== 'username') && (password !== '') && (password !== 'password'))
					{
					Meteor.loginWithPassword(username, password, function(err)
						{
						if(err)
						{
							var error = ""+ err.message + "";
							if ( error.indexOf("not found") !== -1 )
							{
								$("#errorMsgLgn").html("User not found");
								$("#validUsername").addClass('glyphicon-remove');
							}
							if ( error.indexOf("Incorrect password") !== -1 )
							{
								$("#errorMsgLgn").html("incorrect password");
								$("#validPassword").addClass('glyphicon-remove');
							}
							//$("#validUsername").removeClass('glyphicon-ok');
						}
						else 
						{
							t.find("#login_username").value = "";
							t.find("#login_password").value = "";
								$("#errorMsgLgn").html("");
                            	$("#validUsername").removeClass('glyphicon-remove');
								$("#validPassword").removeClass('glyphicon-remove');
                            	popupStatus = 0;
								$("#popupSignUp").removeClass('zigmaIn').fadeOut("slow");
							 	$("#LoginBackgroundPopup").fadeOut("slow");
							 	$("#LoginBackgroundPopup").fadeOut("slow");
								$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");

							//$("#validUsername").addClass('glyphicon glyphicon-ok');
							//$("#errorMsgLgn").html("no errors");
							//alert('user connected ' + popupStatus);
							//popupStatus = 0;
							//alert('no errors  Succefully logged in ...');
							/*$(function() {
								$("#popupSignUp").removeClass('zigmaIn').fadeOut("slow");
							 	$("#LoginBackgroundPopup").fadeOut("slow");
							 	$("#LoginBackgroundPopup").fadeOut("slow");
								$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
						        		});*/
						} 
						});
					}
					return false;
				},
				'click #signin_facebook': function(event) {
					event.preventDefault();
        Meteor.loginWithFacebook({}, function(err){
            if (err) 
            {
                throw new Meteor.Error("Facebook login failed");
            }
            $(function() {
            $.data(document,"popupStatus", 0);
 			$("#popupSignUp").removeClass('zigmaIn').fadeOut("slow");
 			$("#LoginBackgroundPopup").fadeOut("slow");
 			$("#LoginBackgroundPopup").fadeOut("slow");
			$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
					});

        	});
        return false;
    },
    'click #signin_twitter': function(event) {
        Meteor.loginWithTwitter({}, function(err){
            if (err) {
              		  throw new Meteor.Error("twitter login failed");
                    }
                    $(function() {
            $.data(document,"popupStatus", 0);
 			$("#popupSignUp").removeClass('zigmaIn').fadeOut("slow");
 			$("#LoginBackgroundPopup").fadeOut("slow");
 			$("#LoginBackgroundPopup").fadeOut("slow");
			$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
		});
        });
        return false;
    }
});
/*Template.user_loggOut.events({
'click #logout':	function(event, t)
				{
					event.preventDefault();
					Meteor.logout( function(err)
						{
						alert("click to logout");
						if(err)
						{alert("click to logout");}
						else 
						{alert("logout Succefully ..." );}
						});
					return false;
				}
});*/

/*Template.createAccount.events({
'click #create':	function(event, t)
				{
					event.preventDefault();
					var username = t.find("#signupUsername").value,
					email = t.find("#signupEmail").value,
					password = t.find("#signupPassword").value;
					alert(username + " "+ email + " "+password );
					//if(idValidPassWord(password))
					//{
					Accounts.createUser({
					  	 username: t.find("#signupUsername").value,
						 email: t.find("#signupEmail").value,
					     password: t.find("#signupPassword").value,
						profile:{username: username}
					}, function(err)
						{
						if(err)
							 alert("the error is " + err);
						else
							alert("Succefully creation ... ");
						});
					//}
					return false;
				}
});*/

Template.resetform.helpers({
	'resetPassword': function() { 
		if(Accounts._resetPasswordToken)
		{
			var token = new ReactiveVar(Accounts._resetPasswordToken);
			count.set(true);
			//alert('token is');
			//alert(token.get());
		}
		return count.get();
	}
});
Template.newPasswordForm.events({

	'click #new_password': function(evt, t){alert('handel events'); }
});
Template.resetform.events({
'click #reset_mail_send':	function(evt, t)
				{
					evt.preventDefault();
					var email = t.find("#reset_email").value;
					alert(email);
					Meteor.call('sendEmail', email,
            						'Welcome to giggorilla.uk.com web site',
            						'Thanks for joining us. Enjoy our service.');
					Accounts.forgotPassword({email: email }, function(err)
						{
						if(err)
							 alert("the error is:  " + err);
						else{
							//alert('email has been sent Succefully!')
 						$("#popupResetPassword").removeClass('zigmaIn').fadeOut("slow");
 						$("#rst_pw_bg").fadeOut("slow");
						$("#popupResetPassword").removeClass('zigmaIn').fadeOut("slow");
						Router.go('/rest password');
						//fadein new password
						var windowWidth = document.documentElement.clientWidth;
						var windowHeight = document.documentElement.clientHeight;
						var popupHeight = $("#popupNewPassword").height();
						var popupWidth = $("#popupNewPassword").width();
						$("#popupNewPassword").css({
						"top": windowHeight / 2 - popupHeight / 2,
						"left": windowWidth / 2 - popupWidth / 2
						});
						// Aligning bg
						$("#new_pw_bg").css({"height": windowHeight});
	
						// Pop up the div and Bg
					$("#new_pw_bg").css({"opacity": "0.7"});
					$("#new_pw_bg").fadeIn("slow");
					$("#popupNewPassword").addClass('zigmaIn').fadeIn("slow");
						}
						});
					return false;
				}
				});
/*Template.resetform.events({
'click #rst':	function(evt, t)
				{
					evt.preventDefault();
					alert("thanna passwordik taw yarja3lek ....");
					/*var email = t.find("#reset_email").value;
					alert(email);
					Accounts.forgotPassword({email: email }, function(err)
						{
						if(err)
							 alert("the error is:  " + err);
						else
							alert("Succefully creation ... ");
						});*/
					//return false;
				/*}*/
				//,
				// new password 
				/*
'click #newPawwordsend':	function(event, t)
				{
					event.preventDefault();
					alert("ekteb password jdaid ....");
					var password = t.find("#newPassword").value;
					alert(password);
					alert('before accounts');
					Accounts.resetPassword('sP5c9dw76aFmtPcY_yVKroJ21m-jl-lzgfbcWO49Bt6', '12345', function(err) {
						alert('inside accounts');
        			if (err) {
        				  alert('We are sorry but something went wrong.');
       						 } else {
       					   alert('Your password has been changed. Welcome back!');
      
      						  }
      });
					alert('after accounts');
					return false;
				}*/				
//});

//trim helper
var trimInput = function val(text)
{
	return text.replace("/^\*s|\s*$/g","");
}

var idValidPassWord = function val(userPassword)
{
	return userPassword.length ; //&gt;= 6 ? true: false;
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}