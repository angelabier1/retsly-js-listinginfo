
var Retsly = require('retsly-js-backbone');
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

/*
 * Retsly ListingInfo Component
 * Requires Retsly SDK (Full hosted SDK including _, $, BB)
 */

var Component = module.exports = {};

Component.Basic = Backbone.View.extend({
  index: 0,
  className: 'retsly-component retsly-js-listinginfo span12 row-fluid',
  initialize: function(options) {

    if(!options || typeof options.vendorID === "undefined")
      throw new Error('Retsly.Views.ListingInfo requires a vendorID: `{vendorID: \'id\'}`');

    if(!options || typeof options.listingID === "undefined")
      throw new Error('Retsly.Views.ListingInfo requires a listingID: `{listingID: listing.id}`');

    if(typeof options == "undefined" || !options.target)
      throw new Error('Retsly.Views.ListingInfo is a subview and must have a target: `{target:this}`');

    this.options = _.extend({ vendorID: null, listingID: null }, options);
    options.target = (typeof options.target.$el !== "undefined") ? options.target.$el : $(options.target);

    $(options.target).append(this.$el);

    var self = this;
    new Retsly.Models.Listing(
      { _id: this.options.listingID },
      { vendorID: this.options.vendorID}
    )
    .fetch({
      limit: 1,
      success: function(listing) {
        self.render(listing);
      },
      error: function() {
        throw new Error('Retsly.Views.ListingInfo - Listings not found', arguments);
      }
    });
  },
  render: function(listing) {
    var html = require('./templates/template');
    var template = _.template(html);
    this.$el.html( template( listing.toJSON() ));
  }
});
