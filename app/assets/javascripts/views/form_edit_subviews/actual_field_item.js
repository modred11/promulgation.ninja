Promulgation.Views.ActualFieldItem = Backbone.View.extend({
  template: JST['form_edit/actual_field_item'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  }
});