import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MakeDiary from "../components/MakeDiary";
import Diary from "../components/Diary";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import styles from "./DayLog.module.css";
import logo from "../img/logo.png";

const db = getFirestore();

function DayLog() {
  const auth = getAuth();
  const user = auth.currentUser;
  const name = user.displayName;
  const email = user.email;
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const docRef = doc(db, "DayLog", email);
  const [disabled, setDisabled] = useState(false);
  const [btnName, setBtnName] = useState("기록하기");
  let now = new Date();
  let currentYear = `${now.getFullYear()}`;
  let currentMonth, currentDay;
  if (now.getMonth() + 1 < 10) {
    currentMonth = `0${now.getMonth() + 1}`;
  } else {
    currentMonth = `${now.getMonth() + 1}`;
  }
  if (now.getDate() < 10) {
    currentDay = `0${now.getDate()}`;
  } else {
    currentDay = `${now.getDate()}`;
  }
  const today = `${currentYear}${currentMonth}${currentDay}`;

  useEffect(async () => {
    const docSnap = await getDoc(docRef);
    setAge(docSnap._document.data.value.mapValue.fields.Age.stringValue);
  }, []);

  const reload = async () => {
    const docSnap = await getDoc(docRef);
    const fields = docSnap._document.data.value.mapValue.fields;
    const getKeys = Object.keys(fields).map((entrie, idx) => {
      if (entrie.indexOf(today) === 0) {
        setDisabled(true);
        setBtnName("기록완료");
      }
    });
  };

  reload();

  const [clicked, setClicked] = useState(false);

  const onClickHandler = () => {
    setClicked((prev) => !prev);
  };

  const logOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Link to="/">
          <img src={logo} className={styles.logo} />
        </Link>

        <h2>{`${name}님의 ${age}살을 기록하고있어요`}</h2>
        <hr className={styles.line} />
        {clicked ? (
          <MakeDiary email={email} db={db} />
        ) : (
          <Diary email={email} db={db} />
        )}
        {/* <button
          onClick={onClickHandler}
          disabled={disabled}
          className={styles.recordbtn}
        >
          {clicked ? "돌아가기" : btnName}
        </button> */}

        {clicked ? (
          <buton onClick={onClickHandler} className={styles.recordbtn}>
            돌아가기
          </buton>
        ) : btnName === "기록하기" ? (
          <button
            onClick={onClickHandler}
            className={styles.recordbtn}
            disabled={disabled}
          >
            {btnName}
          </button>
        ) : (
          <button
            onClick={onClickHandler}
            className={styles.disabledbtn}
            disabled={disabled}
          >
            {btnName}
          </button>
        )}

        {clicked ? null : (
          <button onClick={logOut} className={styles.signoutbtn}>
            로그아웃
          </button>
        )}
      </div>
    </div>
  );
}

export default DayLog;
