Promulgation.Views.FieldProperties = Backbone.View.extend({
  template: JST['form_edit/field_properties'],

  events: {
    'change input': 'changeProperty',
    'keyup input': 'changeProperty'
  },

  initialize: function() {
    this.listenTo(this.model.fields(), "add", function(newField) {
      this.model = newField;
    }.bind(this));
    this.model = this.model.fields().first();
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  },

  changeProperty: function(e) {
    var target = $(e.currentTarget);

    debugger

    property = this.model.attributes;

    var parents = target.attr('name').replace(/\]/g, '').split('[');

    _(parents.slice(0, -1)).each(function(parent) {
      property = property[parent];
    });

    debugger;

    property[_(parents).last()] = target.val();

    this.model.set(parents[0], this.model.attributes[parents[0]]);
    this.model.save();

    // TODO delay the .save() call so it isn't fired for every keypress
  }
});
