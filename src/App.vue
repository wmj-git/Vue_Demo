<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    }
  }
</script>

<style>
 html,
 body {
   width: 100%;
   height: 100%;
   padding: 0;
   margin: 0;
   overflow: hidden;
   position: relative;
 }
 #app,#cesiumContainer,#mapContainer {
   font-family: "Avenir", Helvetica, Arial, sans-serif;
   width: 100%;
   height: 100%;
   position: fixed;
   overflow: hidden;/*场景滚动条*/
 }
</style>
