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
Router.route('/artists', {name :"homeArtists" /*, waitOn: function()
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
						            }*/});
Router.route('/blogs', {name :"homeBlogs" });
Router.route('/bands', {name :"homeBands" /*, waitOn: function()
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
						            }*/ });

Router.route('/myprofile', {name :"homeProfile",  onBeforeAction: function(){
	           /*  IRLibLoader.load('/js/zwindows.js', 
	        	{ success : function(){console.log('success') } } ,
	            { error : function(){console.log('error loading ')  }  } );*/
 	/*if(! Meteor.userId()) 
 		{
 			Router.go('/');
 		}
 		else{
 	if( Meteor.user().profile.Status === "active" )
 			{
             this.next();
 			}
 			else
 			{
 				Router.go('/');
 			}
 			console.log('my Status is ' + Meteor.user().profile.Status);
 			
 }*/
 if(! Meteor.userId()) 
 		{
 			Router.go('/');
 		}
 		if(Meteor.user() !== undefined)
 		{
             if(Meteor.user() &&  Meteor.user().profile )
             {
    		if(Meteor.user().profile.Status === "active")
 			{
 				this.next();
 			}
 			else
 			{
 				Router.go('/');
 			}
            }
 		}
}
});
Router.route('/monitorusers', {name :"monitorusers",  onBeforeAction: function(){
	this.next();
	var admin =  Users.findOne({"_id":Meteor.userId()});
									console.log(admin);

 	if(! Meteor.userId()) 
 		{
 			Router.go('/');
 		}
 		if(Meteor.user() !== undefined)
 		{
             if(Meteor.user() &&  Meteor.user().profile )
             {
    		if(Meteor.user().profile.type === "admin")
 			{
 				this.render();
 			}
 			else
 			{
 				Router.go('/');
 			}
            }
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
Router.route('/manageProfile::_id', {name :"manageProfile",
									 data: function(){
	                                  console.log('id : ' + this.params._id); 
	                                  var id = this.params._id;
	                                //return { message : this.params._id};
									// userId = this.params.id;
									var user =  Users.findOne({"_id":this.params._id});
									if(user && user.profile )
									{
									//{
									console.log(user.username);
									 return user;
									}
									//}
			            }});

Router.route('/blog::_id', {name :"singelblog",
									 data: function(){
	                                  console.log('id : ' + this.params._id); 
	                                  var id = this.params._id;
	                                //return { message : this.params._id};
									// userId = this.params.id;
									var blog =  blogs.findOne({"_id":this.params._id});
									console.log(blog);
									 return blog;
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