import {useState} from 'react';
import './App.css';
import {RunCommand} from "../wailsjs/go/main/App";

function App() {
  const [resultText, setResultText] = useState("console");
  const [command, setCommand] = useState('');

  return (
    <div id="App">
      <form onSubmit={(e) => {
        e.preventDefault();
        RunCommand(command).then((result: string) => setResultText(result));
      }} className="input-box">
        <input className="input" onChange={(e: any) => setCommand(e.target.value)} autoComplete="off" name="input" type="text"/>
        <button className="btn" type="submit">run
        </button>
      </form>
      <pre>
        {resultText}
      </pre>
    </div>
  )
}

export default App
