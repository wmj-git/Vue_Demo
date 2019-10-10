<template>
  <div class="emDialog">
    <!--<component :is="type" :data="dialog"></component>-->
    <component></component>
  </div>

</template>

<script>
  import dome from "./components/dome/dome"

  export default {
    name: "em_dialog",
    data() {
      return {
        type: "",
        dialog: {}
      }
    },
    // props: ["data"],
    components: {
      dome
    },
    methods: {
      init() {
        console.log(this.data);

        this.type = this.data.type;
        this.dialog = this.data;
      }

    },
    created() {
      this.init();
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "em_dialog";
</style>
