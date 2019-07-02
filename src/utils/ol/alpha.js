

//透明功能
export function alphaFN(newValue,viewer,scene) {

    console.log(newValue);
   /* if (newValue < 1.0) {
        viewer.scene.screenSpaceCameraController.minimumZoomDistance = -1000;//设置相机最小缩放距离
    } else {
        viewer.scene.screenSpaceCameraController.minimumZoomDistance = 600;//设置相机最小缩放距离
    }*/

    // globe.globeAlpha = parseFloat(newValue);//设置地表透明度
    var _layer=viewer.imageryLayers.get(0);//地图层透明
    _layer.alpha = newValue;//地图层透


    scene.invertClassificationColor.alpha = parseFloat(newValue);

}


