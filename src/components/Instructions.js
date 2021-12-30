const Instructions = ({setBoardSize, resetApp}) => {
  
  const modeChangeOnClick = (e) => {
    if(e.target.value === "extreme") {
      setBoardSize([6,4]);
    } else {
      setBoardSize([10,4]);
    }
    //trigger reset function in board
    resetApp();
  }

  return (
    <div className="instructions-group">
      <div className="instructions">
        <p>
          Game Goal:<br />
          Find the 4 digit code<br />
          <br />
          Game rules: <br />
          1. There is a number code being hidden by ⭘ at the top.<br />
          2. There are 4 boxes below to enter your code.<br />
          3. If the digit is correct and at a correct location, a green ● will show up.<br />
          4. If the digit is correct but at an incorrect location, a white <span style={{color: "white"}}>●</span> will show up.<br />
          5. You have 10 attempts.
        </p>
      </div>
      <div className="mode-btn-group">
        <button onClick={modeChangeOnClick} value="normal">Normal Mode</button>
        <button onClick={modeChangeOnClick} value="extreme">Extreme Mode</button>
      </div>
    </div>
  )
}

export default Instructions;