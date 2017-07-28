// Tomahawk.registerClass( DisplayObjectContainer, "DisplayObjectContainer" );
// Tomahawk.extend( "DisplayObjectContainer", "DisplayObject" );
import DisplayObject from "./displayObject";

class DisplayObjectContainer extends DisplayObject {

  constructor() {
      super();
      this.children = [];
  }

  draw(context) {
    this.children.forEach(child => {
      child.render(context);
    });
  }
};
export default DisplayObjectContainer;