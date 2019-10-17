<template>
  <div class="emDialog">
    <el-dialog
      :title="dialogSet.title"
      :modal="dialogSet.modal"
      :visible.sync="dialogVisible"
      :width="dialogSet.width"
      :destroy-on-close="true"
      append-to-body
      @close="clear"
    >
      <el-row :gutter="8" v-if="children">
        <template v-for="component in children">
          <el-col :span="component.winSpan">
            <component :is="component.component" :data="component"></component>
          </el-col>
        </template>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'
  import emForm from "@/app_components/emForm/emForm";


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
        },
        children: [],
      }
    },
    props: ["data"],
    components: {
      emForm
    },
    methods: {
      fn(){

      },
      init() {
        console.log(this.data);
        this.id = this.data.system_id;
        this.dialogVisible = this.data.visible;

        this.dialogSet.modal = this.data.modal;
        this.dialogSet.title = this.data.title;
        this.dialogSet.width = this.data.width;

        if (this.data.children) {
          this.children=this.children.concat(this.data.children);
        }
      },
      clear(){
        this.children.splice(0,this.children.length);
      },
      visibleFn(_val) {
        console.log(_val);
        this.dialogVisible = _val.visible;
        this.dialogSet.title = _val.set.title;
        this.dialogSet.width = _val.set.width;
        if (_val.children) {
          this.children=this.children.concat(_val.children);
          console.log(this.children);
        }
      },
      closeFn(_val) {
        console.log(_val);
        this.dialogVisible = false;
      }
    },
    created() {

    },
    mounted() {
      this.init();
      vueBus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    beforeDestroy() {
      vueBus.$off(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "emDialog";
</style>
