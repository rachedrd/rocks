import '../imports/ui/body.js';
UI.registerHelper("money", function(amount){
  return accounting.formatMoney(amount);
});
UI.registerHelper("markdown", function(text){
  var converter = new Showdown.converter();
  return converter.makeHtml(text);
});
/*import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/


