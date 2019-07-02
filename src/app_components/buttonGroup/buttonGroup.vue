<template>
  <div class="buttonGroup">
    <el-row>
      <div style="width: 120px;text-align: center">
        <el-button type="primary" icon="el-icon-edit" @click="fn('/home/scene')">btn2</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="fn('/test')">btn3</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="fn('/home/btn')">btn4</el-button>
      </div>
    </el-row>
  </div>

</template>

<script>

  export default {
    name: "buttonGroup",
    data() {
      return {}
    },
    props: ["data"],
    components: {},
    methods: {
      init() {
        console.log(this.data);
      },
      fn(path) {
        this.$router.push(path);
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
