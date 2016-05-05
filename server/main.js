import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import '../imports/api/Users.js';

//smtp = {
    /*username: 'postmaster%40sandbox34ce7a7c610c427d9dce572def302b89.mailgun.org',
    password: 'bb758b38b379f3aba357b41137e5c2e1',
    server: 'smtp.mailgun.org',
    port: 25*/
  /*  username: 'giggorillatest%40@gmail.com',
    password: '09763744',
    server: 'smtp.gmail.com',
    port: 465
}*/

//Meteor.startup(() => {
	//process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  // code to run on server at startup
  //process.env.MAIL_URL = 'smtp://postmaster%40meteorize.mailgun.org:YOURPASSWORD@smtp.mailgun.org:587';
//process.env.MAIL_URL = 'smtp://postmaster%40sandbox46bf571b3b294967b23f5c73c70a6a21:1702912df8ab0aa7401b300847553070@smtp.mailgun.org:587';
//process.env.MAIL_URL = 'smtp://giggorillatest:09763744@smtp.gmail.com:465/';
//process.env.MAIL_URL="smtp://giggorillatest:09763744@smtp.gmail.com:465";
//process.env.MAIL_URL="MAIL_URL=smtp://postmaster@sandbox34ce7a7c610c427d9dce572def302b89.mailgun.org:bb758b38b379f3aba357b41137e5c2e1@smtp.mailgun.org:587/";
//Accounts.emailTemplates.from = "Verification link"; 
  /*Domain Information State A1ctive IP Address 209.61.151.224
   SMTP Hostname smtp.mailgun.org 
   Default SMTP Login postmaster@sandbox46bf571b3b294967b23f5c73c70a6a21.mailgun.org
    Default Password 1702912df8ab0aa7401b300847553070 Manage SMTP 
    credentials API Base URL https://api.mailgun.net/v3/sandbox46bf571b3b294967b23f5c73c70a6a21.mailgun.org 
    API Key key-2a5166aa4ace604aca38838d20c3536e*/
//});

//});
/*
curl -s --user 'api:key-e681b82db6a4f0d72b0756ad231388df' \
    https://api.mailgun.net/v3/sandbox34ce7a7c610c427d9dce572def302b89.mailgun.org/messages \
    -F from='Mailgun Sandbox <postmaster@sandbox34ce7a7c610c427d9dce572def302b89.mailgun.org>' \
    -F to='rachednemr <giggorillatest@gmail.com>' \
    -F subject='Hello rachednemr' \
    -F text='Congratulations rachednemr, you just sent an email with Mailgun!  You are truly awesome!'*/