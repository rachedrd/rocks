jQuery(window).load(function() {
	jQuery(document).find('.loa0dingtt').fadeOut('normal', 'easeInOutExpo',function(){
		jQuery(document).find('.loadingtt').remove();
	});
});
var showDelte = 0;
jQuery(document).ready(function ($) {
	jQuery.browser={};(function(){jQuery.browser.msie=false;
	jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
	jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

	// Loading
	$('body.loading_page').prepend('<div class="loadingtt"><img src="images/loading.gif" /></div>');
	jQuery('.loadingtt img').css({
		top:'45%',
		opacity:1
	});
	// Superfish
	if ($(".sf-menu")[0]) {
		$('.sf-menu').superfish({
			delay: 100,
			animation: {
				opacity: 'show', height: 'show'
			},
			speed: 300,
			autoArrows: true
		}).lavaLamp({
			fx: "easeOutExpo", 
			speed: 600,
			setOnClick: false,
			click: function(event, menuItem) {
				return true;
			}
		});
		$('a.sf-with-ul .sub').before('<span class="sf-sub-indicator"><i class="icon-angle-down"></i></span>');
	}
	// Nice Scrollbar
		$('html').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
		$('[class^="scroll-"], [class*=" scroll-"]').niceScroll({zindex:1000000,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#121212",scrollspeed:100,cursoropacitymin:.4}); 
			// nice scroll 
			//$('#rachini').niceScroll({});
			//$('#rachini2').niceScroll({});

//$('.usernotifications').niceScroll({zindex:0,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
//$('#rachini').niceScroll({zindex:1000000, cursorborderradius:"2px", cursorcolor:"#121212", scrollspeed:100 }); 
//$('.usernotifications').niceScroll('#rachini', {cursorcolor: "blue" , boxzoom: true });
//$('.usernotifications').niceScroll('#rachini', {zindex:1000000,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#121212",scrollspeed:100,cursoropacitymin:.4}); 
//$('#rachini').niceScroll('#rachini', {zindex:1000000,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#121212",scrollspeed:100,cursoropacitymin:.4}); 
//$('.usernotifications').niceScroll({zindex:1000000,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#121212",scrollspeed:100,cursoropacitymin:.4}); 
//$('#notificationsList').niceScroll({cursorborder:"",cursorborderradius:"2px",	cursorcolor:"#121212",scrollspeed:100,cursoropacitymin:.4}); 
$("#ullist").mouseover(function(){ $("#ullist").getNiceScroll().show();});
$(".notificationsicon").click(function(){
$("#notificationWrapper").toggle(); 
$('.notificationsicon').toggleClass('togglenotification');
	var x = 0 ;
	if(x === 0 ) {
  $("#notificationWrapper").css('visibility', 'visible');
$("#ullist").getNiceScroll().show();
$("#ullist").getNiceScroll().resize();


x = 1; 
    }
    else 
    {
  $("#notificationWrapper").css('visibility', 'hidden');
$("#ullist").getNiceScroll().remove();
    }
});
$("#ullist").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
$("#ullist").niceScroll({zindex:1000000,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#121212",scrollspeed:100,cursoropacitymin:.4}); 


	// Tabs
	var tabs = jQuery('ul.tabs');
	tabs.each(function (i) {
		// get tabs
		var tab = jQuery(this).find('> li > a');
		tab.click(function (e) {
			// get tab's location
			var contentLocation = jQuery(this).attr('href');
			// Let go if not a hashed one
			if (contentLocation.charAt(0) === "#") {
				e.preventDefault();
				// add class active
				tab.removeClass('active');
				jQuery(this).addClass('active');
				// show tab content & add active class
				jQuery(contentLocation).fadeIn(500).addClass('active').siblings().hide().removeClass('active');
			}
		});
	});
	// Accordion
	jQuery("ul.tt-accordion li").each(function () {
		jQuery(this).children(".accordion-content").css('height', function () {
			return jQuery(this).height();
		});
		if (jQuery(this).index() > 0) {
			jQuery(this).children(".accordion-content").css('display', 'none');
		} else {
			jQuery(this).addClass('active').find(".accordion-head-sign").append("<i class='icon-angle-up'></i>");
			jQuery(this).siblings("li").find(".accordion-head-sign").append("<i class='icon-angle-down'></i>");
		}
		jQuery(this).children(".accordion-head").bind("click", function () {
			jQuery(this).parent().addClass(function () {
				if (jQuery(this).hasClass("active")) {
					return;
				} {
					return "active";
				}
			});
			jQuery(this).siblings(".accordion-content").slideDown();
			jQuery(this).parent().find(".accordion-head-sign i").addClass("icon-angle-up").removeClass("icon-angle-down");
			jQuery(this).parent().siblings("li").children(".accordion-content").slideUp();
			jQuery(this).parent().siblings("li").removeClass("active");
			jQuery(this).parent().siblings("li").find(".accordion-head-sign i").removeClass("icon-angle-up").addClass("icon-angle-down");
		});
	});
	// Toggle
	jQuery("ul.tt-toggle li").each(function () {
		jQuery(this).children(".toggle-content").css('height', function () {
			return jQuery(this).height();
		});
		jQuery(this).children(".toggle-content").css('display', 'none');
		jQuery(this).find(".toggle-head-sign").html("&#43;");
		jQuery(this).children(".toggle-head").bind("click", function () {
			if (jQuery(this).parent().hasClass("active")) {
				jQuery(this).parent().removeClass("active");
			} else {
				jQuery(this).parent().addClass("active");
			}
			jQuery(this).find(".toggle-head-sign").html(function () {
				if (jQuery(this).parent().parent().hasClass("active")) {
					return "&minus;";
				} else {
					return "&#43;";
				}
			});
			jQuery(this).siblings(".toggle-content").slideToggle();
		});
	});
	jQuery("ul.tt-toggle").find(".toggle-content.active").siblings(".toggle-head").trigger('click');
	// 4Mob
	$(".headdown nav").before('<div id="mobilepro"><i class="icon-reorder icon-remove"></i></div>');
	$(".headdown .sf-menu li").addClass('xpopdrop');
	$('#mobilepro').click(function () {
		$('.headdown .sf-menu').slideToggle('slow', 'easeInOutExpo').toggleClass("xactive");
		$("#mobilepro i").toggleClass("icon-reorder");
	});
	$("body").click(function() {
		$('.headdown .xactive').slideUp('slow', 'easeInOutExpo').removeClass("xactive");
		$("#mobilepro i").addClass("icon-reorder");
	});
	$('#mobilepro, .sf-menu').click(function(e) {
		e.stopPropagation();
	});
	function checkWindowSize() {
		if ($(window).width() > 768) {
			$('.headdown .sf-menu').css('display', 'block').removeClass("xactive");
		} else {
			$('.headdown .sf-menu').css('display', 'none');
		}
	}
	$(window).load(checkWindowSize);
	$(window).resize(checkWindowSize);
	// ToTop
	jQuery('#toTop').click(function () {
		jQuery('body,html').animate({
			scrollTop: 0
		}, 800);
	});
	// close Notification
	$(".notification-close").click(function () {
		$(this).parent().slideUp("slow");
		 if(parseInt($('#ullist').children().length ) == 0)
      {
            $('#ullist').append("<p class='emptynot'></p>");
      }
      else
      {
      	if(parseInt($('.ullist').children().length ) == 0)
      {
            $('.ullist > p').remove();
      }
      }
		return false;
	});
	$("#notificationList").on('click' ,'.notification-close', function () {
		$(this).parent().slideUp("slow");
		return false;
	});
	// FlexSlider
	if ($(".postslider")[0]) {
		jQuery('.postslider').flexslider();
	}
	if ($(".videos")[0]) {
		jQuery('.videos').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			animationSpeed: 600,
			directionNav: true,
			controlNav: false,
			pauseOnHover: true,
			initDelay: 0,
			randomize: false,
			smoothHeight: true,
			keyboardNav: true
		});
	}
	// jCarousel
	if ($(".videos-carousel")[0]) {
		jQuery(".videos-carousel").jCarouselLite({
			btnNext: ".nexte",
			btnPrev: ".preve",
			easing: "easeInOutExpo",
			visible: 4,
			scroll: 1,
			hoverPause: true,
			auto: 2000,
			speed: 800
		});
	}
	if ($(".mp3-carousel")[0]) {
		jQuery(".mp3-carousel").jCarouselLite({
			btnNext: ".nexte",
			btnPrev: ".preve",
			easing: "easeInOutExpo",
			visible: 4,
			scroll: 1,
			hoverPause: true,
			auto: 2000,
			speed: 800
		});
	}
	if ($(".progress-bar")[0]) {
		$(".progress-bar > span").each(function () {
			$(this)
				.data("origWidth", $(this).width())
				.width(0)
				.animate({
					width: $(this).data("origWidth")
				}, 1800);
		});
	}
	// add no notification paragraph 
	// LoginIn Popup
	var popupSignUpStatus = 0;
	var popupRstPwdStts = 0; 
	var popupNPsswdStts = 0;

	//dropdown programmatically
	$('.exampleHeader').on('click', '#showProfile', function(e){
  	e.stopPropagation();
  $('#toggedfirst').toggleClass('open'); 
});
	//open dropdown fro usertype signup programatically
	$('#signupwrapper').on('click', '#Utype', function(e){
  	e.stopPropagation();
  	//alert($(this).text());
  $('#divToggleType').toggleClass('open'); 
});
	//change dropdown selected programatically 
	$('#signupwrapper').on('click', '#divToggleType .dropdown-menu li a', function(e){
  	e.stopPropagation();
  	$('#signupwrapper #Utype').html($(this).html());
  	$('#divToggleType').removeClass('open'); 
});
// form login validation 
resetFields();
function resetFields () {
	// reset logi  fields 
$("#popupLogin").on('click', '#login_username ', function(){
     $("#errorMsgLgn").html("");
     $("#validUsername").removeClass('glyphicon-remove');
	 $("#validUsername").removeClass('glyphicon-asterisk');

	});

$("#popupSignUp").on('click', '#signup_username ', function(){
     $("#errorMsgSgnUp").html("");
     //$("#errorMsgSgnUp").css({"margin-left" : "160px"});
     $("#validUsername_sgnUp").removeClass('glyphicon-remove');
	 $("#validUsername_sgnUp").removeClass('glyphicon-asterisk');

	});
$("#popupnewalbbum").on('click', '#album_name ', function(){
     $("#errorMsgAlb").html("");
     $("#validAlmName").css("color","red");
     $("#validAlmName").removeClass('glyphicon-remove');
	 $("#validAlmName").removeClass('glyphicon-asterisk');
	 $("#validAlmName").removeClass('glyphicon-ok');

	});

$("#popupSignUp").on('click', '#signup_firstname ', function(){
     $("#errorMsgSgnUp").html("");
     $("#validFisrtName_sgnUp").removeClass('glyphicon-remove');
	 $("#validFisrtName_sgnUp").removeClass('glyphicon-asterisk');

	});

$("#popupSignUp").on('click', '#signup_email ', function(){
     $("#errorMsgSgnUp").html("");
     $("#validEmail_sgnUp").removeClass('glyphicon-remove');
	 $("#validEmail_sgnUp").removeClass('glyphicon-asterisk');

	});

$("#popupSignUp").on('click', '#signup_password', function(){
    $("#errorMsgSgnUp").html("");
	//$("#errorMsgSgnUp").css({"margin-left": "160px"});
    $("#validPasswd_sgnUp").removeClass('glyphicon-remove');
	$("#validPasswd_sgnUp").removeClass('glyphicon-asterisk');
	});
$("#popupSignUp").on('click', '#signup_retypePassword', function(){
    $("#errorMsgSgnUp").html("");
    $("#validRePsswd_sgnUp").removeClass('glyphicon-remove');
	$("#validRePsswd_sgnUp").removeClass('glyphicon-asterisk');
	});

$("#popupSignUp").on('mouseenter', '#viewPasswd_sgnUp', function () {
    $('#signup_password').attr('type', 'text');
}).on('mouseleave', '#viewPasswd_sgnUp', function () {
    $('#signup_password').attr('type', 'password');
});

$("#popupSignUp").on('mouseenter', '#viewRePasswd_sgnUp', function () {
    $('#signup_retypePassword').attr('type', 'text');
}).on('mouseleave', '#viewRePasswd_sgnUp', function () {
    $('#signup_retypePassword').attr('type', 'password');
});

/*
$("body").on("mouseenter", "div", function(){
    $("p").removeClass("hidden");
}).on("mouseleave", "div", function(){
    $("p").addClass("hidden");
});*/
$("#popupSignUp").on('click', '#signup_lastname ', function(){
     $("#errorMsgSgnUp").html("");
     $("#validLastName_sgnUp").removeClass('glyphicon-remove');
	 $("#validLastName_sgnUp").removeClass('glyphicon-asterisk');

	});

$("#popupLogin").on('click', '#login_password ', function(){
     $("#errorMsgLgn").html("");
	 $("#validPassword").removeClass('glyphicon-asterisk');
     $("#validPassword").removeClass('glyphicon-remove');

	});
}
	// change dropdown usertype programatically 
	/*$('#signupwrapper').on('click', '#Utype', function(e){
  	e.stopPropagation();
  	//alert($(this).text());
  $('#divToggleType .dropdown-menu li a').css("background","white");
  $('#divToggleType .dropdown-menu li a').css("color","#f84b08");
  $('#divToggleType .dropdown-menu li ').css("background","white");
  $('#divToggleType .dropdown-menu ').css("background","white");
});*/


	$(".exampleHeader").on('mouseenter', '.dropdown-menu #profileMessages', function() {
	$('#toggedfirst .dropdown-menu #profileMessages a span').css("background","#f92388");
});
		$(".exampleHeader").on('mouseleave', '.dropdown-menu #profileMessages', function() {
	$('#toggedfirst .dropdown-menu #profileMessages a span').css("background","");
});
/*$("#toggedfirst").on('mouseleave', 'a', function() {
    //do something
    alert('mouse leave');
});*/
/*
	$('#toggedfirst .dropdown-menu li ').hover(function(){
		alert('hover');
	$('#toggedfirst .dropdown-menu li a span').css("background","#02baff");
});*/
		//nav  navbar-right
	$(".exampleHeader").on('click', '#signInSpan', function() {
		//Aligning our box in the middle
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $("#popupLogin").height();
		var popupWidth = $("#popupLogin").width();
		// Centering
		$("#popupLogin").css({
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});
		// Aligning bg
		$("#LoginBackgroundPopup").css({"height": windowHeight});
	
		// Pop up the div and Bg
		if (popupStatus == 0) {
			$("#LoginBackgroundPopup").css({"opacity": "0.7"});
			$("#LoginBackgroundPopup").fadeIn("slow");
			$("#popupLogin").addClass('zigmaIn').fadeIn("slow");
			popupStatus = 1;
		}
	});
	// update user informations
	// update first name

	$('.userinfocontent').on('click','.updatefirstname' , function(){
		$('#firstnamespan').hide();
		$('#firstnameinput').show();
		$(this).hide();
		$('.savefirstname').show();
	});
	$('.userinfocontent').on('click' , '.savefirstname', function(){
		if(( $("#firstnameinput").val() === "" ) || ( $("#firstnameinput").val() === undefined ) )
		{
			$(this).hide();
			$("#emtyfirstname").show();
            $("#firstnameerr").html("first name is empty");
            $("#firstnameerr").show();
		} else
		{
			$(this).hide();
		$('#firstnameinput').hide();
		$('#firstnamespan').show();
		$('.updatefirstname').show();
		}
		
	});
	// update last name
	$('.userinfocontent').on('click', '.updatelastname' , function(){
		$('#lastnamespan').hide();
		$('#lastnameinput').show();
		$(this).hide();
		$('.savelastname').show();
	});
	$('.userinfocontent').on('click' , '.updatebandname' , function(){
		$('#bandnamespan').hide();
		$('#bandnameinput').show();
		$(this).hide();
		$('.savebandname').show();
	});
	// add  memeber  
	$('.userinfocontent').on('click' , '.addmember' , function(){
		$('.spanmemebername').show();
		$('.inputmemebername').show();
		$('.memeberrolespan').show();
		$('.memeberoleinput').show();
		$(this).hide();
		$('.savemember').show();
	});
	// add  highlight  
	$('.userinfocontent').on('click' , '.addhighlight' , function(){
		$('.spanhighlight').show();
		$('.inputhighlight').show();
		$(this).hide();
		$('.savehighlight').show();
	});
	$('.userinfocontent').on('click' , '.updatebandtype' , function(){
		$('#bandtypespan').hide();
		$('.bandtype').show();
		$(this).hide();
		$('.savebandtype').show();
	});
	// hide the highlight add form if mouse out of this form 
	$('.userinfocontent').on('mouseenter', '#bandtypediv', function()
		{
          $('.savehighlight').hide();
		$('.spanhighlight').hide();
		//$('.inputhighlight').val("");
		$('.inputhighlight').hide();
		$('.addhighlight').show();
		});
	$('.userinfocontent').on('mouseenter', '#buildingnumberdiv', function()
		{
          $('.savehighlight').hide();
		$('.spanhighlight').hide();
		//$('.inputhighlight').val("");
		$('.inputhighlight').hide();
		$('.addhighlight').show();
		});
	// hide the members add form if mouse out of this form 
	$('.userinfocontent').on('mouseenter', '#bandtypediv', function()
		{
          $('.savemember').hide();
		$('.spanmemebername').hide();
		//$('.inputhighlight').val("");
		$('.inputmemebername').hide();
		$('.memeberoleinput').hide();
		$('.memeberrolespan').hide();

		//$('.inputhighlight').val("");
		$('.memeberoleinput').hide();
		$('.memeberrolespan').hide();
		$('.inputmemebername').hide();
		$('.spanmemebername').hide();

		$('.addmember').show();
		});
	$('.userinfocontent').on('mouseenter', '#buildingnumberdiv', function()
		{
          $('.savemember').hide();
		$('.spanmemebername').hide();
		//$('.inputhighlight').val("");
		$('.inputmemebername').hide();
		$('.memeberoleinput').hide();
		$('.memeberrolespan').hide();

		//$('.inputhighlight').val("");
		$('.memeberoleinput').hide();
		$('.memeberrolespan').hide();
		$('.inputmemebername').hide();
		$('.spanmemebername').hide();

		$('.addmember').show();
		});

	$('.userinfocontent').on('click', '.savebandname' , function(){
		if (( $("#bandnameinput").val() === "" ) || ( $("#bandnameinput").val() === undefined ) )
		
		{
		$(this).hide();
		$("#emtybandname").show();
        $("#bandnameerr").html("band name is empty");
        $("#bandnameerr").show();
	  }
	  else
	  {
	  	$(this).hide();
		$('#bandnameinput').hide();
		$('#bandnamespan').show();
		$('.updatebandname').show();
	  }
	});
	$('.userinfocontent').on('click', '.savemember' , function(){
		if(( $(".inputmemebername").val() === "" ) || ( $(".inputmemebername").val() === undefined ) || 
			( $(".memeberoleinput").val() === "" ) || ( $(".memeberoleinput").val() === undefined )
			)
		{
			$(this).hide();
			$("#emtymember").show();
			if(($(".inputmemebername").val() === "" ) || ( $(".inputmemebername").val() === undefined ))
            $("#bandmembereerr").html("member name is empty");
            if(($(".memeberoleinput").val() === "" ) || ( $(".memeberoleinput").val() === undefined ))
            $("#bandmembereerr").html("member role is empty");	
            $("#bandmembereerr").show();
		} else{
		var listlength = $('.bandmembers').children().length + 1 ;
		//$(".bandmembers").append('<li><span  class="bld member">'+listlength+': <span id="name">'+$('.inputmemebername').val()+'</span> - <span id="role"> '+$('.memeberoleinput').val()+'</span></span><span class="removeMumber"><i class="glyphicon glyphicon-remove"></i></span></li>');
	  	$(this).hide();
		$('.spanmemebername').hide();
		$('.inputmemebername').hide();
		//$('.inputmemebername').val("");
		$('.memeberrolespan').hide();
		$('.memeberoleinput').hide();
		//$('.memeberoleinput').val("");
		$('.addmember').show();
		$("#bandmembereerr").hide();
		$("#bandmembereerr").html("");
		$("#emtymember").hide();



		}

	});

	$('.userinfocontent').on('click' , '.savehighlight' , function(){
		if(( $(".inputhighlight").val() === "" ) || ( $(".inputhighlight").val() === undefined ) )
		{
			$(this).hide();
			$("#emtyhighlight").show();
            $("#highlighteerr").show();
            $("#highlighteerr").html("empty highlight");

		} else{
	//var highlightlength = $('.highlights').children().length + 1 ;
		//$(".highlights").append('<li><span class="bld"> * '+$('.inputhighlight').val()+'</span><span class="removeHighlight"><i class="glyphicon glyphicon-remove"></i></span></li>');
	  	$(this).hide();
		$('.spanhighlight').hide();
		//$('.inputhighlight').val("");
		$('.inputhighlight').hide();
		$('.addhighlight').show();
	  }

	});

	$('.userinfocontent').on('click', '.removeMumber' , function(){
		var $li = $(this).closest('li');
		//rmImgIndx = $li.parent().children().index($li);
		//$('.bandmembers').find('li').eq(rmImgIndx).remove();

	});
	/*$('.userinfocontent').on('click', '.removeHighlight' , function(){
		var $li = $(this).closest('li');
		    rmImgIndx = $li.parent().children().index($li);
		$('.highlights').find('li').eq(rmImgIndx).remove();

	});*/
	
    // save new memeber
	$('.userinfocontent').on('click', '.savebandtype' , function(){
	  	$(this).hide();
		$('.bandtype').hide();
		$('.updatebandtype').show();
		$('#bandtypespan').show();
	});
	$('.userinfocontent').on('click', '.savelastname' , function(){
		if(( $("#lastnameinput").val() === "" ) || ( $("#lastnameinput").val() === undefined ) )
		
		{
		$(this).hide();
		$("#emtylastname").show();
        $("#lastnameerr").html("first name is empty");
        $("#lastnameerr").show();
	  }
	  else
	  {
	  	$(this).hide();
		$('#lastnameinput').hide();
		$('#lastnamespan').show();
		$('.updatelastname').show();
	  }
	});
	// update birth date
	$('.userinfocontent').on('click' , '.updatebirthdate', function(){
		$('#birthspan').hide();
		$('#birthinput').show();
		$(this).hide();
		$('.savebirthdate').show();
	});
	$('.userinfocontent').on('click' , '#birthinput', function(){
      window.myDatePicker1 = new DatePicker('.userinfocontent #birthinput', options);     
	});
	$('.userinfocontent').on('click', '.savebirthdate', function(){
		$(this).hide();
		$('#birthinput').hide();
		$('#birthspan').show();
		$('.updatebirthdate').show();
	});
	// update gender 

$('.userinfocontent').on('click' , '.updategender', function(){
		$('#genderspan').hide();
		$('.oldfemale').show();
		$('.oldmale').show();
		$('#inputfemale').show();
		$('#inputmale').show();
		$(this).hide();
		$('.savegender').show();
	});
	$('.userinfocontent').on('click', '.savegender', function(){
		$(this).hide();
		$('.updategender').show();

		$('#genderspan').show();
		$('.oldfemale').hide();
		$('.oldmale').hide();
		$('#inputfemale').hide();
		$('#inputmale').hide();
	});/*
	// update phone number 

	
	$('.userinfocontent').on('click', '.updatebandtype', function(){
		
		$('#bandnamespan').hide();
		$('#bandnameinput').show();
		$(this).hide();
		$('.savebandname').show();
	});*/
$('.userinfocontent').on('click', '.updatephone', function(){

		$('#phonesspan').hide();
		$('#phoneinput').show();
		$(this).hide();
		$('.savephonenumber').show();
	});
	$('.userinfocontent').on('click', '.savephonenumber', function(){
		if(( $("#phoneinput").val() === "" ) 
			|| ( $("#phoneinput").val() === "**** *** ***" )  ||
			( $("#phoneinput").val() === undefined ) )
		{
		$(this).hide();
		$("#emtyphone").show();
        $("#phoneerr").html("phone number is empty");
        $("#phoneerr").show();
	  }
	  else
	  {
	  	$(this).hide();
		$('#phoneinput').hide();
		$('#phonesspan').show();
		$('.savephonenumber').hide();
		$('.updatephone').show();


	  }
	});
	//
	$('.userinfocontent').on('click' , '#firstnameinput', function(){
    $("#emtyfirstname").hide();
	$("#firstnameerr").hide();
	$("#firstnameerr").html("");
	$(".savefirstname").show();
});
	$('.userinfocontent').on('click' , '.inputhighlight', function(){
	$("#emtyhighlight").hide();
	$(".savehighlight").show();
    $("#highlighteerr").hide();
    $("#highlighteerr").html("");

    });
	$('.userinfocontent').on('click' , '#bandnameinput', function(){
    $("#emtybandname").hide();
	$("#bandnameerr").hide();
	$("#bandnameerr").html("");
	$(".savebandname").show();
});

	$('.userinfocontent').on('click' , '#lastnameinput', function(){
    $("#emtylastname").hide();
	$("#lastnameerr").hide();
	$("#lastnameerr").html("");
	$(".savelastname").show();

	});

	$('.userinfocontent').on('click', '#phoneinput', function(){
    $("#emtyphone").hide();
	$("#phoneerr").html("");
	$("#phoneerr").hide();
	$(".savephonenumber").show();
	});
	$('.userinfocontent').on('click', '.inputmemebername', function(){
    $("#emtymember").hide();
	$("#bandmembereerr").html("");
	$("#bandmembereerr").hide();
	$(".savemember").show();
	});
	$('.userinfocontent').on('click', '.memeberoleinput', function(){
    $("#emtymember").hide();
	$("#bandmembereerr").html("");
	$("#bandmembereerr").hide();
	$(".savemember").show();
	});
    
	/*
	/*$('.def-block').on('click', 'ul.tp-grid li.grid_3', function()
	{
		alert('onpening the pile ...');
	});
	$('.def-block').on('click', '.tp-title span', function()
	{
		alert('onpening the pile2 ...');
	});*/
	/*$('.def-block').on('click','.removeImage', function(e)
		{
			if($(':animated').length) {
            return false;
        }     

			e.preventDefault();
		    var $li = $(this).closest('li');
			var myindex = $li.parent().children().index($li);
			var li = $grid.find('li');
			liLength = parseInt($grid.children().length );
 			liWidth = $li.outerWidth();
 			liHeight = $li.outerHeight();
 			//alert(liWidth);
 			//alert(stapel.el.html());
 			//alert(stapel.el.length);
 			//stapel._setItemsPosition();
 			//alert(' stapel.items.length : '+ stapel.items.length);
 			///alert( stapel.items);
 			//console.log(stapel.items);
 			//stapel.items.splice(1,7);

 			//el.imagesLoaded( function() {
				//self.options.onLoad();
				//self._layout();
				//sel1f._initEvents();
			//} );
        var i = parseInt(myindex);
       // alert($grid.find('li').eq(3).position().left );
        $grid.children().each(function()
        {
        	//alert("width: "+liWidth+"height: "+liHeight+"index :" +$(this).index()+" top position : " + $(this).position().top + " left position: " + $(this).position().left);
        	if($grid.find('li').eq(3).position().left > 800)
        		{
        	if($(this).index() > myindex)
        	{
        		
        		if($(this).index()% 4 !== 0 )
        	{	
        	//$(this).animate({"left": "-=" + 283 + "px" }, "slow");
        	$(this).animate({"left": "-=" + (liWidth + 17) + "px" }, "slow");
        	}
        	else
        	{  
        		//237 px
        	$(this).animate({"left": "+=" + ((liWidth + 17 )* 3)   + "px", "top": "-=" + (liWidth -29 ) + "px"}, "slow");
        		
        	}
        	}
        	}
        	if($grid.find('li').eq(3).position().left < 20)
        		{
        	if($(this).index() > myindex)
        	{
        		
        		if($(this).index()% 3 !== 0 )
        	{	
        	//$(this).animate({"left": "-=" + 290 + "px" }, "slow");
        	$(this).animate({"left": "-=" + (liWidth + 24) + "px" }, "slow");
        	}
        	else
        	{  
        		//575px 240px
        		//alert(liWidth * 2 + 43);
        	$(this).animate({"left": "+=" +  ((liWidth * 2) +  43) + "px", "top": "-=" + (liWidth - 26) + "px"}, "slow");
        		
        	}
        	}
        	}   			
        });
        //if( $(':animated').length ) {
          //  return false;
        //}
       // if( i === liLength - 1 ) {
        // 	alert('i mhere ' +  i +  '  i === liLength  ' + liLength);
            // Stops the event propagation
          //  e.stopPropagation();
      //  } else {
        //		alert('i mhere ' +  i  + '  i < liLength  ' + liLength);
         
        //	width = 266;
            // If the click counter doesnt reach liLength -1 or liLength +1, it animates.
           // li.animate({"left": "-=" + width + "px"}, "slow");
            // This condition returns prev click count +1 each time prev is clicked
         //   if(i !== liLength - 1) {
           // 	alert('incrementing i '+ i )
            //    i++;
          //  }
        //}
        
        
       // if( i === liLength - 1 ) {
        	// Stops the event propagation
         //   e.stopPropagation();
       // } if( i < liLength - 1 ){
        //	alert('i est : ' + i);
        //	$(".def-block ul.tp-grid").children().length % 4; 
          //  $(".def-block ul.tp-grid li:gt(" + myindex +")").animate({"left": "-=" + liWidth + "px"}, 
           // 	"slow",  function() {

            //	if(i < liLength - 1) 
         //   	{
         //       i++;

        //    }if(i === liLength - 1|| i === liLength   ) 
        //    {
         //   	$grid.find('li').eq(myindex).remove();
		//	spanLength = $(".tp-title").find('span').eq(1).text();
		//	$(".tp-title").find('span').eq(1).text(parseInt(spanLength) -1 )
        	//alert('end of the list ...');
            
         //   }

     //});
			//alert('removing li ....');
			//alert(myindex);
			//alert($(".def-block ul.tp-grid").children().length );
			//$('.def-block ul.tp-grid li').eq(myindex).remove();
			//alert(stapel.el.html());
			//$grid.find('li').eq(myindex).remove();
			//spanLength = $(".tp-title").find('span').eq(1).text();
			//$(".tp-title").find('span').eq(1).text(parseInt(spanLength) -1 );
			//alert(stapel.el.html());
			

			//$grid.stapel({ 
			//	onBeforeOpen : function( pileName ) {
				//alert('onBeforeOpen');
			//	$name.html( pileName );
				//alert('name.html : '+ $name.html());
				//alert('end onBeforeOpen');
		//	} , 
		//	onAfterOpen : function( pileName ) {
		//		$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
		//		$close.show();
		//	}
		//});
		//	$grid.stapel._openPile();
			//$grid.stapel._layout();
		});
*/
	/*$(".fileUpload").on('change', '.upload', function(){
		alert( "Size: " + $(".def-block ul.tp-grid").children().length );
    var reader = new FileReader();

    reader.onload = function (e) {
    	alert('onload')
        // get loaded data and render thumbnail.
        $("image").src = e.target.result;
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);

	});*/
	/*$('.container').on('change','#files', function () {
		alert('files ....');
    var reader = new FileReader();

    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        $("#image").src = e.target.result;
        alert('change iage url ....' + e.target.result);
        //alert($('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').position().left);
        //alert($('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').position().top);
        alert($grid.find(' >li:nth-last-child(1)').position().left );
		alert($grid.find(' >li:nth-last-child(1)').position().top );
      //  if($grid.find(' >li:nth-last-child(1)').index())
      //  {

//        }

      $('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').after('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="'+e.target.result+'" rel="prettyPhoto[Billie Jean]"><img src="'+e.target.result+'" alt="china concert" /></a></li>');
	  //$('.def-block ul.tp-grid').append($('.lastLi'));
	   //$('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').after($('lastLi'));
	   $('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').show();
	   //$('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').css('visibility': 'visible');

	   //$('.def-block ul.tp-grid').append('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>');
	    
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});*/
		//$('.def-block ul.tp-grid li').remove();
		//alert('stapel.items.length : ' +stapel.items.length);
		//alert('stapel.el.length : ' +stapel.el.length);
		//var mrgntp = Math.floor(( $(".def-block ul.tp-grid").children().length / 4 ));
		//alert("margin top " + $(".def-block ul.tp-grid").children().length + " /4 = " +  mrgntp + " * 282.6 ");
		//var mrgnlft = ( $(".def-block ul.tp-grid").children().length % 4 );
		//alert("margin left " + $(".def-block ul.tp-grid").children().length + " %4 = " +  mrgnlft + " * 282.6 ");
		//$('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').after('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>');
	     //$loader.insertBefore('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>')
	   //$grid.insertBefore('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>')
	   //$grid.find(' >li:nth-last-child(1)').after('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>');    
	    //$('.def-block ul.tp-grid li:last').before('<li data-pile="Billie Jean" class="grid_3"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="tunisia concert" /></a></li>');		
			
		//$(".def-block ul.tp-grid").append('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="germany concert" /></a></li>');
			   /*stapel = $grid.stapel( {
			randomAngle : false,
			delay : 0,
			gutter : 0,
			pileAngles : 0,
			onLoad : function() {
				$loader.remove();
			},
			onBeforeOpen : function( pileName ) {
				$name.html( pileName );
				alert($name.html())
			},
			onAfterOpen : function( pileName ) {
				$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
				$close.show();
			}
		});*/
			   

		//$('.def-block ul.tp-grid').find(' >li:nth-last-child(0)').after('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>');
		//$('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').before('<li data-pile="Billie Jean" class="grid_3"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="tunisia concert" /></a></li>');		
		//$(' ul.tp-grid li:last-child').css('margin-top', '516px');
	

/*		$("#popupSignUp").on('mouseenter', '#viewPasswd_sgnUp', function () {
    $('#signup_password').attr('type', 'text');
}).on('mouseleave', '#viewPasswd_sgnUp', function () {
    $('#signup_password').attr('type', 'password');
});*/

	 	//$('.def-block ul.tp-grid li:last-child').css('margin-left', '292.6px');
	 	//$('.def-block ul.tp-grid li:last-child').css('display', 'block');
	 	//$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
	 	// adding pretty photo to new li 
	 	//if ($("a[rel^='prettyPhoto']")[0]) {
		//$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
		//$("def-block ul.tp-grid").append('<li style="transition: left 400ms ease-in-out 100ms, top 400ms ease-in-out 100ms, transform 400ms ease-in-out 100ms; transform: rotate(3deg); left: 847.8px; top: 237px; display: list-item; z-index: 9999; visibility: visible; box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);" data-pile="Billie Jean" class="grid_3"><a href="../../images/assets/gallery/40.jpg" rel="prettyPhoto[Billie Jean]"><img style="visibility: visible;" src="../../images/assets/gallery/40.jpg" alt="#40"></a></li>')

		/*first li 
		left: 0px;
		top: 0px;
		*/
		/*second li 
		left: 282.6px;
		top: 0px;
		*/
		/*third li 
		left: 565.2px;
		top: 0px;
		*/
		/* forth
		left: 0px;
		top: 847.8px;*/
		/*fifth li 
		left: 257px;
		top: 257px;
		*/
//$(".tp-grid").append('<li data-pile="Billie Jean" class="grid_3"><a href="../../images/assets/gallery/1.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/1.jpg" alt="#1" /></a></li>');
	

	//});
	// Signup Popup
	//popupLoginClose // LoginBackgroundPopup popupSignUpStatus
	 //popupSignUpClose"//SignupBackgroundPopup//
	$("#signin_register").click(function() {
		//HIDE LOGIN
		$("#LoginBackgroundPopup").fadeOut("slow");
		$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
			popupStatus = 0;
		//Aligning our box in the middle
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $("#popupSignUp").height();
		var popupWidth = $("#popupSignUp").width();
		//popupSignUpClose"//SignupBackgroundPopup//
		// Centering
		$("#popupSignUp").css({
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});
		// Aligning bg
		$("#bgsup").css({"height": windowHeight});
	
		// Pop up the div and Bg
		if (popupSignUpStatus == 0) {
			$("#bgsup").css({"opacity": "0.7"});
			$("#bgsup").fadeIn("slow");
			$("#popupSignUp").addClass('zigmaIn').fadeIn("slow");
			popupSignUpStatus = 1;
		}
	});
	//reset password 
	$("#forgetPassword").click(function() {
		//HIDE LOGIN
		$("#LoginBackgroundPopup").fadeOut("slow");
		$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
			popupStatus = 0;
		//Aligning our box in the middle
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $("#popupResetPassword").height();
		var popupWidth = $("#popupResetPassword").width();
		//popupSignUpClose"//SignupBackgroundPopup//
		// Centering
		$("#popupResetPassword").css({
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});
		// Aligning bg
		$("#rst_pw_bg").css({"height": windowHeight});
	
		// Pop up the div and Bg
		if (popupRstPwdStts == 0) {
			$("#rst_pw_bg").css({"opacity": "0.7"});
			$("#rst_pw_bg").fadeIn("slow");
			$("#popupResetPassword").addClass('zigmaIn').fadeIn("slow");
			 popupRstPwdStts = 1; 
		}
	});
	// Close Login

	$("#popupLoginClose").click(function() {
		if (popupStatus == 1) {
			$("#LoginBackgroundPopup").fadeOut("slow");
			$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
			popupStatus = 0;
		}
	});
	// Close reset password
    //popupLoginClose // LoginBackgroundPopup popupSignUpStatus
	 //popupSignUpClose"//SignupBackgroundPopup//
	/*$("#popupResetPasswordClose")1.click(function() {
		if (popupResetPasswordStatus == 1) {
			$("#ResetPasswordBackgroundPopup").fadeOut("slow");
			$("#popupResetPassword").removeClass('zigmaIn').fadeOut("slow");
			popupResetPasswordStatus = 0;
		}
	});*/
	// close signup   frame cancel button
	$("#signup_cancel").click(function() {
		if (popupSignUpStatus == 1) {
			$("#bgsup").fadeOut("slow");
			$("#popupSignUp").removeClass('zigmaIn').fadeOut("slow");
			popupSignUpStatus = 0;
		}
	});
	// close reset mail form
	$("#cancelAddAlbm").click(function() {
		    $('#errorMsgAlb').html('');
		    $("#validAlmName").removeClass('glyphicon-asterisk');
		    $("#validAlmName").removeClass('glyphicon-remove');
		    $("#validAlmName").removeClass('glyphicon-ok');

			$("#popupnewalbbum").fadeOut("slow");
			$("#new_al_bg").removeClass('zigmaIn').fadeOut("slow");

	});
	// close add new album
	$("#reset_mail_cancel").click(function() {
		if (popupRstPwdStts == 1) {
			$("#popupResetPassword").fadeOut("slow");
			$("#rst_pw_bg").removeClass('zigmaIn').fadeOut("slow");
			popupRstPwdStts = 0;
		}
	});
	// close new password via X button 
	
	$("#popup_new_pass").click(function() {
			$("#popupNewPassword").fadeOut("slow");
			$("#new_pw_bg").removeClass('zigmaIn').fadeOut("slow");
			$("#rst_pw_bg").removeClass('zigmaIn').fadeOut("slow");
	});
	//cance change password 
	$("#new_password_cancel").click(function() {
			$("#popupNewPassword").fadeOut("slow");
			$("#new_pw_bg").removeClass('zigmaIn').fadeOut("slow");
			$("#rst_pw_bg").removeClass('zigmaIn').fadeOut("slow");
	});
	// reset email close via x button 
		$("#popupResetPasswordClose").click(function() {
		if (popupRstPwdStts == 1) {
			$("#popupResetPassword").fadeOut("slow");
			$("#rst_pw_bg").removeClass('zigmaIn').fadeOut("slow");
			$("#rst_pw_bg").removeClass('zigmaIn').fadeOut("slow");
			popupRstPwdStts = 0;
		}
	});
		$("#popupAlmClose").click(function() {
			$("#popupnewalbbum").fadeOut("slow");
			$("#new_al_bg").removeClass('zigmaIn').fadeOut("slow");
			$("#validAlmName").css("color","red");
						$('#errorMsgAlb').html('');
						$("#validAlmName").removeClass('glyphicon-remove');
						$("#validAlmName").removeClass('glyphicon-asterisk');
						$("#validAlmName").removeClass('glyphicon-ok');

	});
	// signup close X button 
	$("#popupSignUpClose").click(function() {
		if (popupSignUpStatus == 1) {
			$("#bgsup").fadeOut("slow");
			$("#popupSignUp").removeClass('zigmaIn').fadeOut("slow");
			popupSignUpStatus = 0;
		}
	});
	//close new assword via X button 
	
	$("#popup_new_pass").click(function() {
		if (popupSignUpStatus == 1) {
			$("#popupNewPassword").fadeOut("slow");
			$("#new_pw_bg").removeClass('zigmaIn').fadeOut("slow");
			$("#rst_pw_bg").removeClass('zigmaIn').fadeOut("slow");
			popupSignUpStatus = 0;
		}
	});
	// clcik on background album div to hide new album frame
	$("#new_al_bg").click(function() {

		$("#popupnewalbbum").removeClass('zigmaIn').fadeOut("slow");
		$("#new_al_bg").removeClass('zigmaIn').fadeOut("slow");
		$("#validAlmName").css("color","red");
						$('#errorMsgAlb').html('');
						$("#validAlmName").removeClass('glyphicon-remove');
						$("#validAlmName").removeClass('glyphicon-asterisk');
						$("#validAlmName").removeClass('glyphicon-ok');
		});
// click on body rome frames and back grounds

	$("body").click(function() {

		$("#validAlmName").css("color","red");
						$('#errorMsgAlb').html('');
						$("#validAlmName").removeClass('glyphicon-remove');
						$("#validAlmName").removeClass('glyphicon-asterisk');
						$("#validAlmName").removeClass('glyphicon-ok');
						
		$("#LoginBackgroundPopup").fadeOut("slow");
		
		$("#SignupBackgroundPopup").fadeOut("slow");
		$("#bgsup").fadeOut("slow");


		$("#rst_pw_bg").fadeOut("slow");
		$("#new_pw_bg").fadeOut("slow");


		$("#popupResetPassword").removeClass('zigmaIn').fadeOut("slow");
		$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");

		$("#popupNewPassword").removeClass('zigmaIn').fadeOut("slow");

		$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
		$("#popupSignUp").removeClass('zigmaIn').fadeOut("slow");
		popupSignUpStatus = 0;
		popupStatus = 0;
		popupRstPwdStts = 0;
	});
	$('#popupLogin, .exampleHeader').click(function(e) {
		e.stopPropagation();
	});
	$('#popupNewPassword, #forgetPassword').click(function(e) {
		e.stopPropagation();
	});
	$('#popupSignUp, #signin_register').click(function(e) {
		e.stopPropagation();
	});
	$('#popupResetPassword, #forgetPassword').click(function(e) {
		e.stopPropagation();
	});
	// show representation request button 
	$(".details").click(function(){
		$('.reprequest').show();/*
		$('.reprequest').attr('disabled', 'disabled').off('click');
		$('.reprequest').attr("disabled", true);*/

		//$('.reprequest').html("you have sent representaion request");

	});
	// Masonry
	if ($("#masonry-container")[0]) {
		var $masonrytt = $('#masonry-container');
		$masonrytt.imagesLoaded( function(){
			$masonrytt.masonry({
				itemSelector: '.mitem',
				isAnimated: true,
				columnWidth: 1
			});
		});
	}
	// Hover Effect
	if (!(jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 6)) {
		jQuery('.hover-fx').each(function () {
			var overImg = jQuery(this).find('.overlay');
			jQuery(this).hover(function () {
				overImg.stop().fadeIn();
				$(this).removeClass('flipOutX');
			}, function () {
				overImg.stop().fadeOut('fast');
				$(this).addClass('flipOutX');
			});
		});
	}
	// Gallery
		
	//alert('$(tp-grid)[0]' + $("#tp-grid")[0]);
/*if ($("#tp-grid")[0]) {
	var $grid = $( '#tp-grid' ),
	$name = $( '#name' ),
	$close = $( '#close' ),
	$loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
	stapel = $grid.stapel( {
		randomAngle : false,
		delay : 100,
		gutter : 0,
		pileAngles : 0,
		onLoad : function() {
			$('.addAlbum').hide();
			$('.removeAlbum').css('visibility', 'hidden');
			$loader.remove();
							},
		onBeforeOpen : function( pileName ) {
			$name.html( pileName );
			$('.removeAlbum').hide();
			$('.addAlbum').hide();
			$('.removeAlbum').css('visibility', 'hidden');
											},
		onAfterOpen : function( pileName ) {
			showDelte = 1;
			$('.addAlbum').hide();
			$('.removeAlbum').css('visibility', 'hidden');
			$('.removeAlbum').hide();
			$('.def-block').on('mouseenter', 'ul.tp-grid li ', function(){
				if(showDelte === 1)
					{
					$(this).find('> div.removeDiv').show();
					}
			}).on('mouseleave', 'ul.tp-grid li', function () {
				$(".removeDiv").hide();
															});
			$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
			$close.show();
											}
		});
		$close.on( 'click', function() {
			$('.addAlbum').hide();
			$(this).hide();
			$("a[rel^='prettyPhoto']").prettyPhoto().unbind();
			$(".removeDiv").hide();
			$name.empty().html('Photo Gallery');
			stapel.closePile();
			stapel = $grid.stapel( {
				randomAngle : false,
				delay : 100,
				gutter : 0,
				pileAngles : 0,
				onLoad : function() {
					$('.addAlbum').hide();
					$loader.remove();},
				onBeforeOpen : function( pileName ) {
				$('.addAlbum').hide();
				$name.html( pileName );
			},
			onAfterOpen : function( pileName ) {
				showDelte = 1;
				$('.addAlbum').hide();
						$('.def-block').on('mouseenter', 'ul.tp-grid li ', function()
		{
			if(showDelte === 1)
			{
			$(this).find('> div.removeDiv').show();
			}
		}).on('mouseleave', 'ul.tp-grid li', function () {
			$(".removeDiv").hide();
});
				$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
				$close.show();
			}
		});
		});
	}*/
	// prettyPhoto
	if ($("a[rel^='prettyPhoto']")[0]) {
		$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
	}
	// quicksand
	if ($(".filter")[0]) {
		var $portfolioClone = $(".portfolio").clone();
		$(".filter a").click(function (e) {
			$(".filter li").removeClass("current");
			var $filterClass = $(this).parent().attr("class");
			if ($filterClass === "all") {
				var $filteredPortfolio = $portfolioClone.find("li");
			} else {
				var $filteredPortfolio = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
			}
			// Call quicksand
			$(".portfolio").quicksand($filteredPortfolio, {
				duration: 600,
				easing: 'easeOutExpo',
				adjustHeight: 'dynamic'
			}, function () {
				$(".portfolio a[rel^='prettyPhoto']").prettyPhoto({
					theme: 'facebook',
					autoplay_slideshow: false,
					overlay_gallery: false,
					show_title: false
				});
				if (!(jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 6)) {
					jQuery('.hover-fx').each(function () {
						var overImg = jQuery(this).find('.overlay');
						jQuery(this).hover(function () {
							overImg.stop().fadeIn();
							$(this).removeClass('flipOutX');
						}, function () {
							overImg.stop().fadeOut('fast');
							$(this).addClass('flipOutX');
						});
					});
				}
			});
			$(this).parent().addClass("current");
			e.preventDefault();
		});
	}
	// Flickr, You can find your flickr id from idgettr.com
	if ($("#flickr-photos")[0]) {
		$('#flickr-photos').jflickrfeed({
			limit: 6,
			qstrings: {
				id: '52617155@N08'
			},
			itemTemplate: '<li>' + '<a href="{{image_b}}" rel="prettyPhoto[flickr]"><img src="{{image_s}}" alt="{{title}}" /></a>' + '</li>',
			itemCallback: function (data) {
				$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
			}
		});
	}
	// Ajax Contact
	if ($("#contactForm")[0]) {
		$('#contactForm').submit(function () {
			$('#contactForm .error').remove();
			$('.requiredField').removeClass('fielderror');
			$('.requiredField').addClass('fieldtrue');
			$('#contactForm span strong').remove();
			var hasError = false;
			$('#contactForm .requiredField').each(function () {
				if (jQuery.trim($(this).val()) === '') {
					var labelText = $(this).prev('label').text();
					$(this).addClass('fielderror');
					$('#contactForm span').html('<strong>*Please fill out all fields.</strong>');
					hasError = true;
				} else if ($(this).hasClass('email')) {
					var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if (!emailReg.test(jQuery.trim($(this).val()))) {
						var labelText = $(this).prev('label').text();
						$(this).addClass('fielderror');
						$('#contactForm span').html('<strong>Is incorrect your email address</strong>');
						hasError = true;
					}
				}
			});
			if (!hasError) {
				$('#contactForm').slideDown('normal', function () {
					$("#contactForm #sendMessage").addClass('load-color');
					$("#contactForm #sendMessage").attr("disabled", "disabled").val('Sending message. Please wait...');
				});
				var formInput = $(this).serialize();
				$.post($(this).attr('action'), formInput, function (data) {
					$('#contactForm').slideUp("normal", function () {
						$(this).before('<div class="notification-box notification-box-success"><p><i class="icon-ok"></i>Thanks!</strong> Your email was successfully sent. We check Our email all the time, so we should be in touch soon.</p></div>');
					});
				});
			}
			return false;
		});
	}
	// Twitter API 1.1
	if ($(".tweet")[0]) {
		jQuery(".tweet").tweet({
			modpath: 'js/twitter/',
			username: 'behzadg1',
			page: 1,
			count: 2,
			loading_text: "<i class='icon-spinner icon-spin mi'></i>Loading Tweets..."
		});
		jQuery(".tweet li").prepend("<i class='icon-twitter'></i>");
	}
	// Tipsy
	$('.toptip').tipsy({fade: true,gravity: 's'});
	$('.bottomtip').tipsy({fade: true,gravity: 'n'});
	$('.righttip').tipsy({fade: true,gravity: 'w'});
	$('.lefttip').tipsy({fade: true,gravity: 'e'});

	// T20 Custom
	jQuery('.animt').each(function () {
		var $curr = jQuery(this);
		var $currOffset = $curr.attr('data-gen-offset');
		if ($currOffset === '' || $currOffset === 'undefined' || $currOffset === undefined) {
			$currOffset = 'bottom-in-view';
		}
		$curr.waypoint(function () {
			$curr.trigger('animt');
		}, {
			triggerOnce: true,
			offset: $currOffset
		});
	});
	jQuery('.animtt').each(function () {
		var $curr = jQuery(this);
		$curr.bind('animt', function () {
			$curr.css('opacity', '');
			$curr.addClass($curr.data('gen'));
		});
	});
	jQuery('.animtt').each(function () {
		var $curr = jQuery(this);
		var $currOffset = $curr.attr('data-gen-offset');
		if ($currOffset === '' || $currOffset === 'undefined' || $currOffset === undefined) {
			$currOffset = 'bottom-in-view';
		}
		$curr.waypoint(function () {
			$curr.trigger('animt');
		}, {
			triggerOnce: true,
			offset: $currOffset
		});
	});
	// Sticky
	if ($(".glue")[0]){
		$(window).scroll(function(){
			var wind_scr = $(window).scrollTop();
			var window_width = $(window).width();
			if (window_width > 768) {
				if(wind_scr < 200){
					if($('#header').data('sticky') === true){
						$('#header').data('sticky', false);
						$('#header').stop(true).animate({opacity : 0}, 150, function(){
							$(this).removeClass('sticky');
							$('#header').stop(true).animate({opacity : 1}, 300);
						});
					}
				} else {
					if($('#header').data('sticky') === false || typeof $('#header').data('sticky') === 'undefined'){
						$('#header').data('sticky', true);
						$('#header').stop(true).animate({opacity : 0},150,function(){
							$(this).addClass('sticky');
							$('#header.sticky').stop(true).animate({opacity : 1}, 300);
						});
					}
				}
			}
		});
		$(window).resize(function(){
			var window_width = $(window).width();
			if (window_width < 768) {
				if($('#header').hasClass('sticky')){
					$('#header').removeClass('sticky');
				}
			}
		});
	}
	// Example Load News
	/*$('#rst').click(function(){alert('handeling from jquery')});*/
	$('.load-news').append('<img style="display: none;margin: 0 auto" src="images/loading2.gif"><h4 style="display: none;color:#ccc;border: 0">Sorry! Not More News.</h4>');
	$( ".load-news a" ).removeAttr('href').click(function() {
		jQuery('.load-news a').fadeOut( 100 );
		jQuery('.load-news img').fadeIn( 1000 );
		jQuery('.load-news img').delay( 2000 ).fadeOut( 800 );
		jQuery('.load-news h4').delay( 3100 ).fadeIn( 800 );
	});
	// IE7
	if ($.browser.msie && $.browser.version <= 7) {
		$(".breadcrumbIn li").append("<i class='icon-angle-right'></i>");
		$(".jp-play").append("<i class='icon-play'></i>");
		$(".jp-pause").append("<i class='icon-pause'></i>");
		$(".jp-next").append("<i class='icon-forward'></i>");
		$(".jp-previous").append("<i class='icon-backward'></i>");
		$(".rating-level").append("<i class='icon-star'></i>");
	}
});
/* jQuery Waypoints - Copyright (c) 2011-2013 Caleb Troughton - https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt */
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);