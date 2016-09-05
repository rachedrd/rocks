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
	$('.full').on('click', ' ul.tabs li a', function(e){
       var tabs = $('.full  ul.tabs');
		var contentLocation = $(this).attr('href');
		if( $(this).attr("id") === "uploadsong")
			{$(".uploadsongdiv").show(); }
		//$('.full  ul.tabs').children().each(function (i) {
			//var tab =  $('.full  ul.tabs').find('li').eq(i).find('> a');
			//alert(tab.html());
		//});
		//alert(tabs.html());
		$('.full  ul.tabs').children().each(function (i) {
		// get tabs
		var tab = $('.full  ul.tabs').find('li').eq(i).find('> a');
		if (contentLocation.charAt(0) === "#") {
			e.preventDefault();
		    tab.removeClass('active');
				$(this).addClass('active');
	$(contentLocation).fadeIn(500).addClass('active').siblings().hide().removeClass('active');
		
	    }
		//alert(tab.find('> a').html());
	});
		
				$(this).addClass('active');
	});
	var tabs = jQuery(' ul.tabs');
	tabs.children().each(function (i) {
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
/*var cuisines = ["Chinese","Indian"];     
var myselect = $('#select2');
alert(myselect);
for(var i = 0; i < cuisines.length; i++) {
	alert('appending ...' + i);
    var opt = document.createElement('option');
    opt.innerHTML = cuisines[i];
    opt.value = cuisines[i];
    alert(opt.html());
    myselect.append(opt);
}*/

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
	// show the upload music form 
		$(".tabs").on('click', '.uploadnewsong', function() {
		//Aligning our box in the middle
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $("#popupsong").height();
		var popupWidth = $("#popupsong").width();
		// Centering
		$("#popupsong").css({
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});
		// Aligning bg
		$("#addsongbg").css({"height": windowHeight});
	
		// Pop up the div and Bg
			$("#addsongbg").css({"opacity": "0.7"});
			$("#addsongbg").fadeIn("slow");
			$("#popupsong").addClass('zigmaIn').fadeIn("slow");

	});
	// update user informations
	// update first name
     
	// update address
	$('.userinfocontent').on('click','.updateaddress' , function(){
		$('#addressspan').hide();
		$('.address-holder').show();
		$(this).hide();
		$('.saveaddress').show();
	});
	$('.userinfocontent').on('click','.updatepostecode' , function(){
		$('#postecodespan').hide();
		$('.suggest-holder').show();
		$(this).hide();
		$('.savepostecode').show();
	});
	// update postecode 
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
	// update and save region name 
	$('.userinfocontent').on('click','.updateregion' , function(){
		$('#regionspan').hide();
		$('#regioninput').show();
		$(this).hide();
		$('.saveregion').show();
	});
	
	$('.userinfocontent').on('click' , '.saveregion', function(){
		if(( $("#regioninput").val() === "" ) || ( $("#regioninput").val() === undefined ) )
		{
			$(this).hide();
			$("#emptyregion").show();
            $("#emptyregionerr").html("region is empty");
            $("#emptyregionerr").show();
		} else
		{
			$(this).hide();
		$('#regioninput').hide();
		$('#regionspan').show();
		$('.updateregion').show();
		}
		
	});
	// update and save city 
	// update and save region name 
	$('.userinfocontent').on('click','.updatecity' , function(){
		$('#cityspan').hide();
		$('#cityinput').show();
		$(this).hide();
		$('.savecity').show();
	});
	
	$('.userinfocontent').on('click' , '.savecity', function(){
		if(( $("#cityinput").val() === "" ) || ( $("#cityinput").val() === undefined ) )
		{
			$(this).hide();
			$("#emptycity").show();
            $("#emptycityerr").html("city name is empty");
            $("#emptycityerr").show();
		} else
		{

			$(this).hide();
		$('#cityinput').hide();
		$('#cityspan').show();
		$('.updatecity').show();
		}
		
	});
	// save postecode 
	$('.userinfocontent').on('click' , '.savepostecode', function(){
		var mypostecode = $(".suggest-prompt").val();
		if(( mypostecode === "" ) || ( mypostecode === undefined ) )
		{
			$(this).hide();
			$("#emptypostecode").show();
            $("#emptypostecodeerr").html("postecode is empty");
            $("#emptypostecodeerr").show();
		} else
		{
			if(mypostecode.length !== 6 )
			{
  				$(this).hide();
			$("#emptypostecode").show();
            $("#emptypostecodeerr").html("postecode length must be 6");
            $("#emptypostecodeerr").show();
			}
			else{
			$(this).hide();
		$('.suggest-holder').hide();
		$('#postecodespan').show();
		$('.updatepostecode').show();
		}
		}
		
	});
	// save address 
	$('.userinfocontent').on('click' , '.saveaddress', function(){
		if(( $(".inputaddress").val() === "" ) || ( $(".inputaddress").val() === undefined ) )
		{
			$(this).hide();
			$("#emptyaddress").show();
            $("#emptyaddresserr").html("address is empty");
            $("#emptyaddresserr").show();
            $('.address').hide();
		} else
		{
			$(this).hide();
		$('.address-holder').hide();
		$('#addressspan').show();
		$('.updateaddress').show();
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
	// add repertoire set 
	$('.userinfocontent').on('click' , '.addrepertoire' , function(){
		$('.repertoiresingerinput').show();
		$('.inputrepertoirename').show();
		$('.repertoiresongname').show();
		$('.repertoiresinger').show();

		$(this).hide();
		$('.saverepertoire').show();
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
	// update band sets
	$('.userinfocontent').on('click' , '.updatebandsets' , function(){
		$('#bandsetsspan').hide();
		$('.bandsets').show();
		$(this).hide();
		$('.savebandsets').show();
	});
	// hide the highlight add form if mouse out of this form 
	$('.userinfocontent').on('mouseenter','.highlightslist ul li', function()
	{
		$(this).children('.removeHighlight').show();
	}).on('mouseleave', '.highlightslist ul li', function () {
    $(this).children('.removeHighlight').hide();
});
		$('.userinfocontent').on('mouseenter','.repertoirelist ul li', function()
	{
		$(this).children('.removerepertoire').show();
	}).on('mouseleave', '.repertoirelist ul li', function () {
    $(this).children('.removerepertoire').hide();
});
		$('.userinfocontent').on('mouseenter','.memeberslist ul li', function()
	{
		$(this).children('.removeMumber').show();
	}).on('mouseleave', '.memeberslist ul li', function () {
    $(this).children('.removeMumber').hide();
});

	$('.userinfocontent').on('mouseenter', '#bandtypediv', function()
		{
          $('.savehighlight').hide();
		$('.spanhighlight').hide();
		//$('.inputhighlight').val("");
		$('.inputhighlight').hide();
		$('.addhighlight').show();
		   $("#emtyhighlight").hide();
		 $("#highlighteerr").hide();
	
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
         $("#emtymember").hide();
		 $("#bandmembereerr").hide();
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
 // save list set animation 
 $('.userinfocontent').on('click', '.saverepertoire' , function(){
		if(( $(".inputrepertoirename").val() === "" ) || ( $(".inputrepertoirename").val() === undefined ) || 
			( $(".repertoiresingerinput").val() === "" ) || ( $(".repertoiresingerinput").val() === undefined )
			)
		{
			$(this).hide();
			$("#repertoireerr").show();
			$("#emptyrepertoire").show();   
			if(($(".inputrepertoirename").val() === "" ) || 
				( $(".inputrepertoirename").val() === undefined )) 
			{

            $("#repertoireerr").html("song title is empty");
			}
            if(($(".repertoiresingerinput").val() === "" ) || 
              ( $(".repertoiresingerinput").val() === undefined ))
            {
            	$("#repertoireerr").html("singer name is empty");  
		    
            }
            
		} else{
		$(this).hide();
		$('.repertoiresongname').hide();
		$('.inputrepertoirename').hide();
		$('.repertoiresinger').hide();
		$('.repertoiresingerinput').hide();
		$('.addrepertoire').show();
		$("#repertoireerr").hide();
		$("#repertoireerr").html("");
		$("#emptyrepertoire").hide();



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
	
    // save band type 
	$('.userinfocontent').on('click', '.savebandtype' , function(){
	  	$(this).hide();
		$('.bandtype').hide();
		$('.updatebandtype').show();
		$('#bandtypespan').show();
	}); 
	// save band sets
	$('.userinfocontent').on('click', '.savebandsets' , function(){
	  	$(this).hide();
		$('.bandsets').hide();
		$('.updatebandsets').show();
		$('#bandsetsspan').show();
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
  
    //input poste code 

	$('.userinfocontent').on('click' , '.suggest-prompt', function(){
			$("#emptypostecode").hide();
            $("#emptypostecodeerr").html("");
            $("#emptypostecodeerr").hide();
		    $('#postecodespan').hide();
		   $('.savepostecode').show();

		});
    //input address 
    $('.userinfocontent').on('click' , '.inputaddress', function(){
			$("#emptyaddress").hide();
            $("#emptyaddresserr").html("");
            $("#emptyaddresserr").hide();
		   $('.saveaddress').show();

		});

	$('.userinfocontent').on('click' , '#birthinput', function(){
      window.myDatePicker1 = new DatePicker('.userinfocontent #birthinput', options);     
	});
	/*$('.bandtypesearch').on('click' , '.suggest-availability', function(){
		alert('click ...');
      //window.myDatePicker1 = new DatePicker('.banscontent .suggest-availability', options);     
      window.myDatePicker2 = new DatePicker('.bandtypesearch .suggest-availability', options);     

	});*/
$('.imaxnumber').click(function(){
	if($('.bandnumbersinputsearch').val() === "")
		{ 
		$('.bandnumbersinputsearch').val(0);
        }
        else{
        	 var bandnumbers = parseInt($('.bandnumbersinputsearch').val());	
          if( bandnumbers <10 )
          {
           $('.bandnumbersinputsearch').val(bandnumbers + 1);
          }
	  
        }

});
$('.iminnumber').click(function(){
	if($('.bandnumbersinputsearch').val() === "")
		{ 
		$('.bandnumbersinputsearch').val(10);
        }
        else{
        	 var bandnumbers = parseInt($('.bandnumbersinputsearch').val());	
          if( bandnumbers >0 )
          {
           $('.bandnumbersinputsearch').val(bandnumbers - 1);
          }
	  
        }
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
	// clear on click on regicon input 
	$('.userinfocontent').on('click' , '#regioninput', function(){
    $("#emptyregion").hide();
	$("#emptyregionerr").hide();
	$("#emptyregionerr").html("");
	$(".saveregion").show();
});
	// clear on click on city input 
	$('.userinfocontent').on('click' , '#cityinput', function(){
    $("#emptycity").hide();
	$("#emptycityerr").hide();
	$("#emptycityerr").html("");
	$(".savecity").show();
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
    // hide error messages 
    $('.userinfocontent').on('click', '.inputrepertoirename', function(){
    $("#emptyrepertoire").hide();
	$("#repertoireerr").html("");
	$("#repertoireerr").hide();
	$(".saverepertoire").show();
	});
	$('.userinfocontent').on('click', '.repertoiresingerinput', function(){
    $("#emptyrepertoire").hide();
	$("#repertoireerr").html("");
	$("#repertoireerr").hide();
	$(".saverepertoire").show();
	});
	/*slider range*/
	
// Without JQuery
//var slider = new Slider('#ex2', {});
/*$(".slider").click(function(){
var value = $('#ex2').slider('getValue');
alert(value);
});*/
	/*postecode dynamic fill*/

/*regions = ["AB","AL","B","BA","BB","BD","BH","BL","BN","BR","BS","BT","CA","CB","CF","CH","CM","CO","CR",
"CT","CV","CW","DA","DD","DE","DG","DH","DL","DN","DT","DY","E","EC","EH","EN","EX","FK","FY","G","GL","GU",
"GY","HA","HD","HG","HP","HR","HS","HU","HX","IG","IM","IP","IV","JE","KA","KT","KW","KY","L","LA","LD","LE",
"LL","LN","LS","LU","M","ME","MK","ML","N","NE","NG","NN","NP","NR","NW","OL","OX","PA","PE","PH","PL","PO",
"PR","RG","RH","RM","S","SA","SE","SG","SK","SL","SM","SN","SO","SP","SR","SS","ST","SW","SY","TA","TD","TF",
"TN","TQ","TR","TS","TW","UB","W","WA","WC","WD","WF","WN","WR","WS","WV","YO"];*/
regions = [{"name":"AB","description":"Aberdeen"},{"name":"AL","description":"St"},
{"name":"B","description":"Birmingham"},{"name":"BA","description":"Bath"},
{"name":"BB","description":"Blackburn"},{"name":"BD","description":"Bradford"},
{"name":"BH","description":"Bournemouth"},{"name":"BL","description":"Bolton"},{"name":"BN","description":"Brighton"},{"name":"BR","description":"Bromley"},{"name":"BS","description":"Bristol"},
{"name":"BT","description":"Belfast"},{"name":"CA","description":"Carlisle"},{"name":"CB","description":"Cambridge"},{"name":"CF","description":"Cardiff"},
{"name":"CH","description":"Chester"},{"name":"CM","description":"Chelmsford"},{"name":"CO","description":"Colchester"},{"name":"CR","description":"Croydon"},
{"name":"CT","description":"Canterbury"},{"name":"CV","description":"Coventry"},{"name":"CW","description":"Crewe"},{"name":"DA","description":"Dartford"},{"name":"DD","description":"Dundee"},
{"name":"DE","description":"Derby"},{"name":"DG","description":"Dumfries"},{"name":"DH","description":"Durham"},{"name":"DL","description":"Darlington"},{"name":"DN","description":"Doncaster"},
{"name":"DT","description":"Dorchester"},{"name":"DY","description":"Dudley"},{"name":"E","description":"East"},{"name":"EC","description":"East"},{"name":"EH","description":"Edinburgh"},
{"name":"EN","description":"Enfield"},{"name":"EX","description":"Exeter"},{"name":"FK","description":"Falkirk"},{"name":"FY","description":"Blackpool"},{"name":"G","description":"Glasgow"},
{"name":"GL","description":"Gloucester"},{"name":"GU","description":"Guildford"},{"name":"GY","description":"Guernsey"},{"name":"HA","description":"Harrow"},{"name":"HD","description":"Huddersfield"},
{"name":"HG","description":"Harrogate"},{"name":"HP","description":"Hemel"},{"name":"HR","description":"Hereford"},{"name":"HS","description":"Outer"},{"name":"HU","description":"Hull"},
{"name":"HX","description":"Halifax"},{"name":"IG","description":"Ilford"},{"name":"IM","description":"Isle"},{"name":"IP","description":"Ipswich"},{"name":"IV","description":"Inverness"},
{"name":"JE","description":"Jersey"},{"name":"KA","description":"Kilmarnock"},{"name":"KT","description":"Kingston"},{"name":"KW","description":"Kirkwall"},{"name":"KY","description":"Kirkcaldy"},
{"name":"L","description":"Liverpool"},{"name":"LA","description":"Lancaster"},{"name":"LD","description":"Llandrindod"},{"name":"LE","description":"Leicester"},{"name":"LL","description":"Llandudno"},
{"name":"LN","description":"Lincoln"},{"name":"LS","description":"Leeds"},{"name":"LU","description":"Luton"},{"name":"M","description":"Manchester"},{"name":"ME","description":"Rochester"},
{"name":"MK","description":"Milton"},{"name":"ML","description":"Motherwell"},{"name":"N","description":"North"},{"name":"NE","description":"Newcastle"},{"name":"NG","description":"Nottingham"},
{"name":"NN","description":"Northampton"},{"name":"NP","description":"Newport"},{"name":"NR","description":"Norwich"},{"name":"NW","description":"North"},{"name":"OL","description":"Oldham"},
{"name":"OX","description":"Oxford"},{"name":"PA","description":"Paisley"},{"name":"PE","description":"Peterborough"},{"name":"PH","description":"Perth"},{"name":"PL","description":"Plymouth"},
{"name":"PO","description":"Portsmouth"},{"name":"PR","description":"Preston"},{"name":"RG","description":"Reading"},{"name":"RH","description":"Redhill"},{"name":"RM","description":"Romford"},
{"name":"S","description":"Sheffield"},{"name":"SA","description":"Swansea"},{"name":"SE","description":"South"},{"name":"SG","description":"Stevenage"},{"name":"SK","description":"Stockport"},
{"name":"SL","description":"Slough"},{"name":"SM","description":"Sutton"},{"name":"SN","description":"Swindon"},{"name":"SO","description":"Southampton"},{"name":"SP","description":"Salisbury"},
{"name":"SR","description":"Sunderland"},{"name":"SS","description":"Southend-on-Sea"},{"name":"ST","description":"Stoke-on-Trent"},{"name":"SW","description":"South"},{"name":"SY","description":"Shrewsbury"},
{"name":"TA","description":"Taunton"},{"name":"TD","description":"Galashiels"},{"name":"TF","description":"Telford"},{"name":"TN","description":"Tonbridge"},{"name":"TQ","description":"Torquay"},
{"name":"TR","description":"Truro"},{"name":"TS","description":"Cleveland"},{"name":"TW","description":"Twickenham"},{"name":"UB","description":"Southall"},{"name":"W","description":"West"},
{"name":"WA","description":"Warrington"},{"name":"WC","description":"Western"},{"name":"WD","description":"Watford"},{"name":"WF","description":"Wakefield"},{"name":"WN","description":"Wigan"},{"name":"WR","description":"Worcester"},
{"name":"WS","description":"Walsall"},{"name":"WV","description":"Wolverhampton"},{"name":"YO","description":"York"}]

regionsnumbersab = ["AB10","AB11","AB12","AB15","AB16","AB21","AB22","AB23","AB24",
"AB25","AB99","AB13","AB14","AB30","AB31","AB32","AB33","AB34","AB35","AB36","AB37",
"AB38","AB39","AB41","AB42","AB43","AB44","AB45","AB51","AB52","AB53","AB54"]
regionsnumbersal = [
"AL1","AL2","AL3","AL4","AL5 AL6","AL7","AL8"];
regionsnumbersb=[
"B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B14","B15","B16","B17","B18","B19","B20",
"B21","B23","B24","B25","B26","B27","B28","B29","B30","B31","B32","B33","B34","B35","B36","B37","B38","B40","B42",
"B43","B44","B45","B46","B47","B48","B99","B49","B50","B60","B61","B62","B63","B64","B65","B66","B67","B68","B69",
"B70","B71","B72","B73","B74","B75","B76","B77","B78","B79","B80","B90","B91","B92","B93","B94","B95","B96"];
regionsnumbersba=[
"BA2","BA3","BA4","BA5","BA6","BA7","BA8","BA9","BA10","BA11","BA12","BA13","BA14","BA15","BA16"];
regionsnumbersbb=[
"BB1","BB2","BB6","BB3","BB4","BB5","BB7","BB8","BB9","BB10","BB11","BB12"];
regionsnumbersbd=["BD1","BD2","BD3","BD4","BD5","BD6","BD7","BD8","BD9","BD10","BD11","BD12",
"BD13","BD14","BD15","BD98","BD99","BD16","BD97","BD17","BD18","BD19","BD20","BD21"];
regionsnumbersbh=["BH1","BH2","BH3","BH4","BH5","BH6","BH7","BH8","BH9","BH10","BH11",
"BH12","BH13","BH14","BH15","BH16","BH17","BH18","BH19","BH20","BH21","BH22","BH23","BH24"];
regionsnumbersbl=["BL0","BL8","BL9","BL1","BL2","BL3","BL4","BL5","BL6","BL7","BL11","BL78"];
regionsnumbersbn=["BN1","BN2","BN41","BN42","BN45","BN50","BN51","BN88","BN3","BN52","BN5",
"BN6","BN7","BN8","BN9","BN10","BN11","BN12","BN13","BN14","BN91","BN99","BN15","BN16","BN17",
"BN18","BN20","BN21","BN22","BN23","BN24","BN25","BN26","BN27","BN43","BN44"];
regionsnumbersbr=["BR1","BR2","BR3","BR4","BR5","","BR6","BR7","BR8"];
regionsnumbersbs=["BS0","BS1","BS2","BS3","BS4","BS5","BS6","BS7","BS8","BS9","BS10","BS11",
"BS13","BS14","BS15","BS16","BS20","BS30","BS31","BS32","BS34","BS35","BS36","BS37","BS39","BS40",
"BS41","BS48","BS49","BS80","BS98","BS99","BS21","BS22","BS23","BS24","BS25","BS26","BS27","BS28"];
regionsnumbersbt=["BT1","BT2","BT3","BT4","BT5","BT6","BT7","BT8","BT9","BT10","BT11",
"BT12","BT13","BT14","BT15","BT16","BT17","BT29","BT18","BT19","BT20","BT21","BT22","BT23",
"BT24","BT25","BT26","BT27","BT28","BT30","BT31","BT32","BT33","BT34","BT35","BT36","BT37","BT58",
"BT38","BT39","BT40","BT41","BT42","BT43","BT44","BT45","BT46","BT47","BT48","BT49","BT51","BT52","BT53",
"BT54","BT55","BT56","BT57","BT60","BT61","BT62","BT63","BT64","BT65","BT66","BT67","BT68","BT69","BT70",
"BT71","BT74","BT92","BT93","BT94","BT75","BT76","BT77","BT78","BT79","BT80","BT81"];
regionsnumbersca=["CA1","CA2","CA3","CA4","CA5","CA6","CA99","CA7","CA8","CA9","CA10","CA11",
"CA12","CA13","CA14","CA95","CA15","CA16","CA17","CA18","CA19","CA20","CA21","CA22","CA23","CA24",
"CA25","CA26"];
regionsnumberscb=["CB1","CB2","CB3","CB4","CB5","CB21","CB22","CB23","CB24","CB25","CB6","CB7","CB8","CB9","CB10","CB11"];

regionsnumbersab10=["AB101AA","AB101AB","AB101AF","AB101AG","AB101AH","AB101AJ","AB101AL","AB101AN","AB101AP",
"AB101AQ","AB101AR","AB101AS","AB101AU","AB101AW","AB101AX","AB101BA","AB101BB","AB101BD","AB101BF",
"AB101BH","AB101BR","AB101BS","AB101BU","AB101BW","AB101DB","AB101DG","AB101DQ","AB101DU","AB101EP",
"AB101FE","AB101FF","AB101FG","AB101FL","AB101FQ","AB101FR","AB101FT","AB101FW","AB101FX","AB101FY",
"AB101GE","AB101GF","AB101GS","AB101GZ","AB101HA","AB101HE","AB101HF","AB101HH","AB101HP","AB101HS",
"AB101HT","AB101HW","AB101JB","AB101JD","AB101JE","AB101JF","AB101JG","AB101JH","AB101JJ","AB101JL",
"AB101JN","AB101JP","AB101JQ","AB101JR","AB101JS","AB101JT","AB101JU","AB101JW","AB101JX","AB101JZ",
"AB101LB","AB101LG","AB101LP","AB101LQ","AB101LU","AB101LX","AB101NG","AB101NJ","AB101NL","AB101NN",
"AB101NP","AB101NT","AB101NW","AB101PA","AB101PD","AB101PE","AB101PF","AB101PG","AB101PN","AB101PP",
"AB101PR","AB101PS","AB101PU","AB101PY","AB101QA","AB101QB","AB101QD","AB101QE","AB101QH","AB101QJ",
"AB101QL","AB101QN","AB101QQ","AB101QR","AB101QS","AB101QT","AB101QU","AB101QW","AB101QX","AB101QZ",
"AB101RA","AB101RB","AB101RD","AB101RE","AB101RG","AB101RH","AB101RJ","AB101RL","AB101RN","AB101RP",
"AB101RQ","AB101RR","AB101RS","AB101RT","AB101RU","AB101RW","AB101RX","AB101RY","AB101RZ","AB101SA",
"AB101SB","AB101SD","AB101SE","AB101SH","AB101SJ","AB101SL","AB101SN","AB101SP","AB101SQ","AB101SR",
"AB101SS","AB101ST","AB101SU","AB101SY","AB101TA","AB101TB","AB101TD","AB101TE","AB101TF","AB101TH",
"AB101TJ","AB101TL","AB101TN","AB101TP","AB101TQ","AB101TR","AB101TS","AB101TT","AB101TW","AB101TX",
"AB101TY","AB101TZ","AB101UA","AB101UB","AB101UD","AB101UE","AB101UF","AB101UG","AB101UH","AB101UJ",
"AB101UL","AB101UN","AB101UP","AB101UQ","AB101UR","AB101US","AB101UT","AB101UU","AB101UW","AB101UX",
"AB101UY","AB101UZ","AB101WB","AB101WD","AB101WE","AB101WF","AB101WG","AB101WH","AB101WP","AB101WR",
"AB101WS","AB101WT","AB101XA","AB101XB","AB101XD","AB101XE","AB101XF","AB101XG","AB101XH","AB101XL",
"AB101XN","AB101XP","AB101XU","AB101XW","AB101XY","AB101XZ","AB101YA","AB101YB","AB101YD","AB101YE",
"AB101YF","AB101YH","AB101YL","AB101YN","AB101YP","AB101YR","AB101YS","AB101YT","AB101ZA","AB101ZG",
"AB101ZP","AB101ZT","AB101ZU","AB101ZX","AB106AA","AB106AB","AB106AD","AB106AE","AB106AG","AB106AH",
"AB106AJ","AB106AL","AB106AN","AB106AP","AB106AQ","AB106AR","AB106AS","AB106AT","AB106AU","AB106AX",
"AB106AY","AB106BA","AB106BB","AB106BE","AB106BF","AB106BJ","AB106BL","AB106BN","AB106BP","AB106BQ",
"AB106BR","AB106BS","AB106BT","AB106BU","AB106BW","AB106BX","AB106BY","AB106BZ","AB106DA","AB106DB",
"AB106DD","AB106DE","AB106DF","AB106DG","AB106DH","AB106DJ","AB106DL","AB106DS","AB106DT","AB106DU",
"AB106ED","AB106EE","AB106EG","AB106EH","AB106EJ","AB106EL","AB106EN","AB106EP","AB106EQ","AB106ER",
"AB106ES","AB106ET","AB106EU","AB106EW","AB106EX","AB106EY","AB106FA","AB106FB","AB106FL","AB106FN",
"AB106FP","AB106GA","AB106HA","AB106HB","AB106HD","AB106HE","AB106HF","AB106HG","AB106HH","AB106HJ",
"AB106HL","AB106HN","AB106HP","AB106HQ","AB106HR","AB106HS","AB106HT","AB106HU","AB106HW","AB106HX",
"AB106HY","AB106JA","AB106JB","AB106JD","AB106JE","AB106JF","AB106JG","AB106JH","AB106JJ","AB106JL",
"AB106JN","AB106JP","AB106JQ","AB106JR","AB106JU","AB106JW","AB106JY","AB106JZ","AB106LE","AB106LF",
"AB106LG","AB106LH","AB106LP","AB106LQ","AB106LR","AB106LX","AB106LZ","AB106NA","AB106NB","AB106ND",
"AB106NJ","AB106NL","AB106NN","AB106NP","AB106NQ","AB106NR","AB106NU","AB106NW","AB106NY","AB106NZ",
"AB106PA","AB106PB","AB106PD","AB106PE","AB106PF","AB106PG","AB106PH","AB106PJ","AB106PL","AB106PN",
"AB106PP","AB106PQ","AB106PR","AB106PS","AB106PT","AB106PU","AB106PW","AB106PX","AB106PY","AB106PZ",
"AB106QA","AB106QB","AB106QD","AB106QE","AB106QF","AB106QG","AB106QH","AB106QJ","AB106QL","AB106QN",
"AB106QP","AB106QQ","AB106QR","AB106QS","AB106QT","AB106QU","AB106QW","AB106QX","AB106QY","AB106QZ",
"AB106RA","AB106RB","AB106RD","AB106RE","AB106RF","AB106RG","AB106RH","AB106RJ",
"AB106RL","AB106RN","AB106RP","AB106RQ","AB106RR","AB106RS","AB106RT","AB106RU",
"AB106RW","AB106RX","AB106RY","AB106RZ","AB106SA","AB106SB","AB106SD","AB106SE",
"AB106SF","AB106SG","AB106SH","AB106SJ","AB106SL","AB106SN","AB106SP","AB106SQ",
"AB106SR","AB106SS","AB106ST","AB106SU","AB106SW","AB106SX","AB106SY","AB106SZ",
"AB106TA","AB106TB","AB106TD","AB106TE","AB106TF","AB106TG","AB106TJ","AB106TP",
"AB106TQ","AB106TR","AB106TS","AB106UQ","AB106UR","AB106US","AB106UT","AB106UX",
"AB106UZ","AB106WD","AB106WE","AB106WU","AB106XA","AB106XB","AB106XD","AB106XE",
"AB106XF","AB106XH","AB106XJ","AB106XL","AB106XN","AB106XP","AB106XQ","AB106XR",
"AB106XS","AB106XT","AB106XU","AB106XW","AB106XX","AB106YA","AB106YH","AB106YZ",
"AB107AA","AB107AB","AB107AD","AB107AE","AB107AF","AB107AG","AB107AH","AB107AJ",
"AB107AL","AB107AN","AB107AP","AB107AQ","AB107AR","AB107AS","AB107AT","AB107AU",
"AB107AW","AB107AX","AB107AY","AB107AZ","AB107BA","AB107BB","AB107BD","AB107BE",
"AB107BF","AB107BG","AB107BH","AB107BJ","AB107BL","AB107BN","AB107BP","AB107BQ",
"AB107BR","AB107BS","AB107BT","AB107BU","AB107BW","AB107BX","AB107BY","AB107BZ",
"AB107DA","AB107DB","AB107DD","AB107DE","AB107DF","AB107DG","AB107DH","AB107DJ",
"AB107DL","AB107DN","AB107DP","AB107DQ","AB107DR","AB107DS","AB107DT","AB107DU",
"AB107DX","AB107DY","AB107DZ","AB107EA","AB107EB","AB107ED","AB107EE","AB107EF","AB107EG","AB107EH",
"AB107EJ","AB107EL","AB107EN","AB107EP","AB107EQ","AB107ER","AB107ES","AB107ET",
"AB107EU","AB107EW","AB107EX","AB107EY","AB107EZ",
"AB107FA","AB107FB","AB107FD","AB107FE","AB107FF","AB107FG","AB107FH","AB107FJ",
"AB107FL","AB107FN","AB107FP","AB107FQ",
"AB107FR","AB107FS","AB107FT","AB107FW","AB107FX","AB107FY","AB107FZ","AB107GA",
"AB107GB","AB107GD","AB107GE","AB107GH","AB107GR","AB107GS","AB107GT","AB107GU",
"AB107GW","AB107GX","AB107GY","AB107GZ","AB107HA","AB107HB","AB107HD","AB107HE",
"AB107HF","AB107HG","AB107HH","AB107HJ","AB107HL","AB107HN","AB107HP","AB107HQ",
"AB107HR","AB107HS","AB107HT","AB107HU","AB107HW","AB107HX","AB107HY","AB107HZ",
"AB107JA","AB107JB","AB107JD","AB107JE","AB107JF","AB107JG","AB107JH","AB107JJ",
"AB107JL","AB107JN","AB107JP","AB107JQ","AB107JR","AB107JS","AB107JT","AB107JU",
"AB107JW","AB107JX","AB107JY","AB107JZ","AB107LA","AB107LB","AB107LD","AB107LE",
"AB107LF","AB107LG","AB107LH","AB107LJ","AB107LL","AB107LN","AB107LP","AB107LQ",
"AB107LR","AB107LS","AB107LT","AB107LU","AB107LW","AB107LX","AB107LY","AB107LZ",
"AB107NA","AB107NB","AB107ND","AB107NE","AB107NF","AB107NG","AB107NH","AB107NJ",
"AB107NL","AB107NN","AB107NP","AB107NQ","AB107NR","AB107NS","AB107NT","AB107NU",
"AB107NW","AB107NX","AB107NY","AB107NZ","AB107PA","AB107PB","AB107PD","AB107PE",
"AB107PF","AB107PG","AB107PH","AB107PL","AB107PN","AB107PP","AB107PQ","AB107PR",
"AB107PS","AB107PT","AB107PU","AB107PW"]
var alltypes = ["concert","family","jazz","orchestra","pope","rock","school","wedding"];
var regionsnumbersab11 = ["AB115AA","AB115AB","AB115AD","AB115AE","AB115AF","AB115AH","AB115AJ","AB115AL","AB115AN","AB115AP","AB115AQ","AB115AR","AB115AS","AB115AT","AB115AU","AB115AW","AB115AX","AB115AY","AB115AZ","AB115BA","AB115BB","AB115BD","AB115BE","AB115BF","AB115BG","AB115BH","AB115BJ","AB115BL","AB115BN","AB115BP","AB115BQ","AB115BR","AB115BS","AB115BT","AB115BU","AB115BW","AB115BX","AB115BY","AB115BZ","AB115DB","AB115DD","AB115DE","AB115DF","AB115DG","AB115DH","AB115DL","AB115DN","AB115DP","AB115DQ","AB115DR","AB115DS","AB115DT","AB115DU","AB115DW","AB115DX","AB115DY","AB115DZ","AB115EE","AB115EF","AB115EG","AB115EJ","AB115EL","AB115EP","AB115EQ","AB115ER","AB115EU","AB115EW","AB115EX","AB115EY","AB115EZ","AB115FB","AB115FE","AB115FJ","AB115FN","AB115FP","AB115FT","AB115FU","AB115FW","AB115GD","AB115GE","AB115GJ","AB115HB","AB115HP","AB115HR","AB115HS","AB115HU","AB115HW","AB115HX","AB115JH","AB115LY","AB115NP","AB115NS","AB115NT","AB115NX","AB115PA","AB115PB","AB115PD","AB115PF","AB115PG","AB115PH","AB115PJ","AB115PL","AB115PN","AB115PP","AB115PQ","AB115PS","AB115PT","AB115PU","AB115PW","AB115PX","AB115PY","AB115PZ","AB115QA","AB115QD","AB115QE","AB115QF","AB115QH","AB115QJ","AB115QL","AB115QN","AB115QP","AB115QR","AB115QT","AB115QW","AB115QX","AB115RA","AB115RB","AB115RD","AB115RE","AB115RF","AB115RG","AB115RH","AB115RJ","AB115RL","AB115RN","AB115RP","AB115RU","AB115RW","AB115SS","AB115TJ","AB115YD","AB115YL","AB115YU","AB115ZH","AB116AA","AB116AR","AB116AW","AB116AY","AB116AZ","AB116BA","AB116BB","AB116BD","AB116BE","AB116BG","AB116BH","AB116BJ","AB116BN","AB116BP","AB116BQ","AB116BR","AB116BS","AB116BT","AB116BX","AB116DA","AB116DB","AB116DD","AB116DE","AB116DF","AB116DH","AB116DJ","AB116DL","AB116DN","AB116DP","AB116DQ","AB116DR","AB116DS","AB116DT","AB116DU","AB116DX","AB116DY","AB116DZ","AB116EA","AB116EB","AB116ED","AB116EE","AB116EF","AB116EG","AB116EH","AB116EJ","AB116EL","AB116EN","AB116EP","AB116EQ","AB116ER","AB116ES","AB116ET","AB116EU","AB116EW","AB116EX","AB116EY","AB116EZ","AB116FB","AB116FD","AB116FF","AB116FG","AB116FH","AB116FJ","AB116FL","AB116FN","AB116FP","AB116FR","AB116FS","AB116FW","AB116GN","AB116GQ","AB116GR","AB116GY","AB116HA","AB116HB","AB116HD","AB116HE","AB116HF","AB116HG","AB116HH","AB116HJ","AB116HL","AB116HN","AB116HP","AB116HQ","AB116HR","AB116HS","AB116HT","AB116HU","AB116HW","AB116HX","AB116HY","AB116HZ","AB116JA","AB116JB","AB116JD","AB116JE","AB116JF","AB116JG","AB116JH","AB116JJ","AB116JL","AB116JN","AB116JR","AB116JS","AB116JU","AB116JW","AB116JX","AB116JY","AB116JZ","AB116LA","AB116LD","AB116LE","AB116LG","AB116LJ","AB116LL","AB116LN","AB116LP","AB116LQ","AB116LR","AB116LS","AB116LT","AB116LU","AB116LW","AB116LX","AB116LZ","AB116NA","AB116NB","AB116ND","AB116NE","AB116NF","AB116NJ","AB116NL","AB116NN","AB116NP","AB116NQ","AB116NR","AB116NT","AB116NU","AB116NW","AB116NY","AB116NZ","AB116PE","AB116PH","AB116PJ","AB116QA","AB116QD","AB116QF","AB116RG","AB116RR","AB116RT","AB116SL","AB116SQ","AB116SR","AB116SS","AB116SY","AB116SZ","AB116TA","AB116TB","AB116TD","AB116TE","AB116TF","AB116TG","AB116TH","AB116TJ","AB116TL","AB116TN","AB116TP","AB116TQ","AB116TR","AB116TS","AB116TT","AB116TX","AB116TZ","AB116UA","AB116UB","AB116UD","AB116UJ","AB116UL","AB116UN","AB116UP","AB116UQ","AB116US","AB116UT","AB116UU","AB116UW","AB116UX","AB116UY","AB116UZ","AB116WF","AB116WH","AB116WT","AB116XA","AB116XB","AB116XD","AB116XE","AB116XF","AB116XG","AB116XH","AB116XJ","AB116XL","AB116XN","AB116XP","AB116XQ","AB116XR","AB116XS","AB116XT","AB116XU","AB116XW","AB116XX","AB116XY","AB116XZ","AB116YA","AB116YB","AB116YD","AB116YG","AB116YH","AB116YL","AB116YP","AB116YQ","AB116YU","AB116YW","AB116ZB","AB116ZF","AB117BH","AB117DF","AB117DG","AB117LG","AB117LH","AB117RQ","AB117RS","AB117RT","AB117RX","AB117RY","AB117RZ","AB117SA","AB117SB","AB117SD","AB117SE","AB117SF","AB117SG","AB117SH","AB117SJ","AB117SL","AB117SP","AB117SQ","AB117SR","AB117ST","AB117SW","AB117SX","AB117SY","AB117SZ","AB117TA","AB117TB","AB117TD","AB117TE","AB117TF","AB117TH","AB117TJ","AB117TU","AB117TW","AB117TY","AB117TZ","AB117UE","AB117UF","AB117UG","AB117UH","AB117UR","AB117US","AB117UU","AB117UW","AB117WA","AB117WB","AB117WD","AB117WE","AB117WF","AB117WG","AB117XH","AB117XU","AB117XY","AB117XZ","AB117YZ","AB118AA","AB118BJ","AB118BL","AB118BN","AB118BP","AB118BQ","AB118BR","AB118BS","AB118BT","AB118BU","AB118BW","AB118BX","AB118BY","AB118DA","AB118DB","AB118DD","AB118DE","AB118DG","AB118DH","AB118DJ","AB118DL","AB118DN","AB118DP","AB118DQ","AB118DR","AB118DS","AB118DT","AB118DU","AB118DX","AB118DY","AB118DZ","AB118EA","AB118EB","AB118ED","AB118EE","AB118EG","AB118EH","AB118EJ","AB118EL","AB118EN","AB118EP","AB118EQ","AB118ER","AB118ES","AB118ET","AB118EU","AB118EW","AB118EX","AB118EY","AB118FA","AB118FB","AB118FD","AB118FJ","AB118FL","AB118FN","AB118FP","AB118FQ","AB118FR","AB118FS","AB118FT","AB118FX","AB118GA","AB118HA","AB118HB","AB118HD","AB118HE","AB118HF","AB118HH","AB118HJ","AB118HL","AB118HN","AB118HP","AB118HR","AB118HS","AB118HT","AB118HU","AB118HW","AB118HX","AB118HY","AB118JA","AB118JB","AB118JR","AB118JU","AB118JW","AB118LG","AB118LH","AB118LL","AB118LN","AB118LQ","AB118QX","AB118RE","AB118RG","AB118RH","AB118RJ","AB118RL","AB118RN","AB118RP","AB118RQ","AB118RR","AB118RS","AB118RT","AB118RU","AB118RX","AB118RY","AB118RZ","AB118SA","AB118SB","AB118SD","AB118SE","AB118SF","AB118SH","AB118SJ","AB118SL","AB118SN","AB118SP","AB118SQ","AB118SR","AB118SS","AB118ST","AB118SU","AB118SW","AB118SX","AB118SY","AB118TA","AB118TB","AB118TD","AB118TE","AB118TF","AB118TH","AB118TJ","AB118TL","AB118TN","AB118TP","AB118TQ","AB118TR","AB118TS","AB118TT","AB118TU","AB118TW","AB118TX","AB118TY","AB118TZ","AB119AA","AB119AB","AB119AD","AB119AE","AB119AH","AB119AJ","AB119AL","AB119AN","AB119AP","AB119AQ","AB119AR","AB119AS","AB119AT","AB119AU","AB119AX","AB119AY","AB119BA","AB119BB","AB119BD","AB119BE","AB119BG","AB119BH","AB119DA","AB119DB","AB119DR","AB119DS","AB119DT","AB119DU","AB119FJ","AB119HJ","AB119JD","AB119JE","AB119JH","AB119JJ","AB119JN","AB119JP","AB119JQ","AB119JS","AB119JT","AB119JX","AB119JY","AB119JZ","AB119LA","AB119LB","AB119LD","AB119LE","AB119LF","AB119LP","AB119LS","AB119LT","AB119LU","AB119LX","AB119LY","AB119NA","AB119NB","AB119ND","AB119NE","AB119NF","AB119NH","AB119NJ","AB119NL","AB119NN","AB119NP","AB119NQ","AB119NR","AB119NS","AB119NT","AB119NU","AB119NW","AB119NX","AB119NY","AB119PA","AB119PB","AB119PE","AB119PJ","AB119PL","AB119PN","AB119PP","AB119PR","AB119PS","AB119QA","AB119QB","AB119QD","AB119QE","AB119QF","AB119QG","AB119QH"]
$('.full').on('keyup' , '.suggest-bandtypeinput', function(){
	var currenttext = $('.suggest-bandtypeinput').val();
	currenttext = currenttext.toLowerCase();
$('.full .bandtypes').empty();
for(var i = 0 ; i < alltypes.length; i++){
    if(alltypes[i].match(currenttext )) {
        $('.full .bandtypes').append($("<li><span class='suggest-name'>" + alltypes[i] + "</span></li>"));
    $('.full .bandtypes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
$('.full .bandtypes').show();
});
 $('.userinfocontent').on('keyup','.suggest-prompt', function(){
 	var currenttext = ""; currenttext = $('.suggest-prompt').val();
 	$('.userinfocontent .zonecodes').empty();
// Cache the search term
$search = $(this).val();
$search = new RegExp($search.replace(/[^0-9a-z_]/i), 'i');
// Search regular expression
	// Clear the ul
if( currenttext.length <= 2){
for(var i = 0 ; i < regions.length; i++){
    if(regions[i].name.match($search)){
        $('.userinfocontent .zonecodes').append($("<li><span class='suggest-name'>" + regions[i].name + "</span><span class='suggest-description'>" + regions[i].description + "</span></li>"));
    $('.userinfocontent .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('AB')){
for(var i = 0 ; i < regionsnumbersab.length; i++){
    if(regionsnumbersab[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersab[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('AL')){
for(var i = 0 ; i < regionsnumbersal.length; i++){
    if(regionsnumbersal[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersal[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match(new RegExp('B|^\\d+$'))){
for(var i = 0 ; i < regionsnumbersb.length; i++){
    if(regionsnumbersb[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersb[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('BB')){
for(var i = 0 ; i < regionsnumbersbb.length; i++){
    if(regionsnumbersbb[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersbb[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('BD')){
for(var i = 0 ; i < regionsnumbersbd.length; i++){
    if(regionsnumbersbd[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersbd[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('BH')){
for(var i = 0 ; i < regionsnumbersbh.length; i++){
    if(regionsnumbersbh[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersbh[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('BL')){
for(var i = 0 ; i < regionsnumbersbl.length; i++){
    if(regionsnumbersbl[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersbl[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('BN')){
for(var i = 0 ; i < regionsnumbersbn.length; i++){
    if(regionsnumbersbn[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersbn[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('BR')){
for(var i = 0 ; i < regionsnumbersbr.length; i++){
    if(regionsnumbersbr[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersbr[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('BS')){
for(var i = 0 ; i < regionsnumbersbs.length; i++){
    if(regionsnumbersbs[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersbs[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('BT')){
for(var i = 0 ; i < regionsnumbersbt.length; i++){
    if(regionsnumbersbt[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersbt[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('CB')){
for(var i = 0 ; i < regionsnumberscb.length; i++){
    if(regionsnumberscb[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumberscb[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length >= 2 && currenttext.length <= 4 && currenttext.match('CA')){
for(var i = 0 ; i < regionsnumbersca.length; i++){
    if(regionsnumbersca[i].match($search)){
        $('.suggest-holder .zonecodes').append($("<li><span class='suggest-name'>" + regionsnumbersca[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length <= 7 && currenttext.length >= 4 && currenttext.match('AB10') ){
for(var i = 0 ; i < regionsnumbersab10.length; i++){
    if(regionsnumbersab10[i].match($search)){
        $('.suggest-holder ul').append($("<li><span class='suggest-name'>" + regionsnumbersab10[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder ul li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
if( currenttext.length <= 7 && currenttext.length >= 4 && currenttext.match('AB11') ){
for(var i = 0 ; i < regionsnumbersab11.length; i++){
    if(regionsnumbersab11[i].match($search)){
        $('.suggest-holder ul').append($("<li><span class='suggest-name'>" + regionsnumbersab11[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.suggest-holder ul li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}
/*
if( $search.length > 2 && $search.length <= 4 ){
	$('.userinfocontent .suggest-holder ul').empty();
for(var i = 0 ; i < regionsnumbers.length; i++){
    if(regionsnumbers[i].match($search)){
        $('.userinfocontent .suggest-holder ul').append($("<li><span class='suggest-name'>" + regionsnumbers[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.userinfocontent .suggest-holder ul li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}*/

/*if( search.length >= 2 && search.length <= 4 ){
for(var i = 0 ; i < regionsnumbers.length; i++){
    if(regionsnumbers[i].match(search)){
        $('.userinfocontent .suggest-holder ul').append($("<li><span class='suggest-name'>" + regions[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
        $('.userinfocontent .suggest-holder ul').append($("<li><span class='suggest-name'>" + regionsnumbers[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
        $('.userinfocontent .suggest-holder ul').append($("<li><span class='suggest-name'>" + regions[i] + "</span>"));//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.userinfocontent .suggest-holder ul li span').eq(0).css({'text-decoration': 'underline'});
	
	}
}
}*/
$('.userinfocontent .suggest-holder ul').show();
});
$(".userinfocontent").on("click", ".zonecodes > li", function(){ 
	var selected = $(this).find(".suggest-name").text();
  $(".suggest-prompt").val(selected);  
	$(".zonecodes").hide();

});
$(".userinfocontent").on("click", ".address > li", function(){ 
    $('.inputaddress').val($(this).text());  
	$(".address").hide();

});
$(".full").on("click", ".bandtypes > li", function(){ 
    $('.suggest-bandtypeinput').val($(this).text());  
	$(".bandtypes").hide();

});
/*$('.full').on('change', '.upload', function (evt) {
		evt.preventDefault();
	alert("evt.target");
	/*alert(e.target.result);

	var myaudio = $('<audio id="myaudio"></audio>');
	myaudio.src= audio.attr("src",e.target.result);
    $("#myaudio").on("canplaythrough", function(evt){
	var seconds = evt.currentTarget.duration;
	alert(seconds);
	});*/
/*});*/
	/*end postecode dynamic fill*/
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
	//close popup song upload
	$("#popupsongclose").click(function() {
		if ($("#errsongname").html() !== "") {
			$("#addsongbg").fadeOut("slow");
			$("#popupsong").removeClass('zigmaIn').fadeOut("slow");
			$("#errsongname").html("");
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
		//$('.reprequest').show();/*
		//$('.reprequest').attr('disabled', 'disabled').off('click');
		//$('.reprequest').attr("disabled", true);

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