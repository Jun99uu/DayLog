import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import DiaryList from "./DiaryList";
import styles from "./Diary.module.css";

function Diary({ email, db }) {
  const docRef = doc(db, "DayLog", email);
  const [diary, setDiary] = useState([
    {
      day: "",
      emotion: "",
      content: "",
    },
  ]);
  let now = new Date();
  const [Year, setYear] = useState(now.getFullYear());
  const [Month, setMonth] = useState(now.getMonth() + 1);
  const [date, setDate] = useState();
  const prev = "<";
  const next = ">";
  const dateChange = (e) => {
    if (e.target.name === "prevyear") {
      setYear((prevValue) => prevValue - 1);
    } else if (e.target.name === "nextyear") {
      if (Year < now.getFullYear()) {
        setYear((prevValue) => prevValue + 1);
      }
    } else if (e.target.name === "prevmonth") {
      if (Month === 1) {
        setMonth(12);
        setYear((prevValue) => prevValue - 1);
      } else {
        setMonth((prevValue) => prevValue - 1);
      }
    } else if (e.target.name === "nextmonth") {
      if (Year < now.getFullYear()) {
        if (Month === 12) {
          setMonth(1);
          if (Year < now.getFullYear()) {
            setYear((prevValue) => prevValue + 1);
          }
        } else {
          setMonth((prevValue) => prevValue + 1);
        }
      } else if (Year === now.getFullYear()) {
        if (Month < now.getMonth() + 1) {
          setMonth((prevValue) => prevValue + 1);
        }
      }
    }
  };

  useEffect(async () => {
    setDiary([]);
    const docSnap = await getDoc(docRef);
    const fields = docSnap._document.data.value.mapValue.fields;
    const getKeys = Object.keys(fields).map((entrie, idx) => {
      if (entrie.indexOf(date) === 0) {
        setDiary((prevState) => [
          ...prevState,
          {
            todate: entrie,
            day: entrie.substr(6, 2),
            emotion: fields[entrie].arrayValue.values[0].stringValue,
            //content: fields[entrie].arrayValue.values[1].stringValue,
          },
        ]);
      }
    });
  }, [date]);

  useEffect(() => {
    if (Month < 10) {
      setDate(`${Year}0${Month}`);
    } else {
      setDate(`${Year}${Month}`);
    }
  }, [Year, Month]);

  return (
    <div className={styles.box}>
      <div className={styles.selectyear}>
        <button
          name="prevyear"
          onClick={dateChange}
          className={styles.selector}
        >
          {prev}
        </button>
        <span className={styles.year}>{Year}</span>
        <button
          name="nextyear"
          onClick={dateChange}
          className={styles.selector}
        >
          {next}
        </button>
      </div>
      <div className={styles.selectmonth}>
        <button
          name="prevmonth"
          onClick={dateChange}
          className={styles.selectormonth}
        >
          {prev}
        </button>
        <span className={styles.month}>{Month}</span>
        <button
          name="nextmonth"
          onClick={dateChange}
          className={styles.selectormonth}
        >
          {next}
        </button>
      </div>
      <div className={styles.diarybox}>
        <div className={styles.diary}>
          {diary.map((diaryObject) => (
            <DiaryList
              todate={diaryObject.todate}
              key={diaryObject.day}
              day={diaryObject.day}
              emotion={diaryObject.emotion}
              email={email}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Diary;
