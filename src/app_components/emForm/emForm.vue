<template>
  <div class="emForm">
    <el-card class="box-card">
      <el-form label-position="left" :model="ruleForm" status-icon :rules="rules" :ref="id"
               :label-width="formSet.labelWidth" :class="formSet.class">
        <template v-for="item in formItems">
          <el-col :span="item.winSpan" v-if="item.inputType=='text'">
            <el-form-item :label="item.label" :prop="item.valueKey">
              <el-input :disabled="item.disabled" :ref="item.system_id" v-model="ruleForm[item.valueKey]"
                        :placeholder="item.placeholder ? item.placeholder : '请输入'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="item.winSpan" v-else-if="item.inputType=='select'">
            <el-form-item :label="item.label" :prop="item.valueKey">
              <el-select :disabled="item.disabled" :ref="item.system_id" v-model="ruleForm[item.valueKey]"
                         :placeholder="item.placeholder ? item.placeholder : '请选择'">
                <template v-for="option in item.options.data">
                  <el-option :label="option.label" :value="option.value"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="item.winSpan" v-else-if="item.inputType=='button'">
            <el-form-item>
              <el-button :type="item.type ? item.type : 'primary'" :icon="item.icon" :ref="item.system_id"
                         :class="item.class ? item.class : 'em-btn-special'"
                         @click="fn(item.fn,item)">
                {{item.title}}
              </el-button>
            </el-form-item>
          </el-col>
        </template>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'

  export default {
    name: "emForm",
    data() {
      return {
        id: "",
        formSet: {//表单设置
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
        this.formSet.labelWidth = this.data.labelWidth;
        this.formSet.class = this.data.class;
        //获取行表单组数据
        if (this.data.children) {
          let _formItems = JSON.parse(JSON.stringify(this.data.children));
          this.defaultFn(_formItems);
        }
      },
      fn(_fn, _obj) {//初始化匹配功能
        let _controlType = _obj.control_type ? _obj.control_type : "";
        let _ruleForm = this.ruleForm;
        switch (_controlType) {
          case "table":
            vueBus.$emit(_obj.control_id, {
              "fn": _fn,
              "obj": _obj,
              "ruleForm": _ruleForm
            });
            break;
          case "dialog":

            break;
          default://调用组件本身方法
            this[_fn](_obj);
        }
      },
      defaultFn(_obj) {
        console.log(_obj);
        //表单组数据
        let _form_data = [];
        let _rule_data = [];
        _obj.forEach(function (_item) {

          
          switch (_item.system_type) {
            case "win_component_formItem":
            case "system_layout_dialog_formItem":
              _item.label = _item.title;
              _form_data.push(_item);
              _rule_data.push(_item);
              break;
            case "win_component_formButton":
            case "system_layout_dialog_formButton":
              _item.label = _item.title;
              _form_data.push(_item);
              break;
          }

        });
        this.formItems = _form_data;
        this.rulesFn(_rule_data);
      },
      rulesFn(form_items) {//
        let _ruleForm = {};
        let _rules = {};
        this.form_items = JSON.parse(JSON.stringify(form_items));
        this.form_items.forEach(function (_obj) {
          _ruleForm[_obj.valueKey] = _obj.defaultValue;
          _rules[_obj.valueKey] = _obj.Validate.data;
        });
        this.ruleForm = _ruleForm;
        this.rules = _rules;
        console.log(form_items);
      },
      setForm(_obj) {
        for (let _key in _obj) {
          this.ruleForm[_key] = _obj[_key];
        }
      },
      getForm() {
        console.log(this.ruleForm);
        return this.ruleForm;
      },
      submitForm(formName) {//提交表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            console.log(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {//重置
        // this.$refs[formName].resetFields();
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
