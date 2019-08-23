<template>
  <div class="emDrawer" :drawer="Data=drawerData">
    <el-drawer
      title=""
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
  import vueBus from '@/utils/vueBus'

  export default {
    name: "emDrawer",
    data() {
      return {
        id: "drawer",
        show: false,
        modal: false,
        body: true,
        Data: ""
      }
    },
    props: ["data"],
    watch: {
      Data: function (val) {
        // this[val.fn](val);
      }
    },
    computed: {
      drawerData: function () {
        let _drawerData = this.$store.getters["scene/drawer"];
        return _drawerData;
      }
    },
    components: {},
    methods: {
      init() {

      },
      showFN(_obj) {
        console.log(_obj);
        this.show = true;
      },
      fn(_obj) {

      }
    },
    created() {
      this.init();
      vueBus.$on("set_drawer", obj => {
        this[obj.fn](obj);
      });
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    },
    updated() {

    },
    beforeDestroy() {
      vueBus.$off("set_drawer");
      this.bus.$off(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "emDrawer";
</style>
