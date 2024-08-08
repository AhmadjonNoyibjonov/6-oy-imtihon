import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/images/googleicon.svg";
import avatar from "../../assets/images/avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/joy/Switch";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");
  const imagesRef = useRef("");

  function validate(username, email, password, rePassword, images) {
    if (!images.current.value.startsWith("https://")) {
      alert("Please enter the correct URL");
      images.current.focus();
      images.current.style.outlineColor = "red";

      return false;
    }

    if (username.current.value.length < 3) {
      alert("Username must be at least 3 characters long");
      username.current.focus();
      username.current.style.outlineColor = "red";

      return false;
    }

    if (email.current.value.length < 3) {
      alert("Email must be at least 3 characters long");
      email.current.focus();
      email.current.style.outlineColor = "red";

      return false;
    }

    if (password.current.value.length < 3) {
      alert("Password must be at least 3 characters long");
      password.current.focus();
      password.current.style.outlineColor = "red";

      return false;
    }

    if (password.current.value != rePassword.current.value) {
      alert("Password and rePassword is not the same");
      password.current.value = "";
      password.current.focus();

      return false;
    }

    return true;
  }

  function handleClick(event) {
    event.preventDefault();
    const isValid = validate(
      usernameRef,
      emailRef,
      passwordRef,
      rePasswordRef,
      imagesRef
    );
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);
    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((reps) => reps.json())
      .then((data) => {
        console.log(data);
        if (data.message == "User registered successfully!") {
          navigate("/login");
        }

        if (data.message == "Failed! Username is already in use!") {
          alert(data.message);
          usernameRef.current.focus();
          usernameRef.current.value = "";
          return;
        }

        if (data.message == "Failed! Email is already in use!") {
          alert(data.message);
          usernameRef.current.focus();
          usernameRef.current.value = "";
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <div className={`${styles.login} ${styles.container}`}>
      <img
        width={984}
        height={900.5}
        src="https://img.freepik.com/free-photo/brown-mountain-mirrored-body-water_395237-244.jpg?w=1380&t=st=1723037266~exp=1723037866~hmac=ece9593c20292733b148a51d674fe5d4b8c0ce8e993259f7ad5856d9d035d3a2"
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

          <label htmlFor="email">Email</label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            placeholder="Enter email..."
          />

          <label htmlFor="url">Image url</label>
          <input
            id="url"
            ref={imagesRef}
            type="url"
            placeholder="Enter your avatar image location..."
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
          />

          <label htmlFor="repassword">Repassword</label>
          <input
            id="repassword"
            ref={rePasswordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Enter repassword..."
          />

          <div>
            <input
              type="checkbox"
              id="howPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="howPassword">Show Password</label>
          </div>

          <div className={styles.frame}>
            <Switch className={styles.switch}></Switch>
            <p>Remember me</p>
            <a href="#" className={styles.navigate}>
              Forgot password?
            </a>
          </div>

          {loading && <button disabled>Loading...</button>}
          {!loading && <button onClick={handleClick}>Sign up</button>}
          <span className={styles.hr}></span>
        </form>

        <span className={styles.googleSpan}>
          <img src={google} alt="google icon" />
          <p>Or sign in with Google</p>
        </span>

        <div className={styles.toRegister}>
          <p className={styles.p}>Do you have an account?</p>
          <Link to={"/login"}>
            <p>
              {" "}
              Sign in now <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
