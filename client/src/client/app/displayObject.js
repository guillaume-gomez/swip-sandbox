//Tomahawk.registerClass( DisplayObject, "DisplayObject" );

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
  }

  toRadians() {
    return Math.PI / 180;
  }

  render(context){        
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation * DisplayObject._toRadians);
    context.scale( this.scaleX, this.scaleY );
    context.globalAlpha = this.alpha;

    this.draw(context); 
    context.restore();
  }

  draw(context){
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(0, 0, this.width, this.height);
    context.fill();
  }
};
export default DisplayObject;