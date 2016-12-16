import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
var uploader = new ReactiveVar();
var orientaion = 0;
var typeofuser = new ReactiveVar();
//var imageDetails = new Mongo.Collection('images');
var currentUserId = Meteor.userId();
/*Template.body.events({
'click .removeImage':  function(event, template){
  alert('task template ...');
  //var currentLi = $(this).closest('li');
//var imageId = $(this).closest('li').attr("id");
//alert('image id is : ' + imageId);
//Images.remove({id: imageId });            
}
});*/    
Template.task.events({ 
  /*,
  'click .removeDiv': function(e, t)
  {
    if(!e)  var e = window.event;
    e.stopPropagation();
    e.cancelBubble = true;
    if(e.stopPropagation())
      e.stopPropagation();
    alert('removing image DIV....');
  },*/

  /*'click .removeImage': function(e, t)
  {
    if(!e)  var e = window.event ;
    e.stopPropagation();
    e.cancelBubble = true;
    if(e.stopPropagation())
      e.stopPropagation();
    alert('removing image span....');
  }*/
});
Template.monitorusers.onCreated(function(){
  Session.setDefault("skipusers", 0);
  Session.setDefault('currentPage', 1);
  Session.setDefault("getAllusers", 0);
  Session.setDefault("theusertype",null);
  //Session.setDefault("theusername", null);
});
Template.monitorusers.onRendered(function(){
  $('.usernames').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1});     
  $('.usertypes').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1});     

$('.userstablecontainer').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1});     
});
function validatemessagetext(text) {
  var re = /^[A-Za-z0-9?=.~!:; ,'"+-@#\$%^&*()_|<>{}\[\]-]{1,}$/; //?=.~!@#\$%^&*()_|<>{}\[\]-]{}$/;
    return re.test(text);
}
/*
$("#cbp-spmenu-s2").on('keyup','.form-control', function(e){
 if(e.keyCode === 13)
 {
  if(validatemessagetext($(this).val().toString()))
  {
  $('.chat').append('<div class="chat-item chat-item-right"><div class="chat-message">'+$(this).val()+'</div></div>');
    $('.chat').scrollTop($('.chat')[0].scrollHeight);
 $(this).val('');
 }
 }
});*/
Template.chatslider.onCreated(function(){
  Meteor.subscribe('chat');
});

Template.chatslider.onRendered(function(){});
Template.chatslider.helpers({
   chathistory : function()
   {
    conv = chat.find({
     $or:[{"senderId" : Meteor.userId() ,"recieverId": Session.get("chatto") },
                     {"recieverId" : Meteor.userId(), "senderId" : Session.get("chatto")}]
              });
    if(conv.count() > 0)
    {
  $('.chat').scrollTop($('.chat')[0].scrollHeight);
   }
    return conv;

   },
   friends : function()
   {
    friends = Users.findOne({"_id": Meteor.userId() });
    return friends;
   },
   reciever : function(id)
   {
    if(id === Meteor.userId())
    return  true;

  $('.chat').scrollTop($('.chat')[0].scrollHeight);
   },

});
Template.chatslider.events({
'click .showRight2':function(e, t)
{
 var username = $(e.currentTarget).find('> .chattoname').attr('id');
 $(".chatto").text(username);
 Session.set("chatto", $(e.currentTarget).attr('id'));
},   
'keyup #chattext': function(e, t){
 if(e.keyCode === 13)
 {
  var chattext = t.find("#chattext").value;
  if(/\S/.test(chattext))
 {
  if(validatemessagetext(chattext))
  {
  var timeStamp = Math.floor(Date.now());
 var myobj = {"senderId" : Meteor.userId() , "recieverId": Session.get("chatto"), "timeStamp" : timeStamp, "content" : chattext , "status" : 'pending' };
 Meteor.call('sendMessage', myobj, function(err, result)
  {
 if (result)
 {
  $('.chat').scrollTop($('.chat')[0].scrollHeight);
 $("#chattext").val('');
 }
  });  
 
}
}
 else
 {
  alert('contains only strings ...');
 }
}
}
});


Template.monitorusers.events({
  'click .usertypes li' : function(e, t)
  {
    Session.setDefault("skipusers", 0);
    //console.log('click change allusers ...');
    //alert($(this).html());
   // alert($(e.currentTarget).find('> span').text());
    var usertype = $(e.currentTarget).find('> span').text().toString();
Session.set("theusertype", usertype);
  },
  'click .usernames li':function(e , t)
  {
    var username = $(e.currentTarget).find('> span').text().toString();
    for(var i = 0 ; i < $('.userstable tbody').children().length ; i ++)
{
  //alert($('.userstable tbody').children().eq(i).children().find('.username').val());
  if($('.userstable tbody').children().eq(i).children().find('.tabusername').text().indexOf(username) !== 0)
  {
    //alert($('.userstable tbody').children().eq(i).find('> td a').val() + "  " + currenttext );
    $('.userstable tbody').children().eq(i).hide();
  }
}
  },
  'click .userspaginationitem' : function(e, t)
  {
    var counter = parseInt($(e.currentTarget).attr('id')  );
    if(counter === 1) 
    {

  Session.set('currentPage', counter);
       counter -- ;  
    }
   
    else
      {
        Session.set('currentPage', counter);
        counter = (counter -  1) * 10;
       }
    Session.set("skipusers", counter);
  },
  'keyup .suggest-usernameinput':function(){
    Session.setDefault("skipusers", 0);
    $('.userstable tbody').children().show();
  //  alert('keyup');
  //$('.usernames').show();
  var currenttext = $('.suggest-usernameinput').val().toLowerCase();
  if(currenttext === "")
  {
    $('.userstable tbody').children().show();
    //Session.set("theusername", "");
  }
  currenttext = currenttext.toLowerCase();
$('.usernames').empty();
if(Session.get("getAllusers").length > 0){
for(var i = 0 ; i < Session.get("getAllusers").length; i++){
    if(Session.get("getAllusers")[i].username.toLowerCase().match(currenttext )) {
        $('.usernames').append($("<li><span class='suggest-name'>" + Session.get("getAllusers")[i].username + "</span></li>"));
    $('.usernames li span').eq(0).css({'text-decoration': 'underline'});
  }
}
}

for(var i = 0 ; i < $('.userstable tbody').children().length ; i ++)
{
  //alert($('.userstable tbody').children().eq(i).children().find('.username').val());
  if($('.userstable tbody').children().eq(i).children().find('.tabusername').text().toLowerCase().indexOf(currenttext) !== 0)
  {
    //alert($('.userstable tbody').children().eq(i).find('> td a').val() + "  " + currenttext );
    $('.userstable tbody').children().eq(i).hide();
  }
  else{
 //   alert('inde 0 ');
  }
}
$('.usernames').show();
     },
'click .searchusersmonitor':function()
{
  Session.set("skipusers", 0);
 /* if($('.suggest-usernameinput').val() !== null && $('.suggest-usernameinput').val() !== undefined )
  {
  Session.set("theusername",$(".suggest-usernameinput").val());
  }
  else{
    //alert('null on undefined');
  //Session.
  Session.set("theusername", "");
}*/
/*
if($('.suggest-usernameinput').val() !== undefined && $('.suggest-usernameinput').val() !== "")
{
  orquery.$and.push({"username": $('.suggest-usernameinput').val()});
}
if($('.suggest-usernameinput').val() === "")
{
  if(orquery.$and !== undefined)
   orquery.$and.length = 0;
}*/
  //alert("username :  " +$('.suggest-usernameinput').val());
  if($(".suggest-usertypeinput").val() !== null && $(".suggest-usertypeinput").val() !== undefined &&
  $(".suggest-usertypeinput").val().length >= 3  )
  {
  Session.set("theusertype",$(".suggest-usertypeinput").val());
  }
  else{
    //alert('null on undefined');
  //Session.
  Session.set("theusertype", "all users");
}
  //alert(Session.get("theusertype"));
}    
});
Template.monitorusers.helpers({
  operational: function(operational)
  {
  if (operational === "yes")
    return true; 
    return false;
  },
  currentPage : function(){

    return Session.get('currentPage');
  },
  pagination : function()
  {
    var paginationarray = [];
    if (Session.get("totalusers") > 10 )
    {
     $('.pages').show();
     var length = Session.get("totalusers") / 10;
    for (var i = 1 ; i < length + 1 ; i++) 
    {
      paginationarray.push({"number": i });
      //i = i + 5 ;
    } 
    }
    else{$('.pages').hide();}
    return paginationarray;
  },
  getAllUsers :function()
  {
 return Session.get("getAllusers");
  },  
  totalusers : function() {
  /*  var result =  Users.find();

if (result.count() > 0 )
  return result.count() ;
  return 0;
  */
  if(Session.get("totalusers") > 0)
    return Session.get("totalusers");
     return 0; 
     },
  allusers: function() {
   // Session.set("skipusers", 0);
    var query = { };
  //alert(Session.get("bandtype"));
query = { $and : [] };
orquery = { $or : [] };
/*
if($('.suggest-usernameinput').val() !== undefined && $('.suggest-usernameinput').val() !== "")
{
  orquery.$and.push({"username": $('.suggest-usernameinput').val()});
}
if($('.suggest-usernameinput').val() === "")
{
  if(orquery.$and !== undefined)
   orquery.$and.length = 0;
}*/
if( Session.get("theusertype") === undefined || Session.get("theusertype") === null
|| Session.get("theusertype").toString() === "" ||
 Session.get("theusertype").toLowerCase() === "all users" )
{
 costumer = {"profile.type" :  "costumer"  };
 agent = {"profile.type" :  "agent"  };
 admin = {"profile.type" :  "admin"  };
    band = {"profile.type" :  "band"  };
    orquery.$or.push(costumer);
    orquery.$or.push(admin);
orquery.$or.push(band);
orquery.$or.push(agent);

} else
{
if( Session.get("theusertype").toLowerCase() === "agent" || Session.get("theusertype").toLowerCase() === "band" 
  || Session.get("theusertype").toLowerCase() === "costumer" || Session.get("theusertype").toLowerCase() === "admin" ) 
{
  orquery.$or.length = 0;
     band = {"profile.type" : Session.get("theusertype").toLowerCase()};
orquery.$or.push(band);
}
}
//alert(Session.get("theusername"));    
// and query add username field
/*if( Session.get("theusername") === undefined || Session.get("theusername") === null
|| Session.get("theusername").toString() === "" )
{
  query.$and.length = 0;
}
 else
{
  query.$and.length = 0;
     username = {"profile.name" : Session.get("theusername")};
query.$and.push(username);
}*/
query.$and.push(orquery); 
/*var minmaxsalary = { "profile.salary" : {$lt: 5000  , $gte : 100 } };
var bandtype = {"profile.bandtype" : /./ };
if(Session.get("bandtype")  !== undefined  )
{
    bandtype = {"profile.bandtype" : { $regex: "" + Session.get("bandtype")+ "" } };
    query.$and.push(bandtype)
}
if(Session.get("bandnumbers")  !== undefined  )
{
     var mumbers = {"profile.members": { $size : Session.get("bandnumbers") } }; 
     query.$and.push(mumbers);
  }
if(Session.get("salarymax")  !== undefined)
 {
}
if(Session.get("salarymin")  === undefined && Session.get("salarymax")  !== undefined )
{
  minmaxsalary = { "profile.salary" : { $lt: parseInt(Session.get("salarymax"))  , $gte : 100  } };
}
if(Session.get("salarymin")  !== undefined && Session.get("salarymax")  === undefined )
{
  minmaxsalary = { "profile.salary" : { $lt: 5000 , $gte : parseInt(Session.get("salarymin"))  } };
}
if(Session.get("salarymin")  !== undefined && Session.get("salarymax")  !== undefined )
{
  minmaxsalary = { "profile.salary" : { $lt: parseInt(Session.get("salarymax")) , $gte : parseInt(Session.get("salarymin"))  } };
}
query.$and.push(minmaxsalary);
*/
var result =  Users.find( 
                   query
                     );

if (result.count() > 0 )
{
  Session.set("totalusers" , result.count() );
  Session.set("getAllusers", result.fetch());
  console.log(Session.get("getAllusers"));
 // $('.emtyresult').hide();
 result =  Users.find( 
                   query, {limit : 10 , skip : Session.get("skipusers") });
  return result ;
  }
if(result.count() === 0 )
{ 
   Session.set("totalusers" ,0);
   Session.set("getAllusers", []);
 // $('.emtyresult').show();
  return false;
}
  },
});
Template.manageProfile.events({
  'click .savesalarymanage' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var salary = t.find("#managesalaryinput").value;
          if((salary !== "") &&( salary !== null))
          {
          myobj = {"id": this._id, "salary": salary };
          Meteor.call('updatesalary', myobj);
        }
  },
     'click .saveaccountstatus' :function(event, t)
  {
    var status = t.find(".userstatus:checked").value;
    var myobj = {};
    event.preventDefault();
          if( status  === "active"  ) 
          {
            myobj = {"id": this._id, "status": "active" };
            Meteor.call('updatestatus', myobj);
          }
          if( status === "inactive" ) 
          {

            myobj = {"id": this._id, "status": "inactive" };
            Meteor.call('updatestatus', myobj);
          }
          
          }
          ,
          'click .savechatfunc' :function(event, t)
  {
    var chat = t.find(".userchat:checked").value;
    var myobj = {};
    event.preventDefault();
          if( chat  === "allowed"  ) 
          {
            myobj = {"id": this._id, "chat": "allowed" };
            Meteor.call('updateallowchat', myobj);
          }
          if( chat === "not allowed" ) 
          {

            myobj = {"id": this._id, "chat": "not allowed" };
            Meteor.call('updateallowchat', myobj);
          }
          
          }
});
Template.manageProfile.helpers({
  myphonenumber: function(phonenumber)
  {
   // alert(phonenumber):
    if(phonenumber === null || phonenumber === "")
    {
     return "**** *** ***";
    }
  else {
   return phonenumber;
   }
  },
  myusername: function(user)
  {
  if(!user )
  {
    console.log('user is undefined ...');
}
   else
    {
       console.log('user is not undefined ' + user.username);
      if( user && user.profile )
      {
      if(user.profile.type === "band")
       {
        if( user.profile.hasOwnProperty('bandName') )
        {
          return user.profile.bandName; 
        }
        else {
          return user.username; 

        }
       
      }
      else 
      {
    return user.username;
      }
    }
  }    
  },
  bandprofile: function(usertype)
  { 
     if(usertype === "band")
      {
       return true; 
      }
      else 
      {
    return false;
      }
  },
  userprofile: function(usertype)
  { 
    if(usertype === undefined);
    {
     // Meteor.call('updatetype', Meteor.userId());
    }
     if(usertype === "costumer" || usertype === "agent" )
      {
       return true; 
      }
      else 
      {
   return false;
      }      
  },
   adminprofile: function(usertype)
  { 
     if(usertype === "admin" )
      {
       return true; 
      }
      else 
      {
   return false;
      }      
  }
  ,
});
Template.monitor.helpers({
admin: function (user){
  if(user.profile.type === "admin")
  return true;
  else
  return false; 
}
});
Template.represntationreq.onCreated(
  function(){
    Meteor.subscribe("notifications"); 
  }
  );
/*Template.represntationreq.events({'click .sendreqRep': function(event, template) {
//alert("userid" + currentUserId ) ;
//Images.upsert({"_id": "xCdyzavCsuQbPLvLZ"}, {$set : { "agent": "rachini2" }   });
//Images.upsert({"_id": "xCdyzavCsuQbPLvLZ"}, {$set : { "agent.name":"rachini2"}    });
//Meteor.call('addAgent', "rached");
var timeStamp = Math.floor(Date.now()); 
var Currentuser =  Users.findOne({"_id": currentUserId },  { fields: { username: 1 }});

var myarg2 = { "ownerId": currentUserId,
 "ownerName": Currentuser.username,
 "recieverId": this._id,
 "recieverName": this.username,
 "time": timeStamp,
  "typ": "representation Request" , 
  "status" : "pending",
  "viewed" : false };
  if( Notifications.find({ "ownerId":  currentUserId , "recieverId":  this._id }).count() > 0 )
 {   alert("you have already sent Request for " + this.username);
 } else
{ Meteor.call('addNotification', myarg2, function(error, result)
  {
    // pupoup bunner added notification
  });
}
//Users.upsert({"_id": currentUserId}, {$set : {"agent.name": "rachini2" }  });
  }
});*/
Template.seeprofile.onCreated(function(){
 Meteor.subscribe("USERS"); 
  Meteor.subscribe("rating"); 
  Meteor.subscribe("images"); 
  Meteor.subscribe("notifications");
  Meteor.subscribe("songs");
  Meteor.subscribe('Calendars');
  Meteor.subscribe('venues');
 /*setTimeout(function(){
  $.getScript('../js/zwindows.js');    
},2000);*/
});
Template.seeprofile.onRendered(function()
{
   $(".sendmessagecontent").niceScroll({zindex:9999999999999999,cursorborder:"0px solid gray",cursorborderradius:"2px",cursorcolor:"#ff6600",cursoropacitymin:.1}); 
    $(".sendmessagecontent").getNiceScroll().show();
});
Template.homeBlogs.onCreated(function(){
 Meteor.subscribe("USERS"); 
 Meteor.subscribe("blogs"); 
 });
Template.singelblog.onCreated(function(){
 Meteor.subscribe("USERS"); 
 Meteor.subscribe("blogs"); 
 });
Template.homeBlogs.onRendered(function(){
 $('html').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1});     
$('.blogcontent').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"black",cursoropacitymin:.1}); 
 });
Template.singelblog.onRendered(function(){
 $('html').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1});     
$('.commentcontent').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"black",cursoropacitymin:.1}); 
 });
