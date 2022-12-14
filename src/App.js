import './App.css';
import Button from './components/Button/Button';
import Screen from './components/Screen/Screen';
import ClearButton from './components/ClearButton/ClearButton';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [newOperation, setNewOperation] = useState(false);

  const addInput = (value) => {

    if (lastInput === '=') {
      setNewOperation(!newOperation);
    }

    console.log(value);

    if ((lastInput === '') && (!isNaN(value))) {
      setInput(input + value);
      setLastInput(value);
    } else if (!isNaN(lastInput)) {
      setInput(input + value);
      setLastInput(value);
    } else if (!isNaN(value)) {
      setInput(input + value);
      setLastInput(value);
    }
  };

  const getResult = (value) => {
    if (input) {
      try {
        setInput(evaluate(input));
      } catch (error) { }
      
      setLastInput('=');
    };
  };

  const clearInput = () => {
    setInput('');
  };

  useEffect( () => {
    setInput('');
  },[newOperation])

  return (
    <div className='App'>
      <BrowserRouter basename='/calculadora-react'>
        <div className='calculator-container'>
          <Screen input={input} />
          <div className='row'>
            <Button handleClick={addInput}>1</Button>
            <Button handleClick={addInput}>2</Button>
            <Button handleClick={addInput}>3</Button>
            <Button handleClick={addInput}>+</Button>
          </div>
          <div className='row'>
            <Button handleClick={addInput}>4</Button>
            <Button handleClick={addInput}>5</Button>
            <Button handleClick={addInput}>6</Button>
            <Button handleClick={addInput}>-</Button>
          </div>
          <div className='row'>
            <Button handleClick={addInput}>7</Button>
            <Button handleClick={addInput}>8</Button>
            <Button handleClick={addInput}>9</Button>
            <Button handleClick={addInput}>*</Button>
          </div>
          <div className='row'>
            <Button handleClick={addInput}>.</Button>
            <Button handleClick={addInput}>0</Button>
            <Button handleClick={getResult}>=</Button>
            <Button handleClick={addInput}>/</Button>
          </div>
          <div className='row'>
            <ClearButton handleClear={clearInput}>Clear</ClearButton>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
