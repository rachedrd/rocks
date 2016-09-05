// display all users collections
import { Mongo } from 'meteor/mongo';
//export const Usrs =  Accounts.users;//Accounts.users;

//export const Tasks =  new Mongo.Collection('tasks');//Accounts.users;
 Images = new Mongo.Collection('images');
 songs = new Mongo.Collection('songs');

 Notifications = new Mongo.Collection('notifications');

 Users =  Meteor.users;
/*Meteor.publish('images', function(){ 
	return Images.find({}, 
		{ fields: {_id:1, imageurl:1, time: 1, uploadedBy: 1,imageName: 1, imageFolder: 1 } } ); });*/
Meteor.publish('images', function(){ return Images.find({}); });
Meteor.publish('songs', function(){ return songs.find({}); });

Meteor.publish('notifications', function(){ return Notifications.find({},{_id: 1, owner: 1, reciever: 1 , type: 1, status :1 ,time :1}); });



Meteor.publish('USERS', function(){ 
    return Users.find({}, { fields: {_id:1, profile: 1 , emails: 1, username: 1 , agent: 1} });
	//return Users.find({});

     });
Meteor.methods({
addAgent: function(obj)
{
//Images.insert({imageName: "imageName", imageurl: "imageurl", imageFolder: "imageFolder"});
//Photos.insert({imageName: "imageName", imageurl: "imageurl", imageFolder: "imageFolder"});

//var agent = { "agentId": recieverId,"agentName": recieverName,"time": timeStamp };
//Users.upsert({"_id": obj.artistId}, {$set : { "agent.id": obj.agentId, "agent.name":obj.agentName, "agent.time":obj.time}    });
Users.upsert({"_id": obj.artistId}, {$set : { agent: { "id" : obj.agentId, "name" : obj.agentName , "time" : obj.time}  }  });
return ;
},
updateFirstname: function(obj)
{
 Users.update({"_id": obj.id}, {$set : {"profile.firstname" : obj.firstname}   });
 Users.update({"username": "jazzBand008"}, {$set : {"profile.salary" : 100}   });
 Users.update({"username": "GeomyBand"}, {$set : {"profile.salary" : 100}   });
 Users.update({"username": "weddingBand006"}, {$set : {"profile.salary" : 100}   });
 return ;
},
updatelastname:  function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.lastname" : obj.lastname }   });
 return;
},
updatebandname:function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.bandName" : obj.bandname }   });
 return;
}
,
updatebirthdate: function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.birthdate" : obj.birthdate }   });
 return;
},
updatephonenumber:function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.phoneNumber" : obj.phoneNumber }   });
 return;
},
updategender:function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.gender" : obj.gender }   });
 return;
},
updatetype:function(id)
{
 Users.update({"_id": id}, {$set : { "profile.type" : "costumer" }   });
 return;
},
updatebandtype:function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.bandtype" : obj.bandtype }   });
 return true;
}, 
updatebandsets: function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.sets" : obj.bandsets }   });
 return true;
}, 
savebandmember: function(obj)
{
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });
 Users.update({"_id": obj.id}, {$push : { "profile.members" : {"name" : obj.membername, "role":  obj.memberrole} }   });
 
 return true;
}, 
saverepertoire: function(obj)
{
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });
 Users.update({"_id": obj.id}, {$push : { "profile.repertoire" : {"songname" : obj.songname, "singername":  obj.singername} }   });
 
 return true;
}, 
savehighlight:function(obj){
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });
 Users.update({"_id": obj.id}, {$push : { "profile.highlights" : {"id" : obj.highlightId, "content":  obj.highlightcontent} }   });
 
 return true;
},
savepostecode: function(obj){
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });
 Users.update({"_id": obj.id}, {$set : { "profile.address.postecode" : obj.postecode }   });
 
 return true;
},
savecity: function(obj){
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });
 Users.update({"_id": obj.id}, {$set : { "profile.address.city" : obj.city }   });
 
 return true;
},
saveaddress:function(obj){
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });
 Users.update({"_id": obj.id}, {$set : { "profile.address.address" : obj.address }   });
 return true;
},
saveregion: function(obj){
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });
 Users.update({"_id": obj.id}, {$set : { "profile.address.region" : obj.region }   });
 
 return true;
},
removememeber: function(obj)
{
 Users.update({"_id": obj.id} , { $pull : { "profile.members" : {"name": obj.membername, "role" :obj.memberrole } } });
},
removesonglist: function(obj)
{
 Users.update({"_id": obj.id} , { $pull : { "profile.repertoire" : {"songname": obj.songname, "singername" :obj.singername } } });
},
removeHighlight:  function(obj)
{
 Users.update({"_id": obj.id} , { $pull : { "profile.highlights" : {"id": obj.highlightId  } } });
},
addImage: function( obj){
return Images.insert({
	imageurl: obj.imageurl,
	 uploadedBy: obj.uploadedBy,
 timeStamp: obj.timeStamp,
  imageName: obj.imageName , 
  imageFolder : obj.imageFolder,
 });
return "inserted";
//Users.upsert({"_id": "hnCoTgyqB84894uCz"}, {$set : { "agent.name":name}    });
},
addSong: function( obj){
return songs.insert({
  songurl: obj.songurl,
   uploadedBy: obj.uploadedBy,
 timeStamp: obj.timeStamp,
  songname: obj.songname , 
  duration : obj.duration
 });
return "inserted";
//Users.upsert({"_id": "hnCoTgyqB84894uCz"}, {$set : { "agent.name":name}    });
},
addNotification: function(obj){
 Notifications.insert({ "ownerId" : obj.ownerId,
  "ownerName" : obj.ownerName,
  "recieverId": obj.recieverId ,
  "recieverName": obj.recieverName ,
  "time": obj.time,
  "type": obj.typ , 
  "status" : obj.status,
  "viewed" : obj.viewed
   });
 if(obj.status === "accepted")
 	Notifications.update({ "recieverId" : obj.ownerId,
  "ownerId": obj.recieverId }, { $set : {"status" : "accept"} });
return "inserted";
//Users.upsert({"_id": "hnCoTgyqB84894uCz"}, {$set : { "agent.name":name}    });
},

