// display all users collections
import { Mongo } from 'meteor/mongo';
//export const Usrs =  Accounts.users;//Accounts.users;

//export const Tasks =  new Mongo.Collection('tasks');//Accounts.users;
 Images = new Mongo.Collection('images');
 Rating = new Mongo.Collection('rating');
 Docs = new Mongo.Collection('docs');
 songs = new Mongo.Collection('songs');
 blogs = new Mongo.Collection('blogs');
 venues = new Mongo.Collection('venues');
 Calendars = new Mongo.Collection('calendars');
 chat = new Mongo.Collection('chat');

/*Calendars.insert({
  "_id": "myCalendarId2",
  events: [ {"bandname" : "britneySpears",
  "start":"2016-09-26",
  "end": "2016-09-26",
  "title": "all day events",
  "venueId":"venue 1",
  "owner": "agent1"  } ]
 });*/
 Notifications = new Mongo.Collection('notifications');

 Users =  Meteor.users;
/*Meteor.publish('images', function(){ 
	return Images.find({}, 
		{ fields: {_id:1, imageurl:1, time: 1, uploadedBy: 1,imageName: 1, imageFolder: 1 } } ); });*/
Meteor.publish('images', function(){ return Images.find({}); });
Meteor.publish('docs', function(){ return Docs.find({}); });
Meteor.publish('rating', function(){ return Rating.find({}); });
Meteor.publish('songs', function(){ return songs.find({}); });
Meteor.publish('blogs', function(){ return blogs.find({}); });
Meteor.publish('venues', function(){ return venues.find({}); });
Meteor.publish('Calendars', function(){ return Calendars.find({}); });
Meteor.publish('chat', function(){ return chat.find({}); });
Meteor.publish('notifications', function(){ return Notifications.find({},{_id: 1, owner: 1, reciever: 1 , type: 1, status :1 ,time :1}); });
Meteor.publish('USERS', function(){ 
    return Users.find({}, { fields: {_id:1, profile: 1 , emails: 1, username: 1 , agent: 1, whishlist: 1} });
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

uploadavatar:  function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.avatar" : obj.url }   });
 return;
},
uploadcover:  function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.cover" : obj.url }   });
 return;
},
updatestatus:  function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.Status" : obj.status }   });
 return;
},
updateallowchat:  function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.chatFunctionnality" : obj.chat }   });
 return;
},
updateoprational:function(obj) {
 Users.update({"_id": obj.id}, {$set : { "profile.oprational" : obj.operational }   });
 return;
},
updatesalary:  function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.salary" :parseInt( obj.salary) }   });
 return;
},
incremetRating:  function(obj)
{
  if( Rating.find({"bandId": obj.bandId , "userId": obj.userId}).count()> 0)
  {
Rating.update({"bandId": obj.bandId, "userId": obj.userId },{$set: {"ratingvalue": obj.ratingvalue}});
 console.log('justupdate the old rating value');
  }
  else
  {
 //Rating.insert({"bandId": obj.band, "userId": userId, "username": username , "ratingvalue": ratingvalue});
Rating.insert({"bandId": obj.bandId, "userId": obj.userId, "username" : obj.userId, "ratingvalue": obj.ratingvalue});
 }
 return;
},
updatesocialpage: function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.socialpage" : obj.socialpage }   });
 console.log('socialpage :' + obj.socialpage);
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
updateyoutubevideo: function(obj)
{
 Users.update({"_id": obj.id}, {$set : { "profile.youtubevideourl" : obj.youtubevideourl }   });
 return true;
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
 Users.update({"_id": obj.id}, {$push : { "profile.members" : {"id" : obj.itemid, "role":  obj.itemname} }   });
 
 return true;
},
addfriend:  function(obj)
{
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });

 Users.update({"_id": obj.recieverId}, {$push : { "profile.friends" : {"id" : obj.senderId, "name":  obj.senderName} }   });
 Users.update({"_id": obj.senderId}, {$push : { "profile.friends" : {"id" : obj.recieverId, "name":  obj.recieverName} }   });
 
 return true;
},
savewhishlistitem: function(obj)
{
 //Users.update({"_id": obj.id}, {$push : { "profile.members" : {"memeber name" : obj.membername , "role": obj.memberrole} }   });
 Users.update({"_id": obj.id}, {$push : { "whishlist" : {"id" : obj.itemid, "username":  obj.itemname} }   });
 
 return true;
},
addDocument: function(obj)
{              
var docId = Docs.insert({'uploadedBy' : obj.uploadedBy, "title": obj.docname, "timeStamp": obj.timeStamp, "url": obj.url });
},
removeDocument: function(id)
{              
 Docs.remove({'_id' : id });
},
addEvent: function(obj)
{     
//var eventId = Calendars.insert({"events" : [ {"title" : obj.title, "type": obj.type, "start" : obj.start, "end" : obj.end , "ownerId" : obj.ownerId, "bandId" : obj.bandId } ]});
var eventId = Calendars.insert({"title" : obj.title, "type": obj.type, "start" : obj.start, "end" : obj.end , "ownerId" : obj.ownerId, "bandId" : obj.bandId });

if(eventId)
{
var venueid = venues.insert({ eventId : eventId, postcode : obj.postcode, regionname : obj.regionname, cityname: obj.cityname , address: obj.address, buildingname: obj.buildingname });
console.log('venue id : ' + venueid);
return eventId;
}
},
sendMessage: function(obj)
{  
console.log('save chat into database ...');   
var messageId = chat.insert({"senderId" : obj.senderId, "recieverId": obj.recieverId, "timeStamp" : obj.timeStamp, "content" : obj.content , "status" : obj.status });
return messageId;
},
updatemessageStatus: function(id)
{
 chat.update({"_id" : id},{$set : {"status" : "viewed"}});
},
updateevent : function(obj)
{
console.log(obj);
var eventId = Calendars.update({"_id" : obj.id }, { $set : { "title" : obj.title , "start" : obj.start, "end" : obj.end } });    
//var eventId = Calendars.update({"_id" : obj.id }, { $set : { "title" : obj.title, "start" : obj.start, "end" : obj.end } });
if(eventId)
{
var venueid = venues.update({ "eventId" : obj.id } , { $set :{ "postcode" : obj.postcode, "regionname" : obj.regionname, "cityname": obj.cityname , "address": obj.address, "buildingname": obj.buildingname } });
console.log('updated venue id : ' + venueid);
return  venueid;
}
},
/*updateevent: function(id)
{ 
//var eventId = Calendars.update({"_id" : obj.id }, { $set : { "title" : obj.title , "start" : obj.start, "end" : obj.end } });    
//var eventId = Calendars.update({"_id" : obj.id }, { $set : { "title" : obj.title, "start" : obj.start, "end" : obj.end } });
//if(eventId)
//{
  //console.log("obj from updateevent " + id);
  //console.log(obj);

//var venueid = venues.update({ "eventId" : obj.id, postcode : obj.postcode, regionname : obj.regionname, cityname: obj.cityname , address: obj.address, buildingname: obj.buildingname });
//console.log('updated venue id : ' + venueid);
//return ;
//}
},*/
removeimage : function(id)
{
console.log('image removed' + id);
var imageid = Images.remove({"_id": id});
console.log('venue removed' + imageid);
return imageid;
},
removeAlbum : function(albumname)
{
console.log('image removed' + albumname);
var imageid = Images.remove({"imageFolder": albumname});
console.log('venue removed' + albumname);
return albumname;
},
removeevent : function(id)
{
 eventId = Calendars.remove({"_id" : id});
console.log('event removed' + eventId);
var venueid = venues.remove({"eventId": id});
console.log('venue removed' + venueid);
return venueid;
},
addComment: function(obj)
{
  var blog = blogs.findOne({"_id": obj.id});
  var id = 0;

  if( blog.comments.length > 0)
 id = blog.comments[blog.comments.length - 1].id + 1 ;
blogs.update({"_id": obj.id}, {$push : { "comments" : {"id": id, "author" : obj.author, "content":  obj.content, "time" :obj.timeStamp} }   });
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
removewishlistitem: function(obj)
{
 Users.update({"_id": obj.id} , { $pull : { "whishlist" : {"id": obj.itemid} } });
},          
removecomment: function(obj)
{
  console.log(obj.blogid + "  comment id " + obj.commentid);
  blogs.update({"_id": obj.blogid} , { $pull : { "comments" : {"id":  parseInt(obj.commentid)  } } });

},          
removesonglist: function(obj)
{
 Users.update({"_id": obj.id} , { $pull : { "profile.repertoire" : {"songname": obj.songname, "singername" :obj.singername } } });
},
removeHighlight:  function(obj)
{
 Users.update({"_id": obj.id} , { $pull : { "profile.highlights" : {"id": obj.highlightId  } } });
},
addBlog: function( obj){
return blogs.insert({
  title: obj.title,
   content: obj.content,
   imageurl: obj.imageurl,
 time: obj.timeStamp,
  author: obj.author /*, 
  file : obj.file,*/
 });
return "inserted";
//Users.upsert({"_id": "hnCoTgyqB84894uCz"}, {$set : { "agent.name":name}    });
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