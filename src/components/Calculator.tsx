import { useState } from 'react'
import '../App.css'

function App() {
    const operationSelectId = "operation-select"
    const protocol = "http"
    const host = "localhost";
    const port = ":8983";

    const apiUrl = `${protocol}://${host}${port}/`;

    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [operation, setOperation] = useState('add');
    const [resultLabel, setResultLabel] = useState('');

    interface Result {
      result: string;
    }

    const callApi = (url: URL, dataToSend: object) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server you're sending JSON
        },
        body: JSON.stringify(dataToSend),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
    }

    const calculate = async () => {
        const operationUrl = new URL(apiUrl + operation);
        const dataToSend = {
          a: parseInt(firstNum),
          b: parseInt(secondNum),
        };

        try {
          const response: Result = await callApi(operationUrl, dataToSend); 
          handleResultChange(response.result);
        } catch (error) {
          console.error("Error: ", error);
        }
    }

    const handleResultChange = (result: string) => {
        setResultLabel(result);
    }

    const handleFirstNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstNum(event.target.value);
    }

    const handleSecondNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSecondNum(event.target.value);
    }

    const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const operation = event.target.value.toLowerCase();
      setOperation(operation);
    }
  
    return (
      <>
        <label htmlFor={operationSelectId}>Choose Operation:</label>
        <select id={operationSelectId} name={operationSelectId} onChange={handleOperationChange}>
            <option>Add</option>
            <option>Subtract</option>
            <option>Divide</option>
            <option>Multiply</option>
        </select>

        <p></p>

        <input type="number" id="firstNumber" name="firstNumber" onChange={handleFirstNumChange} />
        <p></p>
        <input type="number" id="secondNumber" name="secondNumber" onChange={handleSecondNumChange} />

        <button onClick={calculate}>Calculate</button>

        <p></p>

        <input type="text" readOnly value={resultLabel} />
      </>
    )
  }
  
  export default App