<template>
  <div class="em_dialogs">
    <el-dialog title="设置窗口" :visible.sync="dialogFormVisible">
      <el-row>
        <el-form :model="form">
          <template v-for="item in this.label">
            <el-col :span="24">
              <el-form-item :label="item.name" :label-width="formLabelWidth">
                <component :is="item.type" :operation="item" ref="form_data"></component>
              </el-form-item>
            </el-col>
          </template>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" class="em-btn_shadow">取 消</el-button>
        <el-button type="primary" @click="confirm" class="em-btn_shadow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import em_input from "@/components/em_input/em_input"
  import em_select from "@/components/em_select/em_select"
  import em_selectUrl from "@/components/em_selectUrl/em_selectUrl"
  export default {
    props: {
      label:{
        type:Array
      }
    },
    components:{
      em_input,
      em_select,
      em_selectUrl
    },
    data(){
      return{
        dialogFormVisible:false,
        form: {
        },
        formLabelWidth: '80px',
        alter_obj:{}
      }

    },
    created(){
      this.bus.$on("alter",res=>{
        this.alter_obj=res;         //将要修改的对象从sole_table传到此组件的alter_obj
      })
    },
    methods:{
      showdialog(){
        console.log(this.alter_obj);
        this.dialogFormVisible = true;
        this.label.forEach((val)=>{
          this.form[val.params]=""
          //  if(this.form[val.params]){
          //
          //  }
        });
        console.log(this.form)
      },
      confirm(){
        this.dialogFormVisible = false;
        this.label.forEach((val,i)=>{
          if(this.$refs.form_data[i].input){
            this.form[val.params]=this.$refs.form_data[i].input;
          }
          if(this.$refs.form_data[i].value){
            this.form[val.params]=this.$refs.form_data[i].value
          }
        });
        console.log(this.form);
        this.$emit("eventFromDialog",this.form);
      },
      cancel(){
        this.dialogFormVisible =false;
      }

    }
  };
</script>
<style lang="scss" scoped>

</style>
