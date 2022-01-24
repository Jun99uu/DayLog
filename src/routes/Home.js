import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
  const [isLogined, setIsLogined] = useState(false);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogined(true);
      } else {
        setIsLogined(false);
      }
    });
  }, []);
  return (
    <div>
      <h1>DayLog</h1>
      {isLogined ? (
        <h1>로그인 됨</h1>
      ) : (
        <Link to="./login">
          <button>로그인</button>
        </Link>
      )}
    </div>
  );
}

export default Home;
