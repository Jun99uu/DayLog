import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import styles from "./MakeDiary.module.css";
import { useNavigate } from "react-router-dom";

function MakeDiary({ email, db }) {
  const [emotion, setEmotion] = useState("😶");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  let now = new Date();
  let year = `${now.getFullYear()}`;
  let todayMonth =
    now.getMonth() + 1 < 10
      ? `0${now.getMonth() + 1}`
      : `${now.getMonth() + 1}`;
  let todayDate = now.getDate() < 10 ? `0${now.getDate()}` : `${now.getDate()}`;
  let today = `${year}${todayMonth}${todayDate}`;

  const handleClickRadio = (radio) => {
    setEmotion(radio);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const diary = [emotion, content];
    try {
      const DocRef = doc(db, "DayLog", email);
      await setDoc(DocRef, { [today]: diary }, { merge: true });
      navigate(0);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3>내 오늘은,</h3>
        <form onSubmit={handleOnSubmit}>
          <input
            type="radio"
            checked={emotion === "😍"}
            readOnly
            id="😍"
            className={styles.radio}
            onClick={() => handleClickRadio("😍")}
          />
          <label for="😍">😍</label>

          <input
            type="radio"
            id="😆"
            checked={emotion === "😆"}
            readOnly
            className={styles.radio}
            onClick={() => handleClickRadio("😆")}
          />
          <label for="😆">😆</label>

          <input
            type="radio"
            id="😶"
            checked={emotion === "😶"}
            readOnly
            className={styles.radio}
            onClick={() => handleClickRadio("😶")}
          />
          <label for="😶">😶</label>

          <input
            type="radio"
            id="😂"
            checked={emotion === "😂"}
            readOnly
            className={styles.radio}
            onClick={() => handleClickRadio("😂")}
          />
          <label for="😂">😂</label>

          <input
            type="radio"
            id="😢"
            checked={emotion === "😢"}
            readOnly
            className={styles.radio}
            onClick={() => handleClickRadio("😢")}
          />
          <label for="😢">😢</label>

          <input
            type="radio"
            id="🤬"
            checked={emotion === "🤬"}
            readOnly
            className={styles.radio}
            onClick={() => handleClickRadio("🤬")}
          />
          <label for="🤬">🤬</label>

          <input
            type="radio"
            id="🔪"
            checked={emotion === "🔪"}
            readOnly
            className={styles.radio}
            onClick={() => handleClickRadio("🔪")}
          />
          <label for="🔪">🔪</label>
          <br />
          <input
            type="text"
            name="content"
            placeholder="오늘 하루는 어떠셨나요?"
            value={content}
            onChange={handleChangeContent}
            maxLength="300"
            className={styles.content}
          />
          <br />
          <button className={styles.btn}>완료</button>
        </form>
      </div>
    </div>
  );
}

export default MakeDiary;
