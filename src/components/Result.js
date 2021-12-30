const Result = ({result, resetApp}) => {

  const results = {
    won: "Congratulations!\nYou cracked the code.",
    lost: "Sorry!\nYou did not crack the code."
  }

  const handleNewGameOnClick = () => {
    resetApp();
  }

  return (
    <div className="result-group">
      <div className="result">
        <pre>
          {results[result]}
        </pre>
      </div>
      <div className="newgame-btn">
        <button onClick={handleNewGameOnClick}>Start a new game</button>
      </div>
    </div>
  )
}

export default Result;