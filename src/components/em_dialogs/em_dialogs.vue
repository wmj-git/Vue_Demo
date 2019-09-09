<template>
    <div class="em_dialogs"  v-dialogDrag="true">
      <el-dialog title="设置窗口" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :show-close="true">
        <el-row>
          <el-form>
              <template v-for="(item,index) in this.label" v-if="dialogFormVisible">
                <el-col :span="item.ratio"  v-if="fn==='add'">
                  <el-form-item :label="item.name" :label-width="formLabelWidth" v-show="item.add_show">
                  <component :is="item.type" :operation="item" ref="form_data" :key="index" :readonly="item.add_readonly"  @click.native="refOrder(index)"></component>
                </el-form-item>
                </el-col>
                <el-col :span="item.ratio"  v-if="fn==='modify'">
                  <el-form-item :label="item.name" :label-width="formLabelWidth">
                    <component :is="item.type"   :operation="item" ref="form_data" :key="index" :readonly="item.alter_readonly" @click.native="refOrder(index)"></component>
                  </el-form-item>
                </el-col>
              </template>
              <template v-if="fn==='coutProgram'&&dialogFormVisible===true">
                  <el-col :span="24"   v-for="(item,index) in this.labels" :key="index">

                    <el-form-item  :label="item.name">
                         <em_selectsUrl :operation="item" ref="selectUrl"></em_selectsUrl>
                    </el-form-item>
                  </el-col>
                   <el-col :span="48">
                       <p>
                         {{all.title}}:
                        <span v-for="(item,index) in all.arr" :key="index">{{item.name}}:{{item.value}}</span>
                       </p>
                     <p v-for="item in groups" :key="item.id">
                       {{item.name}}
                       <span v-for="(val,index) in item.arr" :key="index">{{val.name}}:{{val.value}}</span>
                     </p>
                   </el-col>
              </template>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel" class="em-button">取 消</el-button>
          <el-button type="primary" @click="confirm" class="em-button">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import em_input from "@/components/em_input/em_input"
  import em_textarea from "@/components/em_textarea/em_textarea"
  import em_select from "@/components/em_select/em_select"
  import em_selectUrl from "@/components/em_selectUrl/em_selectUrl"
  import em_selectsUrl from "@/components/em_selectsUrl/em_selectsUrl"
  import em_time from "@/components/em_time/em_time"
  import {selectUrl,executeProgram,countProgram} from "@/api/table_operate"
    export default {
        props: {
          label:{
             type:Array
          }
        },
       components:{
         em_input,
         em_select,
         em_selectUrl,
         em_selectsUrl,
         em_textarea,
         em_time
       },
        data(){
           return{
             refIndex:"",    //el-form-item中component的index
             dialogFormVisible:false,
             form: {
             },
             formLabelWidth: '100px',
             alter_obj:"",           //表格单选行穿过来的对象
             count_program:[],       //表格多选行穿过来的数组
             fn:"",
             labels:[{name:"单位:",optionUrl:"/gardens/ent/queryAll"}, {name:"道路:",optionUrl:"/gardens/road/queryAll"}],
             value1: [],
             value2: [],
             ids:[],  //多选行选中对象的id数组,
             all:{title:'',arr:[]},
             groups:[]
           }

        },
      created(){
          this.bus.$off("alter");
          this.bus.$on("alter",res=>{
             this.alter_obj=res;         //将要修改的对象从sole_table传到此组件的alter_obj

          });
          this.bus.$off("count");
          this.bus.$on("count",res=>{
            this.count_program=res;
        });

      },
      methods:{
          showdialog(obj){
            let _this=this;
              this.fn=obj.fn;                  //判断点击的是添加还是修改按钮，复制给fn；
              if(this.fn=="add"){
                this.dialogFormVisible = true;
                setTimeout(() => {
                  if(this.$refs.form_data){
                    this.$refs.form_data.forEach((_obj)=>{
                      console.log(_obj);
                      if(_obj.value){
                        _obj.value="";
                      }
                      if(_obj.input){
                        _obj.input="";
                      }

                    });
                  }

                }, 0);
                this.label.forEach((val)=>{
                  this.form[val.params]=""
                });

              }
              else if(this.fn=="modify"){
                if(this.alter_obj!=""&&this.alter_obj!==null){
                  this.dialogFormVisible = true;
                  this.label.forEach((val)=>{
                    this.form[val.params]=this.alter_obj[val.params];
                    console.log(val);
                  });
                  setTimeout(() => {
                    console.log(this.$refs.form_data);
                    if(this.$refs.form_data){
                      this.$refs.form_data.forEach((_obj)=>{
                        let _value=_this.alter_obj;
                        for(let k in _value){
                          if(_obj.operation.params===k){
                            if(_obj.operation.type==="em_selectUrl"||_obj.operation.type==="em_select"){
                              _obj.value=_value[k];
                            }
                            else if(_obj.operation.type==="em_time"){
                              console.log(_value[k]);
                              _obj.value=new Date(parseInt(_value[k]));
                              console.log( _obj.value)
                            }
                            else if(_obj.operation.type==="em_selectsUrl"){
                              _obj.value=_value[k];
                              _obj.value=eval(_obj.value);
                            }
                            else if(_obj.operation.type==="em_input"||_obj.operation.type==="em_textarea"){
                              _obj.input=_value[k];
                            }
                          }
                        }
                      });
                    }

                  }, 0)
                }
                else{
                  this.$message({
                    showClose: true,
                    message: '请先单击行选择你要修改的数据行',
                    type: 'warning'
                  });
                }

              }
              else {
                this.all={title:'',arr:[]};
                this.groups=[];
                if(this.count_program.length!==0){
                  this.dialogFormVisible = true;
                  this.ids=[];
                  this.count_program.forEach(val=>{
                      this.ids.push(val.id);

                  });


                }

              }

          },
         confirm(){
           if(this.fn==="coutProgram"){
             this.$nextTick(()=>{
               console.log(this.$refs.selectUrl);
               countProgram({ids:this.ids,entIds:this.$refs.selectUrl[0].value,roadIds:this.$refs.selectUrl[1].value}).then(res=>{
                 console.log(res);
                 this.all.title=res.data.all.name;
                 this.all.arr=[];
                 for( var i in res.data.all.info){
                    this.all.arr.push({name:i,value:res.data.all.info[i]});
                 };
                 this.groups=res.data.groups;
                 this.groups.forEach(res=>{
                     console.log(res);
                     res.arr=[];
                   for( var i in res.info){
                     res.arr.push({name:i,value:res.info[i]})

                   }


                 });
                 console.log(this.groups)
               })
             });

           }
           else{
             this.label.forEach((val)=>{
               if (this.$refs.form_data) {
                 this.$refs.form_data.forEach((obj,i)=>{
                   if(obj.operation.params===val.params){
                     if(obj.operation.type==="em_selectUrl"||obj.operation.type==="em_select"){
                       if(obj.value==="是"){
                         obj.value=1
                       }
                       else if(obj.value==="否"){
                         obj.value=0
                       }
                       if(obj.value==="树"){
                         obj.value=0
                       }
                       else if(obj.value==="花卉"){
                         obj.value=1
                       }
                       this.form[val.params]=obj.value;
                     }
                     if(obj.operation.type==="em_time"){
                       this.form[val.params]=obj.value.getTime();
                     }
                     if(obj.operation.type==="em_selectsUrl"){
                       this.form[val.params]=obj.value;
                       this.form[val.params]= "["+this.form[val.params].toString()+"]";
                     }
                     if(obj.operation.type==="em_input"||obj.operation.type==="em_textarea"){

                       if(val.params==="fireAlarmId"){
                         this.form[val.params]=parseInt(obj.input);
                       }
                       else{
                         this.form[val.params]=obj.input;
                       }
                     }
                   }
                 });

               }



             });

             if(this.fn==="modify"){
               console.log(this.alter_obj.id);
               this.form.id=this.alter_obj.id;
             }
             console.log(this.form);
             this.$emit("eventFromDialog",{form:this.form,fn:this.fn});
           }

         },
         cancel(){
           this.dialogFormVisible =false;
         },
         refOrder(index){
             this.refIndex=index;
             console.log(this.refIndex);
         }

      }
    };
</script>
<style lang="scss" scoped>
@import "em_dialogs";
</style>
