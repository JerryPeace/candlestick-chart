//  helper function for drawing a solid line on canvas.
export const drawLine = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string
) => {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
};

// helper function to draw a candle:
export const drawCandle = (
  ctx: CanvasRenderingContext2D,
  upperLeftCornerX: number,
  upperLeftCornerY: number,
  width: number,
  height: number,
  color: string
) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
};
