class View {
  _basicTools = document.querySelectorAll(".option");
  _actionTools = document.querySelectorAll(".action");
  _canvas = document.getElementById("canvas");
  _context = canvas.getContext("2d");

  addHandlerSelectedTool(handler) {
    this._basicTools.forEach((tool) => {
      tool.addEventListener("click", (e) => {
        let selectedTool = e.target.closest(".option").id;
        document
          .querySelector(".option--selected")
          .classList.remove("option--selected");
        e.target.closest(".option").classList.add("option--selected");

        if (selectedTool === "eraser") {
          this._canvas.style.cursor = `url("../img/icons8-circle-15.png"), auto`;
        } else {
          this._canvas.style.cursor = `crosshair`;
        }

        handler(e.target.closest(".option").id);
      });
    });
  }

  addHandlerActionTools(handler) {
    this._actionTools.forEach((tool) => {
      tool.addEventListener("click", (e) => {
        handler(e.target.closest(".action").id);
      });
    });
  }

  addInitItemsHandler(handler) {
    handler({
      basicTools: this._basicTools,
      canvas: this._canvas,
      context: this._context,
    });
  }

  addHandlerSize(handler) {
    ["load", "resize"].forEach((e) => {
      window.addEventListener(e, handler);
    });
  }

  addHandlerStartDrawing(handler) {
    ["mousedown", "touchstart"].forEach((ev) => {
      canvas.addEventListener(ev, handler);
    });
  }

  addHandlerKeepDrawing(handler) {
    ["mousemove", "touchmove"].forEach((ev) => {
      canvas.addEventListener(ev, handler);
    });
  }

  addHandlerStopDrawing(handler) {
    ["mouseup", "mouseout", "touchcancel", "touchend"].forEach((ev) => {
      canvas.addEventListener(ev, handler);
    });
  }
}

export default new View();
