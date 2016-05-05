Products = [
{"sku": "sku",
 "name": "sku name",
 "description": "along description **not expensive check the price**.....",
 "image": "martian-sunset-cruise.jpg",
 "summary": "this is the summury about this product",
 "price": "10000",
 "vendor":
 			{"id": "123",
 			 "slug": "the slugan",
 			  "name": "vendor name"
 			}
},
{"sku": "sku2",
 "name": "sku name2",
 "description": "along description .....",
 "image": "johnny-liftoff.jpg",
 "summary": "this is the summury about this product",
 "price": "120000",
 "vendor":
 			{"id": "143",
 			 "slug": "the slugan2",
 			  "name": "vendor name2"
 			}
},
{"sku": "sku3",
 "name": "sku name3",
 "description": "along description 3 .....",
 "image": "illudium-q36.jpg",
 "summary": "this is the summury about this product",
 "price": "130000",
 "vendor":
 			{"id": "143",
 			 "slug": "the slugan2",
 			  "name": "vendor name2"
 			}
}
	]
Products.featured = function()
{
	var featuredSkus = ["honeymoon-mars","johnny-ligtoff","one-way-reentry"];
	return _.filter(Products, function(product){
		return featuredSkus.indexOf(product.sku);
	});
};
 Products.findOne= function(args){
	return _.find(Products, function(product)
										{
											return product.sku === args.sku;
										});
}


