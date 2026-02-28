import { useCounter } from "./components/useCounter"

export const MyCounterApp = () => {
  const { counter, handleButtons } = useCounter(100);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center' }}>
      <h1>MyCounterApp</h1>
      <h3>Counter: {counter}</h3>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={ () => handleButtons('subtract')}>-1</button>
        <button onClick={ () => handleButtons('reset')}>Reset</button>
        <button onClick={ () => handleButtons('add')}>+1</button>
      </div>
    </div>
  )
}
