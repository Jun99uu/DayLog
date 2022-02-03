import { Link } from "react-router-dom";
import styles from "./DiaryList.module.css";

function DiaryList({ todate, day, emotion, email }) {
  return (
    <div className={styles.sticker}>
      <Link to={`/daylog/${email}/${todate}`}>
        <button className={styles.emotion}>{emotion}</button>
      </Link>
      <br />
      <span className={styles.day}>{day}일</span>
    </div>
  );
}

export default DiaryList;
