import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "../../counter/MyCounterApp";

const handleButtons = vi.fn();

vi.mock("../../counter/components/useCounter", () => ({
  useCounter: () => ({
    counter: 20,
    handleButtons: handleButtons
  })
}))

describe('MyCounterApp', () => {
  test('should render the component', () => {
    render(<MyCounterApp />);
    expect(screen.getByRole('heading', {level: 3}).innerHTML).toContain(`Counter: 20`);
    expect(screen.getByRole('button', {name: '+1'})).toBeDefined();
    expect(screen.getByRole('button', {name: '-1'})).toBeDefined();
    expect(screen.getByRole('button', {name: 'Reset'})).toBeDefined();
  })

  beforeEach(() => {
    handleButtons.mockClear();
  });

  test('should call handleButtons with "add" when +1 is clicked', () => {
    render(<MyCounterApp />);
    fireEvent.click(screen.getByRole('button', {name: '+1'}));
    expect(handleButtons).toHaveBeenCalledTimes(1);
    expect(handleButtons).toHaveBeenCalledWith('add');
  });

  test('should call handleButtons with "subtract" when -1 is clicked', () => {
    render(<MyCounterApp />);
    fireEvent.click(screen.getByRole('button', {name: '-1'}));
    expect(handleButtons).toHaveBeenCalledTimes(1);
    expect(handleButtons).toHaveBeenCalledWith('subtract');
  });

  test('should call handleButtons with "reset" when Reset is clicked', () => {
    render(<MyCounterApp />);
    fireEvent.click(screen.getByRole('button', {name: 'Reset'}));
    expect(handleButtons).toHaveBeenCalledTimes(1);
    expect(handleButtons).toHaveBeenCalledWith('reset');
  });

})