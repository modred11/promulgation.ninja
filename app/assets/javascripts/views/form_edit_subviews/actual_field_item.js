Promulgation.Views.ActualFieldItem = Backbone.View.extend({
  template: JST['form_edit/actual_field_item'],
  tagName: 'li',
  className: 'form-edit-actual-item',

  events: {
    'saveOrd': 'saveOrd'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.fields(), 'sync change remove add', this.render);
    // this.listenTo(this.model, 'destroy', this.animateRemoval);
  },

  animateRemoval: function(callback) {
    this.$el.effect("drop", {
        duration: 300,
        complete: function() {
          callback();
          // this.remove();
        }.bind(this)
    });
  },

  saveOrd: function() {
    if (this.model.get('ord') === this.$el.index()) {
      return;
    }
    this.model.save({ord: this.$el.index()});
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    this.trigger('render');

    this.$el.data('model-id', this.model.get('id'));

    return this;
  }
});
