<template>
  <div class="emForm">
    <el-card class="box-card">
          form
    </el-card>
  </div>
</template>

<script>
  import splitPane from 'vue-splitpane';

  export default {
    name: "emForm",
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
  @import "emForm";
</style>
