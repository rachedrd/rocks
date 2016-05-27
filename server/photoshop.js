import { Mongo } from 'meteor/mongo';
import { Images } from '../imports/api/images.js';
//var imageDetails = new Mongo.Collection('images');
Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: null, /* ["image/png", "image/jpeg", "image/gif"],*/
  maxSize: 2 * 1024 * 1024,
});
Slingshot.GoogleCloud.directiveDefault.GoogleAccessId = "375102089895-compute@developer.gserviceaccount.com";
Slingshot.GoogleCloud.directiveDefault.GoogleSecretKey = Assets.getText('google-cloud-service-key.pem');
Slingshot.createDirective("myImageUploads", Slingshot.GoogleCloud, {
  //bucket: "giggorrilla",
  GoogleAccessId: '375102089895-compute@developer.gserviceaccount.com',
  bucket: "giggorrilla",
  acl: "public-read",
  authorize: function () {
    if (!this.userId) 
    {
      var message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
                      },
  key: function (file) {
    //var currentUserId = Meteor.user().emails[0].address;
    var username = Meteor.user().profile.name;
    var albumName = "germanyTour";
    return username + "/" + albumName +  "/"+ file.name;
                        }
});

