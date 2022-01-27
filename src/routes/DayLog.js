import React from "react";
import MakeDiary from "../components/MakeDiary";

function DayLog({ user }) {
  const name = user.displayName;
  const email = user.email;
  return (
    <div>
      <h1>{`DayLog가 ${name}님의 24살을 기록하고있어요😄`}</h1>
      <MakeDiary email={email} />
    </div>
  );
}

export default DayLog;
