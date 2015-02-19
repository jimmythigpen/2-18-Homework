(function(){

//
// Model
//
var Person = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: ''
  }
});

//
// Collection
//
var People = Backbone.Collection.extend({
  model: Person,

  url: 'https://api.parse.com/1/classes/Person',
});
//
// Create Person View
//
var CreatePersonView = Backbone.View.extend({
  template: _.template($('[data-template-name=person-input]').text()),
  tagName: 'form',
  events: {
    'click .js-save-button': 'save'
  },

  save: function(event){
    event.preventDefault();
    var firstName = $('.js-first-name').val();
    var lastName = $('.js-last-name').val();
    var address = $('.js-address').val();
    var phoneNumber = $('.js-phone-number').val();
    this.collection.create({
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber
    });
  },

  render: function(){
    this.$el.html(this.template());

  }

});

//
// Router
//
var AppRouter = Backbone.Router.extend({
  routes: {
    "": 'index'
  },

  initialize: function(){
    this.peopleCollection = new People();
    this.createPersonView = new CreatePersonView({collection: this.peopleCollection});

  },

  index: function(){
    this.createPersonView.render();
    $('.app-container').append(this.createPersonView.el);

  }

});

//
// Config
//
$.ajaxSetup({
  headers: {
  "X-Parse-Application-Id": "qqfcicZoDEJdv8oWLRefGt1ddkG28ATZ8qzpIry8",
  "X-Parse-REST-API-Key": "7cIpBEjXbQHWOsZAkOC35zltoZUiF3XkUCmA61A6"
  }
});

//
// Glue Code
//
$(document).ready(function(){
  window.router = new AppRouter();
  Backbone.history.start();
});

}());
