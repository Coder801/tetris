import React from "react";
import Board from "../Board";

import styles from "./App.module.scss";
import Button from "../Button";
import Info from "../Info";
import Headings from "../Headings";

const App = () => {
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
