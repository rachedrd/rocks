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
/*Template.task.events({ 'click .rnm': function(e, t)
  {
    alert('removing ....');
    //e.preventDefault();
    //e.cancelBubble = true;
   // alert('hello rached' + this._id);
   // var currentLi = this.closest('li');
   // alert(currentLi.html());
//var imageId = $(this).closest('li').attr("id");
alert('removing from db ' + this._id);
//$('.removeImage').trigger('click');
Images.remove(this._id );     
  }
});*/
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
 Meteor.subscribe("images"); 
  Meteor.subscribe("notifications");
  Meteor.subscribe("songs");
 /*setTimeout(function(){
  $.getScript('../js/zwindows.js');    
},2000);*/
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
/*Template.homeEvents.helpers({

currentMonth: function()
{
  return Session.get("monthName");
},
currentYear: function()
{
  return Session.get("currentYear");
}
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
/* Template.homeEvents.onRendered(function(){
setCal();
function getTime() {
// initialize time-related variables with current time settings
var now = new Date()
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
var now = new Date()
var year = now.getYear();
Session.set("currentYear", now.getFullYear());
if (year < 1000)
year+=1900
var month = now.getMonth()
var monthName = getMonthName(month)
Session.set("monthName", monthName);
var date = now.getDate()
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
text += '<p class="evo_fc_day">' + digit + '</p>'
digit++
}
//}
//text += '</div>'
}
 $(".eventon_fullcal").append(text);
 $(".eventon_fullcal").append('<div class="clear"></div>');

}
 });*/
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
'click .searchlabel':function()
{
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
$(".bandtypes").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
setTimeout(function(){
$("#ex2").slider({tooltip: 'show'});
}, 0);
$("#ex2").show();
});
Template.homeBands.helpers({
artits: function() {
//alert(Session.get("bandtype"));
var query = { $and : [] };
var minmaxsalary = { "profile.salary" : {$lt: 5001  , $gte : 0 } };
var bandtype = {"profile.bandtype" : /./ };
if(Session.get("bandtype")  !== undefined  )
{
  //alert("undefined session");
  //bandtype = {"profile.bandtype" : /./ }
    bandtype = {"profile.bandtype" : { $regex: "" + Session.get("bandtype")+ "" } };
    query.$and.push(bandtype);
// var bandtype = { "profile.bandtype" : Session.get("bandtype") } ;
//query = query + '"profile.bandtype": "'+Session.get("bandtype")+'"' ; //+Session.get("bandtype")+"  }";
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
                     , { sort : {"profile.salary" : parseInt(Session.get("salaryasc")) } } );
                 // ).sort({"profile.salary" : -1});

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

Template.imageUploader.events({'click .uploading': function(event, template) {
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
  Meteor.subscribe("USERS");
  Meteor.subscribe('Calendars');
  Session.setDefault("videoId", "LdH1hSWGFGU");
  Session.set("myPlaylist", null);
  Meteor.subscribe("songs");
  Meteor.subscribe("images"); 
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
  /*'click #youtube_video': function(e, t)
  {
    
  },*/
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
  'click .loadsongs' : function(e, t ){
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
  });},
'click .loadgellery':function(e, t)
{
if ($("#tp-grid")[0]) {
  var $grid = $('#tp-grid'),
  $name = $('#name'),
  $close = $('#close'),
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
      //alert('onclose clicked ...');
      //$('.addAlbum').hide();
      $(this).hide();
      $("a[rel^='prettyPhoto']").prettyPhoto().unbind();
      //$(".removeDiv").hide();
      $name.empty().html('Photo Gallery');
      stapel.closePile();
      /*stapel = $grid.stapel( {
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
    });*/
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
    $(".songuploadbox").css({"visibility":"visible"});
    setTimeout(function(){
      $(".songuploadbox").css({"visibility":"hidden"});
    }, 2000);
      }
    return Math.round(upload.progress() * 100);
  }
    },
    youtubeurl : function()
    {
      
    var band = Users.findOne({"_id": Meteor.userId()});
    if(band !== undefined  && band.profile !== undefined )
     {
      Session.set("videoId", band.profile.youtubevideourl);
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
   //return Images.find({});
    return Images.find({uploadedBy : currentUserId }, {sort:{ time : 1 } });
   //return Tasks.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");

  },
  notifications: function() {
   //return Images.find({});
    return Notifications.find({ recieverId:  currentUserId }, {sort:{ time : 1 } });
   //return Tasks.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");

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