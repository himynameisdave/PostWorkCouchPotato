const formatRedditResponse = require('../utils/format-reddit-response.js');

describe('server/utils/formatRedditResponse', () => {
    const actual = {
        data: {
          after: 't3_dorito',
          before: 't3_doggo',
          children: []
        }
    };
    const url = 'http://watchddit.com';
    const formatted = formatRedditResponse(url)(actual);

    test('provides the expected `url`', () => {
        expect(formatted.url).toBe(url);
    });
    test('provides the expected `after`', () => {
        expect(formatted.after).toBe(actual.data.after);
    });
    test('provides the expected `before`', () => {
        expect(formatted.before).toBe(actual.data.before);
    });
    test('provides the expected `videos` array with expected length', () => {
        expect(formatted.videos.length).toBe(actual.data.children.length);
    });
});
