const makeRedditUrl = require('../make-reddit-url.js');
const URLs = require('../../constants/urls.js');

describe('helpers/utils/makeRedditUrl', () => {
    const afterTestCases = ['t3_doritos', 't3_doggo', 't3_yungdmoney', 't3_vancity', 't3_anotheronelong'];
    const runMappedTest = sub => (after) => {
        const expected = `${URLs[sub]}?count=25&after=${after}`;
        describe(`and the after: '${after}'`, () => {
            test(`it produces the url: ${expected}`, () => {
                expect(makeRedditUrl(sub, after)).toBe(expected);
            });
        });
    };

    describe('passed with the sub: `videos`', () => {
        test('and no after argument', () => {
            expect(makeRedditUrl('videos')).toBe(URLs.videos);
        });
        afterTestCases.map(runMappedTest('videos'));
    });

    describe('passed with the sub: `videosRising`', () => {
        test('and no after argument', () => {
            expect(makeRedditUrl('videosRising')).toBe(URLs.videosRising);
        });
        afterTestCases.map(runMappedTest('videosRising'));
    });

    describe('passed with the sub: `haiku`', () => {
        test('and no after argument', () => {
            expect(makeRedditUrl('haiku')).toBe(URLs.haiku);
        });
        afterTestCases.map(runMappedTest('haiku'));
    });
});
