import View from "./Views/View";
import * as model from "./model";

const controlCanvasSize = () => {
  model.resizeCanvas();
};

const controlInitItems = (data) => {
  model.initCanvas(data);
};

const controlStartDrawing = (e) => {
  model.startDrawing(e);
};
const controlKeepDrawing = (e) => {
  model.keepDrawing(e);
};
const controlStopDrawing = (e) => {
  model.stopDrawing(e);
};

const controlSelectedTool = (selectedTool) => {
  model.setSelectedTool(selectedTool);
};

const controlActions = (selectedTool) => {
  model.performAction(selectedTool);
};

const init = () => {
  View.addInitItemsHandler(controlInitItems);
  View.addHandlerSize(controlCanvasSize);
  View.addHandlerStartDrawing(controlStartDrawing);
  View.addHandlerKeepDrawing(controlKeepDrawing);
  View.addHandlerStopDrawing(controlStopDrawing);
  View.addHandlerSelectedTool(controlSelectedTool);
  View.addHandlerActionTools(controlActions);
};

init();
