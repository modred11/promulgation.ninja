Promulgation.Views.PotentialFieldItem = Backbone.View.extend({
  template: JST['form_edit/potential_field_item'],
  tagName: 'li',
  className: function() {
    return 'potential-item-button ' + this.model.field_type + '-button';
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    this.trigger('render');

    return this;
  },

  onRender: function() {
    this.trigger('onRender');

    var offset = $('.form-edit').offset() || {left: 0, top: 0};

    var boundingBox = [
      offset.left,
      offset.top,
      $('.form-edit').width(),
      $('.form-edit').height()
    ];

    this.$el.draggable({
      cursor: "move",
      connectToSortable: '.fields.fields-index',
      opacity: 0.7,
      containment: boundingBox,
      helper: function(e) {
        var model = new Promulgation.Models.Field(this.model);

        var view = new Promulgation.Views.ActualFieldItem({
          model: model
        });

        view.render();

        Promulgation.displacedViews[view.cid] = view;

        view.$el.data('view-cid', view.cid);

        return view.$el;
      }.bind(this),
    });
  }
});
