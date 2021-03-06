Promulgation.Views.FormEditSidebar = Backbone.CompositeView.extend({
  template: JST['form_edit/form_edit_sidebar'],
  className: 'form-edit-sidebar',

  initialize: function () {
    var stdOpts = {model: this.model};

    this.tabs = [
      new Promulgation.Views.PotentialFields(stdOpts),
      new Promulgation.Views.FieldProperties(),
      new Promulgation.Views.FormProperties(stdOpts)
    ];

    this.addSubview('.tabular-content', this.tabs[0]);
  },

  // TODO override .eachSubview &c to include tabs?
  //      => or extend .viewQuery like { super && this.tabs.find(selector) }

  events: {
    'click .tabs .tab': 'clickTab',
    'click .promulgate': 'promulgate'
  },

  openTab: function(newTabIndex) {
    var tab = this.tabs[ newTabIndex ];

    if (tab.prepareToBeATab) {
      if (!tab.prepareToBeATab(this.model)) {
        this.$('.tabs .tab').eq(newTabIndex).addClass('grey');

        return;
      }
    }

    this.$('.tabs .active').removeClass('active');

    this.removeSubviews(true);

    this.$('.tabs .tab').eq(newTabIndex).addClass('active').removeClass('grey');

    this.addSubview('.tabular-content', tab);

    this.$('[autofocus]').first().focus();
  },

  clickTab: function(e) {
    var target = $(e.currentTarget);

    this.openTab(target.index());
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  promulgate: function(e) {
    // var target = $(e.currentTarget);
    //
    // if (target.is('.nope-nope')) return;
    //
    // target.addClass('nope-nope');

    // var hasReturned = false;

    $.ajax({
      method: 'PUT',
      url: '/api/forms/' + this.model.get('id') + '/promulgate',
      success: function(model) {
        // Promulgation.confirm(
        //   'The form has been published, the url is live at http://www.promulgation.ninja/' + model.slug
        // );

        this.model.set(model);
        this.model.fetch();

        Promulgation.triggerPromulgate();

        // hasReturned = true;
      }.bind(this)
    });

    // TODO don't open form until ajax call returns
    // TODO don't let this run for more than 1 second

    // while (!hasReturned) {}

    window.open('/' + this.model.get('id'), '_blank');
  }
});
