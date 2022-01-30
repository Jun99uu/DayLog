import React, { useState, useEffect } from "react";
import MakeDiary from "../components/MakeDiary";
import Diary from "../components/Diary";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

function DayLog() {
  const auth = getAuth();
  const user = auth.currentUser;
  const name = user.displayName;
  const email = user.email;
  const [age, setAge] = useState("");
  const docRef = doc(db, "DayLog", email);

  // const age = docSnap._document.data.value.mapValue.fields.Age.stringValue;
  useEffect(async () => {
    const docSnap = await getDoc(docRef);
    setAge(docSnap._document.data.value.mapValue.fields.Age.stringValue);
  }, []);

  const [clicked, setClicked] = useState(false);

  const onClickHandler = () => {
    setClicked((prev) => !prev);
  };

  const logOut = () => {};

  return (
    <div>
      <h1>{`DayLog가 ${name}님의 ${age}살을 기록하고있어요😄`}</h1>
      {clicked ? (
        <MakeDiary email={email} db={db} />
      ) : (
        <Diary email={email} db={db} />
      )}
      <button onClick={onClickHandler}>
        {clicked ? "돌아가기" : "기록하기"}
      </button>
      <button onClick={logOut} />
    </div>
  );
}

export default DayLog;
