import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "../../counter/MyCounterApp";

describe('MyCounterApp', () => {
  test('should render the component', () => {
    render(<MyCounterApp />);
    // screen.debug();
    expect(screen.getByRole('heading', {level: 3}).innerHTML).toContain(`Counter: 100`);
    expect(screen.getByRole('button', {name: '+1'})).toBeDefined();
    expect(screen.getByRole('button', {name: '-1'})).toBeDefined();
    expect(screen.getByRole('button', {name: 'Reset'})).toBeDefined();
  });

  test('should increment the couter', () => {
    render(<MyCounterApp />);
    const labelH3 = screen.getByRole('heading', {level: 3});
    const button = screen.getByRole('button', {name: '+1'});
    fireEvent.click(button);
    expect(labelH3.innerHTML).toContain('Counter: 101');
  })

  test('should decrement the couter', () => {
    render(<MyCounterApp />);
    const labelH3 = screen.getByRole('heading', {level: 3});
    const button = screen.getByRole('button', {name: '-1'});
    fireEvent.click(button);
    expect(labelH3.innerHTML).toContain('Counter: 99');
  })


})