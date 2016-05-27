import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Images } from '../imports/api/images.js';
var uploader = new ReactiveVar();
//var imageDetails = new Mongo.Collection('images');
var currentUserId = Meteor.userId();
Template.imageUploader.events({'change .uploadFile': function(event, template) {

             event.preventDefault();

             var upload = new Slingshot.Upload("myImageUploads");
             var timeStamp = Math.floor(Date.now());                 
         upload.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
             uploader.set();
             if (error) {
               console.error('Error uploading');
               alert (error);
             }
             else{
               imageFolder= "germanyTour";
               imageName= "first scean";
               Images.insert({
                   imageurl: downloadUrl,
                   imageName: imageName,
                   imageFolder: imageFolder,
                   time: timeStamp,
                   uploadedBy: currentUserId
               });
             }
             });
             uploader.set(upload);
           }
       });
 
Template.homeProfile.onRendered( function(){
/*$.getScript('../js/modernizr.custom.63321.js');
$.getScript('../js/jquery.stapel.js');
$.getScript('../js/jquery.prettyPhoto.js');
$.getScript('../js/jquery.flexslider-min.js');
$.getScript('../js/jquery.nicescroll.min.js');

$.getScript('../js/twitter/jquery.tweet.js');
$.getScript('../js/theme20.js');*/
setTimeout(function(){
  $.getScript('../js/zwindows.js');
},3000);
});

Template.homeProfile.helpers({
  images() {
   return Images.find({});
   //return Tasks.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");

  },
});
Template.imageUploader.helpers({

    isUploading: function () {
        return Boolean(uploader.get());
    },

    progress: function () {
    var upload = uploader.get();
    if (upload)
    {
      if(Math.round(upload.progress()*100) === 100)
      {
        alert('100');
        // $('.def-block ul.tp-grid').append('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>');
      }
    return Math.round(upload.progress() * 100);
  }
    },

    url: function () {

    return Images.findOne({uploadedBy: currentUserId},{sort:{ time : -1 } });

    },

});
/*
Template.imageUploader.events({'change .uploadFile': function(event, template) {

             event.preventDefault();

             var upload = new Slingshot.Upload("myImageUploads");
             var timeStamp = Math.floor(Date.now());                 
         upload.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
             uploader.set();
             if (error) {
               console.error('Error uploading');
               alert (error);
             }
             else{
               console.log("Success!");
               imageFolder= "Concert germany";
               imageName= "first scean";
               console.log('uploaded file available here: '+downloadUrl);
               imageDetails.insert({
                   imageurl: downloadUrl,
                   imageName: imageName,
                   imageFolder: imageFolder,
                   time: timeStamp,
                   uploadedBy: currentUserId
               });
             }
             });
             uploader.set(upload);
           }
       });
*/

/*Template.imageUploader.helpers({

    isUploading: function () {
      alert('uploader.get()' + uploader.get() );
      alert(uploader.get());
        return Boolean(uploader.get());
    },

    progress: function () {
    var upload = uploader.get();
    if (upload) {
      alert('Math.round(upload.progress() * 100) : ' + Math.round(upload.progress() * 100));
    return Math.round(upload.progress() * 100);
    }
    },

    url: function () {

    return imageDetails.findOne({uploadedBy: currentUserId},{sort:{ time : -1 } });

    },

});*/
/*
Template.imageUploader.helpers({

    isUploading: function () {
        return Boolean(uploader.get());
    },

    progress: function () {
    var upload = uploader.get();
    if (upload)
    return Math.round(upload.progress() * 100);
    },

    url: function () {

    return imageDetails.findOne({uploadedBy: currentUserId},{sort:{ time : -1 } });

    },

});*/