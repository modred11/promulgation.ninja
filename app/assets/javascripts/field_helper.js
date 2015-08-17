(function(fieldHelper){
  var types = [
    { field_type: "text"         , value: ""  },
    { field_type: "textarea"     , value: ""  },

    // { field_type: "dropdown"     , fields: [] },
    // { field_type: "radio"        , fields: [] },
    // { field_type: "checkbox"     , fields: [] },
    //
    // { field_type: "website"      , value: ""  },
    // { field_type: "date"         , value: ""  },
    // { field_type: "rating"       , value: ""  },
    // { field_type: "phone"        , value: ""  },
    // { field_type: "email"        , value: ""  },
    //
    // { field_type: "visual text"  , value: ""  },
    //
    // { field_type: "section break"             },
    // { field_type: "page break"                },
    //
    // { field_type: "address"      , fields: [] },
    //
    // { field_type: "likert"       , value: ""  },
    // { field_type: "code editor"  , value: ""  },
    // { field_type: "markup editor", value: ""  }
  ];

  var makeField = fieldHelper.makeField = function(field) {
    var h = "";

    // if (field.attributes) field = field.attributes;

    return (new Field(field.attributes, field.fields())).outerHtml();
  };

  var possibilities = fieldHelper.possibilities = function() {
    return types.map(function(e) { e.name = "namenamenamen"; return e; });
  };

  var Field = fieldHelper.Field = function(model, children) {
    this.name  = model.name;
    this.field_type  = model.field_type;
    this.value = model.value;

    var n;

    switch(model.field_type) {
      case 'text'    : n = new Node({type: 'text'});              break;
      case 'textarea': n = new Node({tag: 'textarea', html: ''}); break;

      case 'dropdown': n = new Node({tag: 'select'  , html: ''}); break;
      case 'radio'   : n = new Node({tag: 'fieldset', html: ''}); break;
      case 'checkbox': n = new Node({tag: 'fieldset', html: ''}); break;

      default:
        alert('tried to make unsupported field!');
        debugger;
        return '';
    }

    this.n = n;

    n.name = model.key;

    switch(model.field_type) {
      case 'text':
        n.value = model.value;
        break;
      case 'textarea':
        n.html = model.value;
        break;
      case 'dropdown':
      case 'radio'   :
      case 'checkbox':
        children.forEach(function(child) {
          child = this.child(child);
          n.html += child.outerHtml();
        }.bind(this));
      break;
    }
  };

  Field.prototype.outerHtml = function() {
    return this.n.outerHtml();
  };

  Field.prototype.child = function(child) {
    child = child || {};

    switch (this.field_type) {
      case 'radio'   : child = {type: 'radio-item'   }; break;
      case 'dropdown': child = {tag : 'dropdown-item'}; break;
      case 'checkbox': child = {type: 'checkbox-item'}; break;
    }

    return makeField(child);
  };

  var Node = fieldHelper.Node = function(options) {
    options = _.defaults(options, {
      tag: 'input',
      html: undefined
    });

    for (var key in options) {
      if (['tag', 'html'].indexOf(key) < 0) continue;
      this[key] = options[key];
    }
  };

  Node.prototype.outerHtml = function() {
    var h = '<' + this.tag;

    for (var attr in this) {
      if (['tag', 'html'].indexOf(attr) < 0) continue;
      h += ' ' + attr + '="' + this[attr] + '"';
    }

    if (typeof this.html == 'undefined') {
      h += '/>';
    } else {
      h += '>';
      h += this.html;
      h += '</' + this.tag + '>';
    }

    return h;
  };
})(window.fieldHelper = window.fieldHelper || {});