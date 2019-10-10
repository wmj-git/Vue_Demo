<template>
  <div class="dome">
    <el-dialog
      :title="title"
      :visible.sync="show"
      width="30%"
      :before-close="fn">
      <span>这是表格操作内容</span>
      <!--<template v-for="item in this.data.data">-->
        <!--<span>{{item.name}}</span>-->
        <!--<component :is="item.type" :operation="item"></component>-->
      <!--</template>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="fn">取 消</el-button>
        <el-button type="primary" @click="fn">确 定</el-button>
        </span>
    </el-dialog>
  </div>


</template>

<script>
  import em_input from "@/components/em_input/em_input"
  import em_select from "@/components/em_select/em_select"
  export default {
    name: "dome",
    components:{
      em_input,
      em_select
    },
    data() {
      return {
        id:"",
        title: "标题",
        show:false
      }
    },
    props:["data"],
    methods: {
      init() {
        console.log(this.data.data);
        this.id = this.data.id;
        this.title = this.data.title;
        this.show = this.data.show;
      },
      fn() {
        let _this=this;
        this.$store.commit("win/dialog_close", {id: _this.id});
      }
    },
    created(){
      this.init();
    },
    mounted(){

    }
  }
</script>

<style lang="scss" scoped>
  @import "dome";
</style>
