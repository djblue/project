'use strict';

define(['./list.js'], function (list) {

  describe('A selector list', function () {

    it('should render the correctly', function (done) {
      var el = list([
        { title: 'title 1' },
        { title: 'title 2' }
      ]);
      var find = el.find('.item').length;
      expect(find).toBe(2);
      done();
    });

    it('should trigger cb when clicked', function (done) {
      var el = list([{ title: 'testing' }], function (item) {
        expect(item.title).toBe('testing');
        done();
      });
      // click the item!!!
      el.find('.item').click();
    });

  });

});
