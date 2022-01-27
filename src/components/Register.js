import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();

function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const auth = getAuth();

  const signup = async () => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(async () => {
        try {
          await setDoc(doc(db, "DayLog", email), {
            Age: age,
          });
          console.log("success");
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        // Profile updated!
        // ...
      })
      .catch((error) => {
        console.log("failed");
        // An error occurred
        // ...
      });
    navigate("/");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  const handleOnChange = (e) => {
    const type = e.target.name;
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    } else if (type === "name") {
      setName(e.target.value);
    } else if (type === "age") {
      setAge(e.target.value);
    }
  };

  return (
    <div>
      <h1>당신이 궁금해요🤭</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          name="name"
          placeholder="이름이 뭐에요?"
          type="name"
          required
          onChange={handleOnChange}
          value={name}
        />
        <br />
        <input
          name="age"
          placeholder="몇살이세요?"
          type="age"
          required
          onChange={handleOnChange}
          value={age}
        />
        <br />
        <input
          name="email"
          placeholder="이메일을 입력해주세요."
          type="email"
          required
          onChange={handleOnChange}
          value={email}
        />
        <br />
        <input
          name="password"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          required
          onChange={handleOnChange}
          value={password}
        />
        <br />
        <button>📌</button>
      </form>
    </div>
  );
}

export default Register;
