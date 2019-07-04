<template>
  <div class="buttonGroup">
    <el-row>
      <el-button v-for="btn in group" :ref="btn.id" :type="btn.type" :icon="btn.icon" @click="fn(btn.fn,btn.fnData)">
        {{btn.text}}
      </el-button>
    </el-row>
  </div>

</template>

<script>

  export default {
    name: "buttonGroup",
    data() {
      return {
        id: "",
        group: [],

      }
    },
    props: ["data"],
    components: {},
    methods: {
      init() {
        /* this.data= [{
            id: "",
            type: "",
            icon: "",
            text: "",
            fn: "",
            fnData: {}
          }]*/
        console.log(this.data);
        for (let _k in this.data) {
          if (_k === "buttonGroup") {
            this.group = this.data[_k];
          }
        }

      },
      fn(_fn, _obj) {
        this[_fn](_obj);
      },
      routerFn(_obj) {
        this.$router.push(_obj.path);
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
  @import "buttonGroup";
</style>
