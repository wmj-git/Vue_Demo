<template>
  <div class="emDialog">
    <el-dialog
      :title="dialogSet.title"
      :modal="dialogSet.modal"
      :visible.sync="dialogVisible"
      :width="dialogSet.width"
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
        dialogSet: {
          title: "",
          modal: "",
          width: ""
        }
      }
    },
    props: ["data"],
    components: {},
    methods: {
      init() {
        console.log(this.data);
        this.id = this.data.system_id;
        this.dialogVisible = this.data.visible;

        this.dialogSet.modal = this.data.modal;
        this.dialogSet.title = this.data.title;
        this.dialogSet.width = this.data.width;
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
