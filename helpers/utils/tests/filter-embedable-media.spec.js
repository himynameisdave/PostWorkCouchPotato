const filterEmbedableMedia = require('../filter-embedable-media.js');

describe('helpers/utils/filterEmbedableMedia', () => {
    describe('should return false', () => {
        test('when arg passed has data: {}', () => {
            const dummy = { data: {} };
            expect(filterEmbedableMedia(dummy)).toBe(false);
        });
        test('when arg has data.media: {} ', () => {
            const dummy = { data: { media: {} } };
            expect(filterEmbedableMedia(dummy)).toBe(false);
        });
        test('when arg has data.media.oembed: {} ', () => {
            const dummy = { data: { media: { oembed: {} } } };
            expect(filterEmbedableMedia(dummy)).toBe(false);
        });
        test('when arg has data.media.oembed.html: null ', () => {
            const dummy = { data: { media: { oembed: { html: null } } } };
            expect(filterEmbedableMedia(dummy)).toBe(false);
        });
    });
    describe('should return true', () => {
        test('when `data.media.oembed.html` object exists', () => {
            const dummy = { data: { media: { oembed: { html: {} } } } };
            expect(filterEmbedableMedia(dummy)).toBe(true);
        });
    });
    describe('should properly filter an array', () => {
        const arr = [
            { data: { media: { oembed: { html: { } } } } },
            { data: { media: { oembed: { html: { } } } } },
            { data: { media: { oembed: { html: { } } } } },
            { data: { media: { oembed: null } } },
            { data: { media: { oembed: { html: null } } } },
            { data: {} },
            { data: { media: { oembed: { html: { } } } } },
            { data: { media: { oembed: { html: { } } } } },
        ];
        test(`from ${arr.length} to 5`, () => {
            expect(arr.filter(filterEmbedableMedia).length).toBe(5);
        });
    });
});
