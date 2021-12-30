const Answer = ({answer, gameover}) => {

  return (
      <tr className="answer">
        <th colSpan="2">
          <span>{gameover?answer:"⭘⭘⭘⭘"}</span>
        </th>
      </tr>
  )
}

export default Answer;