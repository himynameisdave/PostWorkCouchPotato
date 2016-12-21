casper.test.begin('Visual regression test for the loady module.', function(test) {

  casper.loadPath('modules/loady')

  .loadFixture('loady')

  .then(function () {
    phantomcss.screenshot('.loady', 'loady module');
  })

  .run(function () {
    test.done();
  });

});
