<template>
  <div class="emForm">
    <el-container>
      <el-main>
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
      </el-main>
      <el-footer>
        <el-button type="primary" class="em-btn-special" @click="submitForm(id)">提交</el-button>
        <el-button type="primary" class="em-btn-special" @click="resetForm(id)">重置</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {db_form_items} from "./data/db"
  import {addResource, delResource, updateResource} from "@/api/resource"

  export default {
    data() {
      return {
        id: "ruleForm",
        ruleForm: {},
        rules: {},
        form_items: JSON.parse(JSON.stringify(db_form_items))
      };
    },
    props: {
      props_data: Object
    },
    methods: {
      init() {
        console.log(this.props_data);
        this.defaultFn(this.props_data);
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
      this.rulesFn(this.form_items);
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  }
</script>
<style lang="scss" scoped>
  @import "emForm";
</style>
