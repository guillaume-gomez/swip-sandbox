//Tomahawk.registerClass( AssetsLoader, "AssetsLoader" );

class AssetsLoader {
	constructor() {
    AssetsLoader._instance = null;
    this._loadingList = [];
    //callback functions
    this.onComplete = null;
    this._loadingList = null;
    this._data = null;
	}

  getInstance() {
    if( AssetsLoader._instance === null ) {
      AssetsLoader._instance = new AssetsLoader();
    }
    return AssetsLoader._instance;
  }

  getData() {
    return this._data;
  }


  addFile(fileURL, fileAlias) {
    this._data = {};
    this._loadingList.push({ url:fileURL,alias:fileAlias });
  }

  load() {
    if( this._loadingList.length == 0 ){
      if( this.onComplete ){
        this.onComplete();
      }
    }
    else{
      const obj = this._loadingList.shift();
      let image = new Image();
      image.onload = () => {
        this._onLoadComplete(image, obj.alias);
      };
      image.src = obj.url;
    }
  }

  _onLoadComplete(image,alias){
    this._data[alias] = image;
    this.load();
  }
}
export default AssetsLoader;
