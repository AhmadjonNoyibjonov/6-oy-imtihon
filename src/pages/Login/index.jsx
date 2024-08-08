import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import Background from "../../assets/images/image.png";
import google from "../../assets/images/googleicon.svg";
import avatar from "../../assets/images/avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/joy/Switch";
import { Container } from "postcss";

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  function validate(username, password) {
    if (username.current.value.length < 3 && username.current.value === "") {
      alert("Username must be at least 3 characters long");
      username.current.focus();
      username.current.style.outlineColor = "red";

      return false;
    }

    if (password.current.value.length < 3 && password.current.value === "") {
      alert("Password must be at least 3 characters long");
      password.current.focus();
      password.current.style.outlineColor = "red";

      return false;
    }
    return true;
  }

  function handleClick(event) {
    event.preventDefault();

    const isValid = validate(usernameRef, passwordRef);
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "User Not found.") {
          alert(data.message);
          usernameRef.current.focus();
          usernameRef.current.style.outlineColor = "red";
          setLoading(false);
          return;
        }
        if (data.message === "Invalid Password!") {
          alert(data.message);
          passwordRef.current.focus();
          passwordRef.current.style.outlineColor = "red";
          setLoading(false);
          return;
        }

        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", data.accessToken);
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  return (
    <div className={`${styles.login} ${Container}`}>
      <img
        width={984}
        height={900.5}
        src={Background}
        alt="background picture"
      />
      <div className={`${styles.info}`}>
        <form className={styles.form}>
          <h3>
            <img width={48} height={48} src={avatar} alt="avatar picture" />
            UI Unicorn
          </h3>
          <h2>Nice to see you again</h2>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            ref={usernameRef}
            type="text"
            placeholder="Enter username..."
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
          />

          <div>
            <input
              type="checkbox"
              id={styles.howPassword}
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <div className={styles.frame}>
            <Switch className={styles.switch}></Switch>
            <p>Remember me</p>
            <a href="#" className={styles.navigate}>
              Forgot password?
            </a>
          </div>

          {loading && <button disabled>Loading...</button>}

          {!loading && <button onClick={handleClick}>Sign in</button>}

          <span className={styles.hr}></span>
        </form>

        <span className={styles.googleSpan}>
          <img src={google} alt="google icon" />
          <p>Or sign in with Google</p>
        </span>

        <div className={styles.toRegister}>
          <p className={styles.p}>Don't have an account?</p>
          <Link to={"/register"}>
            <p>
              Sign up now <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;