Template.homeEvents.events
({
'click .evo_fc_day':function(e, t)
{
var datenumber = ''+$(e.currentTarget).html()+'';
myDate = Session.get('myDate'); 
myDate.setDate(datenumber);
Session.set('myDate', myDate);
$(e.currentTarget).addClass('on_focus');
$(e.currentTarget).addClass('has_events');
$(e.currentTarget).siblings().removeClass('on_focus');
$(e.currentTarget).siblings().removeClass('has_events');

},
'click .evcal_btn_prev i':function(e, t)
{
  e.stopPropagation();
console.log('mydate is : '+Session.get('myDate'));
myDate = Session.get('myDate'); 
myDate.setMonth(myDate.getMonth() -1 );
myDate.setFullYear(myDate.getFullYear());
Session.set('myDate', myDate);
Session.set("monthName", getMonthName(Session.get('myDate').getMonth()));
},
'click .evcal_btn_next i':function(e, t)
{
  e.stopPropagation();
myDate = Session.get('myDate'); 
myDate.setMonth(myDate.getMonth() + 1 );
myDate.setFullYear(myDate.getFullYear() );
Session.set('myDate', myDate);
Session.set("monthName", getMonthName(Session.get('myDate').getMonth()));
},
});
Template.homeEvents.helpers({
eventslist : function()
  {
    console.log('the month is : ' + Session.get('myDate').getMonth());
    if(parseInt(Session.get('myDate').getMonth() < 10))
      var month = '0'+parseInt(Session.get('myDate').getMonth() + 1);
       else
      var month = parseInt(Session.get('myDate').getMonth() + 1);
    if(parseInt(Session.get('myDate').getDate() < 10))
      var day = '0'+Session.get('myDate').getDate();
       else
      var day = Session.get('myDate').getDate();  
    var startdate = Session.get('myDate').getFullYear()+'-'+month+'-'+ (day ) ;
   var enddate = Session.get('myDate').getFullYear()+'-'+month+'-'+(day);
    console.log('enddate : ' + enddate);
    console.log('start : ' + startdate);

    eventsList = [];
   // events =  Calendars.find({"type" : "public", "start" : { $regex: startdate },  "end": {$lte: enddate } }).fetch();
   events =  Calendars.find({$or: [{ "type" : "public", "start" : { $lt: startdate },  "end": {$gte: startdate } }, { "type" : "public", "start" : { $regex: startdate }}]}).fetch();
   //$or: [ { "type" : "public", "start" : { $lt: startdate }
    console.log(events);
    if(events)
    {
   /* events.forEach(function(currentevent){
eventsList.push({"id":currentevent._id,
 //"title" : currentevent.events[0].title,
 "title" : currentevent.title,
 "startdate" :  currentevent.start,
'enddate': currentevent.events[0].end
 //"startdate" :  currentevent.events[0].start,
  //'enddate': currentevent.events[0].end
  
});
});*/

    return events;
  }
  },
 currentday: function(currentdate)
 {

  return currentdate.slice(8, 10);
 },
 currentTime: function(currentdate)
 {
   return currentdate.slice(11, 16);
 },
currentMonth: function()
{
  return Session.get("monthName");
},
currentYear: function()
{
  return Session.get("myDate").getFullYear();
}
});
/*Template.seecalender.helpers({
  mycalender: function()
  {
    alert(this._id);
    var allevents = [{id: 100, title:'not available', start: '2016-10-05', end: '2016-10-12', textColor: 'black'},
                     {id: 200, title:'not available2', start: '2016-10-05', end: '2016-10-15', textColor: 'black'}];
    //alert('my calender from see calender ...');
     Session.set('eventSrcs', []);
    var evnts = Calendars.find({"bandId": Meteor.userId()}, {sort:{ 'start' : 1 }}).fetch();
    console.log('the band events :');
    console.log(evnts);
    var currentdate = "";
  myDate = new Date(); 
  myYear = myDate.getFullYear();
  var currentdate  = '' + myYear;
  myMonth = ( myDate.getMonth() + 1 );
  if (myMonth < 10)
    currentdate = currentdate  + '-0' +myMonth;
  else 
   currentdate = currentdate  + '-' +myMonth;
   myDay = myDate.getDate();
  if (myDay < 10)
    currentdate = currentdate  + '-0' +myDay;
  else
    currentdate = currentdate  + '-' +myDay;
               Session.set('eventSrcs', evnts);             
               if(evnts)
    {
      if(evnts.length > 0)
      {
        allevents = [];
        evnts.forEach(function(event)
        {
          
          //alert(event.title)
         allevents.push({'title' :'unavailable', 'borderColor':'gray', 'start': event.start, 'end': event.end, 'textColor':'black',backgroundColor:'gray'});
        });
     Session.set('eventSrcs', allevents);
                 setTimeout(function(){
        var j = 0; var i = 0;
              $("#seecalendar").fullCalendar({
                header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month'
      },
      defaultDate: currentdate,
      navLinks: true, // can click day/week names to navigate views
      selectable: false,
      allDay : true,
      droppable: false,
      selectHelper: true ,
      dayRender : function(date, cell)
      {
       j= j+ 1;
        mydate = date.format('YYYY-MM-DD');
          mydate = date.format('YYYY-MM-DD');
          for ( v = 0 ; v < allevents.length ; v++) { 
            if(mydate === allevents[v].start.slice(0,10))// || mydate === allevents[v].end.slice(0,10) )
        {
          var begindate = new Date(''+allevents[v].start.slice(0,10)+'');
          moment(begindate).format('YYYY-MM-DD');
          var enddate = new Date(''+allevents[v].end.slice(0,10)+'');
          moment(enddate).format('YYYY-MM-DD');
          if( enddate > begindate )
          {
            var k = true; 
            while(k === true)
            {
            begindate.setHours(begindate.getHours() + 24);
            var momentdate = moment(begindate).format('YYYY-MM-DD');
            $("td[data-date='"+momentdate+"']").addClass('unavailable');
            if(begindate >= enddate)
            {
              k = false;
            }     
           }
          }
         $("td[data-date='"+mydate+"']").addClass('unavailable');
         v = allevents.length -1;
        }
        };
      },
      
      editable: false,
      eventLimit: true, 
      events   : allevents });
        }, 100); 
          return true;
          }
          else
          {return false} 
}
}
});*/
Template.mycalender.helpers({
  mycalender: function()
  {
     Session.set('eventSrc', []);
    var evnts = Calendars.find({"bandId": Meteor.userId()}).fetch();
    console.log(evnts);
        var currentdate = "";
  myDate = new Date(); 
  myYear = myDate.getFullYear();
  var currentdate  = '' + myYear;
  myMonth = ( myDate.getMonth() + 1 );
  if (myMonth < 10)
    currentdate = currentdate  + '-0' +myMonth;
  else 
   currentdate = currentdate  + '-' +myMonth;
   myDay = myDate.getDate();
  if (myDay < 10)
    currentdate = currentdate  + '-0' +myDay;
  else
    currentdate = currentdate  + '-' +myDay;
               Session.set('eventSrc', evnts);             
               if(evnts)
    {
      
      if(evnts.length > 0)
      {
      console.log('events are ready ...');
    Session.set('eventSrc', evnts);
                 setTimeout(function(){
              $("#mycalendar").fullCalendar({
                header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: currentdate,
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      allDay : true,
      droppable: true,
      selectHelper: true ,
     select: function(start, end) {
     // $(".tabs").on('click', '.uploadvideodiv', function() {
    //Aligning our box in the middle
   var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupevent").height();
    var popupWidth = $("#popupevent").width();
    // Centering
    $("#popupevent").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    // Aligning bg
    $("#addeventbg").css({"height": windowHeight});
  
    // Pop up the div and Bg
      $("#addeventbg").css({"opacity": "0.7"});
      $("#addeventbg").fadeIn("slow");
      $("#popupevent").addClass('zigmaIn').fadeIn("slow");
  //}); 
        //var title = prompt('Event Title:');
        var title = $("#event_name").value;
        var eventData;
        if (title) {
          eventData = {
              id: id,
            title: title,
            start: start,
            end: end
          };
          $('#mycalendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#mycalendar').fullCalendar('unselect');
      },
      eventClick: function(event, element) { 
      $('body').on('click','.removeEvent', function(e){
        //alert("band id : " + event.bandId + " ownerid :"+event.ownerId + " eventid " + event.id + "event._id" + event._id);
        //alert(event.id);
      $('#mycalendar').fullCalendar( 'removeEvents', event._id);
      Meteor.call("removeevent", event._id);
      });
      $('body').on('click','.removevent', function(e){
        //alert("band id : " + event.bandId + " ownerid :"+event.ownerId + " eventid " + event.id + "event._id" + event._id);
        //alert("remove event second way" + event._id);
      $('#mycalendar').fullCalendar( 'removeEvents', event._id);
      Meteor.call("removeevent", event._id);
      $("#eventeditbg").fadeOut("slow");
      $("#popupeditevent").removeClass('zigmaIn').fadeOut("slow");
      });
      $('.updateevent').unbind('click').click(function(e){
        e.preventDefault();
         e.stopPropagation();
        var eventname = $('.neweventname').val();
        var eventtype = $('#Etypeupdate').text();
        var postcode = $('.neweventpostcode').val();
        var eventregion = $('.neweventregionname').val();
        var eventcity = $('.neweventcityname').val();
        var eventaddress = $('.neweventaddress').val();
        var eventvenue = $('.neweventvenue').val();
        var startdate = $(".eventstartdateedit #event_startdate").val();
        var enddate  = $(".eventenddateedit .eventenddate").val();
        var verifeventname = false;
        var verifeventtype = false;
        var verifeventstart = false;
        var verifeventend = false;
        var verifeventcity = false;
        var verifeventregion = false;
        var verifeventaddress = false;
        var verifeventvenue = false;
        var verifeventbuilding = false;
        var verifeventpostcode = false;
     if(startdate.indexOf('PM'))
     {
       time = ""+ (parseInt(startdate.substr(11,2)) +12)+"";
      if(time ==="24")
        time ="00";  
     }
     else
     {
       time = ""+ startdate.substr(11,2) +"";
     }
  sdate = startdate.substr(0,10) + "T"+time+startdate.substr(13,3);
     if(enddate.indexOf('PM'))
     {
       time = ""+ (parseInt(enddate.substr(11,2)) +12)+"";
      if(time ==="24")
        time ="00";
     }
     else
     {
       time = ""+ enddate.substr(11,2) +"";
     }

     edate = enddate.substr(0,10) + "T"+time+enddate.substr(13,3);
     if(eventvenue === "" || eventvenue === undefined || eventvenue ==='venue name')
{
  verifeventvenue = true;
  $("#eventediterr").html("empty venue");
  $(".valideventvenue").addClass('glyphicon-asterisk');
}
if(eventaddress === "" || eventaddress === undefined || eventaddress ==='address')
{
  verifeventaddress = true;
  $("#eventediterr").html("empty address");
  $(".valideventaddress").addClass('glyphicon-asterisk');
}

if(eventcity === "" || eventcity === undefined || eventcity ==='city name')
{
  $("#eventediterr").html("empty city name");
  $(".valideventcity").addClass('glyphicon-asterisk');
  verifeventcity = true;
}
if(eventregion === "" || eventregion === undefined || eventregion ==='region name')
{
  $("#eventediterr").html("empty region name");
  $(".valideventregion").addClass('glyphicon-asterisk');
  verifeventregion = true;
}
if(postcode === "" || postcode === undefined || postcode ==='postcode')
{
  $("#eventediterr").html("empty postcode");
  $(".valideventpostcode").addClass('glyphicon-asterisk');
  verifeventpostcode =true;
}
if(enddate === "DD-MM-YYYY HH:MM" )
{
  var verifeventend = false;
  $("#eventediterr").html("empty end date");
  $(".valideventenddate").addClass('glyphicon-asterisk');
}
if(startdate === "DD-MM-YYYY HH:MM" )
{
  var verifeventstart = true;
  $("#eventediterr").html("empty start date");
  $(".valideventstart").addClass('glyphicon-asterisk');
}
if( eventtype.indexOf('Select') > 0 )
{
  $("#eventediterr").html("empty event type");
  alert(eventtype + ' === select type');
  var verifeventtype = true;
}
if(eventname === "" || eventname === undefined || eventname === "event name")
{
  $("#eventediterr").html("empty event name");
  $(".valideventname").addClass('glyphicon-asterisk');
  verifeventname = true;
}

        if(!verifeventname && !verifeventtype && !verifeventstart && !verifeventend && !verifeventcity && !verifeventregion && !verifeventaddress && !verifeventvenue && !verifeventbuilding && !verifeventpostcode )
        {
        event.title = eventname;
        event.type = eventtype;
        event.cityname = eventcity;
        event.regionname = eventregion;
        event.address = eventaddress;
        event.buildingname = eventvenue;
        event.postcode = postcode;
        event.start = sdate;
        event.end = edate;
        $('#displayeventname').show();
        $('.eventnameedit').hide();
        $('#displayeventtype').show();
        $('.eventtypeedit').hide();
        $('#displayeventstartdate').show();
        $('.eventstartdateedit').hide();
        $('#displayeventenddate').show();
        $('.eventenddateedit').hide();
        $('#displayeventregionname').show();
        $('.eventregionnameedit').hide();
        $('#displayeventcity').show();
        $('.eventcitynameedit').hide();
        $('#displayeventaddress').show();
        $('.addresseventedit').hide();
        $('#displayeventvenue').show();
        $('.venueeventedit').hide();
        $('#displayeventpostcode').show();
        $('.eventpostcodeedit').hide();
        $("#eventeditbg").fadeOut("slow");
        $("#popupeditevent").removeClass('zigmaIn').fadeOut("slow");
        $('#mycalendar').fullCalendar( 'updateEvent', event);
        var myobj = { "id": event._id, "title" : eventname, "start" : sdate, "end" : edate, "postcode": postcode , "cityname" : eventcity, "regionname": eventregion , "address": eventaddress, "buildingname" : eventvenue };
          Meteor.call('updateevent', myobj);
        }  
      });
      
      $('body').on('click','.fc-title', function(e){
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupeditevent").height();
    var popupWidth = $("#popupeditevent").width();
    $("#popupeditevent").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
      $("#eventeditbg").css({"height": windowHeight});
      $("#eventeditbg").css({"opacity": "0.7"});
      $("#eventeditbg").fadeIn("slow");
      $("#popupeditevent").addClass('zigmaIn').fadeIn("slow");   
        //e.preventDefault();
        //e.stopPropagation();
        //alert(event._id);
        var venue = venues.findOne({"eventId": event._id});
        $(".eventnamevalue").text(event.title); //event._id
        $(".eventnameedit input").val(event.title); //event._id

        $(".eventtypevalue").text(event.type); //event.type
        $("#Etypeupdate").text(event.type); //event.type

        $(".eventpostcodevalue").text(venue.postcode);
        $(".eventpostcodeedit input").val(venue.postcode);

        $(".eventregionnamevalue").text(venue.regionname);
        $(".eventregionnameedit input").val(venue.regionname);

        $(".eventcitynamevalue").text(venue.cityname);
        $(".eventcitynameedit input").val(venue.cityname);
        $(".eventaddressvalue").text(venue.address);
       $('.addresseventedit input').val(venue.address);
        $(".eventvenuevalue").text(venue.buildingname);
        $(".venueeventedit input").val(venue.buildingname);

        var starteventdate = ""+event.start.toString()+"";
        starteventdate = starteventdate.slice(0, starteventdate.lastIndexOf(":"));
        $(".eventstartdatevalue").text(starteventdate);
        myDate = new Date(starteventdate); 
        myYear = myDate.getFullYear();
        var currentdate  = '' + myYear;
        myMonth = ( myDate.getMonth() + 1 );
        if (myMonth < 10)
        currentdate = currentdate  + '-0' +myMonth;
        else 
        currentdate = currentdate  + '-' +myMonth;
        myDay = myDate.getDate();
        if (myDay < 10)
        currentdate = currentdate  + '-0' +myDay;
        else
        currentdate = currentdate  + '-' +myDay;
        var hours = parseInt(myDate.getHours());
        if(hours > 12)
        {
          hours = hours - 12;
        if(hours < 10)
          var myhours ='0'+hours;
        else
          var myhours = hours;
        currentdate = currentdate+ ' ' + myhours+':' + myDate.getMinutes()+ ' PM';
        }
        else
        {
         if(hours < 10)
          var myhours ='0'+hours;
        else
          var myhours = hours;
        currentdate = currentdate + ' '+myhourss + ':' + myDate.getMinutes()+ ' AM';
        }
        $(".eventstartdateedit input").val(currentdate);
        if(event.end === null)
            {
        $(".eventenddatevalue").text(starteventdate);
        $(".eventenddateedit input").val(currentdate);
            }
            else
            {
        var endeventdate = ""+event.end.toString()+"";
        endeventdate = endeventdate.slice(0, endeventdate.lastIndexOf(":"));
        $(".eventenddatevalue").text(endeventdate);
        myDate = new Date(endeventdate); 
        myYear = myDate.getFullYear();
        var currentdate  = '' + myYear;
        myMonth = ( myDate.getMonth() + 1 );
        if (myMonth < 10)
        currentdate = currentdate  + '-0' +myMonth;
        else 
        currentdate = currentdate  + '-' +myMonth;
        myDay = myDate.getDate();
        if (myDay < 10)
        currentdate = currentdate  + '-0' +myDay;
        else
        currentdate = currentdate  + '-' +myDay;
        var hours = parseInt(myDate.getHours());
        if(hours > 12)
        {
          hours = hours - 12;
        if(hours < 10)
          var myhours ='0'+hours;
        else
          var myhours = hours;
        currentdate = currentdate+ ' ' + myhours+':' + myDate.getMinutes()+ ' PM';
        }
        else
        {
         if(hours < 10)
          var myhours ='0'+hours;
        else
          var myhours = hours;
        currentdate = currentdate + ' '+myhourss + ':' + myDate.getMinutes()+ ' AM';
        }
        $(".eventenddateedit input").val(currentdate);
            }
        
        
      });
      
     },

      dayRender : function(date, cell)
      {
        //alert("the date is : "+ $.fullCalendar.formatDate(date, 'yyyy-MM-dd')); /*date.getDate()*/
         today = new Date();
          mydate = date.format('YYYY-MM-DD');
        if(mydate === currentdate )
        {
      // cell.css("background-color", "rgba(255, 102, 0, 0.4)");
        //cell.css("background-color", "#ff9752");
         cell.css("background-color", "#ff6600");

        }
        else
        {
          cell.css("background-color", "white");
        } 
      },
      drop: function(date, event) {
        alert('drop' +date);
        console.log('drop' +$("#awesome").data('hash') );
        
          $(this).remove();  
      },
       eventDrop: function(event) {
        alert("id :  " + event._id + "title  :  " + event.title + " was dropped on " + event.start.format() );
       //alert("id :  " + event._id + "title  :  " + event.title + " was dropped on " + event.start.format() + "end date" + event.end.format());
      //var myobj = { "id": event._id,  "start" : event.start.format(), "end" : event.end.format() };
          //Meteor.call('updateevent', myobj);
       }
      ,
      editable: true,
      eventLimit: true, 
      events   : Session.get('eventSrc')});
        }, 100); 
          return true;
          }
          else
          {return false} 

     /*setTimeout(function(){
      alert('integration the calendar');
       $("#mycalendar").fullCalendar({
                header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2016-09-30',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      allDay : true,
      droppable: true,
      selectHelper: true });
       return true ;
     }, 20000);*/
 alert('my calendar helper ....');
  $('.fc-view').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
  $('.fc-scroller').niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
  
}
}
});
Template.mycalender.events({
'click #neweent': function(e){
      //alert($("#awesome").data('hash'));
    //e.preventDefault();
    //alert('edit event');
    eventData = {
             
            title:'new events ...', // $(this).data('title'),
            start:  '2016-10-13',//$(this).data('start'),
            end: '2016-10-13'//$(this).data('end')
          };
          console.log(eventData);
          $('#mycalendar').fullCalendar('renderEvent', eventData, true); 
    }

});
 
Template.mycalender.onRendered(function(){  
    Meteor.subscribe('venues');
});
Template.seecalender.onRendered(function(){  
    Meteor.subscribe('venues');
});
   /*$('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2016-09-12',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      allDay : true,
      droppable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
             // id: id,
            title: title,
            start: start,
            end: end
          };
          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');
      },
      eventClick: function(event, element) { 
      $('body').on('click','.fc-close', function(){
      $('#calendar').fullCalendar( 'removeEvents', event._id);
      });
     },
      dayRender : function(date, cell)
      {
       cell.css("background-color", "yellow");
      },
      drop: function(date, event) {
        alert('drop' +date);
        console.log('drop' +$("#awesome").data('hash') );
        
          $(this).remove();  
      },
       eventDrop: function(event) {
        alert(event.title + " was dropped on " + event.start.format());
    }
      ,
      editable: true,
      eventLimit: true, 
      eventSources   : eventSrc
    });*/
/*Template.mycalender.helpers({
        calendarOptions: {
            // Standard fullcalendar options
            height: 700,
            hiddenDays: [ 0 ],
            slotDuration: '01:00:00',
            minTime: '08:00:00',
            maxTime: '19:00:00',
            lang: 'eng',
            // Function providing events reactive computation for fullcalendar plugin
            events: function(start, end, timezone, callback) {
                //console.log(start);
                //console.log(end);
                //console.log(timezone);
                var events = [];
                // Get only events from one document of the Calendars collection
                // events is a field of the Calendars collection document
                var calendar = Calendars.findOne(
                    { "_id":"myCalendarId" },
                    { "fields": { 'events': 1 } }
                );
                // events need to be an array of subDocuments:
                // each event field named as fullcalendar Event Object property is automatically used by fullcalendar
                if (calendar && calendar.events) {
                    calendar.events.forEach(function (event) {
                        eventDetails = {};
                        for(key in event)
                            eventDetails[key] = event[key];
                        events.push(eventDetails);
                    });
                }
                callback(events);
            },
            // Optional: id of the calendar
            id: "calendar2",
            // Optional: Additional classes to apply to the calendar
            addedClasses: "col-md-8",
            // Optional: Additional functions to apply after each reactive events computation
            autoruns: [
                function () {
                    console.log("user defined autorun function executed!");
                }
            ]
        },
    });*/
Template.homeEvents.onCreated(function(){
  Meteor.subscribe('Calendars');
  var date = new Date(Date.now());
  Session.setDefault('myDate', date);
  console.log(Session.get('myDate'));
});
Template.homeBands.onCreated(function(){
   Session.setDefault("skipbands", 0);
  Session.setDefault('currentbandspage', 1);
  Meteor.subscribe('Calendars');
  Session.setDefault('locations', null);
});
 Template.homeEvents.onRendered(function(){
  this.autorun(function(){
   $('.eventon_fc_days').nextAll('p').remove(); 
   //$('.eventon_fullcal').append('.eventon_fc_daynames'); 

 // Session.set('myDate', Session.get('myDate'));
setCal();
function getTime() {
// initialize time-related variables with current time settings
var now = Session.get('myDate');
var hour = now.getHours()
var minute = now.getMinutes()
now = null
var ampm = "" 

// validate hour values and set value of ampm
if (hour >= 12) {
hour -= 12
ampm = "PM"
} else
ampm = "AM"
hour = (hour == 0) ? 12 : hour

// add zero digit to a one digit minute
if (minute < 10)
minute = "0" + minute // do not parse this number!

// return time string
return hour + ":" + minute + " " + ampm
}

function leapYear(year) {
if (year % 4 == 0) // basic rule
return true // is leap year
 // else not needed when statement is "return"
return false // is not leap year
}

function getDays(month, year) {
// create array to hold number of days in each month
var ar = new Array(12)
ar[0] = 31 // January
ar[1] = (leapYear(year)) ? 29 : 28 // February
ar[2] = 31 // March
ar[3] = 30 // April
ar[4] = 31 // May
ar[5] = 30 // June
ar[6] = 31 // July
ar[7] = 31 // August
ar[8] = 30 // September
ar[9] = 31 // October
ar[10] = 30 // November
ar[11] = 31 // December

// return number of days in the specified month (parameter)
return ar[month]
}

function getMonthName(month) {
// create array to hold name of each month
var ar = new Array(12)
ar[0] = "January"
ar[1] = "February"
ar[2] = "March"
ar[3] = "April"
ar[4] = "May"
ar[5] = "June"
ar[6] = "July"
ar[7] = "August"
ar[8] = "September"
ar[9] = "October"
ar[10] = "November"
ar[11] = "December"

// return name of specified month (parameter)
return ar[month]
}
function setCal() {
// standard time attributes
var now = Session.get('myDate');
var year = now.getYear();
Session.set("currentYear", now.getFullYear());
if (year < 1000)
year+=1900
var month = now.getMonth()
Session.set('monthnumber', month);
var monthName = getMonthName(Session.get('monthnumber'));
Session.set("monthName", monthName);
var date = now.getDate();
now = null

// create instance of first day of month, and extract the day on which it occurs
var firstDayInstance = new Date(year, month, 1)
var firstDay = firstDayInstance.getDay()
firstDayInstance = null

// number of days in current month
var days = getDays(month, year)

// call function to draw calendar
drawCal(firstDay + 1, days, date, monthName, year)
}

function drawCal(firstDay, lastDate, date, monthName, year) {
var text = "" // initialize accumulative variable to empty string

// declaration and initialization of two variables to help with tables
var digit = 1
var curCell = 1

for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) ); ++row) {
//text += '<div class="eventon_fc_days">'
//for (var col = 1; col <= 7; ++col) {
if (digit > lastDate)
break
if (curCell < firstDay) {
text += '<p class="evo_fc_day"></p>';
curCell++
} else {
  if(digit === parseInt(date))
text += '<p class="evo_fc_day has_events on_focus">' + digit + '</p>'
else
text += '<p class="evo_fc_day">' + digit + '</p>'

digit++
}
//}
//text += '</div>'
}
 $(".eventon_fullcal").append(text);
 $(".eventon_fullcal").append('<div class="clear"></div>');

}
});
 });
Template.homeBlogs.helpers({
blogs: function () {
 return blogs.find({}).fetch(); 
},
blogscomments: function(id){
    var blog = blogs.findOne({"_id": id } , { fields: { "comments": 1} });
    if (blog.comments.length > 0)
    {
        return  blog.comments.length;    

    }
    else 
    {
      return false;
    }
  }
,
formatdate: function(timeStamp)
  {
   myDate = new Date(timeStamp); 
   myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
   return "" + myDay+ "-" +myMonth + "-" +myYear+"";
  }
  ,
   isUploading: function () {
        return Boolean(uploader.get());
    },
    progress: function () {
    var upload = uploader.get();
    console.log(upload);
    if (upload)
    {
$(".imageblogprogress").show();
      if(Math.round(upload.progress()*100) === 100)
      {
       $("#addblogimagebg").fadeOut("slow");
    $("#popupblogimage").removeClass('zigmaIn').fadeOut("slow");
    $(".songuploadbox").css({"visibility":"visible"});
    $('.songuploadbox').fadeOut(8000);
    /*setTimeout(function(){
      $(".songuploadbox").css({"visibility":"hidden"});
    }, 2000);*/
      }
    return Math.round(upload.progress() * 100);
  }
    }
 });
Template.singelblog.helpers({
blog: function () {
 return blogs.findOne({"_id":this._id}); 
},
formatdate: function(timeStamp)
  {
   myDate = new Date(timeStamp); 
   myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
   return "" + myDay+ "-" +myMonth + "-" +myYear+"";
  },
  allcomments: function(){
    var blog = blogs.findOne({"_id": this._id } , { fields: { "comments": 1} });
    if (blog.comments.length > 0)
    {
        return  blog.comments;    
    }
    else 
    {
      return false;
    }
  }
 });
Template.singelblog.events({
  'mouseenter .showcomments li':function(e, t)
  {
   var blog = blogs.findOne({"_id": $('.showcomments').attr('id')});
   var author = "";
   var liId = parseInt($(e.currentTarget).attr('id'));
   console.log($(e.currentTarget).attr('id'));
   var user = Users.findOne({"_id" : Meteor.userId() });
   var username = "";
   if(user.profile.type == "band")
     username = user.profile.bandName;
   else
    username = user.username;
   for (var i =  0 ; i < blog.comments.length ; i++) {
    author = String(blog.comments[i].author.toString());

  if( author === username  )
  {
   $('.showcomments').children('li').eq(i).children().find(' > .reply').css({'opacity' : 1});
  }
  else
  {
   $('.showcomments').children('li').eq(i).children().find(' > .reply').css({'opacity' : 0});
  }
}
    e.preventDefault();
  },
  'click .postComment': function(e, t)
  {
    e.preventDefault();
   var myobj = {};
    event.preventDefault();
          var content = t.find(".commentcontent").value;
          var author = Users.findOne({"_id": Meteor.userId() },  { fields: { profile: 1 , username : 1}});
          var timeStamp = Math.floor(Date.now()); 
          var username = "";
          if(author.profile.type == "band")
            username = author.profile.bandName;
          else
            username = author.username;
          myobj = {"id": this._id ,"author": username ,  "content": content , "timeStamp" : timeStamp};
        
          Meteor.call('addComment', myobj);
          setTimeout(function(){
          t.find(".commentcontent").value = "";
          }, 500);
        //  t.find(".inputmemebername").value = "";
        //  t.find(".memeberoleinput").value = "";
//}
  },
    'click .editComment': function(e, t)
  {
    e.preventDefault();

    event.preventDefault();
   var myobj = {};
    event.preventDefault();
          var title = t.find(".blgtitle").value;
          var content = t.find(".blogcontent").value;
          var author = Users.findOne({"_id": Meteor.userId() },  { fields: { username: 1 }});
          var timeStamp = Math.floor(Date.now()); 
         //  if( (membername !== "") && ( membername !== null) && (memberrole !== "") && ( memberrole !== null)  )
         // {
          myobj = {"author": author.username , "title": title, "content": content , "timeStamp" : timeStamp};
          Meteor.call('addBlog', myobj);
          setTimeout(function(){
            t.find(".blgtitle").value = "";
          t.find(".blogcontent").value = "";
          $('.createblogform').slideToggle();
          }, 500);
        //  t.find(".inputmemebername").value = "";
        //  t.find(".memeberoleinput").value = "";
//}
  },
    'click .removecomment': function(e, t)
  {

/*
var blog = blogs.findOne({"_id": $('.showcomments').attr('id')});
   var author = "";
   var liId = parseInt($(e.currentTarget).attr('id'));
   console.log($(e.currentTarget).attr('id'));
   var user = Users.findOne({"_id" : Meteor.userId() });
    author = String(blog.comments[liId].author.toString());
  if( author === user.profile.bandName)
  {
   $('.showcomments').children('li').eq(liId).children().find(' > .reply').css({'opacity' : 1});
  }
    e.preventDefault();
  
*/
var blog = blogs.findOne({"_id": $('.showcomments').attr('id')});
   var author = "";
  var user = Users.findOne({"_id" : Meteor.userId() });
  var username = "";
  if(user.profile.type == "band")
    username = user.profile.bandName;
  else
    username = user.username;
   /* author = String(blog.comments[parseInt($(e.currentTarget).attr('id'))].author.toString());
    alert(author + "comment number " + $(e.currentTarget).attr('id') );
    alert($(e.currentTarget).parent().html());*/

 /*var blog = blogs.findOne({"_id": $('.showcomments').attr('id')});
   var author = "";
   var liId = parseInt($(e.currentTarget).attr('id'));
   console.log($(e.currentTarget).attr('id'));
   var user = Users.findOne({"_id" : Meteor.userId() });
   for (var i =  0 ; i < blog.comments.length ; i++) {
    author = String(blog.comments[i].author.toString());
  if( author === user.profile.bandName  )
  {
   $('.showcomments').children('li').eq(i).children().find(' > .reply').css({'opacity' : 1});
  }
}*/

    e.preventDefault();
    for (var i = 0 ; i < blog.comments.length; i++) {
   // alert($(e.currentTarget).attr('id') + " " + blog.comments[i].id);
    if(blog.comments[i].id.toString() == $(e.currentTarget).attr('id').toString() && blog.comments[i].author === username)
    {
    //  alert('removing');
    var commentid =   $(e.currentTarget).attr('id');
          myobj = {"commentid": commentid  , "blogid": $('.showcomments').attr('id') };
          Meteor.call('removecomment', myobj); 
          }
    }
  }
 });
