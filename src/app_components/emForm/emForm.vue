<template>
  <div class="emForm">
    <el-card class="box-card">
      <el-form label-position="left" :model="ruleForm" status-icon :rules="rules" :ref="id" label-width="100px">
        <template v-for="item in form_items">
          <el-col :span="24" v-if="item.inputType=='text'">
            <el-form-item :label="item.label" :prop="item.valueKey">
              <el-input :disabled="item.disabled" :ref="item.id" v-model="ruleForm[item.valueKey]"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-else-if="item.inputType=='select'">
            <el-form-item :label="item.label" :prop="item.valueKey">
              <el-select :disabled="item.disabled" :ref="item.id" v-model="ruleForm[item.valueKey]">
                <template v-for="option in item.options">
                  <el-option :label="option.label" :value="option.value"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
      </el-form>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: "emForm",
    data() {
      return {
        id: "",
        ruleForm: {},//表单组值对象
        rules: {},//验证数据
        formItems:[]//表单组数据
      };
    },
    props: ["data"],
    components: {

    },
    methods: {
      init() {
        let _formItems=this.data;
        this.formItems=JSON.parse(JSON.stringify(_formItems));
      },
      fn(_fn, _obj) {
        this[_fn](_obj);
      },
      defaultFn(_obj) {
        console.log(_obj);
        let _form_data = [];

        for (let k in _obj) {
          let _item = {
            id: "",
            inputType: "text",
            label: '',
            valueKey: "",
            value: "",
            Validate: [],
            options_url:"",
            options:[],
          };

          _item.id = "form_" + k;
          _item.valueKey = k;

          _item.label = _obj[k].label;
          _item.inputType = _obj[k].type;
          _item.Validate = _obj[k].Validate;
          _item.options_url = _obj[k].options_url;
          _item.options = _obj[k].options;

          _form_data.push(_item);

        }

        this.rulesFn(JSON.parse(JSON.stringify(_form_data)));
      },
      setForm(_obj) {
        for (let _key in _obj) {
          this.ruleForm[_key] = _obj[_key];
        }
      },
      getForm() {
        return this.ruleForm;
      },
      rulesFn(form_items) {
        let _ruleForm = {};
        let _rules = {};
        this.form_items = JSON.parse(JSON.stringify(form_items));
        this.form_items.forEach(function (_obj) {
          _ruleForm[_obj.valueKey] = _obj.value;
          _rules[_obj.valueKey] = _obj.Validate;
        });
        this.ruleForm = _ruleForm;
        this.rules = _rules;
        console.log(form_items);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');

            updateResource(this.ruleForm).then((response) => {
              console.log(response);
              this.$message(response.message);
              this.bus.$emit("nav",{
                fn:"findByThisUserFn"
              });
            });
            console.log(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.init();
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    }
  };
</script>

<style lang="scss" scoped>
  @import "emForm";
</style>
