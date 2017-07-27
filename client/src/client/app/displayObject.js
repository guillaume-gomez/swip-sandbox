//Tomahawk.registerClass( DisplayObject, "DisplayObject" );
import Maxtrix2D from "./matrix2D";

class DisplayObject {

  constructor() {
    this.name = null;
    this.parent = null;
    this.x = 0;
    this.y = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.width = 0;
    this.height = 0;
    this.rotation = 0;
    this.alpha = 1;
    this.matrix = new Matrix2D();
  }

  toRadians() {
    return Math.PI / 180;
  }

  render(context) {        
   this.update();        

    if(this.visible === false) {
      return;
    }
        
    const mat = this.matrix;
    context.save();
    context.globalAlpha = this.alpha;
    context.transform(mat.a,mat.b,mat.c,mat.d,mat.tx,mat.ty);
    this.draw(context);
    context.restore();
  }

  draw(context){
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(0, 0, this.width, this.height);
    context.fill();
  }

  update(){
   const mat = this.matrix;   
   mat.appendTransform(
    this.x, 
        this.y, 
        this.scaleX, 
        this.scaleY, 
        this.rotation, 
        this.skewX, 
        this.skewY, 
        this.pivotX, 
        this.pivotY
    );
  }
};
export default DisplayObject;