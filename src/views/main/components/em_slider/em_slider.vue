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
  import win from "@/components/win/win"

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
          left: 10,
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
        this.bus.$emit("scene", {
          fn: "alpha",
          value: this.value / 100
        });
      },
      showFn(obj) {
        this.win.show =obj.trigger;
      }
    },
    created() {
      var bodyheight = Number(document.body.clientHeight);
      /*this.win.top=bodyheight-150;*/
    },
    mounted() {
      this.bus.$on(this.win.id, obj => {
        this[obj.fn](obj);
      });
    }
  };
</script>
<style lang="scss" scoped>
  @import "em_slider";
</style>
