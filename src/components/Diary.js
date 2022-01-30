import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import DiaryList from "./DiaryList";

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
            day: entrie.substr(6, 2),
            emotion: fields[entrie].arrayValue.values[0].stringValue,
            content: fields[entrie].arrayValue.values[1].stringValue,
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
    <div>
      <div>
        <button name="prevyear" onClick={dateChange}>
          {prev}
        </button>
        <h3>{Year}</h3>
        <button name="nextyear" onClick={dateChange}>
          {next}
        </button>
      </div>
      <div>
        <button name="prevmonth" onClick={dateChange}>
          {prev}
        </button>
        <h1>{Month}</h1>
        <button name="nextmonth" onClick={dateChange}>
          {next}
        </button>
      </div>
      <div>
        {diary.map((diaryObject) => (
          <DiaryList
            key={diaryObject.day}
            day={diaryObject.day}
            emotion={diaryObject.emotion}
            content={diaryObject.content}
          />
        ))}
      </div>
    </div>
  );
}

export default Diary;
