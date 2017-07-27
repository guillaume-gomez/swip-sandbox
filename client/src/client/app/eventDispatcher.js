//Tomahawk.registerClass( EventDispatcher, "EventDispatcher" );

class EventDispatcher {
  constructor() {
    this.parent = null;
    this._listeners = [];
  }
  
  addEventListener(type, scope, callback, useCapture) {
    this._listeners.push({ type, scope, callback, useCapture });
  }

  hasEventListener(type){
    if(this._listeners === null) {
      return false;
    } 
    const eventFound = this.getEventListener(type);
    return !!eventFound;
  }

  dispatchEvent(event) {
    var obj = {};
    var i = this._listeners.length;
    
    if(event.target === null) {
      event.target = this;
    }
    event.currentTarget = this;
    const eventFound = this.getEventListener(type);
    if(eventFound) {
      if(event.target === this || eventFound.useCapture !== false){
         obj.callback.apply(eventFound.scope, [event]);
      }
                  
    }
    if(event.bubbles === true && this.parent !== null && this.parent.dispatchEvent) {
      this.parent.dispatchEvent(event);
    }
  }

  getEventListener(type) {
    this._listeners.find(listener => listener.type === event.type);
  }

  removeEventListener(type, scope, callback, useCapture) {
    let listener = this.getEventListener(type);
    
    while( listener != null ){
        var obj = {};
        var i = this._listeners.length;
        var arr = [];
        const newListeners = this._listeners.filter(listener => {
          return  obj.type != listener.type || obj.scope != scope || obj.callback != callback || obj.useCapture != useCapture;
        });
        this._listeners = newListeners;
        let listener = this.getEventListener(type);
    }
  }
};
export default EventDispatcher; 
