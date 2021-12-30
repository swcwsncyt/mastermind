import { useState } from "react/cjs/react.development";
import "./App.css";
import Board from "./components/Board.js";
import Instructions from "./components/Instructions.js";
import Result from "./components/Result.js";

function App() {
  //boardSize include the row and column 
  const [boardSize, setBoardSize] = useState([10,4]);
  const [gameover, setGameover] = useState(false);
  const [result, setResult] = useState("won");
  const [reset, setReset] = useState(false);

  //reset state stored in App and send a signal to reset state in Board
  const resetApp = () => {
    setGameover(false);
    setResult("won");
    setReset(true);
  }

  return (
    <div className="App">
      <Board boardSize={boardSize} gameover={gameover} setGameover={setGameover} setResult={setResult} reset={reset} setReset={setReset}/>
      <Instructions setBoardSize={setBoardSize} resetApp={resetApp}/>
      {gameover?<Result result={result} resetApp={resetApp}/>:null}
    </div>
  );
}

export default App;
