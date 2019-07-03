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
 /* html {
    height: 100%;
  }
  body,#app {
    background: #333;
    font-size: 100%;
    color: #eee;
    font-family: 'sans-serif', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }*/
 html,
 body {
   width: 100%;
   height: 100%;
   padding: 0;
   margin: 0;
   overflow: hidden;
 }
 #app,#cesiumContainer,#mapContainer {
   font-family: "Avenir", Helvetica, Arial, sans-serif;
   width: 100%;
   height: 100%;
   position: fixed;
   overflow: hidden;/*场景滚动条*/
 }
</style>
