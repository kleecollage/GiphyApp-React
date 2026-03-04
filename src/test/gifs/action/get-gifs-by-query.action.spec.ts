import AxiosMockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "../../../gifs/actions/get-gifs-by-query.action";
import { giphyApi } from "../../../gifs/api/giphy.api";
import { giphySearchResponseMock } from "../mocks/giphy.response.data";


describe('get-gifs-by-query.action', () => {
  const mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock.reset();
  });


  test('should return a list of gifs', async() => {
      mock.onGet('/search').reply(200, giphySearchResponseMock);
      const gifs = await getGifsByQuery('saitama');
      const [gif1] = gifs;
      //console.log(gifs);
      expect(gif1).toStrictEqual({
        id: expect.any(String),
        height: expect.any(Number),
        width: expect.any(Number),
        title: expect.any(String),
        url: expect.any(String)
      });
   })

   test('should return a list of gifs 2', async() => {
      mock.onGet('/search').reply(200, giphySearchResponseMock);
      const gifs = await getGifsByQuery('goku');
      expect(gifs.length).toBe(10);

      gifs.forEach( gif => {
          expect(typeof gif.id).toBe('string');
          expect(typeof gif.title).toBe('string');
          expect(typeof gif.url).toBe('string');
          expect(typeof gif.width).toBe('number');
          expect(typeof gif.height).toBe('number');
      });
    })

   test('should return an empty list of gifs if query is empty', async() => {
      const gifs = await getGifsByQuery('');
      expect(gifs.length).toBe(0);
    })

    test('should handle error when the API returns an error', async() => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mock.onGet('/search').reply(400, {
        data: { message: 'Bad request' }
      });

      const gifs = await getGifsByQuery('goku');
      expect(gifs.length).toBe(0);
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
     });
 })