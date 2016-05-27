jQuery(document).ready(function ($) {
	$('.def-block').on('click','.removeImage', function(e){
			if($(':animated').length) {
              return false;             }  
			e.preventDefault();
		    var $li = $(this).closest('li');
			var myindex = $li.parent().children().index($li);
			var li = $grid.find('li');
			liLength = parseInt($grid.children().length );
 			liWidth = $li.outerWidth();
 			liHeight = $li.outerHeight();
 			var i = parseInt(myindex);
        	$grid.children().each(function() {
        		if(liLength <= 3 &&  liLength > 1  && $(this).index() > myindex ) 
        		{
        				$(this).animate({"left": "-=" + (liWidth + 17) + "px" }, "slow");
        				
        		}
        		if(liLength > 3) {
        		 if($grid.find('li').eq(3).position().left > 800){
        			if($(this).index() > myindex) {
        				if($(this).index()% 4 !== 0 ) {	
        					$(this).animate({"left": "-=" + (liWidth + 17) + "px" }, "slow");}
        				else
        				{  
        					$(this).animate({"left": "+=" + ((liWidth + 17 )* 3)   + "px", "top": "-=" + (liHeight +29 ) + "px"}, "slow");
        		
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
        	$grid.find('li').eq(myindex).remove();
			spanLength = $(".tp-title").find('span').eq(1).text();
			$(".tp-title").find('span').eq(1).text(parseInt(spanLength) -1 );
		});
		$(".fileUpload").on('change', '.upload', function () {
			var $li = $('.def-block ul.tp-grid').find(' >li:nth-last-child(1)');
			var myindex = $li.parent().children().index($li);
			liLength = parseInt($grid.children().length );
 			liWidth = $li.outerWidth();
 			liHeight = $li.outerHeight();
 			var i = parseInt(myindex);
 lastOne = $('<li data-pile="Billie Jean" class="grid_3 lastLi"><div class="removeDiv"><span class="removeImage">X</span></div><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>');
    var reader = new FileReader();
    reader.onload = function (e) {
    	e.preventDefault();
          lastOne.find('> a img').attr("src",e.target.result);
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
        	    galleryItem = $('<li class=""><a href="#"><img src="https://giggorrilla.storage.googleapis.com/rachednemr/germanyTour/10.jpg" alt="" width="50"></a></li>');
        	    galleryItem.find('> a img').attr("src",e.target.result);
        	    //$('div.nicescroll-rails').find('> div ul li:nth-last-child(1)').append(galleryItem);
         	    $grid.children().each(function() {
        		$("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
	
        		});
       $('.def-block ul.tp-grid').find(' >li:nth-last-child(1)').show();
	    
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
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
		$close.on( 'click', function() {

				$grid.children().each(function() {
        			$(this).removeClass('lastLi');				
        	});
				$grid.find('> li:nth-last-child(1)').css('z-index', 10000);
			$('.addAlbum').show();
			$('.fileUpload').hide();
			$(this).hide();
			$('.def-block').on('mouseenter', 'ul.tp-grid li a img', function()
		{
		}).on('mouseleave', 'ul.tp-grid li a img', function () {
});
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