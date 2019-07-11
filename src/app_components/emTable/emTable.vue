<template>
  <div class="emTable">
    <el-row>
      123
    </el-row>
  </div>
</template>

<script>
  import splitPane from 'vue-splitpane';

  export default {
    name: "emTable",
    data() {
      return {
        id: ""
      };
    },
    props: ["data"],
    components: {
      splitPane
    },
    methods: {
      init() {

      },
      fn(_fn, _obj) {
        this[_fn](_obj);
      }
    },
    created() {
      this.init();
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    }
  };
</script>

<style lang="scss" scoped>
  @import "emTable";
</style>