Template.homeBlogs.events({
  'click .postblog': function(e, t)
  {   
  var file = null;
  e.preventDefault();
    var reader = null;
file = t.find('.uploadblogimage').files[0];
//if(file.name.indexOf(".jpeg") > 0 || file.name.indexOf(".jpg") > 0 || file.name.indexOf(".png") > 0) 
 reader = new FileReader();
 var upload = new Slingshot.Upload("myblogImageUploads");              
         upload.send(document.getElementById('uploadblogimage').files[0], function (error, downloadUrl) {
             uploader.set();
             console.log("uploader is : " + uploader.get());
             if (error) {
               //console.error('Error uploading');
               alert(error);
               console.log(error);
             }
             else{
               console.log('uploaded file available here: '+downloadUrl);
              /* var obj = {imageName: document.getElementById('uploadblogimage').files[0].name,
                   imageurl :downloadUrl
                    };*/
          var title = t.find(".blgtitle").value;
          var content = t.find(".blogcontent").value;
          var author = Users.findOne({"_id": Meteor.userId() },  { fields: { username: 1 }});
          var timeStamp = Math.floor(Date.now()); 
         //  if( (membername !== "") && ( membername !== null) && (memberrole !== "") && ( memberrole !== null)  )
         // {
          myobj = {"author": author.username , "title": title, "imageurl":downloadUrl , "content": content , "timeStamp" : timeStamp};
          Meteor.call('addBlog', myobj);
          setTimeout(function(){
            t.find(".blgtitle").value = "";
          t.find(".blogcontent").value = "";
          $('.createblogform').slideToggle();
          }, 500);
        //  t.find(".inputmemebername").value = "";
        //  t.find(".memeberoleinput").value = "";
                  }
              // Meteor.call('uploadimage', obj, function(error, result){
  });                      
         uploader.set(upload);
reader.readAsDataURL(file);

var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupblogimage").height();
    var popupWidth = $("#popupblogimage").width();
    // Centering
    $("#popupblogimage").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    var mysongname = file.name; 
    $(".currentsonname").html(mysongname);
    var mysongname =  mysongname.slice(0, mysongname.lastIndexOf(".mp3"));
    $('#song_name').val(mysongname);
    // Aligning bg
    $("#addblogimagebg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#addblogimagebg").css({"opacity": "0.7"});
      $("#addblogimagebg").fadeIn("slow");
      $("#popupblogimage").addClass('zigmaIn').fadeIn("slow");

//return false;
    /*
    e.preventDefault();
   var myobj = {};
    event.preventDefault();
          var title = t.find(".blgtitle").value;
          var content = t.find(".blogcontent").value;
          var author = Users.findOne({"_id": Meteor.userId() },  { fields: { username: 1 }});
          var timeStamp = Math.floor(Date.now()); 
         //  if( (membername !== "") && ( membername !== null) && (memberrole !== "") && ( memberrole !== null)  )
         // {
          myobj = {"author": author.username , "title": title, "content": content , "timeStamp" : timeStamp};
          Meteor.call('addBlog', myobj);
          setTimeout(function(){
            t.find(".blgtitle").value = "";
          t.find(".blogcontent").value = "";
          $('.createblogform').slideToggle();
          }, 500);
        //  t.find(".inputmemebername").value = "";
        //  t.find(".memeberoleinput").value = "";
//}
*/
  },
  'change .uploadblogimage':function(e)
  {
    e.preventDefault();
    $('.uploadedblogimage').html(document.getElementById('uploadblogimage').files[0].name); 
  }
 
 });
Template.homeIndex.onCreated(function(){
 setTimeout(function(){
$.getScript('../js/zzzrevolution.js');
}, 2000);
});
Template.seeprofile.events({
  'mouseenter .icon-star' :function(e, t)
  {
     var id = parseInt($(e.currentTarget).attr('id'));
    $(".ratingdiv p i").each(function(i)
      {
        if(i+1 <= id )
        $(this).css({'color' : '#ffb800'});
      });  
  },
  'mouseleave .icon-star': function(e, t)
  {
  $(".ratingdiv p i").each(function(i)
      {
        if(Session.get('myratings') < i + 1 )
        $(this).css({'color' : 'gray'});
      });  
  },
  'click .icon-star': function(e, t)
  {
    ratingvalue =  parseInt($(e.currentTarget).attr('id'));
    var myobj = {"bandId": this._id, "userId": Meteor.userId(), "username": Meteor.userId() , "ratingvalue": ratingvalue};
   Meteor.call('incremetRating', myobj);//:  function(obj)
  },
  'click .sendMessage': function(e, t)
  {
    reciever = Users.findOne({ "_id": this._id }, {profile : 1});
     sender = Users.findOne({ "_id": Meteor.userId() }, {profile : 1});
  var chattext = t.find(".sendmessagecontent").value;
  if(/\S/.test(chattext))
 {
  if(validatemessagetext(chattext))
  {
  var timeStamp = Math.floor(Date.now());
  if(reciever.profile.type === "band")
    var recievername = reciever.profile.bandName;
  else
    var recievername = reciever.username;

if(sender.profile.type === "band")
    var sendername = sender.profile.bandName;
  else
    var sendername = sender.username;
 var myobj = {"senderId" : Meteor.userId() , "recieverId": this._id, "timeStamp" : timeStamp, "content" : chattext , "status" : 'pending' };
 var myobj2 = {"senderId" : Meteor.userId() ,"senderName":  sendername , "recieverId": this._id, "recieverName": recievername  };
 Meteor.call('sendMessage', myobj, function(err, result){
 if (result)
 {
       $("#sendmessagepopupbg").removeClass('zigmaIn').fadeOut("slow");
       $(".sendmessagecontent").val('');
       $("#sendmessagepopup").removeClass('zigmaIn').fadeOut("slow");
       $(".validmessage").html("");
 
  $('.chat').scrollTop($('.chat')[0].scrollHeight);
  $(".sendmessagecontent").val('');
  if(sender.profile.hasOwnProperty('friends'))
  {
    if(sender.profile.friends.length > 0)
    {
    for (var i = 0 ; i < sender.profile.friends.length; i++) {
      if(sender.profile.friends[i].id === reciever._id )
      {
      i = sender.profile.friends.length + 10;
      }
      if((sender.profile.friends[i].id !== reciever._id)  && (i === (sender.profile.friends.length -1)) )
      {
        Meteor.call('addfriend', myobj2);
      }
    };
  }
  if(sender.profile.friends.length === 0)
  {
    Meteor.call('addfriend', myobj2);
  }
  }
  else
    {     Meteor.call('addfriend', myobj2);
    }
 //hide the send message popup   
 }
  }); 
}
}
 else
 {
  $(".validmessage").html("empty message");
 }
  },
  'click #event_regionname':function(e, t)
{
  var postecode =""; postecode = $('#event_postcode').val();
  //alert('event_regionname click '  + postecode);
    if(postecode !== undefined &&  postecode !== "" /*&& postecode.length === 6*/) {
     Meteor.call('getplace', postecode ,  function(err, result){
      if(err) {
            $('#emptyeventpostecodeerr').html('postcode not covered'); $('#emptyeventpostecodeerr').show();
                myobj = {"id": Meteor.userId(), "postecode": "" +$('#event_postcode').val()+""   };
              //  Meteor.call('savepostecode', myobj);
              }
      else{
       var addressesRow = [] ; var values = [];
       for (var i = 0 ; i <result.Addresses.length ; i++) {
       addressesRow =  result.Addresses[i].split(",");
       $('.eventregionnameedit #event_regionname').val(addressesRow[addressesRow.length - 1]);
       $('#event_regionname').val(addressesRow[addressesRow.length - 1]);

      $(' #event_cityname').val(addressesRow[addressesRow.length - 2]);
      $('.eventcitynameedit #event_cityname').val(addressesRow[addressesRow.length - 2]);

       $('#event_address').html(addressesRow[0]);
       //alert(addressesRow[0]);
       $('.addresseventedit input').val(addressesRow[0]);

       $('.postcodeevent .zonecodes').empty();
       $('.addresseventedit ul').empty();

       for (var j = ( addressesRow.length - 3 ); j >= 0; j--)
        {
          if(addressesRow[j].length > 6)
          {
            values.push(addressesRow[j]);
              $('.postcodeevent .zonecodes').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
              $('.postcodeevent ul li span').eq(0).css({'text-decoration': 'underline'});


              $('.addresseventedit ul').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
              $('.addresseventedit ul li span').eq(0).css({'text-decoration': 'underline'});

        }; };
    }
    var postecode  = t.find("#event_postcode").value;
    if( (postecode !== "") && ( postecode !== null) && (postecode !== undefined)  )
          { myobj = {"id": Meteor.userId(), "postecode": "" +postecode+""   }; // Meteor.call('savepostecode', myobj);     
          } }
  Session.set("alladresses", values); 
    $('#event_address').val(values[0]);
     $('#event_address').html(values[0]);
});
}
}
, 
  'keyup #event_address': function(e, t ){
    values = Session.get("alladresses");
   search = $('#event_address').val();
// Search regular expression
  // Clear the ul
  $('.addressnameevent .zonecodes').empty();
for(var i = 0 ; i < values.length; i++){
  //$("#uladdress").append("<li><span> "+ values[i]+" </span>");
  if(values[i].match(search)){
//alert('much ... values i ' + values[i] + "search input " + search);
    $('.addressnameevent .zonecodes').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.addressnameevent .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
  }
}
$(".addressnameevent .zonecodes").show();
}
,

'click .savebooking': function(e, t)
{
var Currentuser =  Users.findOne({"_id": Meteor.userId() },  { fields: { username: 1 }});
var band = Users.findOne({"_id": this._id}, {"profile" : 1 } );
var eventname = t.find("#event_name").value;
var postcode = t.find("#event_postcode").value;
var eventregion = t.find("#event_regionname").value;
var eventcity = t.find("#event_cityname").value;
var eventaddress = t.find("#event_address").value;
var eventvenue = t.find("#event_venue").value;
var startdate = t.find("#event_startdate").value; 
var enddate  = t.find("#event_enddate").value;
var postcode = t.find("#event_postcode").value;
var verifeventname = false;
var verifeventstart = false;
var verifeventend = false;
var verifeventcity = false;
var verifeventregion = false;
var verifeventaddress = false;
var verifeventvenue = false;
var verifeventbuilding = false;
var verifeventpostcode = false;
if(startdate.indexOf('PM'))
     {
       time = ""+ (parseInt(startdate.substr(11,2)) +12)+"";
      if(time ==="24")
        time ="00";  
     }
     else
     {
       time = ""+ startdate.substr(11,2) +"";
      
     }
  sdate = startdate.substr(0,10) + "T"+time+startdate.substr(13,3);//21:00:00";//+time+startdate.substr(13,3);
     //   alert(sdate);
     
     if(enddate.indexOf('PM'))
     {
       time = ""+ (parseInt(enddate.substr(11,2)) +12)+"";
      if(time ==="24")
        time ="00";
     }
     else
     {
       time = ""+ enddate.substr(11,2) +"";
     }
     edate = enddate.substr(0,10) + "T"+time+enddate.substr(13,3);//21:00:00";//+time+startdate.substr(13,3);

if(eventvenue === "" || eventvenue === undefined || eventvenue ==='venue name')
{
  verifeventvenue = true;
  $("#eventerr").html("empty venue");
  $(".valideventvenue").addClass('glyphicon-asterisk');
}
if(eventaddress === "" || eventaddress === undefined || eventaddress ==='address')
{
  verifeventaddress = true;
  $("#eventerr").html("empty address");
  $(".valideventaddress").addClass('glyphicon-asterisk');
}

if(eventcity === "" || eventcity === undefined || eventcity ==='city name')
{
  $("#eventerr").html("empty city name");
  $(".valideventcity").addClass('glyphicon-asterisk');
  verifeventcity = true;
}
if(eventregion === "" || eventregion === undefined || eventregion ==='region name')
{
  $("#eventerr").html("empty region name");
  $(".valideventregion").addClass('glyphicon-asterisk');
  verifeventregion = true;
}
if(postcode === "" || postcode === undefined || postcode ==='postcode')
{
  $("#eventerr").html("empty postcode");
  $(".valideventpostcode").addClass('glyphicon-asterisk');
  verifeventpostcode =true;
}
if(enddate === "DD-MM-YYYY HH:MM" )
{
  var verifeventend = false;
  $("#eventerr").html("empty end date");
  $(".valideventenddate").addClass('glyphicon-asterisk');
}
if(startdate === "DD-MM-YYYY HH:MM" )
{
  var verifeventstart = true;
  $("#eventerr").html("empty start date");
  $(".valideventstart").addClass('glyphicon-asterisk');
}

if(eventname === "" || eventname === undefined || eventname === "event name")
{
  $("#eventerr").html("empty event name");
  $(".valideventname").addClass('glyphicon-asterisk');
  verifeventname = true;
}

        if(!verifeventname  && !verifeventstart && !verifeventend && !verifeventcity && !verifeventregion && !verifeventaddress && !verifeventvenue && !verifeventbuilding && !verifeventpostcode )
        {
          myobj = { "title" : eventname, "type" : "private", "start" : sdate, "end" : edate , "ownerId": Meteor.userId(), "bandId": band._id, "postcode": postcode , "cityname" : eventcity, "regionname": eventregion , "address": eventaddress, "buildingname" : eventvenue };
         // Meteor.call('addEvent', myobj, function(err, result){ 
           $("#addeventbg").removeClass('zigmaIn').fadeOut("slow");
           $("#event_name").val("event name");
           $("#event_startdate").val("DD-MM-YYYY HH:MM");
           $("#event_enddate").val("DD-MM-YYYY HH:MM");
             $("#event_postcode").val('postcode');
             $("#event_cityname").val('city name');
             $("#event_regionname").val('region name');
             $(".zonecodes").hide();
             $("#event_address").val('address');
             $("#event_venue").val('venue name');
             $(".valideventname").removeClass('glyphicon-asterisk');
             $(".valideventstart").removeClass('glyphicon-asterisk');
             $(".valideventenddate").removeClass('glyphicon-asterisk');
             $(".valideventpostcode").removeClass('glyphicon-asterisk');
             $(".valideventregion").removeClass('glyphicon-asterisk');
             $(".valideventcity").removeClass('glyphicon-asterisk');
             $(".valideventaddress").removeClass('glyphicon-asterisk');
             $(".valideventvenue").removeClass('glyphicon-asterisk');
             $("#eventerr").html("");
             $("#popupevent").removeClass('zigmaIn').fadeOut("slow");
             $("#addeventbg").removeClass('zigmaIn').fadeOut("slow");
             var timeStamp = Math.floor(Date.now()); 
             var myarg2 = { "ownerId": Currentuser._id,
             "ownerName": Currentuser.username,
             "recieverId": band._id,
             "recieverName": band.username,
             "time": timeStamp,
             "typ": "Booking Request" , 
             "status" : "pending",
             "viewed" : false };
       // Meteor.call('addNotification', myarg2);
        StripeCheckout.open({
        key: 'pk_test_ttDtWgEzdTLxocVFZR64GmIh',
        image:'images/logo_300_png.png',
        amount : parseInt(band.profile.salary)*100, // this is equivalent to $50
        name: 'Payment Process',
        description: 'Salary ($'+parseInt(band.profile.salary)+')',
        panelLabel: 'Pay now',
        token: function(res) {
          stripeToken = res.id;
         var  amount = parseInt(band.profile.salary)*100;
            alert(res.id +' '+ res.card.name);//+ ''+res.source.name);
           console.log('res \n');
          console.log(res);
          console.log('res');
          var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#paymentpopup").height();
    var popupWidth = $("#paymentpopup").width();
    // Centering
    $("#paymentpopup").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    //$(".currentsonname").html(mysongname);
    //$('#song_name').val(mysongname);
    // Aligning bg
    $("#paymentpopupbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#paymentpopupbg").css({"opacity": "0.7"});
      $("#paymentpopupbg").fadeIn("slow");
      $("#paymentpopup").addClass('zigmaIn').fadeIn("slow");
      $("#paymentpopup p.reciept").text('your reciept id :'+ res.id);
      $("#paymentpopup p.rcptmail").text('We sent it for you on :'+ res.card.name);

             var mystripeToken = {'stripeToken': stripeToken, 'amount': amount}
          Meteor.call('chargeCard', mystripeToken,  function(err, result)
            {
              if(err)
              {
                console.log('threr is an error :');
                console.log(err);
              }
              if(result)
              {
              console.log('res is :\n');
             // alert('thanks for your trust thisis your reciept : '+stripeToken+' we sent it for you by mail also');
             alert(stripeToken+' we sent it for you by mail also');
           
            console.log('charge : \n');
            console.log(result.amount);
           }
            /*var myarg2 = { "ownerId": Currentuser._id,
             "ownermail": res.mail,
             "amount": res.mail,
             "bandId": band._id,
             "bandName": band.username,
             "time": timeStamp,
             "type": "booking payment" };*/
            });
        }
      });
           //});
    
}
},
  'click .addwishlist' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
     var user = Users.findOne({"_id" :Meteor.userId() });
      if (user.whishlist.length > 0 )
    {
      for (var i = 0 ; i < user.whishlist.length ;  i++) {
        if(user.whishlist[i].id === this._id)
        {
          i = user.whishlist.length;
        }
        else
        { 
          if(i === user.whishlist.length -1 && user.whishlist[i].id !== this._id)
        {
         myobj = {"id": Meteor.userId(), "itemid": this._id, "itemname": this.username };
         Meteor.call('savewhishlistitem', myobj);
       }
     
        }
      };
    }
    else 
    {
      myobj = {"id": Meteor.userId(), "itemid": this._id, "itemname": this.username };
      Meteor.call('savewhishlistitem', myobj);
      
    }
          //myobj = {"id": Meteor.userId(), "itemid": this._id, "itemname": this.username };
        //  Meteor.call('savewhishlistitem', myobj);
    /*
          var membername = t.find(".inputmemebername").value;
          var memberrole = t.find(".memeberoleinput").value;
           if( (membername !== "") && ( membername !== null) && (memberrole !== "") && ( memberrole !== null)  )
          {
          myobj = {"id": Meteor.userId(), "membername": membername, "memberrole": memberrole };
          Meteor.call('savewhishlistitem', myobj);
          setTimeout(function(){
            t.find(".inputmemebername").value = "";
          t.find(".memeberoleinput").value = "";
          }, 500);*/
        //  t.find(".inputmemebername").value = "";
        //  t.find(".memeberoleinput").value = "";
  },
  'click .messagessicon': function(e, t)
  {
    //alert('message popup')
    
   var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#sendmessagepopup").height();
    var popupWidth = $("#sendmessagepopup").width();
    // Centering
    $("#sendmessagepopup").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    // Aligning bg
      $("#sendmessagepopupbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#sendmessagepopupbg").css({"opacity": "0.7"});
      $("#sendmessagepopupbg").fadeIn("slow");
      $("#sendmessagepopup").addClass('zigmaIn').fadeIn("slow");
  },
  'click .bookband' :function(e, t)
  {
    e.preventDefault();
    //Aligning our box in the middle
   /* var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#bookingdetails").height();
    var popupWidth = $("#bookingdetails").width();
    // Centering
    $("#bookingdetails").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    // Aligning bg
    $("#bookingdetailsbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#bookingdetailsbg").css({"opacity": "0.7"});
      $("#bookingdetailsbg").fadeIn("slow");
      $("#bookingdetails").addClass('zigmaIn').fadeIn("slow");
      */
      $("#popupevent .bookingtype").hide();
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupevent").height();
    var popupWidth = $("#popupevent").width();
    // Centering
    $("#popupevent").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    // Aligning bg
    $("#addeventbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#addeventbg").css({"opacity": "0.7"});
      $("#addeventbg").fadeIn("slow");
      $("#popupevent").addClass('zigmaIn').fadeIn("slow");
      
      /*
      StripeCheckout.open({
        key: 'pk_test_ttDtWgEzdTLxocVFZR64GmIh',
        image:'images/logo_300_png.png',
        amount: 5000, // this is equivalent to $50
        name: 'Giggorilla payment',
        description: 'Salary ($50.00)',
        panelLabel: 'Pay the booked band',
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          alert('res.id : ' + res.id)
          Meteor.call('chargeCard', stripeToken, function(err, res)
            {
              console.log('res is ');
              console.log(stripeToken);
            });
        }
      });*/
  },
  'click .seegallery': function(e, t)
  {
if ($("#tp-grid")[0]) {
  var $grid = $( '#tp-grid' ),
  $name = $( '#name' ),
  $close = $( '#close' ),
  $loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
  stapel = $grid.stapel( {
    randomAngle : false,
    delay : 100,
    gutter : 0,
    pileAngles : 0,
    onLoad : function() {
      $('.addAlbum').hide();
      $('.removeAlbum').hide();
      $loader.remove();
              },
    onBeforeOpen : function( pileName ) {
      $name.html( pileName );
      $('.removeAlbum').hide();
      $('.addAlbum').hide();
      //$('.removeAlbum').css('visibility', 'hidden');
                      },
    onAfterOpen : function( pileName ) {
      showDelte = 1;
      $('.addAlbum').hide();
     // $('.removeAlbum').css('visibility', 'hidden');
      $('.removeAlbum').hide();
      $('.def-block').on('mouseenter', 'ul.tp-grid li ', function(){
        if(showDelte === 1)
          {
          $(this).find('> div.removeDiv').show();
          }
      }).on('mouseleave', 'ul.tp-grid li', function () {
        //$(".removeDiv").hide();
                              });
      $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
      $close.show();
                      }
    });
    $close.on( 'click', function() {
      $('.addAlbum').hide();
      $(".removeAlbum").show();
      $(this).hide();
      $("a[rel^='prettyPhoto']").prettyPhoto().unbind();
      //$(".removeDiv").hide();
      $name.empty().html('Photo Gallery');
      stapel.closePile();
      stapel = $grid.stapel( {
        randomAngle : false,
        delay : 100,
        gutter : 0,
        pileAngles : 0,
        onLoad : function() {
          $('.addAlbum').hide();
          $loader.remove();},
        onBeforeOpen : function( pileName ) {
        $('.addAlbum').hide();
        $name.html( pileName );
      },
      onAfterOpen : function( pileName ) {
        showDelte = 1;
        $('.addAlbum').hide();
            $('.def-block').on('mouseenter', 'ul.tp-grid li ', function()
    {
      if(showDelte === 1)
      {
     // $(this).find('> div.removeDiv').show();
      }
    }).on('mouseleave', 'ul.tp-grid li', function () {
      //$(".removeDiv").hide();
});
        $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
        $close.show();
      }
    });
    });
  }
  // prettyPhoto
  if ($("a[rel^='prettyPhoto']")[0]) {
    $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
  }
  },
   'click .seeloadsongs' : function(e, t ){
   e.preventDefault();
 if($('.mysongsplayer .music-player-list').children().length > 0)
   $('.mysongsplayer .music-player-list').empty();
$('.music-player-list').ttwMusicPlayer( Session.get("myPlaylist") , {
    currencySymbol:'$',
    artist:'rached',
    buyText:'Share',
    tracksToShow:3,
    autoplay:false,
    ratingCallback:function(index, playlistItem, rating){
      //some logic to process the rating, perhaps through an ajax call
    }
  });
},
  'click .sendreqRep': function(event, template) {
var timeStamp = Math.floor(Date.now()); 
var Currentuser =  Users.findOne({"_id": currentUserId },  { fields: { username: 1 }});
var myarg2 = { "ownerId": currentUserId,
 "ownerName": Currentuser.username,
 "recieverId": this._id,
 "recieverName": this.username,
 "time": timeStamp,
  "typ": "representation Request" , 
  "status" : "pending",
  "viewed" : false };
  if( Notifications.find({ "ownerId":  currentUserId , "recieverId":  this._id }).count() > 0 
  || this.agent.id === currentUserId )
 { 
  return "";
 } else
{ Meteor.call('addNotification', myarg2, function(error, result)
  {
  });
}
return "";
},
});
Template.seeprofile.helpers({ 
   mycalender: function()
  {
    var allevents = [{id: 100, title:'not available', start: '2016-10-05', end: '2016-10-12', textColor: 'black'},
                     {id: 200, title:'not available2', start: '2016-10-05', end: '2016-10-15', textColor: 'black'}];
    //alert('my calender from see calender ...');
     Session.set('eventSrcs', []);
    var evnts = Calendars.find({"bandId": this._id}, {sort:{ 'start' : 1 }}).fetch();
    console.log('the band events :');
    console.log(evnts);
    var currentdate = "";
  myDate = new Date(); 
  myYear = myDate.getFullYear();
  var currentdate  = '' + myYear;
  myMonth = ( myDate.getMonth() + 1 );
  if (myMonth < 10)
    currentdate = currentdate  + '-0' +myMonth;
  else 
   currentdate = currentdate  + '-' +myMonth;
   myDay = myDate.getDate();
  if (myDay < 10)
    currentdate = currentdate  + '-0' +myDay;
  else
    currentdate = currentdate  + '-' +myDay;
               Session.set('eventSrcs', evnts);             
               if(evnts)
    {
      if(evnts.length > 0)
      {
        allevents = [];
        evnts.forEach(function(event)
        {
          
          //alert(event.title)
         allevents.push({'title' :'unavailable', 'borderColor':'gray', 'start': event.start, 'end': event.end, 'textColor':'black',backgroundColor:'gray'});
        });
     Session.set('eventSrcs', allevents);
                 setTimeout(function(){
        var j = 0; var i = 0;
              $("#seecalendar").fullCalendar({
                header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month'
      },
      defaultDate: currentdate,
      navLinks: true, // can click day/week names to navigate views
      selectable: false,
      allDay : true,
      droppable: false,
      selectHelper: true ,
      dayRender : function(date, cell)
      {
       j= j+ 1;
        mydate = date.format('YYYY-MM-DD');
          mydate = date.format('YYYY-MM-DD');
          for ( v = 0 ; v < allevents.length ; v++) { 
            if(mydate === allevents[v].start.slice(0,10))// || mydate === allevents[v].end.slice(0,10) )
        {
          var begindate = new Date(''+allevents[v].start.slice(0,10)+'');
          moment(begindate).format('YYYY-MM-DD');
          var enddate = new Date(''+allevents[v].end.slice(0,10)+'');
          moment(enddate).format('YYYY-MM-DD');
          if( enddate > begindate )
          {
            var k = true; 
            while(k === true)
            {
            begindate.setHours(begindate.getHours() + 24);
            var momentdate = moment(begindate).format('YYYY-MM-DD');
            $("td[data-date='"+momentdate+"']").addClass('unavailable');
            if(begindate >= enddate)
            {
              k = false;
            }     
           }
          }
         $("td[data-date='"+mydate+"']").addClass('unavailable');
         v = allevents.length -1;
        }
        };
      },
      
      editable: false,
      eventLimit: true, 
      events   : allevents /*Session.get('eventSrcs')*/});
        }, 100); 
          return true;
          }
          else
          {return false} 
}
},
seeallsongs : function()
{
  var band = Users.findOne({"_id": this._id});
  var pllist = [];
  var mysongs = [] ; 
  mysongs =  songs.find({/*"uploadedBy": this._id*/ }).fetch();
  if(mysongs.length > 0)
  {
mysongs.forEach(function(song){
pllist.push({"id":song._id,
 "title" : song.songname ,
/*'cover':'../images/5.jpeg' ,*/
 "duration" : song.duration, 
  'rating':5,
   'mp3': song.songurl,
    'buy':'javascript:void(0)',
 'artist': band.profile.bandName});
});
Session.set("myPlaylist", pllist);
console.log("myPlaylist session get from allsongs : " + Session.get("myPlaylist"));
return Session.get("myPlaylist")
}
else {
   Session.set("myPlaylist", null);
return Session.get("myPlaylist")

}
},
myratings: function()
{
  //alert('myratings....');
var length = 0;
var total = 0;
var band = Users.findOne({"_id": this._id});
var myratings = Rating.find({"bandId": this._id}).fetch();
totalRatings = myratings.forEach(function(rating)
  {
    length ++;
   total = total + rating.ratingvalue;
  });
if(length > 0 && total > 0)
var myratings = total / length;
$(".ratingdiv p i").each(function(i)
      {
       if(i+1 <= myratings)
        $(this).css({'color' : '#ffb800'});
      });  
Session.set('myratings', myratings);
},
detectRequests : function(id)
{
    if( Notifications.find({ "ownerId":  id , "recieverId":  this._id }).count() > 0  || this.agent.id === id )
       return true ;
        return false;  
},
   iamAgent : function(type)
   {
    if(type === "agent")
      return true ;
    return false;
   },
   ismyagent : function(user)
   {
    //alert(user.profile.type + '  :  '+user.agent.id);
    if(user.profile.type === "agent")
     {
      var currentuser = Users.findOne({'_id': Meteor.userId()});
      console.log(currentuser);
      if(currentuser.agent.id === user._id)
      {
        return true;
      }
      else
      {
       return false;
      }
     } 
     else
     {
      return false;
     }
   },
  imgs: function(){
    return Images.find({uploadedBy : this._id});
     },
    myusername: function(user)
  {
    if(user.profile.type === "band")
      {
        if( user.profile.hasOwnProperty('bandName') )
        {
          return user.profile.bandName; 
        }
        else {
          return user.username; 

        }
       
      }
      else 
      {
    return user.username;
      }
  },
   mybandname: function(user)
  {
        if( user.profile.hasOwnProperty('bandName') )
        {
          return user.profile.bandName; 
        }
        else {
          return user.username; 

        }
       
     
  },
  bandprofile: function(usertype)
  { 
     if(usertype === "band")
      {
       return true; 
      }
      else 
      {
    return false;
      }
  },
  userprofile: function(usertype)
  { 
     if(usertype === "costumer" || usertype === "agent")
      {
       return true; 
      }
      else 
      {
   return false;
      }      
  }

      });
