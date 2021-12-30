import { useState } from "react";

const GuessInput = ({makeGuess, gameover}) => {
  const [input, setInput] = useState(["", "", "", ""]);

  //A digit set to validate the input
  const generateDigitSet = () => {
    let set = new Set();
    for(let i = 0; i < 8; i++) {
      set.add(`${i}`);
    }
    return set;
  }
  const digitSet = generateDigitSet();
  
  const handleInputChange = (e, i) => {
    var inputCopy = [ ...input ];
    inputCopy[i] = e.target.value;
    setInput(inputCopy);
    //if not deleting then jump to next input box
    if(e.target.value !== "") e.target.nextSibling.focus();
  }
  
  // onSubmit: 
  // 1. validate all inputs have a digit from 0-7
  // 2. not empty 
  // generate an array using the value in each input
  const handleFormOnSubmit = (e) => {
    e.preventDefault();
    //validate if value inputs are within 0-7 and not empty
    for(let i = 0; i < input.length; i++) {
      if(!digitSet.has(input[i])) {
        alert('input must be within range 0-7 and cannot be empty')
        return;
      }
    }
    //send input number back to parent
    makeGuess(input);
    //reset the input
    setInput(["", "", "", ""]);
    e.target.firstChild.focus();
  }

  return (
    <form className="guess-input" onSubmit={handleFormOnSubmit}>
      {gameover?null:input.map((value, i) => {
        return <input key={i} 
        className="guess-input-box" 
        value={value} 
        onChange={(e) => {handleInputChange(e, i)}} 
        maxLength={1}/>
      })}
      <input type="submit" tabIndex="-1" hidden/>
    </form>
  )
}

export default GuessInput;