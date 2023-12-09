import { useState } from 'react';
import './index.css';

const operationSymbols = [
  '/', 'X', '+', '-'
];

export const Calculator = () => {
  /**
   * States
   */
  const [result, setResult] = useState<
  { input: string, value: string } | undefined>(undefined);
  const [input, setInput] = useState<string>('0');
  /**
   * Handlers
   */
  /**
   * Clear input value from display
   */
  const handleClearInput = () => {
    setInput('0');
    setResult(undefined);
  }
  /**
   * Remove elements from input
   */
  const handleDeleteFromInput = () => {

    if (input.length === 0) return setInput('0');

    if (input.length === 1) return setInput('0');

    if (input[input.length - 1] === ' ')
      setInput(input.slice(0, -3));
    else 
      setInput(input.slice(0, -1));
  }

  const handleAddToInput = (item: string) => {

    if (result !== undefined) {
      setResult(undefined);
    }

    if (item === '.') {

      if (input.includes(' ')) {
        const lastInx = input.split(' ').length - 1;

        if (input.split(' ')[lastInx].includes('.')) return;

        setInput(`${input}${item}`);
      } else if (!input.includes(item)) {
        setInput(`${input}${item}`);
      }
    }

    else if (item === '0') {

      if (input.length === 1 && input === item)
        return;

      setInput(`${input}${item}`)
    }

    //
    else if (Number(item)) {
      
      if (input.length === 1 && input === '0')
        setInput(item)
      else
        setInput(`${input}${item}`)
    }

    else if (operationSymbols.includes(item)) {

      if (input.includes(' ')) {
        const lastInx = input.split(' ').length - 1;

        if (input.split(' ')[lastInx] === '') return

        setInput(`${input} ${item}`)
      }
      
      if (input[input.length-1] === '.') {
        setInput(`${input}0 ${item} `);
      } else {
        setInput(`${input} ${item} `)
      }
    }
  }

  const handleCalculateResult = () => {

    if (operationSymbols.includes(input[input.length - 2])) {
      setInput(input.slice(0, -3));
    }

    const result = eval(input.replace('X', '*'));
    setInput('0');
    setResult({ input: input, value: String(result) });
  }

  return (
    <>
      <div id="calculator">

        {/* Display */}
        <div id="display">
          {result ? (
            <div id="result">
              <span>{result.input}</span>
              <span>{result.value}</span>
            </div>
          ) : (
            <div id="input-value">
              {input}
            </div>
          )}
        </div>

        {/* Keyboard */}
        <div id="keyboard"
          tabIndex={0}
          onKeyDown={(evt) => evt.key === "Backspace" && handleDeleteFromInput()}
        >

          <div className='keyboard-btn double-btn' onClick={handleClearInput}>
            <span>AC</span>
            </div>
          <div className='keyboard-btn' onClick={handleDeleteFromInput}>
            <span>DEL</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('/')}>
            <span>/</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('1')}>
            <span>1</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('2')}>
            <span>2</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('3')}>
            <span>3</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('X')}>
            <span>X</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('4')}>
            <span>4</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('5')}>
            <span>5</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('6')}>
            <span>6</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('+')}>
            <span>+</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('7')}>
            <span>7</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('8')}>
            <span>8</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('9')}>
            <span>9</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('-')}>
            <span>-</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('.')}>
            <span>.</span>
          </div>
          <div className='keyboard-btn' onClick={() => handleAddToInput('0')}>
            <span>0</span>
          </div>
          <div className='keyboard-btn double-btn' onClick={handleCalculateResult}>
            <span>=</span>
          </div>
          
        </div>

      </div>
    </>
  )
}