import React, { useRef, useEffect } from 'react';
import { CandlesticksProps } from './types';
import { drawLine, drawCandle } from './utility';

const CandlesticksChart: React.FC<CandlesticksProps> = ({
  data,
  bullColor,
  bearColor,
  gridScale,
  padding,
  gridColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const symbol = data['Meta Data']['Symbol'];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const properties = Object.values(data['Time Series (Daily)']).reverse();
        const prices = properties.flatMap(({ volume, ...rest }) => Object.values(rest).map(Number));
        // determine Maximum value of price on Y axis:
        // We want the lowest/highest price from our list of prices first:
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        // round up the above min and max grid markers so that we can use that number for plotting our grid.
        // rounded to the nearest determined gridScale.
        const gridMin = Math.round(min / gridScale) * gridScale;
        const gridMax = Math.round(max / gridScale) * gridScale;
        const canvasActualHeight = canvas.height - padding * 2;
        const canvasActualWidth = canvas.width;

        // draw a grid
        const axisInterval = (gridMax - gridMin) / gridScale;
        let gridValue = gridMin;
        let counter = 0;

        const drawWicks = (
          coordinateX: number,
          open: number,
          high: number,
          close: number,
          low: number,
          candleColor: string,
          gridDifference: number
        ) => {
          const highPriceY = canvasActualHeight * ((gridMax - high) / gridDifference) + padding;
          const lowPriceY = canvasActualHeight * ((gridMax - low) / gridDifference) + padding;
          const drawCtx = (startY: number, endY: number) => {
            ctx.save();
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(coordinateX + 2.5, startY);
            ctx.lineTo(coordinateX + 2.5, endY);
            ctx.stroke();
            ctx.restore();
          };
          drawCtx(candleColor === bullColor ? close : open, highPriceY);
          drawCtx(candleColor === bullColor ? open : close, lowPriceY);
        };

        while (gridValue <= gridMax) {
          const gridY = canvasActualHeight * (1 - counter / axisInterval) + padding;
          drawLine(ctx, 0, gridY, canvas.width, gridY, gridColor);

          // Plot the candles.
          const gridDifference = gridMax - gridMin;
          let openPrice, closePrice, highPrice, lowPrice, candleColor;
          let coordinateX, coordinateY, height;
          let xCounter = 27;
          for (let i = 0; i < properties.length; i++) {
            openPrice = Number.parseFloat(properties[i].open);
            closePrice = Number.parseFloat(properties[i].close);
            highPrice = Number.parseFloat(properties[i].high);
            lowPrice = Number.parseFloat(properties[i].low);
            candleColor =
              closePrice > openPrice ? bullColor : openPrice > closePrice ? bearColor : 'black';
            const closePriceY =
              canvasActualHeight * ((gridMax - closePrice) / gridDifference) + padding;
            const openPriceY =
              canvasActualHeight * ((gridMax - openPrice) / gridDifference) + padding;

            coordinateX = canvasActualWidth * ((i + 1) / 100) + xCounter;
            coordinateY = candleColor === bearColor ? closePriceY : openPriceY;

            if (candleColor === bullColor) {
              height = closePriceY - openPriceY;
            } else if (candleColor === bearColor) {
              height = (openPriceY - closePriceY) * -1;
            } else {
              height = 1;
            }
            height = Number.parseFloat(height.toFixed(1));

            drawCandle(ctx, coordinateX, coordinateY, 5, height, candleColor);
            drawWicks(
              coordinateX,
              openPriceY,
              highPrice,
              closePriceY,
              lowPrice,
              candleColor,
              gridDifference
            );

            xCounter += 1;
          }
          // writing grid markers
          ctx.save();
          ctx.fillStyle = 'grey';
          ctx.font = 'bold 10px Arial';
          ctx.fillText(`${gridValue.toFixed(2)}`, 0, gridY - 2);
          ctx.restore();

          gridValue += gridScale;
          counter += 1;
        }
        // filling in the symbol text on chart
        ctx.save();
        ctx.fillStyle = '#ebeff4';
        ctx.font = 'bold 100px Arial';
        ctx.fillText(symbol, 200, canvas.height / 2);
        ctx.restore();
      }
    }
  }, [bearColor, bullColor, data, gridColor, gridScale, padding, symbol]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CandlesticksChart;
