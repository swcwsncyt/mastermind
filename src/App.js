import { useEffect, useState } from "react/cjs/react.development";
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

  useEffect(() => {
    setGameover(false);
    setResult("won");
  },[reset])

  return (
    <div className="App">
      <Board boardSize={boardSize} gameover={gameover} setGameover={setGameover} setResult={setResult} reset={reset} setReset={setReset}/>
      <Instructions setBoardSize={setBoardSize} reset={setReset}/>
      {gameover?<Result result={result} reset={setReset}/>:null}
    </div>
  );
}

export default App;
