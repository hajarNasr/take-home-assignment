import "./App.css";
import React from "react";
import { formatText } from "./helpers";

function App() {
  const [textInput, setTextInput] = React.useState(`This is
a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

This      is a second paragraph with extraneous whitespace.`);
  const [textOutput, setTextOutput] = React.useState("");

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    transformText(textInput);
  };

  const transformText = (input) => {
    let output = formatText(input);
    setTextOutput(output);
  };

  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            onChange={handleChange}
            value={textInput}
            className="input-textarea"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div id="result">{textOutput}</div>
      {textOutput && <button onClick={() => setTextOutput("")}>Clear</button>}
    </div>
  );
}

export default App;
