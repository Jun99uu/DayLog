function DiaryList({ day, emotion, content }) {
  return (
    <div>
      <h3>{day}일의 나는…</h3>
      <div>{emotion}</div>
      <p>{content}</p>
    </div>
  );
}

export default DiaryList;
