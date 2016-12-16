import { Mongo } from 'meteor/mongo';
import { Images } from '../imports/api/images.js';
var folder = {};
Meteor.methods({
updatefoldername: function(name)
{
 folder.name = name;
 return true;
}
});
//var imageDetails = new Mongo.Collection('images');
Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: null, /* ["image/png", "image/jpeg", "image/gif"],*/
  maxSize: 10 * 1024 * 1024,
});
Slingshot.fileRestrictions("myavatarUploads", {
  allowedFileTypes: null, /* ["image/png", "image/jpeg", "image/gif"],*/
  maxSize: 10 * 1024 * 1024,
});

Slingshot.fileRestrictions("mySongUploads", {
  allowedFileTypes: null, /* ["image/png", "image/jpeg", "image/gif"],*/
  maxSize: 10 * 1024 * 1024,
});

Slingshot.fileRestrictions("myDocUploads", {
  allowedFileTypes: null, /* ["image/png", "image/jpeg", "image/gif"],*/
  maxSize: 20 * 1024 * 1024,
});

Slingshot.fileRestrictions("myblogImageUploads", {
  allowedFileTypes: null, /* ["image/png", "image/jpeg", "image/gif"],*/
  maxSize: 10 * 1024 * 1024,
});
Slingshot.fileRestrictions("myDirective", {
  allowedFileTypes: null, /* ["image/png", "image/jpeg", "image/gif"],*/
  maxSize: 10 * 1024 * 1024,
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
    console.log('foldername : ' + folder.name);
   // console.log(Session.gey('pileName',pileName));
    return username + "/" + folder.name + "/" + file.name ; //file.name;
                        }
});
Slingshot.createDirective("myblogImageUploads", Slingshot.GoogleCloud, {
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
    return username + "/blog/" + file.name ; //file.name;
                        }
});
Slingshot.createDirective("myDocUploads", Slingshot.GoogleCloud, {
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
    return username + "/docs/" + file.name ; //file.name;
                        }
});
Slingshot.createDirective("myavatarUploads", Slingshot.GoogleCloud, {
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
    return username + "/" + file.name ; //file.name;
                        }
});
Slingshot.createDirective("mySongUploads", Slingshot.GoogleCloud, {
  //bucket: "giggorrilla",
  GoogleAccessId: '375102089895-compute@developer.gserviceaccount.com',
  bucket: "giggorrilla",
  acl: "public-read",
  authorize: function () {
    console.log('from authorized ...');
    if (!this.userId) 
    {
      var message = "Please login before posting images";
       throw new Meteor.Error("Login Required", message);
    }
    return true;
                      },
  key: function (file) {
    console.log('my uploaded file : ');
    console.log(file)
    //var currentUserId = Meteor.user().emails[0].address;
    var username = Meteor.user().profile.name;
    return username + "/songs/" + file.name ; //file.name;
                        }
});
Slingshot.createDirective("myDirective", Slingshot.GoogleCloud, {
  //allowedFileTypes: "image/png"

  GoogleAccessId: '375102089895-compute@developer.gserviceaccount.com',
  bucket: "giggorrilla",
  acl: "public-read",
  authorize: function () {
    if (!this.userId) 
    {

      var message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }
    alert('authorized ....');
    return true;
                      },
  key: function (file) {
    var username = Meteor.user().profile.name;
    var albumName = "germanyTour";
    console.log('file.name : ' + file.name);
    return username + "/" + albumName + "/ha"+ file.name + "/canvas.jpg"; //file.name;
                        
                        }
});



