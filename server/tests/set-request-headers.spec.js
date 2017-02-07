const setRequestHeaders = require('../utils/set-request-headers.js');

describe('server/setRequestHeaders', () => {
    const req = null;
    const res = {
      setHeader: function (prop, val) { // eslint-disable-line
        this[prop] = val;
      }
    };
    const next = jest.fn();
    //  Call dat shit
    setRequestHeaders(req, res, next);

    test('sets `Access-Control-Allow-Origin` to `*`', () => {
        expect(res['Access-Control-Allow-Origin']).toBe('*');
    });

    test('sets `Access-Control-Allow-Methods` to `GET`', () => {
        expect(res['Access-Control-Allow-Methods']).toBe('GET');
    });

    test('sets `Access-Control-Allow-Headers` to `X-Requested-With,content-type`', () => {
        expect(res['Access-Control-Allow-Headers']).toBe('X-Requested-With,content-type');
    });

    test('sets `Access-Control-Allow-Credentials` to false', () => {
        expect(res['Access-Control-Allow-Credentials']).toBe(false);
    });

    test('calls next()', () => {
        expect(next.mock.calls.length).toBe(1);
    });
});
