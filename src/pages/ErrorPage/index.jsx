import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function ErrorPages() {
  return (
    <div className="container mt-[50px]">
      <h2 className={styles.title}>
        Uzr bunday sahifa mavjud emas. Pastdagi tugmani bosib login sahifasiga
        qaytishingiz mumkin!!!
      </h2>

      <Link to={"/login"}>
        <p className={styles.tologin}>
          Sign in now <FontAwesomeIcon icon={faArrowRight} />
        </p>
      </Link>
    </div>
  );
}

export default ErrorPages;
