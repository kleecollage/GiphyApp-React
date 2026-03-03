import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {

  const [counter, setCounter] = useState(initialValue);

  const handleButtons = (action: string) => {
    switch (action) {
      case 'add':
        setCounter(counter + 1);
        break;
      case 'subtract':
        setCounter(counter - 1);
        break;
      case 'reset':
        setCounter(counter);
        break;
      default:
        break;
      }
    }

  return {
    // Values | Properties
    counter,
    // Methods | Actions
    handleButtons
  }
}
