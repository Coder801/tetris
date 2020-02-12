const createCanvas = ({ canvas, cols, rows, scale }) => {
  const ctx = canvas.getContext("2d");

  ctx.canvas.width = cols * scale;
  ctx.canvas.height = rows * scale;

  ctx.scale(scale, scale);

  return ctx;
};

export default createCanvas;
