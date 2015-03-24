var updateModel = require('../dist/node/update-model.js').updateModel,
	toPlainObject = require('lodash.toplainobject');
	deepEqual = require('deep-equal');

describe('A comprehensive data model update', function () {

	var timeHash = {
	   format: 'ISO'
	},
	colorsArr = ['blue', 'orange', {
	   hex: '#aaaccc',
	   rgb: [170, 172, 204]
	}],
	oldJunk = {
	   name: 'Joe',
	   age: 21,
	   colors: colorsArr,
	   settings: {
	      subscribe: true,
	      toast: false
	   },
	   time: timeHash
	},
	newJunk = {
	   name: 'Taylor',
	   height: 72,
	   colors: ['blue', 'black', {
	      hex: '#aaaccc',
	      rgb: [170, 172, 204]
	   }, 'yellow'],
	   time: {
	      format: 'UTF',
	      value: '2015-03-10T13:13:19Z'
	   }
	};

	updateModel(oldJunk, newJunk);

	it('the values of all properties for both objects sould be identical', function () {
		expect(deepEqual(oldJunk, newJunk)).toBeTruthy();
	});

	it('hashes on the original hash or array are updated, not replaced', function () {
		expect(deepEqual(oldJunk, newJunk)).toBeTruthy();
		expect(oldJunk.time).toEqual(timeHash);
	});

	it('Arrays on the original hash or array are updated, not replaced', function () {
		expect(deepEqual(oldJunk, newJunk)).toBeTruthy();
		expect(oldJunk.colors).toEqual(colorsArr);
	});

});
