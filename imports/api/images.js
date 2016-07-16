// display all users collections
import { Mongo } from 'meteor/mongo';
//export const Usrs =  Accounts.users;//Accounts.users;

//export const Tasks =  new Mongo.Collection('tasks');//Accounts.users;
 Images = new Mongo.Collection('images');
 Notifications = new Mongo.Collection('notifications');

 Users =  Meteor.users;
/*Meteor.publish('images', function(){ 
	return Images.find({}, 
		{ fields: {_id:1, imageurl:1, time: 1, uploadedBy: 1,imageName: 1, imageFolder: 1 } } ); });*/
Meteor.publish('images', function(){ return Images.find({}); });
Meteor.publish('notifications', function(){ return Notifications.find({},{_id: 1, owner: 1, reciever: 1 , type: 1, status :1 ,time :1}); });



Meteor.publish('USERS', function(){ 
    return Users.find({}, { fields: {_id:1, profile: 1, emails: 1, username: 1 , agent: 1} });
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
addNotification: function(obj){
 Notifications.insert({ "ownerId" : obj.ownerId,
  "ownerName" : obj.ownerName,
  "recieverId": obj.recieverId ,
  "recieverName": obj.recieverName ,
  "time": obj.time,
  "type": obj.typ , 
  "status" : obj.status,
  "viewed" : false
   });
 if(obj.status === "accepted")
 	Notifications.update({ "recieverId" : obj.ownerId,
  "ownerId": obj.recieverId }, { $set : {"status" : "accepted"} });
return "inserted";
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