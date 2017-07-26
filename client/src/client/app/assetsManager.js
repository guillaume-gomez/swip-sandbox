//Tomahawk.registerClass( AssetsManager, "AssetsManager" );
class AssetsLoader {

  constructor() {
    this._data = {};
  }

  getInstance() {
    if(AssetsManager._instance === null) {
      AssetsManager._instance = new AssetsManager();
    }
    return AssetsManager._instance;
  }

  getData() {
    return this._data;
  }

  getDataByAlias(alias) {
    if(this._data[alias]) {
      return this._data[alias];
    }
    return null;
  }

  addImage(image, alias) {
    this._data[alias] = image;
  }
}
export default AssetsLoader;