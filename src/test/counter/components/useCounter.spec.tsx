import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCounter } from '../../../counter/components/useCounter';

describe('useCounter', () => {
  test('should initialize with default value 10', () => {
    const { result } = renderHook( () => useCounter());
    expect(result.current.counter).toBe(10);
  })

  test('should initialize with custom value', () => {
    const initialValue = 20
    const { result } = renderHook( () => useCounter(initialValue));
    expect(result.current.counter).toBe(initialValue);
  })

  test('should increment counter when handleButtons.action add is called', () => {
    const { result } = renderHook( () => useCounter());
    act( () => {
      result.current.handleButtons('add');
    })
    expect(result.current.counter).toBe(11);
  })

  test('should decrement counter when handleButtons.action subtract is called', () => {
    const { result } = renderHook( () => useCounter());
    act( () => {
      result.current.handleButtons('subtract');
    })
    expect(result.current.counter).toBe(9);
  })

  test('should reset counter when handleButtons.action reset is called', () => {
    const { result } = renderHook( () => useCounter());
    act( () => {
      result.current.handleButtons('reset');
    })
    expect(result.current.counter).toBe(10);
  })



})