Template.homeBands.events({
  'click .bandspaginationitem' : function(e, t)
  {
    var counter = parseInt($(e.currentTarget).attr('id')  );
    if(counter === 1) 
    {

  Session.set('currentbandspage', counter);
  Session.set('bandskip', 0);
       counter -- ;  
    }
   
    else
      {
        Session.set('currentbandspage', counter);
        counter = (counter -  1) * 3;
       }
    Session.set("bandskip", counter);
  },
  'keyup .suggest-bandtlocation': function(e, t){
    $('.locations').empty();
    $('.locations').show();
  var currenttext = t.find('.suggest-bandtlocation').value;
  currenttext = currenttext.toLowerCase();
$('.locations').empty();
for (var i =  0 ; i < Session.get('locations').length; i++) {
  var city = Session.get('locations')[i].cityname.toLowerCase();
  if(city.match(currenttext )) {
        $('.locations').append($("<li><span class='suggest-name'>" + city + "</span></li>"));
        $('.locations li span').eq(0).css({'text-decoration': 'underline'}); 
  }
}
$('.locations').show();
},
'click .locations > li': function(e , t){ 
    t.find('.suggest-bandtlocation').value = $(e.currentTarget).text();  
  $(".locations").hide();
},
  
'click .searchlabel':function(e , t)
{
   var location = t.find('.suggest-bandtlocation').value;  
   console.log('location city value : '+ location);
    if ((location.length > 0 )  && (location !== '' ))
       Session.set('cityname', t.find('.suggest-bandtlocation').value);
    else
        Session.set('cityname', undefined);
var availability =  t.find('.suggest-availability').value; 
if(availability === null || availability === '' || availability === undefined)
{
  Session.set('availability', null);  
}

else 
{
  calendars = null;
var year = availability.substr(0,4)
var month =  availability.substr(5,2);
var day = availability.substr(8,2)
var startdate = year+'-'+month+'-'+ day  ;
var enddate = year+'-'+month+'-'+(parseInt(day) + 5 );
    //console.log('enddate : ' + enddate);
    //console.log('start : ' + startdate); 
      var calendars = Calendars.find({$or: [{ "start" : { $lt: startdate },  "end": {$gte: startdate } },{ "start" : { $regex: startdate }}]}).fetch();//$or: [{ "start" : { $lt: startdate },  "end": {$gte: startdate } }, { "start" : { $regex: startdate }}]}).fetch());
unavailableBands = [];
   calendars.forEach(function(calendar){
    if(calendar.bandId != null)
       unavailableBands.push({'bandId': calendar.bandId});
    });
 Session.set('unavailableBands', unavailableBands );
}       
//bookedBands =  Calendars.find({"start" : {$gte : Session.get('availability')} }).fetch();
//var  unavailabilBands =  Calendars.find({$or: [{"start" : { $lt: startdate },  "end": {$gte: startdate } }, { "start" : { $regex: startdate }}]}).fetch();  
// events =  Calendars.find({$or: [{ "type" : "public", "start" : { $lt: startdate },  "end": {$gte: startdate } }, { "type" : "public", "start" : { $regex: startdate }}]}).fetch();
 
/*var startdate = t.find("#event_startdate").value; 
sdate = startdate.substr(0,10)*/

  //Session.set("salaryasc", -1);
  var value = "";
  value = $('#ex2').slider('getValue').toString();
  Session.set("salarymax",parseInt(value.slice(value.lastIndexOf(",") + 1)));
  Session.set("salarymin",parseInt(value.slice(0, value.lastIndexOf(","))));
if($(".suggest-bandtypeinput").val().length > 0 )
  Session.set("bandtype", $(".suggest-bandtypeinput").val());
else
  Session.set("bandtype", undefined);
//alert($(".bandnumbersinputsearch").val());
if(parseInt($(".bandnumbersinputsearch").val()) > 0)
  Session.set("bandnumbers" , parseInt($(".bandnumbersinputsearch").val()));
else
  Session.set("bandnumbers" , undefined);
}, 
'click .ratingsortasc':function()
{

   Session.set("ratingasc", 1);
}, 
'click .ratingsortdesc':function()
{
Session.set("ratingasc", -1);
},
'click .salarysortasc':function()
{
   Session.set("salaryasc", -1);
  // alert("asc : " + Session.get("salaryasc"));
}, 
'click .salarysortdesc':function()
{
Session.set("salaryasc", 1);

  // alert("desc : " + Session.get("salaryasc"));
},
});
Template.homeBands.onRendered(function(){
Session.set('availability', null);  
$(".bandtypes").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
$(".locations").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 

setTimeout(function(){
$("#ex2").slider({tooltip: 'show'});
}, 0);
$("#ex2").show();
});
Template.band.helpers({
background: function(user)
  {
     alert(user.username);
    alert(user.profile.cover)
    if(user && user.profile)
    {
    if(user.profile.hasOwnProperty('cover'))
      return user.profile.cover;
    else
      return '../../images/assets/shop/1.jpg';
    }
  }});  
Template.homeBands.helpers({
  areArtists: function()
  {
    if(Session.get("totalbands") >= 3) 
      return true;
    return false;
  },
    currentPage: function(){
    return Session.get('currentbandspage');
  },
  bandspaging: function()
  {
    var paginationarray = [];
    console.log(Session.get("totalbands"));
    if (Session.get("totalbands") >= 3 )
    {
     $('.pagesbands').show();
     var length = Session.get("totalbands") / 3;
    for (var i = 1 ; i < length + 1 ; i++) 
    {
      paginationarray.push({"number": i });
      //i = i + 5 ;
    } 
    }
    else 
      {
        $('.pages').hide();
      }
    return paginationarray;
  },
/*background: function(user)
  {
    alert(user.profile.cover)
    if(user && user.profile)
    {
    if(user.profile.hasOwnProperty('cover'))
      return user.profile.cover;
    else
      return '../../images/assets/shop/1.jpg';
    }
  }*/  
 haslocation: function(user)
 {
   if(user != undefined)
   {
    if(user.profile !== undefined)
    {
      if(user.profile.hasOwnProperty('address'))
        return true
    }
    else
      return false;
   }
 }, 
locations: function()
{
var alllocations = null;
locations = [];
   alllocations =  Users.find({}).fetch();//get('locations');
alllocations.forEach(function (location)
{
  if(location.profile.hasOwnProperty('address'))
  {
    if(location.profile.address.city !== undefined)
 locations.push({"cityname" : location.profile.address.city});
}
});
Session.set('locations', locations);
   return  alllocations;
 
  //var venues = [];
 /*
  if(allvenues !== undefined)
  {
    if(allvenues.length > 0)
      {
        //allvenues.forEach(function(venue)
        //{
         // venue._id
          //alert(event.title)
        // venues.push({'_id' : venue._id,'eventId': venue.eventId ,'cityname': venue.cityname, 'end': event.end, 'bandId':event.bandId});
        //});/
  return allvenues ; 
   }
     else
     {

    return null ;
     }
   }
   else
   {
    return null ;
  }*/
 // return allvenues;
  }, 
artits: function() {
var bands = null;
//alert(Session.get("bandtype"));
var query = { $and : [] };
var operational = {"profile.oprational" : "yes"};
query.$and.push(operational);
var minmaxsalary = { "profile.salary" : {$lt: 5001  , $gte : 0 } };
var bandtype = {"profile.bandtype" : /./ };
var cityname = {"profile.address.city" : /./}
if(Session.get('availability' !== null))
{ 
console.log('search by availability : ' + Session.get('availability'));
  var startdate = Session.get('availability').getFullYear()+'-'+Session.get('availability').getMonth()+'-'+Session.get('availability').getDate();
  //  eventsList = [];
//     events =  Calendars.find({"start" : {$gte : startdate} }).fetch();

}
else 
{ 
console.log('search by availability : ' + Session.get('availability'));
  //  eventsList = [];
}
if(Session.get("bandtype")  !== undefined    )
{
  //alert("undefined session");
  //bandtype = {"profile.bandtype" : /./ }
   console.log('no band type specified ....');
    bandtype = {"profile.bandtype" : { $regex: "" + Session.get("bandtype")+ "" } };
    query.$and.push(bandtype);
// var bandtype = { "profile.bandtype" : Session.get("bandtype") } ;
//query = query + '"profile.bandtype": "'+Session.get("bandtype")+'"' ; //+Session.get("bandtype")+"  }";
}
else
{
    console.log('no band type specified ....');
    //bandtype = {"profile.bandtype" : { $regex: "" + Session.get("bandtype")+ "" } };
    query.$and.slice(bandtype);
}
if( Session.get('cityname') !== undefined  )
{
  console.log('cityname :', Session.get('cityname') );
    cityname = {"profile.address.city" : { $regex: new RegExp("^" + Session.get("cityname")+ "", 'i' )} };
    query.$and.push(cityname);
}
else
{
  Session.get('cityname')
   query.$and.slice(cityname);
}
if(Session.get("bandnumbers")  !== undefined  )
{
  //   alert(Session.get("bandnumbers") + "not undefined"); 
     var mumbers = {"profile.members": { $size : Session.get("bandnumbers") } }; 
     query.$and.push(mumbers);
}
if(Session.get("salarymax")  === undefined && Session.get("salarymin")  === undefined)
 {
  minmaxsalary = { "profile.salary" : {$lt: 5000  , $gte : 0 } };
    //minmaxsalary = { "profile.salary" : { $lt: 5000 , $gte : 0  } };

 // alert('max ...'); 
//query = query + ', "profile.salary": { $lt:'+2000/*Session.get("salarymax")+*/'}';//'+(Session.get("salarymax")+'' ; //+Session.get("bandtype")+"  }";
}
//alert("salarymax : " + Session.get("salarymax") + "  minsalary : " + Session.get("salarymin"));
if(Session.get("salarymin")  === undefined && Session.get("salarymax")  !== undefined )
{

  minmaxsalary = { "profile.salary" : { $lt: parseInt(Session.get("salarymax"))  , $gte : 100  } };
}
if(Session.get("salarymin")  !== undefined && Session.get("salarymax")  === undefined )
{

  minmaxsalary = { "profile.salary" : { $lt: 5000 , $gte : parseInt(Session.get("salarymin"))  } };
}
if(Session.get("salarymin")  !== undefined && Session.get("salarymax")  !== undefined )
{

  minmaxsalary = { "profile.salary" : { $lt: parseInt(Session.get("salarymax")) , $gte : parseInt(Session.get("salarymin"))  } };
}
query.$and.push(minmaxsalary);
if(Session.get("salarymin")  === undefined && Session.get("salarymax")  === undefined )
{query.$and.slice(minmaxsalary);}

 var type = {"profile.type" : "band"};
 query.$and.push(type);
//query = {$and : [minmaxsalary /*, bandtype*/ ]} ;
// query = query + ' "profile.salary" : { $lt : '+2000+'}}';
//  alert(query);
  //query{ "profile.salary" : { $lt : Session.get("salarymax"), $gt : Session.get("salarymin") } });
  //query.push({"profile.bandtype" : Session.get("bandtype")});
  //console.log(JSON.parse(query));
   //query = "{\"" + profile.salary + "\":"+ Session.get("salarymax") + "}";

 /* Session.set("salarymax",parseInt(value.slice(value.lastIndexOf(",") + 1)));
  Session.set("salarymin",parseInt(value.slice(0, value.lastIndexOf(","))));
  Session.set("bandtype", $(".suggest-bandtypeinput").val());
  Session.set("bandnumbers" , parseInt($(".bandnameinputsearch").val()));*/
//var query = query +'"profile.salary" : { $lt: '+Session.get("salarymax")+' }';
//    db.users.find({ "profile.salary" : { $lt: 320  , $gt :295 } }, {"username" : 1, "profile.salary" : 1 }).sort({"profile.salary" : 1});
var result =  Users.find( 
                 /*JSON.parse(bandtype)*/
                    /*{query.slice(1, query.length - 1 )}
                     {"profile.type" : "band"}/*,*/
                     //{"profile.salary" : 300}
                   // {"profile.bandtype" : /jazz/}
                   query
                     , { sort : {"profile.salary" : parseInt(Session.get("salaryasc")) } , limit : 3 , skip: Session.get('bandskip')} );
                 // ).sort({"profile.salary" : -1});
//var locations = [];
//if(Session.get('availability') !== null)
 //{
  var newresult = Users.find(query);
   Session.set('totalbands', newresult.count());
   console.log(Session.get('totalbands'));
if (result.count() > 0 )
{
 // Session.set("totalbands", result.count());
 console.log(Session.get("totalbands"));
  $('.emtyresult').hide();
  if(Session.get('unavailableBands') !== null)
   {
if(( Session.get('unavailableBands') !== undefined )  && ( Session.get('unavailableBands').length > 0 ))
{
bands = [];
result.forEach(function(band){
  for (var i = 0 ; i < Session.get('unavailableBands').length; i++) {
    if( Session.get('unavailableBands')[i].bandId === band._id)
    {
      console.log('unavailable band ');
    }
    else
    {
    bands.push({band});
    return bands;
    }
  };
console.log("forEach band id : " + band._id);
});
}
else
{
  bands = [];
result.forEach(function(band){
  bands.push({'band': band });
});
}
  return bands ;
  }
  else
  {
   result.forEach(function(band){
  bands.push({band});
  return bands ;
}); 
  }
}
if (result.count() > 0 )
{
  $('.emtyresult').hide();
  return result ;
  }
if(result.count() === 0 )
{

  $('.emtyresult').show();
  return false;
}

//  return Session.get('bandsList');
  //return Meteor.call('displayBands');
   //return Images.find({});
    //return Users.find({});
   //return Tasks.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");

  },
  imgs: function () {alert(Images.find().count()); return Images.find({}).count(); }
});
Template.imageUploader.onRendered(function(){this.subscribe("images"); });

