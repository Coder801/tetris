import React, { useEffect } from "react";
import Board from "../Board";

import styles from "./App.module.scss";
import Button from "../Button";
import Info from "../Info";
import Headings from "../Headings";

import { ARROW_KEYS } from "../../constants";

const App = () => {
  const onKeyDown = event => {
    console.log(event);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
  });

  return (
    <div className={styles.grid}>
      <div className={styles.left}>
        <Board />
      </div>
      <div className={styles.right}>
        <Headings level={2}>Headings</Headings>
        <Info />
      </div>
      <div className={styles.bottom}>
        <Button />
      </div>
    </div>
  );
};

export default App;
