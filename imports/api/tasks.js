// display all users collections
import { Mongo } from 'meteor/mongo';
export const Usrs =  Accounts.users;//Accounts.users;

//export const Usrs =  new Mongo.Collection('tasks');//Accounts.users;
/*console.log('tasks are the next ...');
Tasks.insert({ text: "Hello world!", createdAt: new Date() });
console.log(Tasks);*/