Template.imageUploader.events({
'change .ddodo':function(event, t)
{
if(t.find('.uploadFile').files[0].name.indexOf(".jpg") <= 0 )//0 && e.target.result.indexOf(".jpeg") === 0 && e.target.result.indexOf(".png")) 
 {
  alert('file invalid');
  $("#errsongname").html("invalid file");
  $("#errsongname").show();
 }
 else
 {
  alert('valid File');
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--)
    {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    // get loaded data and render thumbnail.
    document.getElementById("image").src = e.target.result;
    alert(e.target.result);
    var loadedImage = document.getElementById("image");//new Image();
    loadedImage.onload = function()
    {
      var canvas = document.getElementById("myCanvas");
      canvas.width =670;
      canvas.height = 525;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0 , 670, 525);
      alert('loading ....');
      var upload = new Slingshot.Upload("myImageUploads");
      var timeStamp = Math.floor(Date.now()); 
      var canv = document.getElementById("myCanvas").toDataURL('image/jpeg', 0.95);
      var blb = dataURLtoBlob(canv);
      blb.name=  document.getElementById('uploadFile').files[0].name;
      alert('filename : ' + blb.name);
      event.preventDefault();
      var upload = new Slingshot.Upload("myImageUploads");
      var timeStamp = Math.floor(Date.now()); 
      $grid = $( '#tp-grid' );
      upload.send(blb, function (error, downloadUrl) 
      {
        uploader.set();
        if (error) {
          $("#processingImage").hide();
          console.error('Error uploading');
          alert (error);
                  }
        else{
                // insert the uploaded image url into the database document
          var foldername = $("#album_name").val();
          //alert(foldername);
          if(foldername !== '' &&  foldername !== undefined)
            {        imageFolder = $("#album_name").val();
            }
          else 
          {
            //($('.def-block ul.tp-grid').children().length > 1){
            $grid.children().each(function() {
            //imageFolder = $(this).attr('id') ;
            imageFolder = 'chinaTour';         
            });
          }    
         // alert(imageFolder);
          imageName = document.getElementById('uploadFile').files[0].name;
          //alert(downloadUrl);
          var myarg = {"imageurl": downloadUrl,"uploadedBy" : currentUserId,
          "imageName": imageName, 
          "imageFolder" : imageFolder,
          "timeStamp": timeStamp }
          Meteor.call('addImage',  myarg, function(error, result){
          if(error)
          {
            alert('inable to insert into database ')
          }
          else
          {    
            /*$("#processingImage").hide();
            $("#process").hide();
            $("#processbg").hide();*/
            Images.insert({
            imageurl: downloadUrl,
            imageName: imageName,
            imageFolder: imageFolder,
            time: timeStamp,
            uploadedBy: currentUserId
            }); 
            $("#close").click();
            setTimeout(function(){ 
              alert('initialise gallery ...');      
              var $grid = $('#tp-grid'),
              $name = $('#name'),
              $close = $('#close'),
              $loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
              stapel = $grid.stapel({
              randomAngle : false,
              delay : 100,
              gutter : 0,
              pileAngles : 0,
              onLoad : function() {
                $('.addAlbum').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
                $('.removeAlbum').show();
                $loader.remove();
              },
              onBeforeOpen : function( pileName ) {
                $name.html( pileName );
                $('.removeAlbum').hide();
                $('.addAlbum').hide();
                $('.removeDiv').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
              },
              onAfterOpen : function( pileName ) {
                $("#addImagediv").show();
                 $('.testingspan').hide();
                showDelte = 1;
                $('.addAlbum').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
                $('.removeAlbum').hide();
                $('.def-block').on('mouseenter', 'ul.tp-grid li ', function(){
                  if(showDelte === 1)
                    {
                    $(this).find('> div.removeDiv').show();
                    }
                }).on('mouseleave', 'ul.tp-grid li', function () {
                  $(".removeDiv").hide();
                                        });
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
                $close.show();
              }
              });
              $close.on( 'click', function() {
                showDelte = 0;
                //alert('onclose clicked ...');
                //$('.addAlbum').hide();
                $("#addImagediv").hide();
                $(this).hide();
                $("a[rel^='prettyPhoto']").prettyPhoto().unbind();
                $(".removeDiv").hide();
                $name.empty().html('Photo Gallery');
                stapel.closePile();
              });
              if ($("a[rel^='prettyPhoto']")[0]) 
              {
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
              }
               
            },0);
          }
        });
      }
    });
    uploader.set(upload);
  }
  };
  }
  var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupavatar").height();
    var popupWidth = $("#popupavatar").width();
    // Centering
    $("#popupavatar").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    var mysongname = file.name; 
    $(".currentsonname").html(mysongname);
    var mysongname =  mysongname.slice(0, mysongname.lastIndexOf(".mp3"));
    $('#song_name').val(mysongname);
    // Aligning bg
    $("#addavatarbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#addavatarbg").css({"opacity": "1"});
      $("#addavatarbg").fadeIn("slow");
      $("#popupavatar").addClass('zigmaIn').fadeIn("slow");
    
    // read the image file as a data URL.
    reader.readAsDataURL(document.getElementById('uploadFile').files[0]);
    alert('reading file as dataurl ....');
    event.preventDefault();
       
},
  'click .uploading': function(event, template) {
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

             event.preventDefault();
             var upload = new Slingshot.Upload("myImageUploads");
             var timeStamp = Math.floor(Date.now()); 
var canv = document.getElementById("myCanvas").toDataURL('image/jpeg', 0.95);
var blb = dataURLtoBlob(canv);
blb.name=  document.getElementById('uploadFile').files[0].name;
          event.preventDefault();
          var upload = new Slingshot.Upload("myImageUploads");
          var timeStamp = Math.floor(Date.now()); 
          $grid = $( '#tp-grid' );
         upload.send(blb, function (error, downloadUrl) {
             uploader.set();
             console.log('uploader is : ' + uploader.set());
             if (error) {
              $("#processingImage").hide();
               console.error('Error uploading');
               alert (error);
               $grid.find('> li:nth-last-child(1)').remove();
             }
             else{
                // insert the uploaded image url into the database document
                var foldername = $("#album_name").val();
      if(foldername !== '' &&  foldername !== undefined)
      {        imageFolder = $("#album_name").val();
       }
       else {
       //($('.def-block ul.tp-grid').children().length > 1){
        $grid.children().each(function() {
    imageFolder = $(this).attr('id') ;
           
  });
       }    
               imageName = document.getElementById('uploadFile').files[0].name;
               var myarg = {"imageurl": downloadUrl,"uploadedBy" : currentUserId,
               "imageName": imageName, 
               "imageFolder" : imageFolder,
                "timeStamp": timeStamp }
               Meteor.call('addImage',  myarg, function(error, result){
                if(error)
                {
                  alert('inable to insert into database ')
                }
                else
                {    
               $grid.find('li').eq(0).remove();
               $grid.find('> li:nth-last-child(1) a img').attr('src', downloadUrl);
               $grid.find('> li:nth-last-child(1) a ').attr('href', downloadUrl);
                 $grid.find('> li:nth-last-child(1)').css({"visibility":"visible"});
                 $grid.find('> li:nth-last-child(1)').show();
                 $("#processingImage").hide();
                 $("#process").hide();
                 $("#processbg").hide();
                 //$grid.find('> li:nth-last-child(1)').addClass('prettyPhoto');
                 //$("a[rel^='prettyPhoto']").prettyPhoto();
                // alert($grid.children().length);
                 $grid.children().each(function() {
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
            });
                 if($grid.children().length === 1)
            $('#close').trigger('click');
                }
             });
               /*Images.insert({
                   imageurl: downloadUrl,
                   imageName: imageName,
                   imageFolder: imageFolder,
                   time: timeStamp,
                   uploadedBy: currentUserId
               });*/
               /*$('.pp_gallery').find('> div ul').each(function()
               {

               });*/
               // adding new li to the ul
               //end adding li to ul tricks

             }
             });
             uploader.set(upload);
           }
       }); 
Template.bandInformations.onCreated( function(){
  this.subscribe("images");
  this.subscribe("USERS");});
Template.managebandInformations.onCreated( function(){
  this.subscribe("images");
  this.subscribe("USERS");});
Template.homeProfile.onRendered( function(){
  this.subscribe("images");
 $("#messagesWrapper #ullist").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
 $(".zonecodes").niceScroll({zindex:9999999999999999,cursorborder:"0px solid gray",cursorborderradius:"2px",cursorcolor:"#ff6600",cursoropacitymin:.1}); 
  /**/
      //player = new YT.Player("player", {height: "400", width: "600", videoId:  Session.get("videoId")/*"LdH1hSWGFGU"*/, 
 
    onYouTubeIframeAPIReady = function () {
     player = new YT.Player("player", {height: "400", width: "600", videoId:  Session.get("videoId"), 
    
            // Events like ready, state change, 
            events: {
                onReady: function (event) {
                  event.target.loadVideoById(Session.get("videoId"));
                 // player.loadVideoById(Session.get("videoId"))
                    // Play video when player ready.
                    event.target.stopVideo();
                }
            }
        });
    };
    YT.load();
  /*end of video plugin*/
  /*setTimeout(function(){
  //alert('$(tp-grid)[0]' + $("#tp-grid")[0]);
if ($("#tp-grid")[0]) {
  var $grid = $( '#tp-grid' ),
  $name = $( '#name' ),
  $close = $( '#close' ),
  $loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
  stapel = $grid.stapel( {
    randomAngle : false,
    delay : 100,
    gutter : 0,
    pileAngles : 0,
    onLoad : function() {
      $('.addAlbum').hide();
      $('.removeAlbum').css('visibility', 'hidden');
      $loader.remove();
              },
    onBeforeOpen : function( pileName ) {
      $name.html( pileName );
      $('.removeAlbum').hide();
      $('.addAlbum').hide();
      $('.removeAlbum').css('visibility', 'hidden');
                      },
    onAfterOpen : function( pileName ) {
      showDelte = 1;
      $('.addAlbum').hide();
      $('.removeAlbum').css('visibility', 'hidden');
      $('.removeAlbum').hide();
      $('.def-block').on('mouseenter', 'ul.tp-grid li ', function(){
        if(showDelte === 1)
          {
          $(this).find('> div.removeDiv').show();
          }
      }).on('mouseleave', 'ul.tp-grid li', function () {
        $(".removeDiv").hide();
                              });
      $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
      $close.show();
                      }
    });
    $close.on( 'click', function() {
      $('.addAlbum').hide();
      $(this).hide();
      $("a[rel^='prettyPhoto']").prettyPhoto().unbind();
      $(".removeDiv").hide();
      $name.empty().html('Photo Gallery');
      stapel.closePile();
      stapel = $grid.stapel( {
        randomAngle : false,
        delay : 100,
        gutter : 0,
        pileAngles : 0,
        onLoad : function() {
          $('.addAlbum').hide();
          $loader.remove();},
        onBeforeOpen : function( pileName ) {
        $('.addAlbum').hide();
        $name.html( pileName );
      },
      onAfterOpen : function( pileName ) {
        showDelte = 1;
        $('.addAlbum').hide();
            $('.def-block').on('mouseenter', 'ul.tp-grid li ', function()
    {
      if(showDelte === 1)
      {
      $(this).find('> div.removeDiv').show();
      }
    }).on('mouseleave', 'ul.tp-grid li', function () {
      $(".removeDiv").hide();
});
        $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
        $close.show();
      }
    });
    });
  }
  // prettyPhoto
  if ($("a[rel^='prettyPhoto']")[0]) {
    $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
  }
},10000);
*/
  //this.autorun(function(){
//alert('homeProfile onRendered remove music-player-list ...');
   // $('.music-player-list').remove();
    
    //$('.mysongsplayer').append('<div class="music-player-list"></div>');
    //$('.mysongsplayer').empty();
    //$('.mysongsplayer').append('<div class="music-player-list"></div>');
 //    alert($('.mysongsplayer .music-player-list').children().length);
     //$('.mysongsplayer .music-player-list').find('> div:not(:last)').remove();

  if($('.mysongsplayer .music-player-list').children().length > 0)
    $('.mysongsplayer .music-player-list').empty();
  if( $('ul#tp-grid').children('li').length > 0)
    $('ul#tp-grid li').remove();
   // {
 //     alert('remove one ...');
    //  $('.mysongsplayer .music-player-list').find('> .ttw-music-player:not(:last)').remove();
    //  $('.music-player-list').find('> div:not(:last-child)').remove();

    //$('.mysongsplayer .music-player-list').children('.ttw-music-player:not(:last-child)').remove();  
    // } 
  //  this.afterFlush(function(){
    //  alert('tracker afterFlush times one ...'  );
      if(Session.get("myPlaylist") !== null)

{
  //setTimeout(function(){  
  //   $('.mysongsplayer .music-player-list').find('> .ttw-music-player:not(:last)').remove();
    //  $('.mysongsplayer .music-player-list').find('> .ttw-music-player:not(:last)').remove();
 /*$('.music-player-list').ttwMusicPlayer( Session.get("myPlaylist") , {
    currencySymbol:'$',
    buyText:'BUY',
    tracksToShow:3,
    autoplay:false,
    ratingCallback:function(index, playlistItem, rating){
      //some logic to process the rating, perhaps through an ajax call
    }
  });*/
console.log("myPlaylist from onRendered");
console.log(Session.get("myPlaylist"));

//},2000);
}
//});
 // });
  //this.subscribe("songs");
/*songs.forEach( function(song){
myPlaylist.push({"id":song._id,
 "title" : song.songname ,
cover:'1.jpg' ,
 "duration" : song.duration, 
  rating:5,
   mp3: song.songurl,
    buy:'#',
 artist:'Alexandra',});
console.log(song._id);
console.log(song.songname);
console.log(song.songurl);
});*/
 // var rached = "rach";
 //   rached = Users.find({"_id":  Meteor.userId() }, { fields: { profile : 1} }).fetch();
//console.log(rached[0].profile.type);

 //  var usertype = '' ; 
 //usertype =  Users.find({"_id":  Meteor.userId() }, { fields: { profile : 1} }).fetch();
 //alert('usertype  onRendered  : ' + usertype[0].profile.type); 
 //Session.set("rachini",  usertype[0].profile.type);
  //console.log("rachini2 value : " + Session.get("rachini") );
 
/*$.getScript('../js/modernizr.custom.63321.js');
$.getScript('../js/jquery.stapel.js');
$.getScript('../js/jquery.prettyPhoto.js');
$.getScript('../js/jquery.flexslider-min.js');
$.getScript('../js/jquery.nicescroll.min.js');
$.getScript('../js/twitter/jquery.tweet.js');
$.getScript('../js/theme20.js');*/
//$('head').append('<script type="text/javascript" src ="../js/modernizr.custom.63321.js">');
//$('head').append('<script type="text/javascript" src ="../js/jquery.stapel.js">');
//$('head').append('<script type="text/javascript" src ="../js/jquery.prettyPhoto.js">');
//$('head').append('<script type="text/javascript" src ="../js/jquery.flexslider-min.js">');
//$('head').append('<script type="text/javascript" src ="../js/jquery.nicescroll.min.js">');
//$('head').append('<script type="text/javascript" src ="../js/twitter/jquery.tweet.js">');
//$('head').append('<script type="text/javascript" src ="../js/jquery.flexslider-min.js">');
//$('head').append('<script type="text/javascript" src ="../js/theme20.js">');
//$('head').append('<script type="text/javascript" src ="../js/abbCostume.js">');

//setTimeout(function(){
 //$('head').append('<script type="text/javascript" src ="../js/zwindows.js">');

  //$.getScript('../js/zwindows.js');
  /*$grid.children().each(function() {
        if ( $(this).hasClass("lastLi") ) {
          $grid.find('li').eq($(this).index()).remove();
        }
      });*/
            
//},3000);

});
Template.playplugin.onRendered(function(){
  /*var myPlaylist = [
  
  {
    mp3:'js/1.mp3',
    title:'Track 1',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'1.jpg' 
  },
  {
    mp3:'js/1.mp3',
    title:'Track 2',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'js/2.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 3',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'js/1.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 4',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'js/2.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 5',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'js/1.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 6',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'music/2.jpg' 
  },
  {
    mp3:'js/1.mp3',
    title:'Track 7',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'js/1.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 8',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'js/2.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 1',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'1.jpg' 
  },
  {
    mp3:'js/1.mp3',
    title:'Track 2',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'js/2.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 3',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'js/1.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 4',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'js/2.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 5',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'js/1.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 6',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'music/2.jpg' 
  }];*/
  /*setTimeout(function(){
  $('.music-player-list').ttwMusicPlayer(Session.get("myPlaylist"), {
    currencySymbol:'$',
    buyText:'BUY',
    tracksToShow:3,
    autoplay:false,
    ratingCallback:function(index, playlistItem, rating){
      //some logic to process the rating, perhaps through an ajax call
    },
    jPlayer:{
      swfPath: "http://www.jplayer.org/2.7.0/js/",
      supplied: "mp3",
      volume:  0.8,
      wmode:"window",
      solution: "html,flash",
      errorAlerts: true,
      warningAlerts: true
    }
  });
}, 3000);*/
  this.autorun( function(){
if($('.mysongsplayer .music-player-list').children().length > 0)
   $('.mysongsplayer .music-player-list').empty();
$('.music-player-list').ttwMusicPlayer( Session.get("myPlaylist") , {
    currencySymbol:'$',
    artist:'rached',
    buyText:'Remove',
    tracksToShow:3,
    autoplay:false,
    ratingCallback:function(index, playlistItem, rating){
      //some logic to process the rating, perhaps through an ajax call
    }
  });
});
  });
/*Template.newAlbum.events({

  'click #createAlbum' : function(evt, t) 
  {             
    evt.preventDefault();
    var albumname = t.find("#album_name").value;
    //alert( Images.find({uploadedBy : currentUserId , imageFolder : albumname }).count());
    if((albumname === '') || (albumname === 'album name'))
          {
            $("#validAlmName").css("color","red");
            $('#errorMsgAlb').html('album name empty');
            $("#validAlmName").addClass('glyphicon-asterisk');
          }
          if(Images.find({uploadedBy : currentUserId , imageFolder : albumname }).count() > 0 )
          {
            $("#validAlmName").css("color","red");
            $('#errorMsgAlb').html('album already exists');
            $("#validAlmName").addClass('glyphicon-remove');
          }
          if(albumname !== 'BILLIE'  && albumname !== '' && albumname !== 'album name' )
          {
            $("#validAlmName").addClass('glyphicon-ok');
            $("#validAlmName").css("color","green");

          }
          
  }  
});*/
Template.notification.helpers({
  compareStatus: function(status, recieverId , notificationId, currentUserId){ 
    if((recieverId ==  currentUserId ) && (status == "pending") ) 
      { 
        return true ;
      }
    else {
      return false;
    }
  },
  representrequest: function(type)
  {
    if(type === 'representation Request')
      return true;
  },
  formatdate: function(timeStamp)
  {
   myDate = new Date(timeStamp); 
   myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
   return "" + myDay+ "-" +myMonth + "-" +myYear+"";
  },
      notificationReciever : function (status , recieverId , notificationId, currentUserId)
  {
    if((recieverId ==  currentUserId ) && ( status == "accepted" || status == "rejected")) 
    {
      return true ;
    } 
    else {return false}
    
  },
    notificationOwner : function (status , recieverId , notificationId, currentUserId)
  {
    if((recieverId ==  currentUserId ) && ( status == "accept" || status == "reject" )) 
    {
      return true ;
    } 
    else {return false}
    
  }
});
Template.message.events({
  'click .message' :function(event, template)
  { 
    var messageid = $(event.currentTarget).attr('id');
    Meteor.call('updatemessageStatus', messageid);
   var senderid = $(event.currentTarget).find('> .notcontent').attr('id');
  $('.full .chat-box').children().each(function (i) {
    var friendmessages = $('.full .chat-box').find('li').eq(i);
    if(friendmessages.attr('id') === senderid)
    {
       friendmessages.trigger('click');
       return ;
    } 
     });
  }
});

Template.message.helpers({
  compareStatus: function(status, recieverId , notificationId, currentUserId){ 
    if((recieverId ==  currentUserId ) && (status == "pending") ) 
      { 
        return true ;
      }
    else {
      return false;
    }
  },
  formatdate: function(timeStamp)
  {
   myDate = new Date(timeStamp); 
   myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
   return "" + myDay+ "-" +myMonth + "-" +myYear+"";
  },
  sendername: function(id)
  {
    user =  Users.findOne({"_id" : id});
    if( user.profile.hasOwnProperty('bandName') )
        {
          return user.profile.bandName; 
        }
        else {
          return user.username; 

        }
  },
  bitofcontent: function(message)
  {
    var bitofstring = '';
    var newmessage = '';
    if(message.indexOf(' ') === -1 )
    { 
      if(message.length <= 20)
      {
        return message;
      }
      else
      {
      return message.slice(0, 20) +' ...';
    }
    }
    else{
      if(message.length <= 20)
         {
          return  message;
         }
         else  {         
     bitofstring = message.slice(0, message.indexOf(' ') + 1);
     newmessage = message.slice(message.indexOf(' ') + 1 , message.length);
    while (bitofstring.length <= 20 ) //  || (bitofstring.length >= message.length ))
    {
      bitofstring = bitofstring + newmessage.slice(0, newmessage.indexOf(' ') + 1);
      newmessage = newmessage.slice(newmessage.indexOf(' ') +1, newmessage.length);
       if(newmessage.indexOf(' ') === -1 )
       {
         bitofstring = bitofstring + newmessage;
         newmessage = '';
         if(bitofstring.length > 20)
          bitofstring = bitofstring.slice(0, 20) +' ...';  
       return  bitofstring;
       }
       }
    return  bitofstring;
  }
   
     }
  }
});
Template.manageuserInformations.helpers({
   mybirthdate: function(timeStamp)
  {
   myDate = new Date(timeStamp); 
   myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
   return "" + myDay+ "-" +myMonth + "-" +myYear+"";
  },
});
Template.userInformations.helpers({
   mybirthdate: function(timeStamp)
  {
   myDate = new Date(timeStamp); 
   myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
   return "" + myDay+ "-" +myMonth + "-" +myYear+"";
  }, 
  myphonenumber: function(phonenumber)
  {
   // alert(phonenumber):
    if(phonenumber === null || phonenumber === "")
    {
     return "**** *** ***";
    }
  else {
   return phonenumber;
   }
  },
  mygender: function(gender)
  {
    if(gender === null )
    {
     // $("#inputmale").att('checked', false);
      //$("#inputfemale").att('checked', false);
      return null;
    }
  if (gender === "male") {
 $("#inputmale").attr('checked', true);
    return "male";
   }
   if (gender === "female") {
  $("#inputfemale").attr('checked', true);
    return "female";
   }
  }
});
Template.adminInformations.helpers({

   mybirthdate: function(timeStamp)
  {
   myDate = new Date(timeStamp); 
   myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
   return "" + myDay+ "-" +myMonth + "-" +myYear+"";
  }, 
  myphonenumber: function(phonenumber)
  {
   // alert(phonenumber):
    if(phonenumber === null || phonenumber === "")
    {
     return "**** *** ***";
    }
  else {
   return phonenumber;
   }
  },
  mygender: function(gender)
  {
    if(gender === null )
    {
     // $("#inputmale").att('checked', false);
      //$("#inputfemale").att('checked', false);
      return null;
    }
  if (gender === "male") {
 $("#inputmale").attr('checked', true);
    return "male";
   }
   if (gender === "female") {
  $("#inputfemale").attr('checked', true);
    return "female";
   }
  }
});
Template.seeuserInformations.helpers({

   mybirthdate: function(timeStamp)
  {
   myDate = new Date(timeStamp); 
   myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
   return "" + myDay+ "-" +myMonth + "-" +myYear+"";
  }, 
  myphonenumber: function(phonenumber)
  {
   // alert(phonenumber):
    if(phonenumber === null || phonenumber === "")
    {
     return "**** *** ***";
    }
  else {
   return phonenumber;
   }
  },
  mygender: function(gender)
  {
    if(gender === null )
    {
     // $("#inputmale").att('checked', false);
      //$("#inputfemale").att('checked', false);
      return null;
    }
  if (gender === "male") {
 $("#inputmale").attr('checked', true);
    return "male";
   }
   if (gender === "female") {
  $("#inputfemale").attr('checked', true);
    return "female";
   }
  }

});
Template.seebandInformations.onRendered(function(){

 var myPlaylist = [
  
  {
    mp3:'js/1.mp3',
    title:'Track 1',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'1.jpg' 
  },
  {
    mp3:'js/2.mp3',
    title:'Track 2',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'js/2.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 3',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'js/1.jpg'  
  },
  {
    mp3:'js/2.mp3',
    title:'Track 4',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'js/2.jpg'  
  },
  {
    mp3:'js/1.mp3',
    title:'Track 5',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'js/1.jpg'  
  },
  {
    mp3:'js/2.mp3',
    title:'Track 6',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'17',
    duration:'2:51',
    cover:'music/2.jpg' 
  },
  {
    mp3:'js/1.mp3',
    title:'Track 7',
    artist:'Alexandra',
    rating:5,
    buy:'#',
    price:'17',
    duration:'0:38',
    cover:'js/1.jpg'  
  },
  {
    mp3:'js/2.mp3',
    title:'Track 8',
    artist:'BlueFoxMusic',
    rating:4,
    buy:'#',
    price:'',
    duration:'2:51',
    cover:'js/2.jpg'  
  },
];
  /*$('.music-player-list').ttwMusicPlayer(myPlaylist, {
    currencySymbol:'',
    buyText:'Share',
    tracksToShow:3,
    autoplay:false,
    ratingCallback:function(index, playlistItem, rating){
      //some logic to process the rating, perhaps through an ajax call
    },
    jPlayer:{
      swfPath: "http://www.jplayer.org/2.7.0/js/",
      supplied: "mp3",
      volume:  0.8,
      wmode:"window",
      solution: "html,flash",
      errorAlerts: true,
      warningAlerts: true
    }
  });*/
});
Template.seebandInformations.helpers({
  allmemebers: function(){
    var user = Users.findOne({"_id": this._id } , { fields: { "profile": 1} });

    if (user.profile.members.length > 0)
    {
        return  user;    
    }
    else 
    {
      return false;
    }
  },
  incrementedindex: function(index)
  {
    return index + 1 ; 
  },
   highlights: function(){
     var user = Users.findOne({"_id": this._id } , { fields: { "profile": 1} });
     if (user.profile.highlights.length > 0)
    {
        return  user;    
    }
    else 
    {
      return false;
    }
    //return  Users.findOne({"_id": this._id } , { fields: { "profile": 1} });
  },
   repertoirs: function(){
     var user = Users.findOne({"_id": this._id } , { fields: { "profile": 1} });
     if (user.profile.repertoire.length > 0)
    {
        return  user;    
    }
    else 
    {
      return false;
    }
    //return  Users.findOne({"_id": this._id } , { fields: { "profile": 1} });
  },
  incrementHighlightindex: function(index)
  {
    return index + 1 ; 
  },
  mybandtype: function(profile)
  {
   if(profile.hasOwnProperty('bandtype')) 
   {
    return profile.bandtype ; 
  }
    else 
       {
      return "not setted";
   }
  },
  bandsets: function(profile)
  {
   if(profile.hasOwnProperty('sets'))
   {
    return profile.sets ; 
  }
    else 
       {
      return "not setted";
   }
  },
   mybandname: function(user)
  {
        if( user.profile.hasOwnProperty('bandName') )
        {
          return user.profile.bandName; 
        }
        else {
          return user.username; 

        }
       
     
  },
  myagent: function(user)
  {
        if( user.hasOwnProperty('agent') )
        {
          return user.agent.name; 
        }
        else 
        {
          return "UBMS Company"; 
        }
       
     
  },
  myphonenumber: function(phonenumber)
  {
   // alert(phonenumber):
    if(phonenumber === null || phonenumber === "")
    {
     return "**** *** ***";
    }
  else {
   return phonenumber;
   }
  }
});
Template.managebandInformations.events({
          'click .saveoprational' :function(event, t)
  {
    var operational = t.find(".bandoperational:checked").value;
    var myobj = {};
    event.preventDefault();
          if( operational  === "yes"  ) 
          {
            myobj = {"id": this._id, "operational": "yes" };
            Meteor.call('updateoprational', myobj);
          }
          if( operational === "no" ) 
          {

            myobj = {"id": this._id, "operational": "no" };
            Meteor.call('updateoprational', myobj);
          }
          
          }
});
Template.managebandInformations.helpers({
  mybandtype: function(bandtype)
  {
   if((bandtype !== "" ) && (bandtype !== null ))
   {
    return bandtype ; 
  }
    else 
       {
      return "not setted";
   }
  },
   mybandname: function(user)
  {
        if( user.profile.hasOwnProperty('bandName') )
        {
          return user.profile.bandName; 
        }
        else {
          return user.username; 

        }
       
     
  },
  myagent: function(user)
  {
        if( user.hasOwnProperty('agent') )
        {
          return user.agent.name; 
        }
        else 
        {
          return user.profile.defaultAgent; 
        }
       
     
  }
});

