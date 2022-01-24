import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const auth = getAuth();

  const signin = async () => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    signin();
  };

  const handleOnChange = (event) => {
    const type = event.target.name;
    if (type === "email") {
      setEmail(event.target.value);
    } else if (type === "password") {
      setPassword(event.target.value);
    }
  };

  return (
    <div>
      <h1>DayLog</h1>
      <h3>당신의 하루를 한줄로 기록해보세요.</h3>
      <form onSubmit={handleOnSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          onChange={handleOnChange}
        />{" "}
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          required
          onChange={handleOnChange}
        />{" "}
        <br />
        <button>📌</button>
        <Link to="/register">
          <button>❓</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
