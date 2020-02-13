import hexToRgba from "hex-to-rgba";

class Render {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawRect(x, y, color = "black") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x + 0.05, y + 0.05, 0.9, 0.9);
  }

  drawFlare(x, y, size = 0.05) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(x + 0.15, y + 0.15, size, size);
    this.ctx.fillRect(x + 0.1, y + 0.1, size, size);
    this.ctx.fillRect(x + 0.1, y + 0.15, size, size);
    this.ctx.fillRect(x + 0.15, y + 0.1, size, size);
  }

  drawBorder(x, y, color = "black") {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 0.1;
    this.ctx.strokeRect(x, y, 1, 1);
  }

  draw(matrix, colors) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    matrix.forEach((row, keyY) => {
      row.forEach((element, keyX) => {
        if (element) {
          const color = colors[element];
          this.drawRect(keyX, keyY, color[0]);
          this.drawBorder(keyX, keyY, hexToRgba(color[1], 0.6));
          this.drawFlare(keyX, keyY);
        }
      });
    });
  }
}

export default Render;
