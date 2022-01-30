import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

function MakeDiary({ email, db }) {
  const [emotion, setEmotion] = useState("😶");
  const [content, setContent] = useState("");
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
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h3>내 오늘은,</h3>
      <form onSubmit={handleOnSubmit}>
        <input
          type="radio"
          name="emotion"
          checked={emotion === "😍"}
          readOnly
          onClick={() => handleClickRadio("😍")}
        />
        <label htmlFor="😍">😍</label>

        <input
          type="radio"
          name="emotion"
          checked={emotion === "😆"}
          readOnly
          onClick={() => handleClickRadio("😆")}
        />
        <label htmlFor="😆">😆</label>

        <input
          type="radio"
          name="emotion"
          checked={emotion === "😶"}
          readOnly
          onClick={() => handleClickRadio("😶")}
        />
        <label htmlFor="😶">😶</label>

        <input
          type="radio"
          name="emotion"
          checked={emotion === "😂"}
          readOnly
          onClick={() => handleClickRadio("😂")}
        />
        <label htmlFor="😂">😂</label>

        <input
          type="radio"
          name="emotion"
          checked={emotion === "😢"}
          readOnly
          onClick={() => handleClickRadio("😢")}
        />
        <label htmlFor="😢">😢</label>

        <input
          type="radio"
          name="emotion"
          checked={emotion === "🤬"}
          readOnly
          onClick={() => handleClickRadio("🤬")}
        />
        <label htmlFor="🤬">🤬</label>

        <input
          type="radio"
          name="emotion"
          checked={emotion === "🔪"}
          readOnly
          onClick={() => handleClickRadio("🔪")}
        />
        <label htmlFor="🔪">🔪</label>
        <br />
        <input
          type="text"
          name="content"
          placeholder="오늘 하루는 어떠셨나요?"
          value={content}
          onChange={handleChangeContent}
        />
        <br />
        <button>📌</button>
      </form>
    </div>
  );
}

export default MakeDiary;
