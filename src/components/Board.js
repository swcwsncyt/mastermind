import { useEffect, useState } from "react";
import Answer from "./Answer.js";
import GuessRow from "./GuessRow.js";
import GuessInput from "./GuessInput.js";
import axios from "axios";

const Board = ({boardSize, gameover, setGameover, setResult, reset, setReset}) => {
  const [answer , setAnswer] = useState([]);
  const [board, setBoard] = useState([[]]);
  const [guessCount, setGuessCount] = useState(0);

  //run when boardSize changed
  useEffect(()=> {
    generateEmptyBoard(boardSize);
    setGuessCount(boardSize[0] - 1);
  },[boardSize])

  //run once on page load
  useEffect(() => {
    generateRandomInt();
  },[])

  useEffect(() => {
    resetBoard(reset)
  },[reset])

  //api call to generate random integer
  const generateRandomInt = () => {
    axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
    .then((result) => {
      console.log(result.data)
      //convert string to array
      setAnswer(result.data.substring(0, result.data.length - 1).split("\n"))
    })
  }

  //2D matrix board (r x c) fill with empty string
  const generateEmptyBoard = ([r, c]) => {
    const matrixBoard = Array(r).fill(Array(c).fill(""));
    setBoard(matrixBoard);
  }

  //make guess where input is submitted
  const makeGuess = (inputArr) => {
    const copyOfBoard = [...board];
    copyOfBoard[guessCount] = inputArr;
    setGuessCount(guessCount - 1)
    setBoard(copyOfBoard);
    checkEndGame(inputArr);

    function checkEndGame (input) {
      for(let i = 0; i < boardSize[1]; i++) {
        if(answer[i] !== input[i]) {
          if(guessCount === 0) {
            setResult("lost");
            setGameover(true);
          }
          return;
        }
      }
      if(answer.length) setGameover(true);
    }
  }

  const resetBoard = (reset) => {
    if(reset) {
      generateRandomInt();
      generateEmptyBoard(boardSize);
      setGuessCount(boardSize[0] - 1);
      setReset(false);
    }
  }

  return (
    <table className="Board">
      <thead>
        <Answer answer={answer} gameover={gameover}/>
      </thead>
      <tbody>
        {board.map((guessInfo, i) => {
          return <GuessRow key={i} guessInfo={guessInfo} answer={answer}/>
        })}
        <tr>
          <td className="guess" colSpan="2">
            <GuessInput makeGuess={makeGuess} gameover={gameover}/>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Board;