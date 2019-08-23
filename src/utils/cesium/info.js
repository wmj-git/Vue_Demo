import vueBus from '@/utils/vueBus'

let nameOverlay, selected, selectedEntity, clickHandler, silhouetteBlue, silhouetteGreen;

export function infoInit(viewer) {

  // HTML overlay for showing feature name on mouseover
  nameOverlay = document.createElement('div');
  // var nameOverlay = $("#box").find('span');
  viewer.container.appendChild(nameOverlay);
  nameOverlay.className = 'backdrop';
  nameOverlay.style.display = 'none';
  nameOverlay.style.position = 'absolute';
  nameOverlay.style.bottom = '0';
  nameOverlay.style.left = '0';
  nameOverlay.style.color = '#fff';
  nameOverlay.style['pointer-events'] = 'none';
  nameOverlay.style.padding = '2px';
  nameOverlay.style.backgroundColor = 'black';

// Information about the currently selected feature
  selected = {
    feature: undefined,
    originalColor: new Cesium.Color()
  };

// An entity object which will hold info about the currently selected feature for infobox display
  selectedEntity = new Cesium.Entity();

// Get default left click handler for when a feature is not picked on left click
  clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);

// If silhouettes are supported, silhouette features in blue on mouse over and silhouette green on mouse click.
// If silhouettes are not supported, change the feature color to yellow on mouse over and green on mouse click.
  if (Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
    // Silhouettes are supported
    silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
    silhouetteBlue.uniforms.length = 0.01;
    silhouetteBlue.selected = [];

    silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteGreen.uniforms.color = Cesium.Color.LIME;
    silhouetteGreen.uniforms.length = 0.01;
    silhouetteGreen.selected = [];

    viewer.scene.postProcessStages.add(Cesium.PostProcessStageLibrary.createSilhouetteStage([silhouetteBlue, silhouetteGreen]));

    // Silhouette a feature blue on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
      // If a feature was previously highlighted, undo the highlight
      silhouetteBlue.selected = [];

      // Pick a new feature
      var pickedFeature = viewer.scene.pick(movement.endPosition);
      // console.log(!Cesium.defined(pickedFeature));
      if (Cesium.defined(pickedFeature) && pickedFeature.id) {

      } else {
        nameOverlay.style.display = 'none';
        return;
      }

      // A feature was picked, so show it's overlay content
      nameOverlay.style.display = 'block';
      nameOverlay.style.bottom = viewer.canvas.clientHeight - movement.endPosition.y + 'px';
      nameOverlay.style.left = movement.endPosition.x + 'px';

      /* console.log(pickedFeature);
       pickedFeature.id.addProperty('qwe');
       pickedFeature.id.qwe="123123";
       console.log(pickedFeature.id.qwe);*/

      // console.log("featureData");
      // console.log(pickedFeature.id.featureData);

      let name = pickedFeature.id.name;
      let id = pickedFeature.id.name;

      // nameOverlay.textContent = name;
      nameOverlay.innerHTML = "<em>" + name + "</em>";

      // Highlight the feature if it's not already selected.
      if (pickedFeature !== selected.feature) {
        silhouetteBlue.selected = [pickedFeature];
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Silhouette a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
      // If a feature was previously selected, undo the highlight
      silhouetteGreen.selected = [];

      // Pick a new feature
      var pickedFeature = viewer.scene.pick(movement.position);

      if (Cesium.defined(pickedFeature) && pickedFeature.id) {

      } else {
        console.log(0);
        clickHandler(movement);
        return;
      }

      // Select the feature if it's not already selected
      if (silhouetteGreen.selected[0] === pickedFeature) {
        return;
      }

      // Save the selected feature's original color
      var highlightedFeature = silhouetteBlue.selected[0];
      if (pickedFeature === highlightedFeature) {
        silhouetteBlue.selected = [];
      }

      // Highlight newly selected feature
      silhouetteGreen.selected = [pickedFeature];


      console.log("featureData1");
      console.log(pickedFeature.id);
      console.log(pickedFeature.id.featureData);

      // Set feature infobox description
      let featureData = pickedFeature.id.featureData;
      let featureName = pickedFeature.id.name;
      let featureId = pickedFeature.id.id;
      let _type = featureId.split("_");

      vueBus.$emit("set_drawer", {
        fn: "showFN",
        type: _type[0],
        content: featureData ? featureData : {},
      });


    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  } else {
    alert("错误");
  }
}

