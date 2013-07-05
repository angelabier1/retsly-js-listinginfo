/*
 * Retsly ListingInfo Component
 * Requires Retsly SDK (Full hosted SDK including _, $, BB)
 */

if(typeof Retsly !== 'undefined') {

  Retsly.Views.ListingInfo = module.exports = exports = (function(){

    var Component = {};
    Component.Basic = Backbone.View.extend({
      index: 0,
      className: 'row-fluid',
      initialize: function(options) {

        if(!options || typeof options.mls_id === "undefined")
          throw new Error('Retsly.Views.ListingInfo requires a mls_id: `{mls_id: mls.id}`');

        if(!options || typeof options.listing_id === "undefined")
          throw new Error('Retsly.Views.ListingInfo requires a listing_id: `{listing_id: listing.id}`');

        if(typeof options == "undefined" || !options.target)
          throw new Error('Retsly.Views.ListingInfo is a subview and must have a target: `{target:this}`');

        this.options = _.extend({ mls_id: null, listing_id: null }, options);
        options.target = (typeof options.target.$el !== "undefined") ? options.target.$el : $(options.target)

        $(options.target).append(this.$el);

        var self = this;
        new Retsly.Models.Listing({ _id: this.options.listing_id }, {
          mls_id: this.options.mls_id,
          complete: function(listing) { self.render(listing); }
        }).fetch({ limit: 1 });

      },
      render: function(listing) {
        var html = require('./templates/template');
        var template = _.template(html);
        this.$el.html( template( listing.toJSON() ));
      }
    });

    return Component;

  })();

} else {
  module.exports = exports = function(){
    return; // NOOP.
  };
}
