Promulgation.Views.ActualFields = Backbone.CompositeView.extend({
  template: JST['form_edit/actual_fields'],

  events: {
    'sortstop': 'saveOrds'
  },

  saveOrds: function() {
    this.$('.fields.fields-index > li').each(function(i, element) {
      $(element).trigger('saveOrd');
    }.bind(this));

    this.model.fields().sort();
    this.resortSubviews();
  },

  resortSubviews: function() {
    var subviews = this.subviews('.fields');
    subviews.sort(function(a, b) {
      return Math.sign(a.model.get('ord') - b.model.get('ord'));
    });
  },

  initialize: function () {
    this.listenTo(this.model.fields(), 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.fields(), 'remove', this.removeItemView);

    this.listenTo(this.model.fields(), 'add', this.addItemView);

    this.listenTo(this, 'subview:render', this.resetScrollTop);
    this.model.fields().each(this.addItemView.bind(this));
    this.resortSubviews();
  },

  addItemView: function(model) {
    if (typeof model.attributes.ord == "undefined") {
      model.set('ord', this.model.fields().length);
    }

    var subview = new Promulgation.Views.ActualFieldItem({model: model});
    this.addSubview('.fields', subview);
  },

  removeItemView: function(model) {
    var subview = this.getViewForModel(model);

    subview.animateRemoval(function() {
      this.removeModelSubview('.fields', model);
    }.bind(this));
  },

  resetScrollTop: function() {
    _.defer(function() {
        this.$('.fields').scrollTop(this.scrollTop);
    }.bind(this) );
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    this.attachSubviews();

    this.$('.fields').sortable({
      axis: 'y',
      placeholder: 'drop-placeholder',
      forcePlaceholderSize: true,
      delay: 110,
      step: function() {
        debugger;
      },
      receive: function(e, ui) {
        this.scrollTop = this.$('.fields').scrollTop();

        var helper = ui.helper;
        var view = Promulgation.displacedViews[helper.data('view-cid')];

        view.model.set('form_id', this.model.get('id'));

        this.model.fields().add(view.model, { silent: true });

        this.addSubview('.fields', view);
        this.saveOrds();

        delete Promulgation.displacedViews[helper.data('view-cid')];

        helper.data('view-cid', undefined);
      }.bind(this)
    }).disableSelection();

    return this;
  }
});
