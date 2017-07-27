import AssetsLoader from "./assetsLoader";
import AssetsManager from "./assetsManager";
import Texture from "./texture";
import TextureAtlas from "./textureAtlas";
import Stage from "./stage";
import Bitmap from "./bitmap";

/* Point d'entrée de l'application */
let assetsManager = new AssetsManager();
let assetsLoader = new AssetsLoader();
let stage = new Stage();
function init(){

    assetsLoader.getInstance().onComplete = onComplete;
    assetsLoader.getInstance().addFile("atari400.png","ground");
    assetsLoader.getInstance().load();
}

function onComplete(){
    var data = assetsLoader.getInstance().getData();
    var canvas = document.getElementById('tomahawk');
    
    // on initialise la racine en lui envoyant la référence vers le canvas
    stage.getInstance().init(canvas);
    
    for( var alias in data ){
        assetsManager.getInstance().addImage(data[alias],alias);
    }
    
    // on crée un nouvel atlas
    var atlas = new TextureAtlas();
    
    // on lui associe une image qui sera celle partagée par toutes les textures stockée en son sein
    atlas.data = assetsManager.getInstance().getImageByAlias("ground");
    
    // on crée deux textures différentes, portant un nom différent, ayant chacune la même image
    // mais pas les mêmes portions d'image associées
    atlas.createTexture( "texture_1", 0,0,64,43);
    
    var texture = atlas.getTextureByName("texture_1"); // on retrouve notre texture
    var bmp = new Bitmap(); // on créer un nouvel objet de type Bitmap
    bmp.texture = texture; // on y associe la texture
    bmp.width = 64; // on définie la largeur
    bmp.height = 43;//... puis la hauteur
    
    stage.getInstance().addChild(bmp); // on ajoute l'enfant à la racine
    
    // on recommence l'opération tout en changeant les coordonnées du deuxième enfant
    bmp = new Bitmap();
    bmp.texture = texture; 
    bmp.width = 64; 
    bmp.height = 43;
    bmp.x = 100;
    bmp.y = 100;
    
    stage.getInstance().addChild(bmp); // on l'ajoute aussi
    stage.getInstance().setDebug(true);// on souhaite voir le fps
}

function getCanvas(){
  return document.getElementById("tomahawk");
}

function getContext(){
  return getCanvas().getContext("2d");
}

/* 
* Quand toutes les données sont chargées ( DOM, Images, Sons, Vidéos etc ... )
* On démarre l'application par la fonction init
*/
window.onload = init;