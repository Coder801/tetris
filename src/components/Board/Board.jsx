import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { playGame } from "../../actions";
import createCanvas from "../../helpers/createCanvas";
import Tetris from "../../core";
import {
  COLS as cols,
  ROWS as rows,
  BLOCK_SIZE as blockSize
} from "../../constants";

import styles from "./Board.module.scss";

const Board = () => {
  const board = useRef();

  useEffect(() => {
    const canvas = createCanvas({
      canvas: board.current,
      scale: blockSize,
      cols,
      rows
    });

    const tetris = new Tetris({
      canvas,
      cols,
      rows,
      blockSize
    });

    tetris.start();
  }, []);

  return <canvas className={styles.board} ref={board}></canvas>;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  playGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
