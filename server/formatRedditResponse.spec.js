import { formatRedditResponse } from './fetchVideos.js';


describe('server/formatRedditResponse', () => {
  test('', () => {
      const testData = {
          data: {
            after: '123'
          }
      };
      expect(formatRedditResponse(testData).after).toBe(testData.data.after);
  });
});
