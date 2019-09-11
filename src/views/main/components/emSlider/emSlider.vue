<template>
  <div class="em_slider">
    <win v-if="win.show" :id="win.id" :data="win">
      <div class="em-block">
        <el-slider v-model="value" @change="fn"></el-slider>
      </div>
    </win>
  </div>
</template>

<script>
  import win from "@/app_components/win/win"

  export default {
    props: {},
    components: {
      win
    },
    data() {
      return {
        win: {
          id: "em_slider",
          title: "",
          top: "86%",
          left: "10",
          show: false,
          resizable: false,
          width: 400,
          class: "em-slider-window"
        },
        value: 100,
      }
    },
    methods: {
      fn() {
        let _controlId = this.$store.getters["scene/type"];
        this.bus.$emit(_controlId, {
          fn: "alpha",
          value: this.value / 100
        });
      },
      showFn(obj) {//控制显示
        this.win.show = obj.trigger;
      }
    },
    created() {

    },
    mounted() {
      this.bus.$on(this.win.id, obj => {
        this[obj.fn](obj);
      });
    },
    beforeDestroy() {
      this.bus.$off(this.win.id);
    }
  };
</script>
<style lang="scss" scoped>
  @import "emSlider";
</style>
