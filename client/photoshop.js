import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

var uploader = new ReactiveVar();
var orientaion = 0;
var typeofuser = new ReactiveVar()
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
Template.represntationreq.onCreated(
  function(){
    Meteor.subscribe("notifications"); 
  }
  );
Template.represntationreq.events({'click .sendreqRep': function(event, template) {
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
});
Template.seeprofile.onCreated(function(){
 Meteor.subscribe("images"); 
  Meteor.subscribe("notifications");
 setTimeout(function(){
  $.getScript('../js/zwindows.js');    
},2000);

});


Template.homeIndex.onCreated(function(){
 setTimeout(function(){
$.getScript('../js/zzzrevolution.js');
}, 2000);
});


Template.seeprofile.helpers({ 
  imgs: function(){
    return Images.find({uploadedBy : this._id});
     } });
Template.homeBands.helpers({
bands: function() {
return Users.find({
  $or:[
                     {"profile.type" : "band"},
                     {"profile.type" : "artist"},
                    ]
                  });
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
Template.homeProfile.onRendered( function(){
  this.subscribe("images");
  this.subscribe("USERS");
  this.subscribe("notifications");
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

setTimeout(function(){
 $('head').append('<script type="text/javascript" src ="../js/zwindows.js">');

  //$.getScript('../js/zwindows.js');
  /*$grid.children().each(function() {
        if ( $(this).hasClass("lastLi") ) {
          $grid.find('li').eq($(this).index()).remove();
        }
      });*/
            
},3000);
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

Template.bandInformations.helpers({
  allmemebers: function(){
    return  Users.findOne({"_id": Meteor.userId() } , { fields: { "profile": 1} });
  },
  postecodes: function(){
    var genericpostcodes = ["AB101AA","AB101AB","AB101AF","AB101AG","AB101AH","AB101AJ","AB101AL","AB101AN","AB101AP","AB101AQ","AB101AR","AB101AS","AB101AU","AB101AW","AB101AX","AB101BA","AB101BB","AB101BD","AB101BF","AB101BH","AB101BR","AB101BS","AB101BU","AB101BW","AB101DB","AB101DG","AB101DQ","AB101DU","AB101EP","AB101FE","AB101FF","AB101FG","AB101FL","AB101FQ","AB101FR","AB101FT","AB101FW","AB101FX","AB101FY","AB101GE","AB101GF","AB101GS","AB101GZ","AB101HA","AB101HE","AB101HF","AB101HH","AB101HP","AB101HS","AB101HT","AB101HW","AB101JB","AB101JD","AB101JE","AB101JF","AB101JG","AB101JH","AB101JJ","AB101JL","AB101JN","AB101JP","AB101JQ","AB101JR","AB101JS","AB101JT","AB101JU","AB101JW","AB101JX","AB101JZ","AB101LB","AB101LG","AB101LP","AB101LQ","AB101LU","AB101LX","AB101NG","AB101NJ","AB101NL","AB101NN","AB101NP","AB101NT","AB101NW","AB101PA","AB101PD","AB101PE","AB101PF","AB101PG","AB101PN","AB101PP","AB101PR","AB101PS","AB101PU","AB101PY","AB101QA","AB101QB","AB101QD","AB101QE","AB101QH","AB101QJ","AB101QL","AB101QN","AB101QQ","AB101QR","AB101QS","AB101QT","AB101QU","AB101QW","AB101QX","AB101QZ","AB101RA","AB101RB","AB101RD","AB101RE","AB101RG","AB101RH","AB101RJ","AB101RL","AB101RN","AB101RP","AB101RQ","AB101RR","AB101RS","AB101RT","AB101RU","AB101RW","AB101RX","AB101RY","AB101RZ","AB101SA","AB101SB","AB101SD","AB101SE","AB101SH","AB101SJ","AB101SL","AB101SN","AB101SP","AB101SQ","AB101SR","AB101SS","AB101ST","AB101SU","AB101SY","AB101TA","AB101TB","AB101TD","AB101TE","AB101TF","AB101TH","AB101TJ","AB101TL","AB101TN","AB101TP","AB101TQ","AB101TR","AB101TS","AB101TT","AB101TW","AB101TX","AB101TY","AB101TZ","AB101UA","AB101UB","AB101UD","AB101UE","AB101UF","AB101UG","AB101UH","AB101UJ","AB101UL","AB101UN","AB101UP","AB101UQ","AB101UR","AB101US","AB101UT","AB101UU","AB101UW","AB101UX","AB101UY","AB101UZ","AB101WB","AB101WD","AB101WE","AB101WF","AB101WG","AB101WH","AB101WP","AB101WR","AB101WS","AB101WT","AB101XA","AB101XB","AB101XD","AB101XE","AB101XF","AB101XG","AB101XH","AB101XL","AB101XN","AB101XP","AB101XU","AB101XW","AB101XY","AB101XZ","AB101YA","AB101YB","AB101YD","AB101YE","AB101YF","AB101YH","AB101YL","AB101YN","AB101YP","AB101YR","AB101YS","AB101YT","AB101ZA","AB101ZG","AB101ZP","AB101ZT","AB101ZU","AB101ZX","AB106AA","AB106AB","AB106AD","AB106AE","AB106AG","AB106AH","AB106AJ","AB106AL","AB106AN","AB106AP","AB106AQ","AB106AR","AB106AS","AB106AT","AB106AU","AB106AX","AB106AY","AB106BA","AB106BB","AB106BE","AB106BF","AB106BJ","AB106BL","AB106BN","AB106BP","AB106BQ","AB106BR","AB106BS","AB106BT","AB106BU","AB106BW","AB106BX","AB106BY","AB106BZ","AB106DA","AB106DB","AB106DD","AB106DE","AB106DF","AB106DG","AB106DH","AB106DJ","AB106DL","AB106DS","AB106DT","AB106DU","AB106ED","AB106EE","AB106EG","AB106EH","AB106EJ","AB106EL","AB106EN","AB106EP","AB106EQ","AB106ER","AB106ES","AB106ET","AB106EU","AB106EW","AB106EX","AB106EY","AB106FA","AB106FB","AB106FL","AB106FN","AB106FP","AB106GA","AB106HA","AB106HB","AB106HD","AB106HE","AB106HF","AB106HG","AB106HH","AB106HJ","AB106HL","AB106HN","AB106HP","AB106HQ","AB106HR","AB106HS","AB106HT","AB106HU","AB106HW","AB106HX","AB106HY","AB106JA","AB106JB","AB106JD","AB106JE","AB106JF","AB106JG","AB106JH","AB106JJ","AB106JL","AB106JN","AB106JP","AB106JQ","AB106JR","AB106JU","AB106JW","AB106JY","AB106JZ","AB106LE","AB106LF","AB106LG","AB106LH","AB106LP","AB106LQ","AB106LR","AB106LX","AB106LZ","AB106NA","AB106NB","AB106ND","AB106NJ","AB106NL","AB106NN","AB106NP","AB106NQ","AB106NR","AB106NU","AB106NW","AB106NY","AB106NZ","AB106PA","AB106PB","AB106PD","AB106PE","AB106PF","AB106PG","AB106PH","AB106PJ","AB106PL","AB106PN","AB106PP","AB106PQ","AB106PR","AB106PS","AB106PT","AB106PU","AB106PW","AB106PX","AB106PY","AB106PZ","AB106QA","AB106QB","AB106QD","AB106QE","AB106QF","AB106QG","AB106QH","AB106QJ","AB106QL","AB106QN","AB106QP","AB106QQ","AB106QR","AB106QS","AB106QT","AB106QU","AB106QW","AB106QX","AB106QY","AB106QZ","AB106RA","AB106RB","AB106RD","AB106RE","AB106RF","AB106RG","AB106RH","AB106RJ","AB106RL","AB106RN","AB106RP","AB106RQ","AB106RR","AB106RS","AB106RT","AB106RU","AB106RW","AB106RX","AB106RY","AB106RZ","AB106SA","AB106SB","AB106SD","AB106SE","AB106SF","AB106SG","AB106SH","AB106SJ","AB106SL","AB106SN","AB106SP","AB106SQ","AB106SR","AB106SS","AB106ST","AB106SU","AB106SW","AB106SX","AB106SY","AB106SZ","AB106TA","AB106TB","AB106TD","AB106TE","AB106TF","AB106TG","AB106TJ","AB106TP","AB106TQ","AB106TR","AB106TS","AB106UQ","AB106UR","AB106US","AB106UT","AB106UX","AB106UZ","AB106WD","AB106WE","AB106WU","AB106XA","AB106XB","AB106XD","AB106XE","AB106XF","AB106XH","AB106XJ","AB106XL","AB106XN","AB106XP","AB106XQ","AB106XR","AB106XS","AB106XT","AB106XU","AB106XW","AB106XX","AB106YA","AB106YH","AB106YZ","AB107AA","AB107","AB","AB107AD","AB107AE","AB107AF","AB107AG","AB107AH","AB107AJ","AB107AL","AB107AN","AB107AP","AB107AQ","AB107AR","AB107AS","AB107AT","AB107AU","AB107AW","AB107AX","AB107AY","AB107AZ","AB107BA","AB107BB","AB107BD","AB107BE","AB107BF","AB107BG","AB107BH","AB107BJ","AB107BL","AB107BN","AB107BP","AB107BQ","AB107BR","AB107BS","AB107BT","AB107BU","AB107BW","AB107BX","AB107BY","AB107BZ","AB107DA","AB107DB","AB107DD","AB107DE","AB107DF","AB107DG","AB107DH","AB107DJ","AB107DL","AB107DN","AB107DP","AB107DQ","AB107DR","AB107DS","AB107DT","AB107DU","AB107DX","AB107DY","AB107DZ","AB107EA","AB107EB","AB107ED","AB107EE","AB107EF","AB107EG","AB107EH","AB107EJ","AB107EL","AB107EN","AB107EP","AB107EQ","AB107ER","AB107ES","AB107ET","AB107EU","AB107EW","AB107EX","AB107EY","AB107EZ","AB107FA","AB107FB","AB107FD","AB107FE","AB107FF","AB107FG","AB107FH","AB107FJ","AB107FL","AB107FN","AB107FP","AB107FQ","AB107FR","AB107FS","AB107FT","AB107FW","AB107FX","AB107FY","AB107FZ","AB107GA","AB107GB","AB107GD","AB107GE","AB107GH","AB107GR","AB107GS","AB107GT","AB107GU","AB107GW","AB107GX","AB107GY","AB107GZ","AB107HA","AB107HB","AB107HD","AB107HE","AB107HF","AB107HG","AB107HH","AB107HJ","AB107HL","AB107HN","AB107HP","AB107HQ","AB107HR","AB107HS","AB107HT","AB107HU","AB107HW","AB107HX","AB107HY","AB107HZ","AB107JA","AB107JB","AB107JD","AB107JE","AB107JF","AB107JG","AB107JH","AB107JJ","AB107JL","AB107JN","AB107JP","AB107JQ","AB107JR","AB107JS","AB107JT","AB107JU","AB107JW","AB107JX","AB107JY","AB107JZ","AB107LA","AB107LB","AB107LD","AB107LE","AB107LF","AB107LG","AB107LH","AB107LJ","AB107LL","AB107LN","AB107LP","AB107LQ","AB107LR","AB107LS","AB107LT","AB107LU","AB107LW","AB107LX","AB107LY","AB107LZ","AB107NA","AB107NB","AB107ND","AB107NE","AB107NF","AB107NG","AB107NH","AB107NJ","AB107NL","AB107NN","AB107NP","AB107NQ","AB107NR","AB107NS","AB107NT","AB107NU","AB107NW","AB107NX","AB107NY","AB107NZ","AB107PA","AB107PB","AB107PD","AB107PE","AB107PF","AB107PG","AB107PH","AB107PL","AB107PN","AB107PP","AB107PQ","AB107PR","AB107PS","AB107PT","AB107PU","AB107PW "];
  return genericpostcodes;
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
  bandsets: function(sets)
  {
   if((sets !== "" ) && (sets !== null ))
   {
    return sets ; 
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
        else {
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
Template.bandInformations.events({
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
          myobj = {"id": Meteor.userId(), "bandtype": bandtype };
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
     Meteor.call('getplace', postecode ,  function(err, result){
      if(err) {
        alert('there is an error '); alert('error' + err);
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

Template.homeProfile.helpers({
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
     if(usertype === "costumer")
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