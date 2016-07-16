// Scheduled mail to complete profile information for users
import { Mongo } from 'meteor/mongo';

function sendMail(details) {
    Email.send({
        from: details.from,
        to: details.to,
        subject: details.subject,
        text: details.text
    });
    return;
}
function allUsers()
{
    var rightNow = new Date();
rightNow.setDate(rightNow.getDate()-1);
//rightNow.setDate(rightNow.getDate());
var yesterday = new Date(rightNow.valueOf());
yesterday.setDate(rightNow.getDate()-2);
 var users2 = Accounts.users.find({
           $and:[{
                $or:[
                     {"profile.gender" : null},
                     {"profile.phoneNumber" : null},
                     {"profile.city" : null},
                     {"profile.birthDate" : null},
                    ]
                }
                , {"createdAt" :  {$lt: rightNow, $gte : yesterday}}
                ]
        });
users2.forEach(function(doc, err) {
      if (doc != null) {
      secondDetails = {
from: 'admin@gigorillatest.co.uk',
to: doc.emails[0].address,
subject: 'Hepl us to provide better service',
text: 'Hi '+doc.profile.firstname+' ' +doc.profile.lastname+' , in order to provide you a better suppport please complete your profile(phone number, birthday, postal address)',
};       sendMail(secondDetails);
         //console.log(doc.emails[0].address);
      }
   });
}
// add fonctions to schedule and record your task.
function addCronMail( ) {
    SyncedCron.add({
        name: 'sendScheduledEmail',
        schedule: function(parser) {
          //  return parser.recur().on(details.date).fullDate();
           return parser.text('at 00:00:00 pm');

        },
        job: function() {
            console.log('loopThroughUsers');
            //sendMail(details);
            allUsers();
           }
    });

}
Meteor.startup(function() {
    addCronMail();  
    SyncedCron.start();

});

