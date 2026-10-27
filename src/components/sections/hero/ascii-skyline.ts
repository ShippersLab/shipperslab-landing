const SAMPLE_WIDTH = 480;
const INK_THRESHOLD = 225;
const ERODE_RADIUS = 4;

export type Skyline = {
  tops: Float32Array;
  columns: number;
  rows: number;
};

export type CoverBox = {
  scale: number;
  offsetX: number;
  offsetY: number;
  drawnWidth: number;
  drawnHeight: number;
};

export function coverBox(
  boxWidth: number,
  boxHeight: number,
  imageWidth: number,
  imageHeight: number,
  positionX: number,
  positionY: number,
): CoverBox {
  const scale = Math.max(boxWidth / imageWidth, boxHeight / imageHeight);
  const drawnWidth = imageWidth * scale;
  const drawnHeight = imageHeight * scale;

  return {
    scale,
    offsetX: (boxWidth - drawnWidth) * positionX,
    offsetY: (boxHeight - drawnHeight) * positionY,
    drawnWidth,
    drawnHeight,
  };
}

function erode(tops: Float32Array, radius: number) {
  const eroded = new Float32Array(tops.length);

  for (let x = 0; x < tops.length; x++) {
    let lowest = tops[x];
    for (let k = Math.max(0, x - radius); k <= Math.min(tops.length - 1, x + radius); k++) {
      lowest = Math.min(lowest, tops[k]);
    }
    eroded[x] = lowest;
  }

  return eroded;
}

export async function loadSkyline(src: string): Promise<Skyline> {
  const image = new Image();
  image.decoding = "async";
  image.src = src;
  await image.decode();

  const columns = SAMPLE_WIDTH;
  const rows = Math.round((columns * image.naturalHeight) / image.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = columns;
  canvas.height = rows;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("canvas unavailable");

  context.drawImage(image, 0, 0, columns, rows);
  const { data } = context.getImageData(0, 0, columns, rows);
  const tops = new Float32Array(columns).fill(rows);

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (data[(y * columns + x) * 4 + 2] < INK_THRESHOLD) {
        tops[x] = y;
        break;
      }
    }
  }

  return { tops: erode(tops, ERODE_RADIUS), columns, rows };
}
