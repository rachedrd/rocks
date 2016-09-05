jQuery(document).ready(function ($) {
 var albumname = "";
 var albumsize = 0;
 var fileCounter = 0;
 var newalbm = 0;
 var rmImgIndx = -1; 
 var closeIt = false;
 function getalbumName ()
		{
			return albumname;
		}
if ( $('.def-block ul.tp-grid').children().length === 0 )
			$('.addAlbum').show();
		
 function calculatealbumsize(id)
 {
 	albumsize = 0;
 	$grid.children().each(function() {
 		if($(this).attr('id') === id )
           albumsize ++;
 	});
 	return albumsize;
 }
 if( $(".userType").attr('value') === "artist" || $(".userType").attr('value') === "band" )
 {
 $('.representsArtist').show();
 }
 else
 {
 $('.representsArtist').hide();
 }

 
      	$('.def-block').on('mouseenter', 'ul.tp-grid li ', function()
		{
			albumname = $(this).attr('id');
			calculatealbumsize(albumname);
			getalbumName();
		//	alert(getalbumName());
			

			if(showDelte === 1)
			{
			$('.removeAlbum').css('visibility', 'hidden');	
			$(this).find('> div.removeDiv').show();
			}
			if(showDelte === 0)
			{
			$('.removeAlbum').show();
			$('.removeAlbum').css('visibility', 'visible');
			}
		}).on('mouseleave', 'ul.tp-grid li', function () {

			$(".removeDiv").hide();
			if(showDelte === 0)
			{
			$('.removeAlbum').hide();
			$('.removeAlbum').css('visibility', 'hidden');
			}
});
		$('.def-block').on('keydown'

      , 'ul.tp-grid li' , function(e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        albumname = $(this).attr('id');
        calculatealbumsize(albumname);
			
    }
});
	/*end of standard cropper*/
	var horizontalDifference = 0; 
 	var VerticalDifference = 0; 
    /*$('.def-block').on('click',' .rvc', function(evt){

    	alert('rmImgIndx : ');
    	//evt.preventDefault();
    	evt.stopPropagation();
    	alert('rmImgIndx : ' + rmImgIndx);
    	var li = $grid.find('li');
			liLength = parseInt($grid.children().length) - 1;
            alert('liLength : ' + liLength);
			//liLength = albumsize;
 			liWidth = li.outerWidth();
 			liHeight = li.outerHeight();
 			$grid.children().each(function() {
        		if (liLength > 2 ) 
        		{
        			//alert('firstone position left' + $grid.find('li').eq(1).position().left);
        			//alert('firstone width ' + $grid.find('li').eq(0).outerHeight());

        			//alert('secondone position left' + $grid.find('li').eq(2).position().left);

        			horizontalDifference = $grid.find('li').eq(1).position().left - ( $grid.find('li').eq(0).position().left + $grid.find('li').eq(0).outerWidth());
        			//alert(horizontalDifference);
        		}

        		if (liLength > 5 ) 
        		{
        			VerticalDifference = $grid.find('li').eq(5).position().top - ( $grid.find('li').eq(0).position().top + $grid.find('li').eq(0).outerHeight());
        			//alert(VerticalDifference);
        		}
        		if(liLength <= 3 &&  liLength > 1  && $(this).index() > rmImgIndx ) 
        		{
        				$(this).animate({"left": "-=" + (liWidth + horizontalDifference) + "px" }, "slow");
        				
        		}
        		if(liLength > 3) {
        		 if($grid.find('li').eq(3).position().left > 800){
        			if($(this).index() > rmImgIndx) {
        				if($(this).index()% 4 !== 0 ) {	
        					$(this).animate({"left": "-=" + (liWidth + horizontalDifference) + "px" }, "slow");}
        				else
        				{  
        					if(liLength === 5)
        					{
        					$(this).animate({"left": "+=" + ((liWidth + horizontalDifference )* 3)   + "px",  "top": "0" }, "slow");
        					}
        					else{
        						$(this).animate({"left": "+=" + ((liWidth + horizontalDifference )* 3)   + "px", "top": "-=" + (liHeight + VerticalDifference ) + "px"}, "slow");
        		                    
        					}
        					
        				}
        			}
        		}
        		if($grid.find('li').eq(3).position().left < 20){
        			if($(this).index() > rmImgIndx){
        				if($(this).index()% 3 !== 0 ){	
        					$(this).animate({"left": "-=" + (liWidth + 24) + "px" }, "slow");}
        				else
        				{  
        					$(this).animate({"left": "+=" +  ((liWidth * 2) +  43) + "px", "top": "-=" + (liHeight + 29 )  + "px"}, "slow");
        				}
        			}
        		}
        		} 			
        	});
        	// alert(' gris width ' + $grid.height());
        	//alert( 'place : '+ $grid.find('> li:nth-last-child(1)').position().top );
        	//alert( 'suggested place : ' + ($grid.find('> li:nth-last-child(1)').position().top + liHeight) );    
 			//$('.fileUpload').css('margin-top',  ($grid.find('> li:nth-last-child(1)').position().top - ( 2* liHeight) - VerticalDifference ));
			if($grid.children().length % 4 === 0 )
			$('.fileUpload').css('margin-top',  parseInt( $('.fileUpload').css('margin-top') )- liHeight - VerticalDifference );
			spanLength = $(".tp-title").find('span').eq(1).text();
			$(".tp-title").find('span').eq(1).text(parseInt(spanLength) -1 );
			
			alert('before deleting : ' + $grid.children().length);
			$grid.find('li').eq(rmImgIndx -1).remove();
			//$grid.find('li').eq(rmImgIndx - 1).remove();
			//$grid.find('li').eq(rmImgIndx + 1).remove();
			alert(' after deleting ...' +$grid.children().length);
			$('.rnm').trigger('click');
			$('#removeImgCnfrm').hide();
		$('#removeImgbg').show();
				
         
    });   */ 	
	$('.def-block').on('click','.removeImage', function(e){
		//e.stopPropagation();
		e.preventDefault();
	//	alert('capturing item');
	//	$('#removeImgCnfrm').show();
	//	$('#removeImgbg').show();
		var $li = $(this).closest('li');
		    rmImgIndx = $li.parent().children().index($li);
			if($(':animated').length) {
              return false;             }  
			e.preventDefault();
			var $li = $(this).closest('li');
		    var myindex = $li.parent().children().index($li);
		  //  alert('myindex' + myindex); 
			var li = $grid.find('li');
			liLength = parseInt($grid.children().length) - 1;
			//liLength = albumsize;
 			liWidth = $li.outerWidth();
 			liHeight = $li.outerHeight();
 			var i = parseInt(myindex);
 			$grid.children().each(function() {
        		if (liLength > 2 ) 
        		{
        			//alert('firstone position left' + $grid.find('li').eq(1).position().left);
        			//alert('firstone width ' + $grid.find('li').eq(0).outerHeight());

        			//alert('secondone position left' + $grid.find('li').eq(2).position().left);

        			horizontalDifference = $grid.find('li').eq(1).position().left - ( $grid.find('li').eq(0).position().left + $grid.find('li').eq(0).outerWidth());
        			//alert(horizontalDifference);
        		}

        		if (liLength > 5 ) 
        		{
        			VerticalDifference = $grid.find('li').eq(5).position().top - ( $grid.find('li').eq(0).position().top + $grid.find('li').eq(0).outerHeight());
        			//alert(VerticalDifference);
        		}
        		if(liLength <= 3 &&  liLength > 1  && $(this).index() > myindex ) 
        		{
        				$(this).animate({"left": "-=" + (liWidth + horizontalDifference) + "px" }, "slow");
        				
        		}
        		if(liLength > 3) {
        		 if($grid.find('li').eq(3).position().left > 800){
        			if($(this).index() > myindex) {
        				if($(this).index()% 4 !== 0 ) {	
        					$(this).animate({"left": "-=" + (liWidth + horizontalDifference) + "px" }, "slow");}
        				else
        				{  
        					if(liLength === 5)
        					{
        					$(this).animate({"left": "+=" + ((liWidth + horizontalDifference )* 3)   + "px",  "top": "0" }, "slow");
        					}
        					else{
        						$(this).animate({"left": "+=" + ((liWidth + horizontalDifference )* 3)   + "px", "top": "-=" + (liHeight + VerticalDifference ) + "px"}, "slow");
        		                    
        					}
        					
        				}
        			}
        		}
        		if($grid.find('li').eq(3).position().left < 20){
        			if($(this).index() > myindex){
        				if($(this).index()% 3 !== 0 ){	
        					$(this).animate({"left": "-=" + (liWidth + 24) + "px" }, "slow");}
        				else
        				{  
        					$(this).animate({"left": "+=" +  ((liWidth * 2) +  43) + "px", "top": "-=" + (liHeight + 29 )  + "px"}, "slow");
        				}
        			}
        		}
        		} 			
        	});
        	// alert(' gris width ' + $grid.height());
        	//alert( 'place : '+ $grid.find('> li:nth-last-child(1)').position().top );
        	//alert( 'suggested place : ' + ($grid.find('> li:nth-last-child(1)').position().top + liHeight) );    
 			//$('.fileUpload').css('margin-top',  ($grid.find('> li:nth-last-child(1)').position().top - ( 2* liHeight) - VerticalDifference ));
			if($grid.children().length % 4 === 0 )
			$('.fileUpload').css('margin-top',  parseInt( $('.fileUpload').css('margin-top') )- liHeight - VerticalDifference );
			spanLength = $(".tp-title").find('span').eq(1).text();
			$(".tp-title").find('span').eq(1).text(parseInt(spanLength) -1 );
			//$('.rvc').trigger('click');
			$grid.find('li').eq(myindex).remove();
			//$grid.find('li').eq(myindex - 1).remove();
		});       
$('.def-block').on('click' , '#createAlbum', function (evnt) {
	$("#validAlmName").css("color","red");
            $('#errorMsgAlb').html('');
            $("#validAlmName").removeClass('glyphicon-asterisk');
            $("#validAlmName").removeClass('glyphicon-remove');
            $("#validAlmName").removeClass('glyphicon-ok');


var existingAlbum = 0;
	evnt.stopPropagation();
	 var albumname = $("#album_name").val();
	/* $grid.children().each(function() {
 		if($(this).attr('id') === albumname )
 		{
 		existingAlbum ++;
 		}
           
 	});*/
	  if((albumname === '') || (albumname === 'album name') || (albumname === null) || (albumname === undefined) )
          {
          	$("#validAlmName").css("color","red");
            $('#errorMsgAlb').html('album name empty');
            $("#validAlmName").addClass('glyphicon-asterisk');
          }
          /*if( existingAlbum >  0 )
          {
            $("#validAlmName").css("color","red");
            $('#errorMsgAlb').html('album already exists');
            $("#validAlmName").addClass('glyphicon-remove');
          }*/
          else
          {
          	$("#validAlmName").addClass('glyphicon-ok');
            $("#validAlmName").css("color","green");

          }

	message = ''+$("#errorMsgAlb").html() + '';
	
	if(message === '')
	{
	$("#new_al_bg").removeClass('zigmaIn').hide();
	$("#popupnewalbbum").removeClass('zigmaIn').hide();
	newalbm = 1 ;
   $('.upload').trigger('click');
   alert('trigger click ...')
	}
  });
if ( parseInt($('.notification-count').attr('value')) > 0 )
{
 $('.notification-count').show();
} 
else 
{
 $('.notification-count').hide();
}
$('.fb-profile').on('click' , '.notificationsicon', function() {
$(".profile").toggle();
});
$('.fb-profile').on('click' , '.notification-count', function() {
$(".profile").toggle();
});

$('.def-block').on('click' , '.addAlbum', function() {
		//Aligning our box in the middle
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $("#popupnewalbbum").height();
		var popupWidth = $("#popupnewalbbum").width();
		// Centering
		$("#popupnewalbbum").css({
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});
		// Aligning bg
		$("#new_al_bg").css({"height": windowHeight});
			$("#new_al_bg").css({"opacity": "0.7"});
			$("#new_al_bg").fadeIn("slow");
			$("#new_al_bg").addClass('zigmaIn').fadeIn("slow");
			$("#popupnewalbbum").addClass('zigmaIn').fadeIn("slow");
	});
		$(".fileUpload").on('change', '.upload', function (evt) {
      alert('albumname  :  ');
			 //alert('albumname  :  ' + albumname);
          evt.preventDefault();
    	evt.stopPropagation();
			liLength = parseInt($grid.children().length );
			
			//alert(liLength);
			//alert('albumname ');
			if (liLength > 2 ) 
        		{
        			//alert('firstone position left' + $grid.find('li').eq(1).position().left);
        			//alert('firstone width ' + $grid.find('li').eq(0).outerHeight());

        			//alert('secondone position left' + $grid.find('li').eq(2).position().left);

        			horizontalDifference = $grid.find('li').eq(1).position().left - ( $grid.find('li').eq(0).position().left + $grid.find('li').eq(0).outerWidth());
        			//alert(horizontalDifference);
        		}

        		if (liLength > 5 ) 
        		{
        			VerticalDifference = $grid.find('li').eq(5).position().top - ( $grid.find('li').eq(0).position().top + $grid.find('li').eq(0).outerHeight());
        			//alert(VerticalDifference);
        		}
			//alert('albumname ' + albumname);
			liLength = parseInt($grid.children().length );
			var $li = $('.def-block ul.tp-grid').find(' >li:nth-last-child(1)');
			var myindex = $li.parent().children().index($li);
			//liLength = albumsize;
 			liWidth = $li.outerWidth();
 			liHeight = $li.outerHeight();
 			//$('.fileUpload').css('margin-top', $grid.find('> li:nth-last-child(1)').position().top )
 			var i = parseInt(myindex);
 			var foldername = $("#album_name").val();
 		//	alert( 'getalbumName : '+ getalbumName());
 			if(foldername === '' || foldername === undefined)
 				foldername = albumname;
 			//alert(foldername);
 lastOne = $('<li data-pile="'+foldername+'" class="grid_3 lastLi" id="'+foldername+'"><div class="removeDiv"><span class="removeImage">X</span></div><a href="../../images/assets/gallery/1.jpg" rel="prettyPhoto['+foldername+']"><img src="../../images/assets/gallery/1.jpg"  alt="'+document.getElementById('uploadFile').files[0].name+'" /></a></li>');
    var reader = new FileReader();
     var imgId = $("#image").attr("id");
var imgObj = document.getElementById(imgId);
var canvasContext = $("#myCanvas")[0].getContext('2d');
    reader.onload = function (e) {
    	e.preventDefault();
    	e.stopPropagation();
         // lastOne.find('> a img').attr("src",e.target.result);
          $("#image").attr("src",e.target.result);
          var img = new Image();
img.onload = function() {
canvasContext.drawImage(imgObj, 0, 0, $('#image').get(0).naturalWidth, 
  $('#image').get(0).naturalHeight, 0 , 0 , 670, 525 );
$("#rac").attr("src", document.getElementById("myCanvas").toDataURL("image/jpeg"));
lastOne.find('> a img').attr("src", $("#rac").attr("src"));
$( ".uploading" ).trigger( "click" );
alert('trigger click ...');
   }
img.src = $('#image').attr('src');
          lastOne.find('> a').attr("href",e.target.result);
          if(liLength < 4) 
          {
          	if(liLength === 0)
          	{
          		lastOne.css({top: 0 , left: 0});
        	  
          	}
          	else
          	{ 
          		lastOne.css({top: 0, left: $grid.find('> li:nth-last-child(1)').position().left + liWidth + 20});
          		
          		}				
          }
          if(liLength >= 4){          		
          if($grid.find('li').eq(3).position().left > 800){
        			if($grid.find(' >li:nth-last-child(1)').position().left < 800 ) 
        			{	
        				lastOne.css({top: $grid.find('> li:nth-last-child(1)').position().top, left: $grid.find('> li:nth-last-child(1)').position().left + liWidth + 20});
         			}
        			else
        			{  
        				lastOne.css({top: $grid.find('> li:nth-last-child(1)').position().top + liHeight + 30, left: 0 });
         			}
        			                                          }
          if($grid.find('li').eq(3).position().left < 20){
        			if($grid.find(' >li:nth-last-child(1)').position().left < 300 ) 
        			{	
        				lastOne.css({top: $grid.find('> li:nth-last-child(1)').position().top, left: $grid.find('> li:nth-last-child(1)').position().left + liWidth + 30});
         			}
        			else
        			{  
        				lastOne.css({top: $grid.find('> li:nth-last-child(1)').position().top + liHeight + 30, left: 0 });
         			}
        			        		                         }
        			        }
                
        	   $grid.append(lastOne); 
        	   $('.addAlbum').hide();
			
        	  	if($grid.children().length % 4 === 1 )
        		{
        		//$('.fileUpload').css('margin-top',  parseInt( $('.fileUpload').css('margin-top') ) + liHeight + VerticalDifference );
        	$('.fileUpload').css('margin-top',  parseInt( $('.fileUpload').css('margin-top') ) +  liHeight + VerticalDifference );
			    }
        	     //$grid.find('> li:nth-last-child(1)').css({"visibility":"visible"});
              //  galleryItem = $('<li class=""><a href="#"><img src="https://giggorrilla.storage.googleapis.com/rachednemr/germanyTour/10.jpg" alt="" width="50"></a></li>');
        	  //  galleryItem.find('> a img').attr("src",e.target.result);
        	    //$('div.nicescroll-rails').find('> div ul li:nth-last-child(1)').append(galleryItem);
         	    /*$grid.children().each(function() {
        		$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
	
        		});*/
      // $('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').show();
	    
    };        	    
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
    var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $("#process").height();
		var popupWidth = $("#process").width();
		// Centering
		$("#process").css({
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});
    $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
    spanLength = $(".tp-title").find('span').eq(1).text();
                $(".tp-title").find('span').eq(1).text(parseInt(spanLength) + 1 );             
      function closet(){
  if( closeIt === true ){	
  //alert('closing ...');    
 // setTimeout(function() { 
  	//$('#close').trigger('click');
  	//}, 1000);
}
    }
    function incriment(callback)
    {
     if(newalbm === 1)
     {
      	closeIt = true;
      callback();
   newalbm = 0;
  }
    }
    incriment(
    	function() {  closet(); }
    	);   	
});
	if ($("#tp-grid")[0]) {
		var $grid = $( '#tp-grid' ),
			$name = $( '#name' ),
			$close = $( '#close' ),
			$loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
		stapel = $grid.stapel({
			randomAngle : false,
			delay : 100,
			gutter : 0,
			pileAngles : 0,
			onLoad : function() {
				$('.removeAlbum').css('visibility', 'hidden');
				$loader.remove();
			},
			onBeforeOpen : function( pileName ) {
				$name.html( pileName );
				$('.removeAlbum').hide();
				$('.removeAlbum').css('visibility', 'hidden');
			},
			onAfterOpen : function( pileName ) {
				showDelte = 1;
				$('.addAlbum').hide();
				$('.fileUpload').show();
				$('.removeAlbum').css('visibility', 'hidden');
				$('.removeAlbum').hide();

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
		$('.def-block').on('click' , '.tp-grid > li', function () {

	//alert("#pp_full_res.html()");
		});
		$close.on( 'click', function() {/*
			$grid.children().each(function() {
				if($grid.children().length > 1)
				{
                   if ( $(this).hasClass("lastLi") ) {
                     $grid.find('li').eq($(this).index()).remove();
                   }
               }
               });*/

			if ( $('.def-block ul.tp-grid').children().length === 0 )
			$('.addAlbum').show();
			$('.fileUpload').css('margin-top', 0 );
  var j = 0 ;
/*setTimeout(function(){},1000);
  $grid.children().each(function() {
        if ( $(this).hasClass("lastLi") ) {
        	j++ ;
          $grid.find('li').eq($(this).index()).remove();
        }
      });*/
			$grid.find('> li:nth-last-child(1)').css('z-index', 10000);
			//$('.addAlbum').show();
			$('.fileUpload').hide();
			$(this).hide();
			/*$('.def-block').on('mouseenter', 'ul.tp-grid li a img', function()
		{
		}).on('mouseleave', 'ul.tp-grid li a img', function () {
});*/
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
				$loader.remove();
			},
			onBeforeOpen : function( pileName ) {
				$name.html( pileName );
			},
			onAfterOpen : function( pileName ) {
				$('.fileUpload').show();
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
	}
	// prettyPhoto
	if ($("a[rel^='prettyPhoto']")[0]) {
		$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
	}	
});

	
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