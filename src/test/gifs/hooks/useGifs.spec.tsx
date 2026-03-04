import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "../../../gifs/hooks/useGifs";
import * as gifActions from "../../../gifs/actions/get-gifs-by-query.action";

describe('useGifs', () => {
  test('should return default values and methods', () => {
    const {result} = renderHook( () => useGifs());
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.gifs.length).toBe(0);
    expect(result.current.handleTermClicked).toBeDefined();
    expect(result.current.handleSearch).toBeDefined();
  })

   test('should return a list of gifs', async() => {
      const {result} = renderHook( () => useGifs());
      await act( async() => {
        await result.current.handleSearch('makima');
      });

      expect(result.current.gifs.length).toBeGreaterThan(0);
      expect(result.current.gifs.length).toBe(10);
   })


   test('should return a list of gifs when handleTermClicked is called', async() => {
      const {result} = renderHook( () => useGifs());
      await act( async() => {
        await result.current.handleTermClicked('one punch man');
      });

      expect(result.current.gifs.length).toBeGreaterThan(0);
      expect(result.current.gifs.length).toBe(10);
    })


    test('should return a list of gifs from cache', async() => {
      const {result} = renderHook( () => useGifs());
      await act( async() => {
        await result.current.handleTermClicked('one punch man');
      });

      expect(result.current.gifs.length).toBe(10);

      vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(new Error('This is my custom error'));

      await act( async() => {
        await result.current.handleTermClicked('one punch man');
      });

      expect(result.current.gifs.length).toBe(10);
     })

     test('should return no more than 8 previous terms', async() => {
        const {result} = renderHook( () => useGifs());

        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

        await act ( async() => {
          await result.current.handleSearch('saitama1');
        })

        await act ( async() => {
          await result.current.handleSearch('saitama2');
        })

        await act ( async() => {
          await result.current.handleSearch('saitama3');
        })

        await act ( async() => {
          await result.current.handleSearch('saitama4');
        })

        await act ( async() => {
          await result.current.handleSearch('saitama5');
        })

        await act ( async() => {
          await result.current.handleSearch('saitama6');
        })

        await act ( async() => {
          await result.current.handleSearch('saitama7');
        })

        await act ( async() => {
          await result.current.handleSearch('saitama8');
        })

        await act ( async() => {
          await result.current.handleSearch('saitama9');
        })

        console.log(result.current.previousTerms);
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual([
          'saitama9',
          'saitama8',
          'saitama7',
          'saitama6',
          'saitama5',
          'saitama4',
          'saitama3',
          'saitama2'
        ]);
      })

})