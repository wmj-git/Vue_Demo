<template>
  <div class="emForm">
    <el-card class="box-card">
      <el-form :label-position="formSet.labelPosition" :model="ruleForm" status-icon :rules="rules" :ref="id"
               :label-width="formSet.labelWidth" :class="formSet.class">
        <template v-for="item in formItems">
          <el-col :span="item.winSpan" :offset="item.winOffset" v-if="item.inputType=='text'">
            <el-form-item :label="item.label" :prop="item.valueKey">
              <el-input :disabled="item.disabled" :ref="item.system_id" v-model="ruleForm[item.valueKey]"
                        :placeholder="item.placeholder ? item.placeholder : '请输入'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="item.winSpan" :offset="item.winOffset" v-else-if="item.inputType=='compositeText'">
            <el-form-item :label="item.label" :prop="item.valueKey">
              <el-select :disabled="item.disabled" :ref="item.system_id" v-model="ruleForm[item.valueKey]"
                         :placeholder="item.placeholder ? item.placeholder : '请选择'">
                <template v-for="option in item.options.data">
                  <el-option :label="option.label" :value="option.value"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="item.winSpan" :offset="item.winOffset" v-else-if="item.inputType=='select'">
            <el-form-item :label="item.label" :prop="item.valueKey">
              <el-select :disabled="item.disabled" :ref="item.system_id" v-model="ruleForm[item.valueKey]"
                         :placeholder="item.placeholder ? item.placeholder : '请选择'">
                <template v-for="option in item.options.data">
                  <el-option :label="option.label" :value="option.value"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="item.winSpan" :offset="item.winOffset" v-else-if="item.inputType=='button'">
            <el-button :type="item.type ? item.type : 'primary'" :icon="item.icon" :ref="item.system_id"
                       :class="item.class ? item.class : 'em-form-button'"
                       @click="fn(item.fn,item)">
              {{item.title}}
            </el-button>
          </el-col>
        </template>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'
  import {StringChangeObj} from '@/utils/tools'
  import {submit} from '@/app_api/form'


  export default {
    name: "emForm",
    data() {
      return {
        id: "",
        formSet: {//表单设置
          labelPosition: "",
          labelWidth: "",
          class: ""
        },
        ruleForm: {},//表单组值对象
        rules: {},//验证数据
        formItems: []//表单组数据
      };
    },
    props: ["data"],
    components: {},
    methods: {
      init() {
        this.id = this.data.system_id;
        this.formSet.labelPosition = this.data.labelPosition ? this.data.labelPosition : "left";
        this.formSet.labelWidth = this.data.labelWidth ? this.data.labelWidth : "";
        this.formSet.class = this.data.class;
        //获取行表单组数据
        if (this.data.children) {
          let _formItems = JSON.parse(JSON.stringify(this.data.children));
          this.defaultFn(_formItems);
        }
      },
      fn(_fn, _obj) {//初始化匹配功能
        let _this = this;
        let _controlType = _obj.control_type ? _obj.control_type : "";
        let _ruleForm = this.ruleForm;

        switch (_controlType) {
          case "table":
            this.$refs[this.id].validate((valid) => {
              if (valid) {
                vueBus.$emit(_obj.control_id, {
                  "fn": _fn,
                  "obj": _obj,
                  "ruleForm": _ruleForm
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
            break;
          case "dialog":
            vueBus.$emit(_obj.control_id, {
              "fn": _fn,
              "obj": _obj,
              "ruleForm": _ruleForm
            });
            break;
          case "formUI":
            let _val=JSON.parse(JSON.stringify(_ruleForm));
            for (let _k in _val){
              if(_k==="Validate" || _k==="options"){
                _val[_k]=JSON.parse(_val[_k]);
              }
            }
            vueBus.$emit(_obj.control_id, {
              "fn": _fn,
              "data": {
                [_obj.formUI_key]: JSON.stringify(_val)
              }
            });
            break;
          default://调用组件本身方法
            _this[_fn](_obj);
        }
      },
      defaultFn(_obj) {
        //表单组数据
        let _form_data = [];
        let _rule_data = [];
        _obj.forEach(function (_item) {

          switch (_item.system_type) {
            case "win_component_formItem":
            case "system_layout_dialog_formItem":
            case "system_layout_drawer_formItem":
              _item.label = _item.title;
              _form_data.push(_item);
              _rule_data.push(_item);
              break;
            case "win_component_formButton":
            case "system_layout_dialog_formButton":
            case "system_layout_drawer_formButton":
              _item.label = _item.title;
              _form_data.push(_item);
              break;
          }
        });
        this.formItems.splice(0, this.formItems.length);
        this.formItems = this.formItems.concat(_form_data);

        this.rulesFn(_rule_data);
      },
      rulesFn(rule_items) {//
        let _ruleForm = {};
        let _rules = {};
        let _rule_items = JSON.parse(JSON.stringify(rule_items));
        _rule_items.forEach(function (_obj) {
          _ruleForm[_obj.valueKey] = _obj.defaultValue;
          _rules[_obj.valueKey] = _obj.Validate.data;
        });

        this.ruleForm = _ruleForm;
        this.rules = _rules;
      },
      setForm(_obj) {//设置表单值
        console.log('setForm',_obj);
        let _data = _obj.data;
        for (let _key in this.ruleForm) {
          if (_data[_key] || _data[_key] === 0) {
            this.ruleForm[_key] = _data[_key];
          }
        }
      },
      getForm() {
        console.log(this.ruleForm);
        return this.ruleForm;
      },
      submitForm(_data) {//提交表单
        let _this = this
        this.$refs[this.id].validate((valid) => {
          if (valid) {
            submit({
              url: _data.resourceUrl,
              params: _this.ruleForm
            }).then(res => {
              console.log('ok', res);
              if (res.statusCode && res.statusCode === 200) {
                _this.$message({
                  message: "修改成功",
                  type: 'success'
                });

                // 提交后与对象交互
                _this.submitSuccessFn(_data, res)
              } else {
                _this.$message.error('修改失败');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitSuccessFn(_data, _res) {
        let _this = this
        switch (_data.fn_type) {
          case "tree": // 提交成功后与tree交互
            vueBus.$emit(_data.tree_id, {
              fn: _data.tree_fn,
              form: this.ruleForm,
              data: _res
            });
            break;
          case "permissionsTree": // 提交成功权限tree交互
            this.$store.dispatch("user/systemPermissions", {}).then(() => {
              vueBus.$emit(_data.tree_id, {
                fn: _data.tree_fn,
                form: _this.ruleForm,
                data: _res
              });
            });
            break;
        }
      },
      resetForm() {//重置
        this.$refs[this.id].resetFields();
      },
      //控制抽屉框
      addDrawer(_obj) {
        let _data = _obj;
        let _ruleForm = this.ruleForm;
        switch (_data.fn_type) {
          case "editUI":
            let _children = [];
            const _val = new StringChangeObj(_ruleForm[_data.drawer_key]);
            let _Val = _val.getData();
            let _form = {
              "system_id": this.id + "_drawer_emForm",
              "system_type": "win_component_form",
              "title": "",
              "winSpan": 48,
              "component": "emForm",
              "labelWidth": "48px",
              "class": "form-table",
              "control_type": "",
              "control_id": "",
              "fn": "",
              "fn_type": "",
              "children": []
            };
            let _btn = [{
              "system_id": this.id + "_drawer_emForm_button1",
              "system_type": "win_component_formButton",
              "title": "重置",
              "winOffset": 24,
              "winSpan": 12,
              "inputType": "button",
              "type": "primary",
              "class": "",
              "icon": "",
              "disabled": false,
              "control_type": "",
              "control_id": "",
              "fn": "resetForm",
              "fn_type": ""
            }, {
              "system_id": this.id + "_drawer_emForm_button2",
              "system_type": "win_component_formButton",
              "title": "更新",
              "winOffset": 0,
              "winSpan": 12,
              "inputType": "button",
              "type": "primary",
              "class": "",
              "icon": "",
              "disabled": false,
              "control_type": "formUI",
              "control_id": this.id,
              "fn": "setForm",
              "fn_type": "",
              "formUI_key": _data.drawer_key
            }];

            for (const _k in _Val) {
              if(_Val[_k].data){
                _Val[_k]=JSON.stringify(_Val[_k])
              }
              if (_Val[_k] === !!_Val[_k]) {// 判断为布尔值
                let _select = {
                  "system_id": this.id + "_" + _k + "_drawer_emForm_select",
                  "system_type": "win_component_formItem",
                  "title": "",
                  "winSpan": 48,
                  "inputType": "select",
                  "label": "",
                  "valueKey": "",
                  "defaultValue": "",
                  "placeholder": "",
                  "disabled": false,
                  "Validate": {
                    "data": [
                      {"required": false, "message": "请输入", "trigger": "change"}
                    ]
                  },
                  "options_url": "none",
                  "options": {
                    "data": [
                      {"label": "true", "value": true},
                      {"label": "false", "value": false}
                    ]
                  },
                  "control_type": "",
                  "control_id": "",
                  "fn": "",
                  "fn_type": ""
                };
                _select.title = _k;
                _select.label = _k;
                _select.valueKey = _k;
                _select.defaultValue = _Val[_k];
                _children.push(_select);
              } else {
                let _text = {
                  "system_id": this.id + "_" + _k + "_drawer_emForm_text",
                  "system_type": "win_component_formItem",
                  "title": "",
                  "winSpan": 48,
                  "inputType": "text",
                  "label": "",
                  "valueKey": "",
                  "defaultValue": "",
                  "placeholder": "",
                  "disabled": false,
                  "Validate": {
                    "data": [
                      {"required": false, "message": "请输字段", "trigger": "change"}
                    ]
                  },
                  "options_url": "none",
                  "options": [],
                  "control_type": "",
                  "control_id": "",
                  "fn": "",
                  "fn_type": ""
                };
                _text.title = _k;
                _text.label = _k;
                _text.valueKey = _k;
                _text.defaultValue = _Val[_k];
                _children.push(_text);
              }
            }
            _form.children = _form.children.concat(_children);
            _form.children = _form.children.concat(_btn);

            vueBus.$emit(_data.drawer_id, {
              "fn": _data.drawer_fn,
              "visible": true,
              "set": {
                "title": _data.drawer_title ? _data.drawer_title : "抽屉框"
              },
              "obj": _data,
              "children": [_form]
            });
            break;
          default:
            vueBus.$emit(_data.drawer_id, {
              "fn": _data.drawer_fn,
              "visible": true,
              "set": {
                "title": _data.drawer_title ? _data.drawer_title : "抽屉框"
              },
              "form": _ruleForm,
              "children": _data.children ? _data.children : ""
            });
        }
      },
      // 响应函数
      callBack(_obj) {

      }
    },
    created() {
      this.init();
      vueBus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    },
    beforeDestroy() {
      vueBus.$off(this.id);
      this.bus.$off(this.id);
    }
  };
</script>

<style lang="scss" scoped>
  @import "emForm";
</style>