rejectNotification: function(obj){
 Notifications.insert({ "ownerId" : obj.ownerId,
  "ownerName" : obj.ownerName,
  "recieverId": obj.recieverId ,
  "recieverName": obj.recieverName ,
  "time": obj.time,
  "type": obj.typ , 
  "status" : obj.status,
  "viewed" : obj.viewed
   });
 if(obj.status === "rejected")
  Notifications.update({ "recieverId" : obj.ownerId,
  "ownerId": obj.recieverId }, { $set : {"status" : "reject"} });
return "rejected";
//Users.upsert({"_id": "hnCoTgyqB84894uCz"}, {$set : { "agent.name":name}    });
},
removeNotification: function(id){
 Notifications.remove({ "_id" : id });
return "removed";
//Users.upsert({"_id": "hnCoTgyqB84894uCz"}, {$set : { "agent.name":name}    });
},
	viewedNotification: function(id){
		console.log('id : '+ id);
 Notifications.update({"_id" : id }, {$set : { "viewed" : true} });
return "viewed"; 
//Users.upsert({"_id": "hnCoTgyqB84894uCz"}, {$set : { "agent.name":name}    });
},
display: function(){
	//return "hello";
return Users.find({
	/*$or:[
                     {"profile.type" : "band"},
                     {"profile.type" : "artist"},
                    ]*/
                });
},
modify: function(name){
Images.upsert({"_id": "hnCoTgyqB84894uCz"}, {$set : { "agent.name":name}    });
},
});
	
/*Meteor.setInterval(function(){
Usrs.forEach( function(USR){

console.log(USR._id);
okokokif (USR.status.online === false ) {
Meteor.users.update( {"_id": USR._id}, { $set : {"services.resume.loginTokens": [] } } , { multi: true });
     console.log("deconnected " + USR._id);

	  };
});
}, 1000*3600*12);*/
//console.log('tasks are the next ...');
//Tasks.insert({ text: "Hello world!", createdAt: new Date() });