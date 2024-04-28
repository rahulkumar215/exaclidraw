import {
  Brush_Width,
  Default_Color,
  Default_Tool,
  Win_Height,
  Win_Width,
} from "./config";

export const state = {
  drawing: {
    isDrawing: false,
    selectedTool: Default_Tool,
    brushWidth: Brush_Width,
    selectedColor: Default_Color,
  },
  canvas: {
    basicTools: "",
    canvas: "",
    context: "",
    snapShot: "",
    width: Win_Width,
    height: Win_Height,
  },
  prevMouseX: "",
  prevMouseY: "",
  restoreArray: [],
  redoArray: [],
  index: -1,
};

export const initCanvas = ({ basicTools, canvas, context }) => {
  state.canvas.basicTools = basicTools;
  state.canvas.canvas = canvas;
  state.canvas.context = context;
};

export const resizeCanvas = () => {
  state.canvas.canvas.width = state.canvas.width;
  state.canvas.canvas.height = state.canvas.height;
  state.canvas.snapShot &&
    state.canvas.context.putImageData(state.canvas.snapShot, 0, 0);
};

export const startDrawing = (e) => {
  console.log("started drawing");

  state.drawing.isDrawing = true;
  state.canvas.context.lineWidth = state.drawing.brushWidth;
  state.canvas.context.fillStyle = state.drawing.selectedColor;
  state.canvas.context.strokeStyle = state.drawing.selectedColor;
  state.prevMouseX = e.type === "mousedown" ? e.offsetX : e.touches[0].clientX;
  state.prevMouseY = e.type === "mousedown" ? e.offsetY : e.touches[0].clientY;
  state.canvas.context.beginPath();
  state.canvas.snapShot = state.canvas.context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  state.redoArray = [];
};

const drawTriangle = (e) => {
  state.canvas.context.beginPath();
  state.canvas.context.moveTo(state.prevMouseX, state.prevMouseY);
  state.canvas.context.lineTo(
    e.type === "mousedown" ? e.offsetX : e.touches[0].clientX,
    e.type === "mousedown" ? e.offsetY : e.touches[0].clientY
  );
  state.canvas.context.lineTo(
    state.prevMouseX * 2 -
      (e.type === "mousedown" ? e.offsetX : e.touches[0].clientX),
    e.type === "mousedown" ? e.offsetY : e.touches[0].clientY
  );
  state.canvas.context.closePath();
  state.canvas.context.stroke();
};

const drawCircle = (e) => {
  state.canvas.context.beginPath();
  let radius = Math.sqrt(
    Math.pow(
      state.prevMouseX -
        (e.type === "mousedown" ? e.offsetX : e.touches[0].clientX),
      2
    ) +
      Math.pow(
        state.prevMouseY -
          (e.type === "mousedown" ? e.offsetY : e.touches[0].clientY),
        2
      )
  );
  state.canvas.context.arc(
    state.prevMouseX,
    state.prevMouseY,
    radius,
    0,
    2 * Math.PI
  );
  state.canvas.context.stroke();
};

const drawRect = (e) => {
  state.canvas.context.strokeRect(
    e.type === "mousedown" ? e.offsetX : e.touches[0].clientX,
    e.type === "mousedown" ? e.offsetY : e.touches[0].clientY,
    state.prevMouseX -
      (e.type === "mousedown" ? e.offsetX : e.touches[0].clientX),
    state.prevMouseY -
      (e.type === "mousedown" ? e.offsetY : e.touches[0].clientY)
  );
};

export const setSelectedTool = (tool) => {
  state.drawing.selectedTool = tool;
};

export const keepDrawing = (e) => {
  if (!state.drawing.isDrawing) return;
  console.log("keep drawing");
  console.log(e);

  state.canvas.context.putImageData(state.canvas.snapShot, 0, 0);
  if (state.drawing.selectedTool === "rectangle") {
    drawRect(e);
  } else if (state.drawing.selectedTool === "triangle") {
    drawTriangle(e);
  } else if (state.drawing.selectedTool === "circle") {
    drawCircle(e);
  } else if (state.drawing.selectedTool === "pencil" || "eraser") {
    state.canvas.context.strokeStyle =
      state.drawing.selectedTool === "eraser"
        ? "#121212"
        : state.drawing.selectedColor;
    state.canvas.context.lineWidth =
      state.drawing.selectedTool === "eraser" ? 10 : state.drawing.brushWidth;
    state.canvas.context.lineCap = "round";
    state.canvas.context.lineJoin = "round";
    state.canvas.context.lineTo(
      e.type === "mousedown" ? e.offsetX : e.touches[0].clientX,
      e.type === "mousedown" ? e.offsetY : e.touches[0].clientY
    );
    state.canvas.context.stroke();
  }
};

export const stopDrawing = (e) => {
  console.log("stop drawing");
  state.drawing.isDrawing = false;
  if (e.type != "mouseout") {
    captureImageData();
  }
};

function captureImageData() {
  state.restoreArray.push(
    state.canvas.context.getImageData(
      0,
      0,
      state.canvas.canvas.width,
      state.canvas.canvas.height
    )
  );
  ++state.index;
}

const clearCanvas = () => {
  state.canvas.context.clearRect(
    0,
    0,
    state.canvas.canvas.width,
    state.canvas.canvas.height
  );
  captureImageData();
};

const undoLastAction = () => {
  console.log(state.index);

  if (state.index <= 0) {
    clearCanvas();
    state.redoArray = [];
  } else {
    --state.index;
    const imageData = state.restoreArray.pop();
    state.redoArray.push(imageData);
    state.canvas.context.putImageData(state.restoreArray[state.index], 0, 0);
  }
};

const redoLastAction = () => {
  if (state.index <= 0 || state.redoArray.length === 0) {
    return;
  } else {
    const imageData = state.redoArray.pop();
    state.restoreArray.push(imageData);
    ++state.index;
    state.canvas.context.putImageData(state.restoreArray[state.index], 0, 0);
  }
};

export const performAction = (tool) => {
  if (tool === "clear") {
    clearCanvas();
  } else if (tool === "undo") {
    undoLastAction();
  } else if (tool === "redo") {
    redoLastAction();
  }
};
