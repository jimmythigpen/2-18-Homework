(function(){

//
// Post Model
//
var Post = Backbone.Model.extend({
  idAttribute: "objectId",
  defaults: {
    title: '',
    body: '',
  }
});

//
// Post Collection
//
var PostCollection = Backbone.Collection.extend({
  model: Post,

  url: 'https://api.parse.com/1/classes/Post',

});

//
// Post View
//
var PostView = Backbone.View.extend({
  template: _.template($('[data-template-name=post-item]').text()),
  tagName: 'form',
  events: {
    "click .js-save-button": "post"
  },

  post: function(event){
    event.preventDefault();
    var title = $('.js-post-title').val();
    var body = $('.js-post-body').val();
    this.collection.create({
      title: title,
      body: body
    });
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  }

});

//
// Router
//
var AppRouter = Backbone.Router.extend({
  routes: {
    "": 'index'
  },

  initialize: function() {
    this.postCollection = new PostCollection();
    this.postView = new PostView({collection: this.postCollection});
  },

  index: function(){
    this.postView.render();
    $('.app-container').append(this.postView.el);


  },

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

})();
