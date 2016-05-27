import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { Images } from '../api/images.js';
/*Template.body.helpers({
  tasks() {
   return Tasks.find({});
   //return Tasks.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");

  },
});*/

//sendEmails = Accounts.users.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");
//sendEmails = Accounts.users.find("this.createdAt >= new Date().getDate()-1 )");
//sendEmails = Tasks.find({});
//sendEmails = Accounts.users.find("timestamp: {} (this.type == costumer ) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");
//console.log('sendEmails');
//console.log(sendEmails);

/*
Template.body.helpers({
  users: [

    { profile: {name: 'This is task 1' }},

    { profile: {name: 'This is task 2' }},

    { profile: {name: 'This is task 3' }},

  ],

});*/

