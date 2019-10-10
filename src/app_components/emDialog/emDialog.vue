<template>
  <div class="emDialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="200"
      append-to-body
    >
           <slot></slot>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: "emDialog",
    data() {
      return {
        id: "",
        dialogVisible: true,
        dialogSet: {},
        type: "",
        dialog: {}
      }
    },
    props: ["data"],
    components: {},
    methods: {
      init() {
        /* console.log(this.data);
         this.type = this.data.type;
         this.dialog = this.data;*/
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
  @import "emDialog";
</style>
