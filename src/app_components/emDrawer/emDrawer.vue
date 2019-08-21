<template>
  <div class="emDrawer">
    <el-drawer
      title="数据"
      :visible.sync="show"
      direction="rtl"
      :modal="modal"
      :append-to-body="body"
      size="16%">
      123

    </el-drawer>
  </div>
</template>

<script>

  export default {
    name: "emDrawer",
    data() {
      return {
        id: "drawer",
        show: true,
        modal: false,
        body:true
      }
    },
    props: ["data"],
    components: {},
    methods: {
      init() {

      },
      fn(_obj) {
        this.show = _obj.show;
      }
    },
    created() {
      this.init();
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "emDrawer";
</style>
