import React from "react";

import styles from "./Button.module.scss";

const Button = ({ text = "Play", action }) => {
  return (
    <button type="button" className={styles.button} onClick={action}>
      {text}
    </button>
  );
};

export default Button;
