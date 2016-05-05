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
						            }
			});
Router.route('/about', {name :"homeAbout"});
Router.route('/rest password', {name :"resetPassword"});
Router.route('/contact', {name :"homeContact"});
Router.route('/profile', {name :"homeProfile"});
Router.route('/SingUp', {name :"homeSignIn"});
Router.route('/products/:sku', { 
					name :"productsShow",
					data: function(){
									return Products.findOne({sku: this.params.sku});

						            }
			});