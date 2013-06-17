// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#apps"),
	
	name:'',

    // Our template for the line of statistics at the bottom of the app.
    template: _.template('<div class="app" id="<%= name %>"><h2>App Name:<%= name %></h2></div>'),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      //"keypress #new-todo":  "createOnEnter",
      //"keyup #new-todo":     "showTooltip",
      "click .app h2": "clicked"
    },
	
	clicked: function(e) {
		this.name='Baal';
	},

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
		this.name=this.options.name;
      //_.bindAll(this, 'addOne', 'addAll', 'render');
      //Todos.bind('all',     this.render);
      //Todos.fetch();
	  this.render();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      this.$el.append(this.template({
        name:      this.name
      }));
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView({name:'Kaal'});
  
	window.App.on('change:name', function(model, val) {
		alert("changed");
		alert(val);
	});
});
