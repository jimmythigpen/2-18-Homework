(function(){

//
// Post Model
//
var PostModel = Backbone.Model.extend({
  idAttribute: 'objectId'
});

//
// Posts Collection
//
var PostsCollection = Backbone.Collection.extend({
  model: PostModel,

  url: 'https://api.parse.com/1/classes/Blog',

  parse: function(response){
      return response.results;
  }
});

//
// Single Post View
//
var SinglePostView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('[data-template-name=blog-list-template]').text()),
  events: {
    'click': 'viewPost'
  },
  render: function(){
    this.$el.append(this.template(this.model.toJSON()));
},

  viewPost: function(event){
    event.preventDefault();
    router.navigate('post/' + this.model.id, {
      trigger: true
    });
  }
});

//
// Posts List View
//
var PostsListView = Backbone.View.extend({
  el: '.js-blog-list',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var self = this;

    this.$el.empty();

    this.collection.each(function(post){
      var postView = new SinglePostView({model: post});
      postView.render();
      self.$el.append(postView.el);
    });
    return this;
  }
});
//
// Posts Detail View
//
var PostDetailView = Backbone.View.extend({
      el: '.js-blog-post',

      template: _.template($('[data-template-name=blog-post-template]').text()),

      render: function(){
        $('.js-blog-post').empty();
        this.$el.append(this.template(this.model.toJSON()));
    },
});
//
// Router
//
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'post/:id': 'viewPost'
  },

  initialize: function(){
    this.posts = new PostsCollection();
    this.postsListView = new PostsListView({collection: this.posts});
    this.postDetailView = new PostDetailView();

  },

  index: function(){
    this.posts.fetch();
  },

  viewPost: function(id){
      var self = this;
      this.posts.fetch().done(function(){
        self.postDetailView.model = self.posts.get(id);
        self.postDetailView.render();
      });
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

})();
