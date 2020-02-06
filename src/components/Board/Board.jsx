import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { playGame } from "../../actions";
import { COLS, ROWS, BLOCK_SIZE } from "../../constants";

import PlayArea from "../../core/playArea";
import Piece from "../../core/piece";

import styles from "./Board.module.scss";

const Board = ({ playGame }) => {
  const board = useRef();
  const [size, setSize] = useState({});

  // -------------------------

  const startGame = (ctx, area) => {
    area.reset();
    let piece = new Piece(ctx);
    piece.draw();

    area.piece = piece;
  };

  // -------------------------

  useEffect(() => {
    const ctx = board.current.getContext("2d");
    const playArea = new PlayArea(COLS, ROWS);

    setSize({
      width: COLS * BLOCK_SIZE,
      height: ROWS * BLOCK_SIZE,
      block: BLOCK_SIZE
    });
    ctx.canvas.width = size.width;
    ctx.canvas.height = size.height;

    ctx.scale(size.block, size.block);

    // ----------------------------------

    startGame(ctx, playArea);

    playGame(true);

    // ----------------------------------
  }, [size.width, size.height, size.block, playGame]);

  return (
    <canvas
      className={styles.board}
      ref={board}
      width={size.width}
      height={size.height}
    ></canvas>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  playGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
