// server/smtp.js
Meteor.startup(function () {
  smtp = {
    username: 'giggorillatest',   // eg: server@gentlenode.com
    password: '09763744',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 587
  }
//
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

// code to run on server at startup
  //process.env.MAIL_URL = 'smtp://postmaster%40meteorize.mailgun.org:YOURPASSWORD@smtp.mailgun.org:587';
//process.env.MAIL_URL = 'smtp://postmaster@sandbox46bf571b3b294967b23f5c73c70a6a21.mailgun.org:1702912df8ab0aa7401b300847553070@smtp.mailgun.org:25';


// server/smtp.js
//process.env.MAIL_URL = 'smtp://postmaster%40sandbox7bc3c7f46a0549119cc6065d1284fc39.mailgun.org:b14d90c1d6c0af21749e628e4fedce37@smtp.mailgun.org';
//postmaster@sandbox7bc3c7f46a0549119cc6065d1284fc39.mailgun.org Default Password b14d90c1d6c0af21749e628e4fedce37
//Accounts.emailTemplates.from = "Verification link"; 
/*
  smtp = {
    username: 'postmaster@sandbox46bf571b3b294967b23f5c73c70a6a21.mailgun.org',   // eg: server@gentlenode.com
    password: '1702912df8ab0aa7401b300847553070',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.mailgun.org',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
Accounts.emailTemplates.from = "Verification link"; */
  /*Domain Information State A1ctive IP Address 209.61.151.224
   SMTP Hostname smtp.mailgun.org 
   Default SMTP Login postmaster@sandbox46bf571b3b294967b23f5c73c70a6a21.mailgun.org
    Default Password 1702912df8ab0aa7401b300847553070 Manage SMTP 
    credentials API Base URL https://api.mailgun.net/v3/sandbox46bf571b3b294967b23f5c73c70a6a21.mailgun.org 
    API Key key-2a5166aa4ace604aca38838d20c3536e*/
//});
