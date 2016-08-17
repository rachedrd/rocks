Router.configure({
layoutTemplate: 'layout',
loadingTemplate: 'loading',
notFoundTemplate: 'notFound'
});
/*Router.route('/', function () {
  this.render('Home', {
    data: function () { return Items.findOne({_id: this.params._id}); }
  });
});*/
Router.route('/', {name :"homeIndex",
					data: function(){
						           		return { message : "GIGGORILLA section" }
						            }/*,
						            waitOn: function()
						            {
						            	return [
										IRLibLoader.load('/js/modernizr.custom.63321.js'),
						            	IRLibLoader.load('/js/jquery.stapel.js'),
						            	IRLibLoader.load('/js/jquery.prettyPhoto.js'),
						            	IRLibLoader.load('/js/jquery.flexslider-min.js'),
						            	IRLibLoader.load('/js/jquery.nicescroll.min.js'),
						            	IRLibLoader.load('/js/twitter/jquery.tweet.js'),
						            	IRLibLoader.load('/js/theme20.js'),
						            	IRLibLoader.load('/js/zwindows.js')]
						            }*/

			});
Router.route('/about', {name :"homeAbout" /*, waitOn: function()
						            {
						            	return [IRLibLoader.load('/js/zwindows.js')]
						            }*/});
Router.route('/rest password', {name :"resetPassword"  /*, waitOn: function()
						            {
						            	return [IRLibLoader.load('/js/zwindows.js')]
						            }*/ });
Router.route('/contact', {name :"homeContact" /*, waitOn: function()
						            {
						            	return [IRLibLoader.load('/js/zwindows.js')]
						            }*/});
//routing for artists will be completed in next sprint 
Router.route('/artists', {name :"homeArtists" , waitOn: function()
						            {
						            	return [
										IRLibLoader.load('/js/modernizr.custom.63321.js'),
						            	IRLibLoader.load('/js/jquery.stapel.js'),
						            	IRLibLoader.load('/js/jquery.prettyPhoto.js'),
						            	IRLibLoader.load('/js/jquery.flexslider-min.js'),
						            	IRLibLoader.load('/js/jquery.nicescroll.min.js'),
						            	IRLibLoader.load('/js/twitter/jquery.tweet.js'),
						            	IRLibLoader.load('/js/theme20.js'),
						            	IRLibLoader.load('/js/zwindows.js')]
						            }});
Router.route('/bands', {name :"homeBands" , waitOn: function()
						            {
						            	return [
										IRLibLoader.load('/js/modernizr.custom.63321.js'),
						            	IRLibLoader.load('/js/jquery.stapel.js'),
						            	IRLibLoader.load('/js/jquery.prettyPhoto.js'),
						            	IRLibLoader.load('/js/jquery.flexslider-min.js'),
						            	IRLibLoader.load('/js/jquery.nicescroll.min.js'),
						            	IRLibLoader.load('/js/twitter/jquery.tweet.js'),
						            	IRLibLoader.load('/js/theme20.js'),
						            	IRLibLoader.load('/js/zwindows.js')]
						            } });

Router.route('/myprofile', {name :"homeProfile",  onBeforeAction: function(){
	           /*  IRLibLoader.load('/js/zwindows.js', 
	        	{ success : function(){console.log('success') } } ,
	            { error : function(){console.log('error loading ')  }  } );*/
 	if(! Meteor.userId()) 
 		{
 			Router.go('/');
 		}
 		else{
 			this.next();
 			return [
										IRLibLoader.load('/js/modernizr.custom.63321.js'),
						            	IRLibLoader.load('/js/jquery.stapel.js'),
						            	IRLibLoader.load('/js/jquery.prettyPhoto.js'),
						            	IRLibLoader.load('/js/jquery.flexslider-min.js'),
						            	IRLibLoader.load('/js/jquery.nicescroll.min.js'),
						            	IRLibLoader.load('/js/twitter/jquery.tweet.js'),
						            	IRLibLoader.load('/js/theme20.js'),
						            	IRLibLoader.load('/js/zwindows.js')]
 		}
 }
});
Router.route('/profile::_id', {name :"seeprofile",
									 data: function(){
	                                  console.log('id : ' + this.params._id); 
	                                  var id = this.params._id;
	                                //return { message : this.params._id};
									// userId = this.params.id;
									var user =  Users.findOne({"_id":this.params._id});
									console.log(user);
									 return user;
			            }});
/*Router.route('/Artists/:id', {name :"seeprofile",  waitOn: function()
						            {
						            	/*return [
										IRLibLoader.load('/js/modernizr.custom.63321.js'),
						            	IRLibLoader.load('/js/jquery.stapel.js'),
						            	IRLibLoader.load('/js/jquery.prettyPhoto.js'),
						            	IRLibLoader.load('/js/jquery.flexslider-min.js'),
						            	IRLibLoader.load('/js/jquery.nicescroll.min.js'),
						            	IRLibLoader.load('/js/twitter/jquery.tweet.js'),
						            	IRLibLoader.load('/js/theme20.js'),
						            	IRLibLoader.load('/js/zwindows.js')]*//*
						            } , data: function(){
									userId = this.params.id;
									return Users.findOne({"_id":this.params.id});
			            }
			        }
			);*/
Router.route('/products/:sku', { 
					name :"productsShow",  /*waitOn: function()
						            {
						            	return [IRLibLoader.load('/js/zwindows.js')];
						            },*/
					data: function(){
									return Products.findOne({sku: this.params.sku});

						            }
			});