Template.bandInformations.helpers({
  allmemebers: function(){
    return  Users.findOne({"_id": Meteor.userId() } , { fields: { "profile": 1} });
  },
  incrementedindex: function(index)
  {
    return index + 1 ; 
  },
   highlights: function(){
    return  Users.findOne({"_id": Meteor.userId() } , { fields: { "profile": 1} });
  },
  incrementHighlightindex: function(index)
  {
    return index + 1 ; 
  },
  mybandtype: function(profile)
  {
    if(profile)
    {
   if(profile.hasOwnProperty('bandtype')) 
   {
    return profile.bandtype ; 
  }
    else 
       {
      return "not setted";
   }
   }
  },
  bandsets: function(profile)
  {
   if(profile)
    {
   if(profile.hasOwnProperty('sets')) 
   {
    return profile.sets ; 
  }
    else 
       {
      return "not setted";
   }
   }
  },
   mybandname: function(user)
  {
        if( user.profile.hasOwnProperty('bandName') )
        {
          return user.profile.bandName; 
        }
        else {
          return user.username; 

        }
       
     
  },
  myagent: function(user)
  {
        if( user.hasOwnProperty('agent') )
        {
          return user.agent.name; 
        }
        else 
        {
          return user.profile.defaultAgent; 
        }
       
     
  },
  myphonenumber: function(phonenumber)
  {
   // alert(phonenumber):
    if(phonenumber === null || phonenumber === "")
    {
     return "**** *** ***";
    }
  else {
   return phonenumber;
   }
  }
});
Template.bandInformations.onRendered(function(){
  $(".zonecodes").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
  $(".address").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
});
Template.userInformations.onRendered(function(){
  $(".zonecodes").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
  $(".address").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
});
Template.bandInformations.events({
  'click .savesocialpage' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();

          var socialpage = t.find("#socialpageinput").value;
         // alert('savesocialpage' + socialpage);
          if((socialpage !== "") &&( socialpage !== null))
          {
          myobj = {"id": Meteor.userId(), "socialpage": socialpage };
          Meteor.call('updatesocialpage', myobj);
        }
  },
  'click .savebandname' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var bandname = t.find("#bandnameinput").value;
          if((bandname !== "") &&( bandname !== null))
          {
          myobj = {"id": Meteor.userId(), "bandname": bandname };
          Meteor.call('updatebandname', myobj);
          }
  },
  'click .savebandtype' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var bandtype = t.find(".bandtype").value;
          if((bandtype !== "") &&( bandtype !== null))
          {
          myobj = {"id": Meteor.userId(), "bandtype": bandtype.toLowerCase() };
          Meteor.call('updatebandtype', myobj);
          }
  },
   'click .savebandsets' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var bandsets = t.find(".bandsets").value;
          if((bandsets !== "") &&( bandsets !== null))
          {
          myobj = {"id": Meteor.userId(), "bandsets": bandsets };
          Meteor.call('updatebandsets', myobj);
          }
  },
  'click .savephonenumber' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var phoneNumber = t.find("#phoneinput").value;
           if( (phoneNumber !== "") && ( phoneNumber !== null) && (phoneNumber !== "**** *** ***") )
          {
          myobj = {"id": Meteor.userId(), "phoneNumber": phoneNumber };
          Meteor.call('updatephonenumber', myobj);
        }
  },
  'click .savemember' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var membername = t.find(".inputmemebername").value;
          var memberrole = t.find(".memeberoleinput").value;
           if( (membername !== "") && ( membername !== null) && (memberrole !== "") && ( memberrole !== null)  )
          {
          myobj = {"id": Meteor.userId(), "membername": membername, "memberrole": memberrole };
          Meteor.call('savebandmember', myobj);
          setTimeout(function(){
            t.find(".inputmemebername").value = "";
          t.find(".memeberoleinput").value = "";
          }, 500);
        //  t.find(".inputmemebername").value = "";
        //  t.find(".memeberoleinput").value = "";
        }
  },
  'click .saverepertoire' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var songname = t.find(".inputrepertoirename").value;
          var singername = t.find(".repertoiresingerinput").value;
           if( (songname !== "") && ( songname !== null) && (singername !== "") && ( singername !== null)  )
          {
          myobj = {"id": Meteor.userId(), "songname": songname, "singername": singername };
          Meteor.call('saverepertoire', myobj);
          setTimeout(function(){
            t.find(".inputrepertoirename").value = "";
          t.find(".repertoiresingerinput").value = "";
          }, 500);
        //  t.find(".inputmemebername").value = "";
        //  t.find(".memeberoleinput").value = "";
        }
  },
  'click .removeMumber' :function(event, t)
  {
   var myobj = {};
    event.preventDefault();
    var $li = $('.removeMumber').closest('li');
    var name =   $li.children('.member').children('#name').html();
    var role = $li.children('.member').children('#role').html();
    //rmImgIndx = $li.parent().children().index($li);
          myobj = {"id": Meteor.userId(), "membername": name, "memberrole": role };
          Meteor.call('removememeber', myobj);
  },
  'click .removerepertoire' :function(event, t)
  {
   var myobj = {};
    event.preventDefault();
    var $li = $('.removerepertoire').closest('li');
    var singername =   $li.children('.repertoire').children('#singername').html();
    var songname = $li.children('.repertoire').children('#songname').html();
    //rmImgIndx = $li.parent().children().index($li);
          myobj = {"id": Meteor.userId(), "singername": singername, "songname": songname };
          Meteor.call('removesonglist', myobj);
  },
  'click .removeHighlight': function(event, t)
  { 
   var myobj = {};
    event.preventDefault();
    var $li = $('.removeHighlight').closest('li');
    var id = $li.children('.highlight').children('#content').attr("value");
    //rmImgIndx = $li.parent().children().index($li);
          myobj = {"id": Meteor.userId(), "highlightId": id };
          Meteor.call('removeHighlight', myobj);
  },
'click .savehighlight':function(event, t)
  { 
    var highlightlength = $('.highlights').children().length  + 1 ;
   var myobj = {};
    event.preventDefault();
    var higlightcontent  = t.find(".inputhighlight").value;
     if( (higlightcontent !== "") && ( higlightcontent !== null) && (higlightcontent !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "highlightId": "" +highlightlength+"" , "highlightcontent": higlightcontent  };
          Meteor.call('savehighlight', myobj);
          setTimeout(function(){
             t.find(".inputhighlight").value = "";
          }, 500);
        }
  },
 'click .saveregion' : function(event, t )
  {
    //$('#regionspan').html("");
    var region  = t.find("#regioninput").value;
    if( (region !== "") && ( region !== null) && (region !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "region": region  };
          Meteor.call('saveregion', myobj);
         
        }
  },
   'click .savecity' : function(event, t )
  {
    $('#cityspan').val("");
    var city  = t.find("#cityinput").value;
    if( (city !== "") && ( city !== null) && (city !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "city": "" +city+""   };
          Meteor.call('savecity', myobj);
         
        }
  },
  'click .saveaddress' : function(event, t )
  {
    $('#addressspan').val("");
    var address  = t.find(".inputaddress").value;
    if( (address !== "") && ( address !== null) && (address !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "address": address  };
          Meteor.call('saveaddress', myobj);
         
        }
  },
  'click .savepostecode' : function(event, t )
  {
    var postecode ="";
    postecode = $('.suggest-prompt').val();
    if(postecode !== undefined &&  postecode !== "" && postecode.length === 6) {
     Meteor.call('getplace', postecode ,  function(err, result){
      if(err) {
            $('#emptypostecodeerr').html('postcode not covered');
            $('#emptypostecodeerr').show();
                myobj = {"id": Meteor.userId(), "postecode": "" +$('.suggest-prompt').val()+""   };
                Meteor.call('savepostecode', myobj);
      
              }
      else{
       var addressesRow = [] ; var values = [];
       for (var i = 0 ; i <result.Addresses.length ; i++) {
       addressesRow =  result.Addresses[i].split(",");
       $('#regioninput').val(addressesRow[addressesRow.length - 1]);
       $('#cityinput').val(addressesRow[addressesRow.length - 2]);
       //$('#regionspan').html(addressesRow[addressesRow.length - 1]);
       //$('#cityspan').html(addressesRow[addressesRow.length - 2]);
       $('.inputaddress').html(addressesRow[0]);
       //$('#addressspan').html(addressesRow[0]);
       $('.address').empty();
       for (var j = ( addressesRow.length - 3 ); j >= 0; j--)
        {
          if(addressesRow[j].length > 6)
          {
            values.push(addressesRow[j]);
              $('.address').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
              $('.address ul li span').eq(0).css({'text-decoration': 'underline'});
        };
    };
       
    }
    var postecode  = t.find(".suggest-prompt").value;
    if( (postecode !== "") && ( postecode !== null) && (postecode !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "postecode": "" +postecode+""   };
          Meteor.call('savepostecode', myobj);
          
        }
  }
  Session.set("alladresses", values);
        $('.inputaddress').val(values[0]);
        $('.inputaddress').html(values[0]);

});
}
  }, 
  'keyup .inputaddress': function(e, t ){
    values = Session.get("alladresses");
   search = $('.inputaddress').val();
// Search regular expression
  // Clear the ul
  $('.address').empty();
for(var i = 0 ; i < values.length; i++){
  //$("#uladdress").append("<li><span> "+ values[i]+" </span>");
  if(values[i].match(search)){
//alert('much ... values i ' + values[i] + "search input " + search);
    $('.address').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.address ul li span').eq(0).css({'text-decoration': 'underline'});
  }
}
$(".address").show();
}
        //$(".address").html(options.join(''));
});

