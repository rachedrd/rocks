// display all users collections
import { Mongo } from 'meteor/mongo';
//export const Usrs =  Accounts.users;//Accounts.users;
//var users = Accounts.users.find({});
//var sendEmails = Accounts.users.find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");
//export const Tasks =  Accounts.users;//find(" (this.profile.gender ==  null ||  this.profile.phoneNumber ==  null || this.profile.city ==  null || this.profile.phoneNumber ==  null) && (this.createdAt <= new Date() || this.createdAt >= new Date().getDate()-1 ) ");
export const Tasks = Accounts.users.find();
//export const Tasks =  new Mongo.Collection('tasks');//Accounts.users;
/*console.log('tasks are the next ...');
Tasks.insert({ text: "Hello world!", createdAt: new Date() });*/
//console.log(Tasks.fetch());
//console.log(sendEmails);


