import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
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

  test('should call handleButton if button is clicked', () => {
    render(<MyCounterApp />);
    const button = screen.getByRole('button', {name: '+1'});
    fireEvent.click(button);
    expect(handleButtons).toHaveBeenCalled();
    expect(handleButtons).toHaveBeenCalledTimes(1);
  })




})