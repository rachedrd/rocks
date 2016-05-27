// display all users collections
import { Mongo } from 'meteor/mongo';
//export const Usrs =  Accounts.users;//Accounts.users;

//export const Tasks =  new Mongo.Collection('tasks');//Accounts.users;
export const Images = new Mongo.Collection('images');
//console.log('tasks are the next ...');
//Tasks.insert({ text: "Hello world!", createdAt: new Date() });
//console.log(Images.find({}));