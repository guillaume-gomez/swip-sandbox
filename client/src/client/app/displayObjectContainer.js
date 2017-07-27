// Tomahawk.registerClass( DisplayObjectContainer, "DisplayObjectContainer" );
// Tomahawk.extend( "DisplayObjectContainer", "DisplayObject" );
import DisplayObject from "./displayObject";

class DisplayObjectContainer extends DisplayObject {

  constructor() {
      super();
      this.children = [];
  }

  addChild(child){
    if(child.parent){
      child.parent.removeChild(child);
    }
    child.parent = this;
    this.children.push(child);
  }

  getChildAt(index) {
    return this.children[index];
  };

  getChildByName(name) {
    return this.children.find(child => child.name === name);
  };

  addChildAt(child, index){
    const tab1 = this.children.slice(0,index);
    const tab2 = this.children.slice(index);
    this.children = tab1.concat([child]).concat(tab2);
    child.parent = this;
  };

  removeChildAt(index){
    const child = this.children[index];
    if(child) {
      child.parent = null;
    }
    this.children.splice(index,1);
  };

  removeChild(child){
    const index = this.children.indexOf(child);
    if(index > -1) {
      this.children.splice(index,1);
    }
    child.parent = null;
  };

  draw(context) {
    this.children.forEach(child => {
      child.render(context);
    });
  }
};
export default DisplayObjectContainer;