Template.userInformations.events({
  'click .savesocialpageuser' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();

          var socialpage = t.find("#socialpageuserinput").value;
         // alert('savesocialpage' + socialpage);
          if((socialpage !== "") &&( socialpage !== null))
          {
          myobj = {"id": Meteor.userId(), "socialpage": socialpage };
          Meteor.call('updatesocialpage', myobj);
        }
  },
  'click .savefirstname' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var firstname = t.find("#firstnameinput").value;
          if((firstname !== "") &&( firstname !== null))
          {
          myobj = {"id": Meteor.userId(), "firstname": firstname };
          Meteor.call('updateFirstname', myobj);
          }
  },
  'click .savelastname' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();

          var lastname = t.find("#lastnameinput").value;
          if((lastname !== "") &&( lastname !== null))
          {
          myobj = {"id": Meteor.userId(), "lastname": lastname };
          Meteor.call('updatelastname', myobj);
        }
  },
  'click .savebirthdate' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var birthdate = t.find("#birthinput").value;
             myDate = new Date(birthdate);
          myYear = myDate.getFullYear();
   myMonth = ( myDate.getMonth() + 1 );
   myDay = myDate.getDate();
          myobj = {"id": Meteor.userId(), "birthdate": myDate };
       

          Meteor.call('updatebirthdate', myobj);
  },  'click .savephonenumber' :function(event, t)
  {
    var myobj = {};
    event.preventDefault();
          var phoneNumber = t.find("#phoneinput").value;
           if( (phoneNumber !== "") && ( phoneNumber !== null) && (phoneNumber !== "**** *** ***") )
          {
          myobj = {"id": Meteor.userId(), "phoneNumber": phoneNumber };
          Meteor.call('updatephonenumber', myobj);
        }
  },
   'click .savegender' :function(event, t)
  {
    var gender = t.find(".usergender:checked").value;
    var myobj = {};
    event.preventDefault();
          if( gender  === "male"  || gender  == "male" ) 
          {
            myobj = {"id": Meteor.userId(), "gender": "male" };
            Meteor.call('updategender', myobj);
          }
          if( gender === "female" ) 
          {

            myobj = {"id": Meteor.userId(), "gender": "female" };
            Meteor.call('updategender', myobj);
          }
          
          },'click .saveregion' : function(event, t )
  {
    //$('#regionspan').html("");
    var region  = t.find("#regioninput").value;
    if( (region !== "") && ( region !== null) && (region !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "region": region  };
          Meteor.call('saveregion', myobj);
         
        }
  },
   'click .savecity' : function(event, t )
  {
    $('#cityspan').val("");
    var city  = t.find("#cityinput").value;
    if( (city !== "") && ( city !== null) && (city !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "city": "" +city+""   };
          Meteor.call('savecity', myobj);
         
        }
  },
  'click .saveaddress' : function(event, t )
  {
    $('#addressspan').val("");
    var address  = t.find(".inputaddress").value;
    if( (address !== "") && ( address !== null) && (address !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "address": address  };
          Meteor.call('saveaddress', myobj);
         
        }
 },
  'click .savepostecode' : function(event, t )
  {
    var postecode ="";
    postecode = $('.suggest-prompt').val();
     if(postecode !== undefined &&  postecode !== "" && postecode.length === 6) {
     Meteor.call('getplace', postecode ,  function(err, result){
      if(err) {
                 $('#emptypostecodeerr').html('postcode error');
                 $('#emptypostecodeerr').show();
                  myobj = {"id": Meteor.userId(), "postecode": "" +$('.suggest-prompt').val()+""   };
                  Meteor.call('savepostecode', myobj);
      
    
              }
      else{
       var addressesRow = [] ; var values = [];
       for (var i = 0 ; i <result.Addresses.length ; i++) {
       addressesRow =  result.Addresses[i].split(",");
       $('#regioninput').val(addressesRow[addressesRow.length - 1]);
       $('#cityinput').val(addressesRow[addressesRow.length - 2]);
       //$('#regionspan').html(addressesRow[addressesRow.length - 1]);
       //$('#cityspan').html(addressesRow[addressesRow.length - 2]);
       $('.inputaddress').html(addressesRow[0]);
       //$('#addressspan').html(addressesRow[0]);
       $('.address').empty();
       for (var j = ( addressesRow.length - 3 ); j >= 0; j--)
        {
          if(addressesRow[j].length > 6)
          {
            values.push(addressesRow[j]);
              $('.address').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
              $('.address ul li span').eq(0).css({'text-decoration': 'underline'});
        };
    };
       
    }
    var postecode  = t.find(".suggest-prompt").value;
    if( (postecode !== "") && ( postecode !== null) && (postecode !== undefined)  )
          {
          myobj = {"id": Meteor.userId(), "postecode": "" +postecode+""   };
          Meteor.call('savepostecode', myobj);
          
        }
  }
  Session.set("alladresses", values);
        $('.inputaddress').val(values[0]);
        $('.inputaddress').html(values[0]);

});
}
  }, 
  'keyup .inputaddress': function(e, t ){
    values = Session.get("alladresses");
   search = $('.inputaddress').val();
// Search regular expression
  // Clear the ul
  $('.address').empty();
for(var i = 0 ; i < values.length; i++){
  //$("#uladdress").append("<li><span> "+ values[i]+" </span>");
  if(values[i].match(search)){
//alert('much ... values i ' + values[i] + "search input " + search);
    $('.address').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.address ul li span').eq(0).css({'text-decoration': 'underline'});
  }
}
$(".address").show();
}
          


});
Template.notification.events({
  'click .removenotif' :function(event, template)
  { 
   // alert('remove notification');
    var id = $(event.currentTarget).attr('id');
    setTimeout(function()
    {
      Meteor.call('removeNotification', id);
    }, 500);
    /*$("#notificationList").on('click' ,'.notification-close', function () {
    $(this).parent().slideUp("slow");
    return false;
  });*/
  },
  'click .accept': function(event, template)
  {
    var recieverId = $(event.currentTarget).attr("id");
    var recieverName = $('.owner').attr('value');
    var timeStamp = Math.floor(Date.now()); 
    var Currentuser =  Users.findOne({"_id": currentUserId },  { fields: { username: 1 }});
   var myarg2 = { "ownerId": currentUserId,
  "ownerName": Currentuser.username,
 "recieverId": recieverId,
 "recieverName": recieverName,
 "time": timeStamp,
  "typ": "representation Request" ,
  "status" :"accepted", 
  "viewed" : false };
Meteor.call('addNotification', myarg2, function(error, result)
  {
    // pupoup bunner added notification
  });
var agent = { "artistId" : currentUserId , "agentId": recieverId,
    "agentName": recieverName,
 "time": timeStamp };
Meteor.call('addAgent' , agent);
    return;
  },
    'click .reject': function(event, template)
  {
    var recieverId = $(event.currentTarget).attr("id");
    var recieverName = $('.owner').attr('value');
    var timeStamp = Math.floor(Date.now()); 
    var Currentuser =  Users.findOne({"_id": currentUserId },  { fields: { username: 1 }});
   var myarg2 = { "ownerId": currentUserId,
  "ownerName": Currentuser.username,
 "recieverId": recieverId,
 "recieverName": recieverName,
 "time": timeStamp,
  "typ": "representation Request" ,
  "status" :"rejected", 
  "viewed" : false };
Meteor.call('addNotification', myarg2, function(error, result)
  {
    // pupoup bunner added notification
  });
Meteor.call('rejectNotification', myarg2, function(error, result)
  {
    // pupoup bunner added notification
  });
/*var agent = { "artistId" : currentUserId , "agentId": recieverId,
    "agentName": recieverName,
 "time": timeStamp };*/
Meteor.call('addAgent' , agent);
    return;
  },
  'mouseenter .notification-box-one': function(event, template)
  {
    var notificationId = "";
    notificationId = $(event.currentTarget).attr('id');
    Meteor.call('viewedNotification', notificationId);
    if($(".notificationcount").attr('value') === "0")
      $(".notificationcount").hide();
  }
 
});
Template.homeProfile.onCreated(function(){
  Session.set('myratings', 0);
  Meteor.subscribe("rating"); 
  Meteor.subscribe("docs"); 
  Meteor.subscribe("USERS");
  Meteor.subscribe('Calendars');
  Session.setDefault("videoId", "LdH1hSWGFGU");
  Session.set("myPlaylist", null);
  Session.set("myGallery", null);
  Session.set('pileName', null);
  Meteor.subscribe("songs");
  Meteor.subscribe("images"); 
  Meteor.subscribe("docs"); 

/*  var rached = "rach";
 rached = Users.find({"_id":  Meteor.userId() }, { fields: { profile : 1} }).fetch();
                  console.log(rached);
                 // alert('usertype : ' + Users.find({"_id":  Meteor.userId() }, { fields: { profile : 1} }).fetch(););
               Session.set("rachini", rached);
                                
 */
  //alert('usertype : ' + rav[0].profile.type) ;
  //Session.set('rachini', rachini[0].profile.type);   
  //console.log("rachini2 value : " + Session.get("rachini") );

    }

);
Template.homeProfile.events({ 
'click #popupdocreadclose': function(e, t)
{
  $("#adddocreadbg").fadeOut("slow");
      $("#popupdocread").fadeOut("slow");
}, 
'click .docnameurl': function(e, t)
{
//var url = $('.readdocument').attr('id');
window.open(Session.get('docurl')); 
}, 
'click .readdocument': function(e, t)
{
  Session.set('docurl', $(e.currentTarget).attr('id'));
  var gviewurl = "https://docs.google.com/gview?url="+Session.get('docurl')+"&embedded=true";
  $('.doc').attr('src',gviewurl);
  //$('.doc').attr('src',Session.get('docurl'));
  var url = $(e.currentTarget).attr('id').slice(0, $(e.currentTarget).attr('id').lastIndexOf('.'));

  //window.open(url);
  $('.docnameurl').text(url);
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupdocread").height();
    var popupWidth = $("#popupdocread").width();
    // Centering
    $("#popupdocread").css({
      "top": 10,
      "left": 10
    });
    // Aligning bg
    $("#adddocreadbg").css({"height": windowHeight});
    var pourcent = (windowHeight*70)/100;
    $(".doc").css({"height":pourcent });
  
    // Pop up the div and Bg
      $("#adddocreadbg").css({"opacity": "0.7"});
      $("#adddocreadbg").fadeIn("slow");
      $("#popupdocread").fadeIn("slow");
},  
'change .uploaddoc': function(e, t)
{
  var file = null;
  var myfile = {};
  e.stopImmediatePropagation();
  e.preventDefault();
    var reader = null;
file = t.find('.uploaddoc').files[0];
myfile.name  = file.name;
if(file.name.indexOf(".doc") > 0 || file.name.indexOf(".docx") > 0 || file.name.indexOf(".pdf") > 0) 
 {
 reader = new FileReader();
  myfile.name = t.find('.uploaddoc').files[0].name;
var upload = new Slingshot.Upload("myDocUploads");
             var timeStamp = Math.floor(Date.now());               
         upload.send(document.getElementById('uploaddocfile').files[0], function (error, downloadUrl) {
             uploader.set();
             console.log("uploader is : " + uploader.get());
             if (error) 
              {
               console.error('Error uploading');
               alert (error);
              }
             else
             {
              console.log('uploaded file available here: '+downloadUrl);
              var obj = {docname: document.getElementById('uploaddocfile').files[0].name, timeStamp :timeStamp, uploadedBy: currentUserId, url: downloadUrl };
              Meteor.call('addDocument', obj, function(error, result){ });            
             }
});
         uploader.set(upload);
         console.log("uploader is : " + uploader.get());
         //return false;
reader.readAsDataURL(file);
} 
else
{
$("#errdocname").html("only DOC & PDF supported");
$("#errdocname").show();

}
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupdoc").height();
    var popupWidth = $("#popupdoc").width();
    // Centering
    $("#popupdoc").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    $(".currentdocname").html(myfile.name);
    // Aligning bg
    $("#adddocbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#adddocbg").css({"opacity": "0.7"});
      $("#adddocbg").fadeIn("slow");
      $("#popupdoc").addClass('zigmaIn').fadeIn("slow");
},
'click #album_name':function(e, t)
{
$("#erralbumname").html("");
$(".validatealbumname").removeClass('glyphicon-asterisk');
},
'click #album_add': function(e, t)
{
 var albumname = t.find("#album_name").value;
 if(albumname === "" || albumname === undefined || albumname === "albumname")
{
  $("#erralbumname").html("empty album name");
  $(".validatealbumname").addClass('glyphicon-asterisk');
}
else 
{
  $(".validatealbumname").removeClass('glyphicon-asterisk');
  $("#erralbumname").html("");
  $("#addalbumbg").fadeOut("slow");
  $("#popupalbum").removeClass('zigmaIn').fadeOut("slow");   // Aligning bg
  $(".uploadFile").trigger('click'); 
}
},
'click #popupalbumclose': function(e, t)
{
    $("#errsongname").html("");
    $("#addalbumbg").fadeOut("slow");
    $("#popupalbum").removeClass('zigmaIn').fadeOut("slow");   // Aligning bg
},
'click #addalbumbg': function(e, t)
{
    $("#errsongname").html("");
    $("#addalbumbg").fadeOut("slow");
    $("#popupalbum").removeClass('zigmaIn').fadeOut("slow");   // Aligning bg
},
'click #popupdocclose': function(e, t)
{
    $("#errdocname").html("");
    $("#adddocbg").fadeOut("slow");
    $("#popupdoc").removeClass('zigmaIn').fadeOut("slow");   // Aligning bg
},
'click #adddocbg': function(e, t)
{
    $("#errdocname").html("");
    $("#adddocbg").fadeOut("slow");
    $("#popupdoc").removeClass('zigmaIn').fadeOut("slow");   // Aligning bg
},
'click #album_cancel': function(e, t)
{
    $("#errsongname").html("");
    $("#addalbumbg").fadeOut("slow");
    $("#popupalbum").removeClass('zigmaIn').fadeOut("slow");   // Aligning bg
},
'change .uploadFile':function(event, t)
{
  var file = null; 
  file = t.find('.uploadFile').files[0];
  file.name = t.find('.uploadFile').files[0].name;
  if( (t.find('.uploadFile').files[0].name.indexOf(".jpg") <= 0)  && (t.find('.uploadFile').files[0].name.indexOf(".jpeg") <= 0) && (t.find('.uploadFile').files[0].name.indexOf(".png") <= 0) ) 
  {
  $("#popupavatar #errsongname").html("invalid file");
  $("#popupavatar #errsongname").show();
  }
  else
  {
  //alert('valid File');
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--)
    {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    // get loaded data and render thumbnail.
    document.getElementById("image").src = e.target.result;
    //alert(e.target.result);
    var loadedImage = document.getElementById("image");//new Image();
    loadedImage.onload = function()
    {
      var canvas = document.getElementById("myCanvas");
      canvas.width =670;
      canvas.height = 525;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0 , 670, 525);
      //alert('loading ....');
      //var upload = new Slingshot.Upload("myImageUploads");
      var timeStamp = Math.floor(Date.now()); 
      var canv = document.getElementById("myCanvas").toDataURL('image/jpeg', 0.95);
      var blb = dataURLtoBlob(canv);
      blb.name=  document.getElementById('uploadFile').files[0].name;
      //alert('filename : ' + blb.name);
      event.preventDefault();
      var upload = new Slingshot.Upload("myImageUploads");
      var timeStamp = Math.floor(Date.now()); 
      //$grid = $( '#tp-grid' );
      Meteor.call('updatefoldername',  Session.get('pileName'));
      upload.send(blb, function (error, downloadUrl) 
      {
        uploader.set();
        if (error) {
          $("#processingImage").hide();
          console.error('Error uploading');
          alert (error);
                  }
        else{
          console.log('uploder : '  + uploader.get());
                // insert the uploaded image url into the database document
          var foldername = $("#album_name").val();
          //alert(foldername);
          if(foldername !== '' &&  foldername !== undefined && foldername !== 'albumname')
            {       
             imageFolder = $("#album_name").val();
             $("#album_name").val('');

            }
          else 
          {
            //($('.def-block ul.tp-grid').children().length > 1){
            //$grid.children().each(function() {
            //imageFolder = $(this).attr('id') ;
            imageFolder = Session.get('pileName');

            //});
          }    
          //alert(imageFolder);
          imageName = document.getElementById('uploadFile').files[0].name;
          //alert(downloadUrl);
          var myarg = {"imageurl": downloadUrl,"uploadedBy" : currentUserId,
          "imageName": imageName, 
          "imageFolder" : imageFolder,
          "timeStamp": timeStamp }
          Meteor.call('addImage',  myarg, function(error, result){
          if(error)
          {
            alert('inable to insert into database ')
          }
          else
          {    
            //$("#processingImage").hide();
            //$("#process").hide();
            //$("#processbg").hide();
            Images.insert({
            imageurl: downloadUrl,
            imageName: imageName,
            imageFolder: imageFolder,
            time: timeStamp,
            uploadedBy: currentUserId
            }); 
            var myImages = Images.find({uploadedBy : currentUserId }, {sort:{ time : -1 } }).fetch();
            Session.set("myGallery", myImages);
            $(".closealbum").click();
            setTimeout(function(){ 
              //alert('initialise gallery ...');      
              var $grid = $('#tp-grid'),
              $name = $('#name'),
              $close = $('#close'),
              $loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
              stapel = $grid.stapel({
              randomAngle : false,
              delay : 100,
              gutter : 0,
              pileAngles : 0,
              onLoad : function() {
                $('.addAlbum').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
                $('.removeAlbum').show();
                $loader.remove();
              },
              onBeforeOpen : function( pileName ) {
                $name.html( pileName );
               //$('.removeAlbum').hide();
               $(".addnewalbum").hide();  
                //$('.addAlbum').hide();
                $('.removeDiv').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
              },
              onAfterOpen : function( pileName ) {
                $(".addnewalbum").hide();
                $('.testingspan').hide();
                  Session.set('pileName',pileName);
                $("#addImagediv").show();
                showDelte = 1;
                $('.addAlbum').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
                $('.removeAlbum').hide();
                $('.def-block').on('mouseenter', 'ul.tp-grid li ', function(){
                  if(showDelte === 1)
                    {
                     $(".addnewalbum").hide();  
                    $(this).find('> div.removeDiv').show();
                    }
                }).on('mouseleave', 'ul.tp-grid li', function () {
                  if(showDelte === 1)
                    {
                      $(".addnewalbum").hide();  
                    $(this).find('> div.removeDiv').hide();
                    }
                  //$(".removeDiv").hide();
                                        });
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
                $close.show();
              }
              });
              $close.on( 'click', function() {
                $(".addnewalbum").show();
                showDelte = 0;
                //alert('onclose clicked ...');
                //$('.addAlbum').hide();
                $("#addImagediv").hide();
                $(this).hide();
                $("a[rel^='prettyPhoto']").prettyPhoto().unbind();
                $(".removeDiv").hide();
                $name.empty().html('Photo Gallery');
                stapel.closePile();
              });

              if ($("a[rel^='prettyPhoto']")[0]) 
              {
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
              }
               //$('ul#tp-grid li#'+Session.get('pileName')).trigger('click');
               setTimeout (function(){
                //alert('openeing the pile again ....');
                 $("#addavatarbg").fadeOut("slow");
                 $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");
                 $("#addavatarbg").fadeOut("slow");
                 $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");
                  $("#addavatarbg").fadeOut("slow");
                  $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");
               $(".full li#"+Session.get('pileName')).click();
             }, 3000);
            },1000);
          }
        });
      }
    });
    uploader.set(upload);
  }
  };
  reader.readAsDataURL(file);
  }
  var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupavatar").height();
    var popupWidth = $("#popupavatar").width();
    // Centering
    $("#popupavatar").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    var myimagename = file.name; 
    $(".currentsonname").html(myimagename);
    var myimagename =  myimagename.slice(0, myimagename.lastIndexOf("."));
    $('#song_name').val(myimagename);
    // Aligning bg
    $("#addavatarbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#addavatarbg").css({"opacity": "0.7"});
      $("#popupavatar").fadeIn("slow");
      $("#addavatarbg").addClass('zigmaIn').fadeIn("slow");
    
    // read the image file as a data URL.
    event.preventDefault();
       
},
  'click .removeDiv': function(e, t)
  {
    var id = $(e.currentTarget).attr('id');
    $li = $(e.currentTarget).parent();
    //alert('id of li : ' + $li.attr('id'));
    var showDelte = 0;
   //alert($li.html());
   // alert('removing image with....' + id);
    //alert(var myImages = Images.find({uploadedBy : currentUserId }, {sort:{ time : -1 } }).fetch();
     //Session.set("myGallery", myImages);
    // alert(Session.get('myGallery').length);
    Meteor.call("removeimage", id, function (err, result)
      {
        if(result){
          //console.log(Images.find({uploadedBy : Meteor.userId()}));
          $(".closealbum").click();
           $li.remove();
          //$('ul#tp-grid').remove($li);
         // alert(Images.find({uploadedBy : Meteor.userId()}).count());
          setTimeout(function(){ 
              var $grid = $('#tp-grid'),
              $name = $('#name'),
              $close = $('#close'),
              $loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
              stapel = $grid.stapel({
              randomAngle : false,
              delay : 100,
              gutter : 0,
              pileAngles : 0,
              onLoad : function() {
                $('.addAlbum').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
                //$('.removeAlbum').show();
                $loader.remove();
              },
              onBeforeOpen : function( pileName ) {
                $(".addnewalbum").hide();
                //$('.testingspan').hide();
                $name.html( pileName );
                $('.removeAlbum').hide();
                $('.addAlbum').hide();
                $('.removeDiv').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
              },
              onAfterOpen : function( pileName ) {
                //$('.testingspan').hide();
                  Session.set('pileName',pileName);
                 // alert('pileName : ' + Session.get('pileName'));
                $("#addImagediv").show();
                showDelte = 1;
                $('.addAlbum').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
                $('.removeAlbum').hide();
                $('.testingspan').hide();
                $('.def-block').on('mouseenter', 'ul.tp-grid li ', function(){
                  if(showDelte === 1)
                    {
                    $(this).find('> div.removeDiv').show();
                    //$('.testingspan').hide();
                    }
                    if(showDelte === 0)
                    {
                    $(this).find('> div.removeDiv').hide();
                    //$('.testingspan').show();
                    }
                }).on('mouseleave', 'ul.tp-grid li', function () {
                  if(showDelte === 1)
                    {
                  $(this).find('> div.removeDiv').hide();
                  //$('.testingspan').hide();
                    }
                    if(showDelte === 0)
                    {
                    //$(this).find('> div.removeDiv').hide();
                   // $('.testingspan').hide();
                    }
                  //$(".removeDiv").hide();
                                        });
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
                $close.show();
              }
              });
              $close.on( 'click', function() {
                $(".addnewalbum").show();
                $('.testingspan').show();
                showDelte = 0;
                //alert('onclose clicked ...');
                //$('.addAlbum').hide();
                $("#addImagediv").hide();
                $(this).hide();
                $("a[rel^='prettyPhoto']").prettyPhoto().unbind();
                $(".removeDiv").hide();
                $name.empty().html('Photo Gallery');
                stapel.closePile();
              });

              if ($("a[rel^='prettyPhoto']")[0]) 
              {
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
              }
               //$('ul#tp-grid li#'+Session.get('pileName')).trigger('click');
               setTimeout(function(){
                //alert('openeing the pile again ....');
                 /*$("#addavatarbg").fadeOut("slow");
                 $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");
                 $("#addavatarbg").fadeOut("slow");
                 $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");
                  $("#addavatarbg").fadeOut("slow");
                  $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");*/
               $(".full li#"+Session.get('pileName')).click();
             }, 1000);
            },3000);
        }
      });
      
  },
  /*'change .uploadavatar':function(e)
  {
    e.preventDefault();
    $('.uploadedblogimage').html(document.getElementById('uploadavatar').files[0].name); 
  },*/
 'change .uploadavatar': function(e, t )
 {
   var file = null;
  e.preventDefault();
    var reader = null;
file = t.find('.uploadavatar').files[0];
//if(file.name.indexOf(".jpeg") > 0 || file.name.indexOf(".jpg") > 0 || file.name.indexOf(".png") > 0) 
 reader = new FileReader();
 var upload = new Slingshot.Upload("myavatarUploads");              
         upload.send(document.getElementById('uploadavatar').files[0], function (error, downloadUrl) {
             uploader.set();
             console.log("uploader is : " + uploader.get());
             if (error) {
               //console.error('Error uploading');
               alert(error);
               console.log(error);
             }
             else{
               console.log('uploaded file available here: '+downloadUrl); 
          myobj = {"id": Meteor.userId() , "url" : downloadUrl };
          Meteor.call('uploadavatar', myobj);
                  }
  });                      
         uploader.set(upload);
reader.readAsDataURL(file);
var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupavatar").height();
    var popupWidth = $("#popupavatar").width();
    // Centering
    $("#popupcover").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    /*var mysongname = file.name; 
    $(".currentsonname").html(mysongname);
    var mysongname =  mysongname.slice(0, mysongname.lastIndexOf(".jpeg"));
    $('#song_name').val(mysongname);*/
    // Aligning bg
    $("#addavatarbg").css({"height": windowHeight});
    // Pop up the div and Bg
      /*$("#addavatarbg").css({"opacity": "0.7"});
      $("#addavatarbg").fadeIn("slow");
      $("#popupavatar").addClass('zigmaIn').fadeIn("slow");*/
  /*'change .uploadblogimage':function(e)
  {
    e.preventDefault();
    $('.uploadedblogimage').html(document.getElementById('uploadblogimage').files[0].name); 
  }*/
 },
 'change .uploadcover': function(e, t )
 {
   var file = null;
  e.preventDefault();
    var reader = null;
file = t.find('.uploadcover').files[0];
//if(file.name.indexOf(".jpeg") > 0 || file.name.indexOf(".jpg") > 0 || file.name.indexOf(".png") > 0) 
 reader = new FileReader();
 var upload = new Slingshot.Upload("myavatarUploads");              
         upload.send(document.getElementById('uploadcover').files[0], function (error, downloadUrl) {
             uploader.set();
             console.log("uploader is : " + uploader.get());
             if (error) {
               //console.error('Error uploading');
               alert(error);
               console.log(error);
             }
             else{
               console.log('uploaded file available here: '+downloadUrl); 
          myobj = {"id": Meteor.userId() , "url" : downloadUrl };
          Meteor.call('uploadcover', myobj);
                  }
  });                      
uploader.set(upload);
reader.readAsDataURL(file);
var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupcover").height();
    var popupWidth = $("#popupcover").width();
    // Centering
    $("#popupcover").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    /*var mysongname = file.name; 
    $(".currentsonname").html(mysongname);
    var mysongname =  mysongname.slice(0, mysongname.lastIndexOf(".mp3"));
    $('#song_name').val(mysongname);*/
    // Aligning bg
   /* $("#addcoverbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#addcoverbg").css({"opacity": "0.7"});
      $("#addbcoverbg").fadeIn("slow");
      $("#popupcover").addClass('zigmaIn').fadeIn("slow");*/
  /*'change .uploadblogimage':function(e)
  {
    e.preventDefault();
    $('.uploadedblogimage').html(document.getElementById('uploadblogimage').files[0].name); 
  }*/

 },

'click #event_regionname':function(e, t)
{
  var postecode =""; postecode = $('#event_postcode').val();
  //alert('event_regionname click '  + postecode);
    if(postecode !== undefined &&  postecode !== "" /*&& postecode.length === 6*/) {
     Meteor.call('getplace', postecode ,  function(err, result){
      if(err) {
            $('#emptyeventpostecodeerr').html('postcode not covered'); $('#emptyeventpostecodeerr').show();
                myobj = {"id": Meteor.userId(), "postecode": "" +$('#event_postcode').val()+""   };
              //  Meteor.call('savepostecode', myobj);
              }
      else{
       var addressesRow = [] ; var values = [];
       for (var i = 0 ; i <result.Addresses.length ; i++) {
       addressesRow =  result.Addresses[i].split(",");
       $('.eventregionnameedit #event_regionname').val(addressesRow[addressesRow.length - 1]);
       $('#event_regionname').val(addressesRow[addressesRow.length - 1]);

      $(' #event_cityname').val(addressesRow[addressesRow.length - 2]);
      $('.eventcitynameedit #event_cityname').val(addressesRow[addressesRow.length - 2]);

       $('#event_address').html(addressesRow[0]);
       //alert(addressesRow[0]);
       $('.addresseventedit input').val(addressesRow[0]);

       $('.postcodeevent .zonecodes').empty();
       $('.addresseventedit ul').empty();

       for (var j = ( addressesRow.length - 3 ); j >= 0; j--)
        {
          if(addressesRow[j].length > 6)
          {
            values.push(addressesRow[j]);
              $('.postcodeevent .zonecodes').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
              $('.postcodeevent ul li span').eq(0).css({'text-decoration': 'underline'});


              $('.addresseventedit ul').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
              $('.addresseventedit ul li span').eq(0).css({'text-decoration': 'underline'});

        }; };
    }
    var postecode  = t.find("#event_postcode").value;
    if( (postecode !== "") && ( postecode !== null) && (postecode !== undefined)  )
          { myobj = {"id": Meteor.userId(), "postecode": "" +postecode+""   }; // Meteor.call('savepostecode', myobj);     
          } }
  Session.set("alladresses", values); 
    $('#event_address').val(values[0]);
     $('#event_address').html(values[0]);
});
}
}
, 
  'keyup #event_address': function(e, t ){
    values = Session.get("alladresses");
   search = $('#event_address').val();
// Search regular expression
  // Clear the ul
  $('.addressnameevent .zonecodes').empty();
for(var i = 0 ; i < values.length; i++){
  //$("#uladdress").append("<li><span> "+ values[i]+" </span>");
  if(values[i].match(search)){
//alert('much ... values i ' + values[i] + "search input " + search);
    $('.addressnameevent .zonecodes').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.addressnameevent .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
  }
}
$(".addressnameevent .zonecodes").show();
}
,
'keyup .neweventaddress': function(e, t ){
    values = Session.get("alladresses");
   search = $('.neweventaddress').val();
// Search regular expression
  // Clear the ul
  $('.addresseventedit .zonecodes').empty();
for(var i = 0 ; i < values.length; i++){
  //$("#uladdress").append("<li><span> "+ values[i]+" </span>");
  if(values[i].match(search)){
//alert('much ... values i ' + values[i] + "search input " + search);
    $('.addresseventedit .zonecodes').append("<li><span class='suggest-name'>" + values[i] + "</span>");//<span class='suggest-description'>" + data[i].description + "</span></li>"));
    $('.addresseventedit .zonecodes li span').eq(0).css({'text-decoration': 'underline'});
  }
}
$(".addresseventedit .zonecodes").show();
}
,   
'click .saveevent': function(e, t)
{
var eventname = t.find("#event_name").value;
var postcode = t.find("#event_postcode").value;
var eventregion = t.find("#event_regionname").value;
var eventcity = t.find("#event_cityname").value;
var eventaddress = t.find("#event_address").value;
var eventvenue = t.find("#event_venue").value;
var eventtype = $("#Etype").text();
var startdate = t.find("#event_startdate").value;
var enddate  = t.find("#event_enddate").value;
var postcode = t.find("#event_postcode").value;
var verifeventname = false;
var verifeventtype = false;
var verifeventstart = false;
var verifeventend = false;
var verifeventcity = false;
var verifeventregion = false;
var verifeventaddress = false;
var verifeventvenue = false;
var verifeventbuilding = false;
var verifeventpostcode = false;
if(startdate.indexOf('PM'))
     {
       time = ""+ (parseInt(startdate.substr(11,2)) +12)+"";
      if(time ==="24")
        time ="00";  
     }
     else
     {
       time = ""+ startdate.substr(11,2) +"";
      
     }
  sdate = startdate.substr(0,10) + "T"+time+startdate.substr(13,3);//21:00:00";//+time+startdate.substr(13,3);
     //   alert(sdate);
     
     if(enddate.indexOf('PM'))
     {
       time = ""+ (parseInt(enddate.substr(11,2)) +12)+"";
      if(time ==="24")
        time ="00";
     }
     else
     {
       time = ""+ enddate.substr(11,2) +"";
     }
     edate = enddate.substr(0,10) + "T"+time+enddate.substr(13,3);//21:00:00";//+time+startdate.substr(13,3);

if(eventvenue === "" || eventvenue === undefined || eventvenue ==='venue name')
{
  verifeventvenue = true;
  $("#eventerr").html("empty venue");
  $(".valideventvenue").addClass('glyphicon-asterisk');
}
if(eventaddress === "" || eventaddress === undefined || eventaddress ==='address')
{
  verifeventaddress = true;
  $("#eventerr").html("empty address");
  $(".valideventaddress").addClass('glyphicon-asterisk');
}

if(eventcity === "" || eventcity === undefined || eventcity ==='city name')
{
  $("#eventerr").html("empty city name");
  $(".valideventcity").addClass('glyphicon-asterisk');
  verifeventcity = true;
}
if(eventregion === "" || eventregion === undefined || eventregion ==='region name')
{
  $("#eventerr").html("empty region name");
  $(".valideventregion").addClass('glyphicon-asterisk');
  verifeventregion = true;
}
if(postcode === "" || postcode === undefined || postcode ==='postcode')
{
  $("#eventerr").html("empty postcode");
  $(".valideventpostcode").addClass('glyphicon-asterisk');
  verifeventpostcode =true;
}
if(enddate === "DD-MM-YYYY HH:MM" )
{
  var verifeventend = false;
  $("#eventerr").html("empty end date");
  $(".valideventenddate").addClass('glyphicon-asterisk');
}
if(startdate === "DD-MM-YYYY HH:MM" )
{
  var verifeventstart = true;
  $("#eventerr").html("empty start date");
  $(".valideventstart").addClass('glyphicon-asterisk');
}
if( eventtype.indexOf('Select') > 0 )
{
  $("#eventerr").html("empty event type");
  alert(eventtype + ' === select type');
  var verifeventtype = true;
}
if(eventname === "" || eventname === undefined || eventname === "event name")
{
  $("#eventerr").html("empty event name");
  $(".valideventname").addClass('glyphicon-asterisk');
  verifeventname = true;
}

        if(!verifeventname && !verifeventtype && !verifeventstart && !verifeventend && !verifeventcity && !verifeventregion && !verifeventaddress && !verifeventvenue && !verifeventbuilding && !verifeventpostcode )
        {
          myobj = { "title" : eventname, "type" : eventtype, "start" : sdate, "end" : edate , "ownerId": Meteor.userId(), "bandId": Meteor.userId(), "postcode": postcode , "cityname" : eventcity, "regionname": eventregion , "address": eventaddress, "buildingname" : eventvenue };
          Meteor.call('addEvent', myobj, function(err, result){ 
          //  alert(result);
             eventData = {
             id: result,
            title: eventname, // $(this).data('title'),
            start: sdate, // '2016-10-13',//$(this).data('start'),
            end: edate, //'2016-10-13'//$(this).data('end')
          };
           $('#mycalendar').fullCalendar('renderEvent', eventData, true);
           $("#addeventbg").removeClass('zigmaIn').fadeOut("slow");
      $("#event_name").val("event name");
      $("#event_startdate").val("DD-MM-YYYY HH:MM");
      $("#event_enddate").val("DD-MM-YYYY HH:MM");
             $("#event_postcode").val('postcode');
             $("#event_cityname").val('city name');
             $("#event_regionname").val('region name');
             $(".zonecodes").hide();
             $("#event_address").val('address');
             $("#event_venue").val('venue name');
      $('#Etype').html('Select type');
             console.log(result); 
                      $(".valideventname").removeClass('glyphicon-asterisk');
             $(".valideventstart").removeClass('glyphicon-asterisk');
             $(".valideventenddate").removeClass('glyphicon-asterisk');
             $(".valideventpostcode").removeClass('glyphicon-asterisk');
             $(".valideventregion").removeClass('glyphicon-asterisk');
             $(".valideventcity").removeClass('glyphicon-asterisk');
             $(".valideventaddress").removeClass('glyphicon-asterisk');
             $(".valideventvenue").removeClass('glyphicon-asterisk');
             $("#eventerr").html("");
$("#popupevent").removeClass('zigmaIn').fadeOut("slow");
$("#addeventbg").removeClass('zigmaIn').fadeOut("slow");


           });
    
}
},
  'mouseenter .list li':function(e, t)
  {

    e.preventDefault();
   var id = parseInt($(e.currentTarget).attr('id'));
  $('.list').children('li').eq(id).children().eq(1).css({'opacity' : 1});//children('li').eq(0).children().find(' > .removewhishlistitem').css({'display','none'});
  },
  'mouseleave .list li':function(e, t)
  {

    e.preventDefault();
   var id = parseInt($(e.currentTarget).attr('id'));
  $('.list').children('li').eq(id).children().eq(1).css({'opacity' : 0});//children('li').eq(0).children().find(' > .removewhishlistitem').css({'display','none'});
  },
  'click .icon-remove' :function(e, t)
  {
   var myobj = {};
    event.preventDefault();
    var itemid = $(e.currentTarget).attr('id');
          myobj = {"id": Meteor.userId(), "itemid": itemid };
          Meteor.call('removewishlistitem', myobj);
  if($('.whishlist .list').children().length === 0)
   $('.emptywhishlist').css('display', 'block');        
  },
  'click .removeDoc' :function(e, t)
  {
   var myobj = {};
    event.preventDefault();
    var itemId = $(e.currentTarget).attr('id');
          Meteor.call('removeDocument', itemId);
  /*if($('.whishlist .list').children().length === 0)
   $('.emptywhishlist').css('display', 'block');*/        
  },
  'click .loadsongs' : function(e, t )
  {
   e.preventDefault();
 if($('.mysongsplayer .music-player-list').children().length > 0)
   $('.mysongsplayer .music-player-list').empty();
$('.music-player-list').ttwMusicPlayer( Session.get("myPlaylist") , {
    currencySymbol:'$',
    artist:'rached',
    buyText:'Remove',
    tracksToShow:3,
    autoplay:false,
    ratingCallback:function(index, playlistItem, rating){
      //some logic to process the rating, perhaps through an ajax call
    }
  });
},
'mouseenter ul#tp-grid li': function(e, t )
{
$li = $(e.currentTarget);
//alert('position left : ' + $li.position().left + ' top : '+$li.position().top);
//alert($li.offset().top + '  ' + $li.offset().left);
 // alert($li.find('> .removeDiv').position().left + '  ' + $li.find('> .removeDiv').position().top);
var id = $(e.currentTarget).attr('id');
$('#tp-grid div.testingspan').attr('id', id);
$('#tp-grid div.testingspan').css({'left': $li.position().left , 'top': $li.position().top});
//alert($li.find('> .removeDiv').position().left + ' '+$li.find('> .removeDiv').position().top);
/*$('#tp-grid div.testingspan').each(function (i) {
  if($(this).attr('id') == id)
  {
$(this).css({'left': $li.position().left , 'top': $li.position().top});
$(this).show();
return false;
}
});*/
//alert('id:  ' +id);
//$('#tp-grid li').each(function (i) {
  //  var id = $('#tp-grid li:first');
  //  if(id);
      //var tab =  $('.full  ul.tabs').find('li').eq(i).find('> a');
      //alert(tab.html());
  //  });
},
'mouseleave ul#tp-grid li': function(e, t )
{

$li = $(e.currentTarget);
   //  $li.find('> .removeDiv').hide();
  //else{$('div.testingspan').hide();}
},
'click .testingspan': function(e, t)
  {
   e.preventDefault();
    //e.preventDefault();
    //e.cancelBubble = true;
  // e.stopPropagation();
   // alert('hello rached' + this._id);
   // var currentLi = this.closest('li');
   // alert(currentLi.html());
//var imageId = $(this).closest('li').attr("id");
//alert('removing from db ' + this._id);
//$('.removeImage').trigger('click');
//Images.remove(this._id );     
 /* if(!e)  var e = window.event;
    e.stopPropagation();
    e.cancelBubble = true;
    if(e.stopPropagation())
      e.stopPropagation();*/
    var albumname = $(e.currentTarget).attr('id');
    Meteor.call('removeAlbum', albumname , function(err, result)
      {
        if(result)
        {
          $(".closealbum").click();
          $('ul#tp-grid li#'+albumname+'').remove();
          setTimeout(function(){ 
              var $grid = $('#tp-grid'),
              $name = $('#name'),
              $close = $('#close'),
              $loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
              stapel = $grid.stapel({
              randomAngle : false,
              delay : 100,
              gutter : 0,
              pileAngles : 0,
              onLoad : function() {
                $('.addAlbum').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
                //$('.removeAlbum').show();
                $loader.remove();
              },
              onBeforeOpen : function( pileName ) {
                //$('.testingspan').hide();
                $name.html( pileName );
                $('.removeAlbum').hide();
                $('.addAlbum').hide();
                $('.removeDiv').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
              },
              onAfterOpen : function( pileName ) {
                //$('.testingspan').hide();
                  Session.set('pileName',pileName);
                 // alert('pileName : ' + Session.get('pileName'));
                $("#addImagediv").show();
                showDelte = 1;
                $('.addAlbum').hide();
                //$('.removeAlbum').css('visibility', 'hidden');
                $('.removeAlbum').hide();
                $('.testingspan').hide();
                $('.def-block').on('mouseenter', 'ul.tp-grid li ', function(){
                  if(showDelte === 1)
                    {
                    $(this).find('> div.removeDiv').show();
                    //$('.testingspan').hide();
                    }
                    if(showDelte === 0)
                    {
                    $(this).find('> div.removeDiv').hide();
                    //$('.testingspan').show();
                    }
                }).on('mouseleave', 'ul.tp-grid li', function () {
                  if(showDelte === 1)
                    {
                  $(this).find('> div.removeDiv').hide();
                  //$('.testingspan').hide();
                    }
                    if(showDelte === 0)
                    {
                    //$(this).find('> div.removeDiv').hide();
                   // $('.testingspan').hide();
                    }
                  //$(".removeDiv").hide();
                                        });
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
                $close.show();
              }
              });
              $close.on( 'click', function() {
                $('.testingspan').show();
                showDelte = 0;
                //alert('onclose clicked ...');
                //$('.addAlbum').hide();
                $("#addImagediv").hide();
                $(this).hide();
                $("a[rel^='prettyPhoto']").prettyPhoto().unbind();
                $(".removeDiv").hide();
                $name.empty().html('Photo Gallery');
                stapel.closePile();
              });

              if ($("a[rel^='prettyPhoto']")[0]) 
              {
                $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
              }
               //$('ul#tp-grid li#'+Session.get('pileName')).trigger('click');
               //setTimeout(function(){
                //alert('openeing the pile again ....');
                 /*$("#addavatarbg").fadeOut("slow");
                 $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");
                 $("#addavatarbg").fadeOut("slow");
                 $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");
                  $("#addavatarbg").fadeOut("slow");
                  $("#popupavatar").removeClass('zigmaIn').fadeOut("slow");*/
              // $(".full li#"+Session.get('pileName')).click();
             //}, 1000);
            },1000);
        }
      });
        

  },


