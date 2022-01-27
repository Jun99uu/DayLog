import { Link } from "react-router-dom";

function Home({ isLogined }) {
  return (
    <div>
      <h1>DayLog</h1>
      {isLogined ? (
        <div>
          <h3>반가워요, 오늘의 하루를 한 줄로 기록해볼까요?</h3>
          <Link to="/daylog">
            <button>시작하기</button>
          </Link>
        </div>
      ) : (
        <Link to="./login">
          <button>로그인</button>
        </Link>
      )}
    </div>
  );
}

export default Home;
