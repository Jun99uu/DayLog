import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import styles from "./Details.module.css";

const db = getFirestore();

function Detail() {
  const { email, date } = useParams();
  const docRef = doc(db, "DayLog", email);
  const auth = getAuth();
  const user = auth.currentUser;
  const name = user.displayName;
  const [emotion, setEmotion] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();

  useEffect(async () => {
    const docSnap = await getDoc(docRef);
    const fields = docSnap._document.data.value.mapValue.fields;
    const getKeys = Object.keys(fields).map((entrie, idx) => {
      if (entrie.indexOf(date) === 0) {
        setEmotion(fields[entrie].arrayValue.values[0].stringValue);
        setContent(fields[entrie].arrayValue.values[1].stringValue);
      }
    });
  }, []);

  const onDeleteClick = async () => {
    try {
      await updateDoc(docRef, {
        [date]: deleteField(),
      });
      navigate("/daylog");
    } catch (e) {
      console.log(e);
    }
  };

  const onPrevClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3>
          {date.substr(0, 4)}년 {date.substr(4, 2)}월 {date.substr(6, 2)}일
        </h3>
        <h2>{name}님의 하루는 말이죠…</h2>
        <hr />
        <div className={styles.duple}>
          <div className={styles.content}>
            <span className={styles.emotion}>{emotion}</span>

            <h2>{content}</h2>
          </div>
        </div>
        <button onClick={onPrevClick} className={styles.backbtn}>
          뒤로가기
        </button>
        <button onClick={onDeleteClick} className={styles.deletebtn}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default Detail;
