<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {loadJs,loadCss} from "@/utils/tools";

  export default {
    name: 'App',
    components: {},
    beforeCreate() {

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
   font-family: "Avenir", Helvetica, Arial, sans-serif;
 }
 #app,#map,#_scene {
   font-family: "Avenir", Helvetica, Arial, sans-serif;
   width: 100%;
   height: 100%;
   position: fixed;
   overflow: hidden;/*场景滚动条*/
 }
</style>