'click .loadgellery':function(e, t)
{
  /*$('#tp-grid li').each(function (i) {
    var id = $('#tp-grid li:first');
    if(id);
      //var tab =  $('.full  ul.tabs').find('li').eq(i).find('> a');
      //alert(tab.html());
    });*/
if ($("#tp-grid")[0]) {
  var $grid = $('#tp-grid'),
  $name = $('#name'),
  $close = $('.closealbum'),
  $loader = $( '<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>' ).insertBefore( $grid ),
  stapel = $grid.stapel({
    randomAngle : false,
    delay : 100,
    gutter : 0,
    pileAngles : 0,
    onLoad : function() {
      $('.addAlbum').hide();
      //$('.removeAlbum').css('visibility', 'hidden');
      $('.removeAlbum').hide();
      $loader.remove();
              },
    onBeforeOpen : function( pileName ) {
      $(".addnewalbum").hide();
      $name.html( pileName );
      $('.removeAlbum').hide();
      $('.addAlbum').hide();
         Session.set('pileName',pileName);
         //$('span.testingspan').hide();
               //   alert('pileName : ' + Session.get('pileName'));
      //$('.removeAlbum').css('visibility', 'hidden');
                      },
    onAfterOpen : function( pileName ) {
      // alert('hiding remove album ...');
      $('.testingspan').hide();
      //$('.testingspan').show();
      $("#addImagediv").show();
      showDelte = 1;
      $('.addAlbum').hide();
      //$('.removeAlbum').css('visibility', 'hidden');
      $('.removeAlbum').hide();
      $('.def-block').on('mouseenter', 'ul.tp-grid li ', function(){
        if(showDelte === 1)
        {
        //if(showDelte === 1)
         // {
          $(this).find('> div.removeDiv').show();
        }
          //}
      }).on('mouseleave', 'ul.tp-grid li', function () {
        if(showDelte === 1)
        {
        $(this).find('> div.removeDiv').hide();
      }
                              });
      $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
      $close.show();
                      }
    });
    $close.on( 'click', function() {
      $(".addnewalbum").show();
      showDelte = 0;
     // $('ul.tp-grid li').find('> div.removeDiv').hide();
           /* $('#tp-grid span.testingspan').each(function (i) {
     if((i < 1) && ($(this).attr('id') === Session.get('pileName')))
     {
//$('span.testingspan')
$(this).css({'left': $li.find('> .removeDiv').position().left , 'top': $li.find('> .removeDiv').position().top});
$(this).show();
i = 1;
return;
}
});*/
      //$('.addAlbum').hide();
      //$('span.testingspan').hide();
      $("#addImagediv").hide();
      $('.removeAlbum').show();
      //$('.testingspan').show();
      $(this).hide();
      $("a[rel^='prettyPhoto']").prettyPhoto().unbind();
      //$(".removeDiv").hide();
      $name.empty().html('Photo Gallery');
      stapel.closePile();
      $('.testingspan').show();
      
    });
  }
  // prettyPhoto
  if ($("a[rel^='prettyPhoto']")[0]) {
    $("a[rel^='prettyPhoto']").prettyPhoto({theme: 'dark_rounded',deeplinking:false});
  }
},
 /* 'click #uploadingmysong' : function()
  {
    alert('upload on google cloud ...');
    console.log(Session.get("obj"));
    alert(Session.get("obj").songname);

  }, */
  'change .uploadsong' :function(e, t)
  {
  var file = null;
  var myfile = {};
  e.stopImmediatePropagation();
  /*event.stopPropagation();*/
  e.preventDefault();
    var reader = null;
file = t.find('.uploadsong').files[0];
myfile.name  = file.name;
if(file.name.indexOf(".mp3") > 0 || file.name.indexOf(".ogg") > 0) 
 {
 reader = new FileReader();
reader.onload = function(evt)
{
  myfile = {};
 $("#myaudio2").attr('src', evt.target.result);
 myfile.name = file.name;
 //return false;
}
$("#myaudio2").on("canplaythrough", function(evt){
/*event.preventDefault();
event.stopPropagation();*/
  //event.stopImmediatePropagation();
 // myfile.name = file.name ;
  var duration = evt.currentTarget.duration;
  var min = new Number();
   var sec = new Number();
   var hours = new Number();
  sec = Math.floor(duration);
  min = Math.floor(sec / 60);
  hours = Math.floor(min / 60);
  min = min >= 10 ? min : '0' + min;
  hours = hours >= 10 ? hours : '0' + hours;
   sec = Math.floor(sec % 60 );
  sec = sec >= 10 ? sec : '0' + sec ;
  myfile.duration = hours +":"+ min + ":" + sec;
  myfile.name = t.find('.uploadsong').files[0].name;
 var upload = new Slingshot.Upload("mySongUploads");
             var timeStamp = Math.floor(Date.now());               
         upload.send(document.getElementById('uploadsongfile').files[0], function (error, downloadUrl) {
             uploader.set();
             console.log("uploader is : " + uploader.get());
             if (error) {
               console.error('Error uploading');
               alert (error);
             }
             else{
               console.log('uploaded file available here: '+downloadUrl);
               var obj = {songname: document.getElementById('uploadsongfile').files[0].name,
                   duration: myfile.duration,
                   time: timeStamp,
                   songurl :downloadUrl,
                   timeStamp :timeStamp,
                   uploadedBy: currentUserId};
               Meteor.call('addSong', obj, function(error, result){
    // pupoup bunner added notification
  });
            
             }
});
         uploader.set(upload);
         //return false;
         evt.stopImmediatePropagation();
});
reader.readAsDataURL(file);
//return false;
} 
else
{
$("#errsongname").html("only MP3 & OGG supported");
$("#errsongname").show();

}
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupsong").height();
    var popupWidth = $("#popupsong").width();
    // Centering
    $("#popupsong").css({
      "top": windowHeight / 2 - popupHeight / 2,
      "left": windowWidth / 2 - popupWidth / 2
    });
    var mysongname = file.name; 
    $(".currentsonname").html(mysongname);
    var mysongname =  mysongname.slice(0, mysongname.lastIndexOf(".mp3"));
    $('#song_name').val(mysongname);
    // Aligning bg
    $("#addsongbg").css({"height": windowHeight});
    // Pop up the div and Bg
      $("#addsongbg").css({"opacity": "0.7"});
      $("#addsongbg").fadeIn("slow");
      $("#popupsong").addClass('zigmaIn').fadeIn("slow");
      
  }
});

Template.homeProfile.helpers({
    showAvatar : function(currentuser)
    {
      if(currentuser) {
      if(currentuser.profile.hasOwnProperty('avatar'))
      {
        //$(".full #avatarProf").attr("src", currentuser.profile.avatar);
        return currentuser.profile.avatar;
      }
      else
      {
        return "images/avatarProfileM3.png";
      }
                     }
                     else 
                     {
                      return "images/avatarProfileM3.png";
                     }

    },
      showCover : function(currentuser)
    {
      if(currentuser) {
      if(currentuser.profile.hasOwnProperty('cover'))
        return currentuser.profile.cover;
      else
        return "images/5.jpeg";
                     }
                     else 
                     {
                      return "images/5.jpeg";
                     }

    },
    whishlist: function(currentuser)
  {
    if(currentuser.profile.type === "costumer" /*&& currentuser.whishlist.length > 0 */)
    {
    if (currentuser.whishlist )
    {
      if (currentuser.whishlist.length > 0 )
    {
      $('.emptywhishlist').css('display', 'none');
      console.log('hiding the emptywhishlist');
      var mywhishlist  =[];
      for (var i = 0 ; i <  currentuser.whishlist.length ; i ++ ) {
        var item = {_id: currentuser.whishlist[i].id, username: currentuser.whishlist[i].username };
        mywhishlist.push(item);
      };
        return mywhishlist;
    }
    else 
    {
      $('.emptywhishlist').css('display', 'block');
      return false;
    }
  }
  }
  else 
    {
      $('.emptywhishlist').css('display', 'block');
      return false;
    }
  },
     isUploading: function () {
        return Boolean(uploader.get());
    },

    progress: function () {
    var upload = uploader.get();
    if (upload)
    {
$("#myProgress").show();
      if(Math.round(upload.progress()*100) === 100)
      {
        /*$("#processingImage").show();
        $("#process").show();
        $("#processbg").show();
       $("#myProgress").css('visibility', 'hidden');*/
       $("#addsongbg").fadeOut("slow");
       $("#popupsong").removeClass('zigmaIn').fadeOut("slow");
       
       $("#addsongbg").fadeOut("slow");
       $("#popupsong").removeClass('zigmaIn').fadeOut("slow");

       $("#addsongbg").fadeOut("slow");
       $("#popupsong").removeClass('zigmaIn').fadeOut("slow");

       /*$(".songuploadbox").css({"visibility":"visible"});
       setTimeout(function(){
       $(".songuploadbox").css({"visibility":"hidden"});
       }, 2000);*/
      }
    return Math.round(upload.progress() * 100);
  }
    },
    progressimage: function () {
    var upload = uploader.get();
    //alert('uploader is :');
    if (upload)
    {
      console.log('progressimage : ' + upload.progress() * 100);
      $("#popupavatar #myProgress").show();
      $("#popupavatar #progressUploading").show();
      if(Math.round(upload.progress()*100) === 100)
      {
        /*$("#processingImage").show();
        $("#process").show();
        $("#processbg").show();
       $("#myProgress").css('visibility', 'hidden');*/
      

       /*$(".songuploadbox").css({"visibility":"visible"});
       setTimeout(function(){
       $(".songuploadbox").css({"visibility":"hidden"});
       }, 2000);*/
      }
    return Math.round(upload.progress() * 100);
  }
    },
    progressdoc: function () {
    var upload = uploader.get();
    //alert('uploader is :');
    if (upload)
    {
      console.log('progressimage : ' + upload.progress() * 100);
      $("#popupdoc #myProgress").show();
      $("#popupdoc #progressUploading").show();
      if(Math.round(upload.progress()*100) === 100)
      {
         $("#popupdoc").hide();
         $("#adddocbg").hide();
        /*$("#processingImage").show();
        $("#process").show();
        $("#processbg").show();
       $("#myProgress").css('visibility', 'hidden');*/
      

       /*$(".songuploadbox").css({"visibility":"visible"});
       setTimeout(function(){
       $(".songuploadbox").css({"visibility":"hidden"});
       }, 2000);*/
      }
    return Math.round(upload.progress() * 100);
  }
    },    
    youtubeurl : function()
    {
      
    var band = Users.findOne({"_id": Meteor.userId()});
    if(band !== undefined  && band.profile !== undefined )
     {
      if(band.profile.youtubevideourl !== undefined)
      Session.set("videoId", band.profile.youtubevideourl);
       else
        Session.set("videoId", "LdH1hSWGFGU");
      }
  //  return true;

    onYouTubeIframeAPIReady = function () {
      player = new YT.Player("player", {height: "400", width: "600", videoId:  Session.get("videoId"), 
            // Events like ready, state change, 
            events: {
                onReady: function (event) {
                  $("#youtube_video").click(function(ev){
                    //alert('click ...');
                    ev.preventDefault();
                    var myurlvideo = ""
                    myurlvideo  = $("#input-i").val();
                    var url = "";
     if(myurlvideo === "" ||  myurlvideo === null || myurlvideo === undefined)
    {
      $("#erryoutubeurl").html("empty video url");
    }
    else
    {
    if(myurlvideo.toString().indexOf("www.youtube.com") === -1)
    {
      $("#erryoutubeurl").html("invalid video url ");
    }
    else
    {
     $("#erryoutubeurl").html("");
       url =  myurlvideo.slice(myurlvideo.lastIndexOf("v=") + 2);
     myobj = {"id": Meteor.userId(), "youtubevideourl": url  };
       Meteor.call('updateyoutubevideo', myobj, function(err, result)
       {
        if(result)
        {
       $("#addyoutubebg").fadeOut("slow");
      $("#popupvideo").removeClass('zigmaIn').fadeOut("slow");
      event.target.loadVideoById(url);
        }
       }); //change .call
       }
  }
                 // event.target.stopVideo();
                 });
                }
            }
        });
    };
    YT.load();
    return true;
  
  },
allsongs : function()
{
  var band = Users.findOne({"_id": Meteor.userId()});
  if(band !== undefined  && band.profile !== undefined )
{
  //console.log(band.profile.bandName);
  var pllist = [];
  var mysongs = [] ; 
  mysongs =  songs.find({"uploadedBy": Meteor.userId()}).fetch();
  if(mysongs.length > 0)
  {
mysongs.forEach(function(song){
pllist.push({"id":song._id,
 "title" : song.songname ,
/*'cover':'1.jpg' ,*/
 "duration" : song.duration, 
  'rating':5,
   'mp3': song.songurl,
    'buy':'javascript:void(0)',
 'artist': band.profile.bandName});
});
Session.set("myPlaylist", pllist);
console.log("myPlaylist session get from allsongs : " + Session.get("myPlaylist"));
return Session.get("myPlaylist")
}
else {
   Session.set("myPlaylist", null);
return Session.get("myPlaylist")
}
}
},
  myusername: function(user)
  {
    if(user !== null && user !== undefined && user.profile !== undefined){
   
    if(user.profile.type === "band")
      {
        if( user.profile.hasOwnProperty('bandName') )
        {
          return user.profile.bandName; 
        }
        else {
          return user.username; 

        }
       
      }
      else 
      {
    return user.username;
      }
    }
  },
  bandprofile: function(usertype)
  { 
     if(usertype === "band")
      {
       return true; 
      }
      else 
      {
    return false;
      }
  },
  userprofile: function(usertype)
  { 
    if(usertype === undefined);
    {
     // Meteor.call('updatetype', Meteor.userId());
    }
     if(usertype === "costumer" || usertype === "agent" )
      {
       return true; 
      }
      else 
      {
   return false;
      }      
  },
   adminprofile: function(usertype)
  { 
     if(usertype === "admin" )
      {
       return true; 
      }
      else 
      {
   return false;
      }      
  }
  ,
    emtyNotifcations : function()
    {

      if ( Notifications.find({recieverId:  currentUserId }).count() == 0 )
      {
           return true ;
        
      }
      else { $(".emptynot").html(""); return false; }
      
    }, 
    
    counter : function (){      
      var counter = 0 ; 
     counter =  Notifications.find({recieverId:  currentUserId , viewed : false}).count();
     Session.set('notcounter', counter);
     if(counter > 0 ) {
      $(".notificationcount").show();
     // $('.ullist > p').remove();  
    }
    else {
      $(".notificationcount").hide();
      $(".emptynot").html("there is no notifications");
          }
    return counter;
  },
  images: function() {
   //return Images.find({uploadedBy : currentUserId});
    var myImages = Images.find({uploadedBy : currentUserId }, {sort:{ time : -1 } }).fetch();
     Session.set("myGallery", myImages);
     //alert('proceeding images ....');
     return Session.get('myGallery');
   //return Tasks.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");

  },
documents: function()
{
  if(Docs.find({uploadedBy : currentUserId }, {sort:{ time : -1 } }).count() > 0)
  {
 return  Docs.find({uploadedBy : currentUserId }, {sort:{ time : -1 } }).fetch();
  }
else 
  return false; 
},
  notifications: function() {
   //return Images.find({});
    return Notifications.find({ recieverId:  currentUserId}, {sort:{ time : 1 } });
   //return Tasks.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");

  },
  messages: function() {
   //return Images.find({});
    return chat.find({ recieverId:  currentUserId, status :'pending'  }, {sort:{ time : 1 } });
   //return Tasks.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");

  },
  emtyMesages : function()
    {
      if ( chat.find({ recieverId:  currentUserId, status :'pending'  }).count() == 0 )
      {
           return true ;
        
      }
      else {  return false; }
      
    },
  users: function() {
   //return Images.find({});
    return Meteor.users.find({});
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
    $("#myProgress").css('visibility', 'visible');
    //var width = Math.round(upload.progress()*100);
    //alert('width' + width);
     // $("#myBar").css('width', width + '%');
      if(Math.round(upload.progress()*100) === 100)
      {
        $("#processingImage").show();
        $("#process").show();
        $("#processbg").show();
       $("#myProgress").css('visibility', 'hidden');
     // $('.def-block ul.tp-grid').append('<li data-pile="Billie Jean" class="grid_3 lastLi"><a href="../../images/assets/gallery/70.jpg" rel="prettyPhoto[Billie Jean]"><img src="../../images/assets/gallery/70.jpg" alt="china concert" /></a></li>');
      }
    return Math.round(upload.progress() * 100);
  }
    },

    url: function () {

    //return Images.findOne({uploadedBy: currentUserId},{sort:{ time : -1 } });

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
function getMonthName(month) {
// create array to hold name of each month
var ar = new Array(12)
ar[0] = "January"
ar[1] = "February"
ar[2] = "March"
ar[3] = "April"
ar[4] = "May"
ar[5] = "June"
ar[6] = "July"
ar[7] = "August"
ar[8] = "September"
ar[9] = "October"
ar[10] = "November"
ar[11] = "December"

// return name of specified month (parameter)
return ar[month]
}