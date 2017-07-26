// Tomahawk.registerClass( Stage, "Stage" );
// Tomahawk.extend( "Stage", "DisplayObjectContainer" );
import DisplayObjectContainer from "./displayObjectContainer";

class Stage extends DisplayObjectContainer {
  constructor() {
    window.requestAnimationFrame = (function(){  
      return  window.requestAnimationFrame       ||  //Chromium 
              window.webkitRequestAnimationFrame ||  //Webkit
              window.mozRequestAnimationFrame    || //Mozilla Geko
              window.oRequestAnimationFrame      || //Opera Presto
              window.msRequestAnimationFrame     || //IE Trident?
              function(callback, element){ //Fallback function
                  window.setTimeout(callback, 10);                
              }
      });
    this._lastTime = 0;
    this._frameCount = 0;
    this._fps = 0;
    this._canvas = null;
    this._context = null;
    this._debug = false;

    super();
  }

  getInstance() {
    if(this._instance === null) {
      this._instance = new Stage();
    }  
    return this._instance;
  }

  init(canvas) {    
    this._canvas = canvas;
    this._context = canvas.getContext("2d");
    this._enterFrame();        
  }

  _enterFrame() {
      
      var curTime = new Date().getTime();
      var scope = this;
      
      this._frameCount++;
      
      if(curTime - this._lastTime >= 1000){
          this._fps = this._frameCount;
          this._frameCount = 0;
          this._lastTime = curTime;
      }
      
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
      this._context.save();
      this.render(this._context);
      this._context.restore();
      
      if(this._debug == true){
          this._context.save();
          this._context.beginPath();
          this._context.fillStyle = "black";
          this._context.fillRect(0,0,100,30);
          this._context.fill();
          this._context.fillStyle = "red";
          this._context.font = 'italic 20pt Calibri';
          this._context.fillText("fps: "+this._fps, 0,30);
          this._context.restore();
      }
      
      window.requestAnimationFrame(
          function(){
              scope._enterFrame();
          }
      );
  }

  getCanvas() {
      return this._canvas;
  }

  getContext() {
      return this._context;
  }

  getFPS() {
    return this._fps;
  }

  setDebug(debug) {
    this._debug = debug;
  }
};
export default Stage;
