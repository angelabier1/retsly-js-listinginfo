
/**
 * Dependencies
 */
var assert = require('assert');
var Retsly = require('retsly-js-backbone');
var Info = require('retsly-listinginfo');

/**
 * Tests
 */

suite('ListingInfo')
test('is an object property', function() {
  assert('object' == typeof Info, 'is an object')
});

suite('ListingInfo.Basic');
test('is a component function', function() {
  assert('function' == typeof Info.Basic, 'has a component')
});

test('cannot be instantiated without Retsly.create()', function() {
  assert.throws(function() {
    new Info.Basic({ client_id: 'xxx', vendorID: 'sandicor', listingID: 'xxx', target: { $el: '' } });
  }, Error);
});

test('can be instantiated after Retsly.create()', function(){
  assert.doesNotThrow(function() {
    Retsly.create('xxx','xxx');
    new Info.Basic({ client_id: 'xxx', vendorID: 'sandicor', listingID: 'xxx', target: { $el: '' } });
  })
});

suite('ListingInfo.Basic.render(<model>)')
test('fails when it does not receive a model', function() {
  assert.throws(function() {
    var model = {
      address: '', county: '', price: '',
      bedrooms: '', baths: '', publicRemarks: ''
    };
    var info = new Info.Basic({ client_id: 'xxx', vendorID: 'sandicor', listingID: 'xxx', target: { $el: '' } });
    info.render(model);
  })
});

test('passes when it does receive a model', function() {
  assert.doesNotThrow(function() {
    var model = new Retsly.Model({
      address: '', county: '', price: '',
      bedrooms: '', baths: '', publicRemarks: ''
    }, { collection: {}, vendorID: 'sandicor' });

    var info = new Info.Basic({ client_id: 'xxx', vendorID: 'sandicor', listingID: 'xxx', target: { $el: '' } });
    info.render(model);
  })
});

