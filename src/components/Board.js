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
  },[boardSize])
  //run once on page load
  useEffect(() => {
    generateRandomInt();
  },[])

  //run when reset changed
  useEffect(() => {
    if(reset) {
      resetBoard();
      setReset(false);
    }
  },[reset])

  //api call to generate random integer
  const generateRandomInt = () => {
    axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
    .then((result) => {
      // console.log(result.data)
      //convert string to array
      setAnswer(result.data.substring(0, result.data.length - 1).split("\n"))
    })
  }

  //2D matrix board (r x c) fill with empty string
  const generateEmptyBoard = ([r, c]) => {
    const matrixBoard = Array(r).fill(Array(c).fill(""));
    setBoard(matrixBoard)
  }

  const resetBoard = () => {
    //regenerate answer
    generateRandomInt();
    //reset the board
    generateEmptyBoard(boardSize);
    //reset the count
    setGuessCount(0);
  }

  //if child send back a true signal, last guess is incorrect
  //change the wording of the end game pop up
  const generateResult = (lost) => {
    if(lost) setResult("lost")
    setGameover(true);
  }
  
  //make guess where input is submitted
  const makeGuess = (inputArr) => {
    const copyOfBoard = [...board];
    copyOfBoard[copyOfBoard.length -1 - guessCount] = inputArr;
    setGuessCount(guessCount+1)
    setBoard(copyOfBoard);
  }

  return (
    <table className="Board">
      <thead>
        <Answer answer={answer} gameover={gameover}/>
      </thead>
      <tbody>
        {board.map((guessInfo, i) => {
          return <GuessRow key={i} guessInfo={guessInfo} answer={answer} generateResult={generateResult} boardLen={board.length} guessCount={guessCount}/>
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