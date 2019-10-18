<template>
  <div class="emButtonGroup">
    <el-row>
      <el-button v-for="(btn,index) in group"
                 :key="index"
                 :ref="btn.id"
                 :type="btn.type"
                 :icon="btn.icon"
                 @click="fn(btn)">
        {{btn.text}}
      </el-button>
    </el-row>
  </div>

</template>

<script>

  export default {
    name: "emButtonGroup",
    data() {
      return {
        id: "",
        group: []
      }
    },
    props: ["data"],
    components: {},
    methods: {
      init() {
        console.log(this.data);
        for (let _k in this.data) {
          if (_k === "buttonGroup") {
            this.group = this.data[_k];
          }
        }
      },
      fn(_obj) {
        if (_obj.control_type === "scene") {//场景交互
          _obj.control_id = this.$store.getters["scene/type"];
          this.bus.$emit(_obj.control_id, _obj);
        } else if (_obj.control_type === "none") {//本组件交互
          this[_obj.fn](_obj);
        }
        _obj.trigger = !(_obj.trigger);
      },
      routerFn(_obj) {
        this.$router.push(_obj.path);
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
  @import "emButtonGroup";
</style>
