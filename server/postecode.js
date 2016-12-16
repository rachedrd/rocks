// poste code api integration
Meteor.methods({
	'getplace': function  (codepost) {
            console.log(codepost + "  : from getplace");
		//var apiUrl = "https://api.getAddress.io/v2/uk/"+codepost+"?api-key=ERxa1xczw0CyAEWjd1DmKg5167";
            var apiUrl = "https://api.getAddress.io/v2/uk/"+codepost+"?api-key=xqJHY6loQE2_pG0B8yWDKw6040";
		// var result = Meteor.wrapAsync(apicall)(apiUrl);
	//	var response = Meteor.wrapAsync(apicall)(apiUrl
	//var response = HTTP.get(apiUrl).data;
				this.unblock();
                      //  console.log('result is the next ...\n');

        var response = { "Latitude": 52.2457758, "Longitude": -0.89249070000000008 ,
"Addresses":["10 Watkin Terrace, , , , , Northampton, Northamptonshire",
             "12 Watkin Terrace, , , , , Northampton, Northamptonshire",
             "14 Watkin Terrace, , , , , Northampton, Northamptonshire",
             "16 Watkin Terrace, , , , Northampton, Northamptonshire",
             "18 Watkin Terrace, , , , , Northampton, Northamptonshire",
             "2 Watkin Terrace, , , , , Northampton,Northamptonshire",
             "20 Watkin Terrace, , , , , Northampton, Northamptonshire",
             "22 Watkin Terrace, , , , , Northampton, Northamptonshire",
             "24 Watkin Terrace, , , , , Northampton, Northamptonshire",
             "26 Watkin Terrace, , , , , Northampton, Northamptonshire",
             "26a Watkin Terrace, , , , , Northampton, Northamptonshire",
             "26b Watkin Terrace, , , , , Northampton, Northamptonshire",
             "26c Watkin Terrace, ,, , , Northampton, Northamptonshire",
             "26d Watkin Terrace, , , , , Northampton,Northamptonshire",
             "28 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "2a Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "30 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "32 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "36 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "38 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "4 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "40 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "40b Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "42 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "44 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "46 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "48 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "50 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "8 Watkin Terrace, , , , , Northampton, Northamptonshire",
                              "Flat 1, 6 Watkin Terrace, , , , Northampton, Northamptonshire",
                               "Flat 1, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire",
                               "Flat 2, 6 Watkin Terrace, , , , Northampton, Northamptonshire",
                               "Flat 2, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire",
                               "Flat 3, 6 Watkin Terrace, , , , Northampton, Northamptonshire",
                               "Flat 3, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire",
                               "Flat 4, 6 Watkin Terrace, , , , Northampton, Northamptonshire",
                               "Flat 4, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire",
                               "Flat 5, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire",
                               "Flat 6, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire",
                               "Flat 7, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire",
                               "Flat 8, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire",
                               "Flat 9, Watkin Court, Watkin Terrace, , , Northampton, Northamptonshire"]};
                              // console.log(response); 
		return response;
	},
    'chargeCard': function(mystripeToken) {
      //check(stripeToken, String);
      var Stripe = StripeAPI('sk_test_ajhUKVHS0APlgjVPWmbeeMQP');
      Stripe.charges.create({
        source: mystripeToken.stripeToken,
        amount: mystripeToken.amount, // this is equivalent to $50
        currency: 'usd'
      }, function(err, charge) {
            if(err)
            {
                  console.log('there is an error ....\n');
                  console.log(err);
                  return err;
            }
            if(charge)
            {
                  console.log('success payment ...\n');
                  console.log(charge); 
                  return charge;
            }
       // console.log(err, charge);
      });
    }
});