import Combination from "./Combination.js";
import Feedback from "./Feedback.js";

const GuessRow = ({answer, guessInfo}) => {
  //compare guess to answer and generate a style list to display feedback dot
  const generateStyleListFromGuess = (ans, guessCombo) => {
    let styleList = [];
    //check for all location and number exact match
    for(let i = 0; i < guessCombo.length; i++) {
      let styleMap = {};
      if(guessCombo[i] === ans[i]) {
        styleMap["color"] = "#4AF626";
        styleList.push(styleMap);
        ans[i] = -1;
        guessCombo[i] = -1;
      }
    }
    //check if number exist but in different location
    for(let j = 0; j < guessCombo.length; j++) {
      let styleMap = {};
      let matchingIdxInAns = ans.indexOf(guessCombo[j])
      if(guessCombo[j] !== -1) {
        if(matchingIdxInAns !== -1) {
          styleMap["color"] = "white"
          guessCombo[j] = -1;
          ans[matchingIdxInAns] = -1;
          styleList.push(styleMap);
        }
      }
    }
    return styleList;
  }

  const feedbackStyle = generateStyleListFromGuess([...answer], [...guessInfo]);

  return (
    <tr className="guess-row">
      <td className="combination">
        {guessInfo.map((num, i) => {
          return <Combination key={i} num={num}/>
        })}
      </td>
      <td className="feedback">
        {guessInfo[0] !== "" ? (guessInfo.map((style, i) => {
          if(i === 1) return (<Feedback key={i} style={feedbackStyle[i]} val={"●\n"}/>)
          return <Feedback key={i} style={feedbackStyle[i]} val={"●"}/>
        })): null}
      </td> 
    </tr> 
  )
}

export default GuessRow;