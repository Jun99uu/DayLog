import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import logo from "../img/logo.png";

function Home({ isLogined }) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src={logo} className={styles.logo} />
        <h3>반가워요, 오늘의 하루를 한 줄로 기록해볼까요?</h3>
        {isLogined ? (
          <Link to="/daylog">
            <button className={styles.btn}>시작하기</button>
          </Link>
        ) : (
          <Link to="./login">
            <button className={styles.btn}>로그인</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
