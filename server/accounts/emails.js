import { Email } from 'meteor/email';
Accounts.emailTemplates.from ="admin@giggorilla.uk.co";
Accounts.emailTemplates.siteName ="giggorilla.uk.co";
Accounts.emailTemplates.resetPassword.text = function ( user, url ) {
 url = url.replace('/#', '');
 url = url.replace('/reset-password/', '/reset-password:');

return 'updated click here to reset you password   ' + url;
};
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[giggorilla] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "admin@giggorilla.co.uk",
        emailBody      = `Thanks for joining us, To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};

Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
Meteor.methods({
  sendEmail: function (to, subject, text) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: 'giggorilla.co.uk',  
      subject: subject,
      text: text
    });
    return ;

  }
});

/*Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});*/
/*Accounts.emailTemplates.siteName = "giggorilla.co.uk";
Accounts.emailTemplates.from     = "giggorilla <admin@giggorilla.co.uk>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[giggorilla] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@giggorilla.co.uk",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};*/
