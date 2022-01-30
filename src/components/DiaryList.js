import { Link } from "react-router-dom";

function DiaryList({ todate, day, emotion, email }) {
  return (
    <div>
      <Link to={`/daylog/${email}/${todate}`}>
        <button>{emotion}</button>
      </Link>
      <h4>{day}일</h4>
    </div>
  );
}

export default DiaryList;
