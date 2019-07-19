<template>
  <div class="execute_program">
    <el-form>
      <el-row>
        <el-col :span="24">
          <el-form-item label="单位:">
            <el-select v-model="value1" placeholder="请选择" filterable multiple>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="路段:">
            <el-select v-model="value2" placeholder="请选择" filterable multiple>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="备注:">
          <el-input
            resize="none"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-button class="em-btn--confirm" @click="confirm()">确认</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {selectUrl, executeProgram} from "@/api/table_operate"

  export default {
    props: {},
    data() {
      let options1 = [];
      let options2 = [];
      selectUrl({url: "/gardens/ent/queryAll"}).then(res => {
        res.data.forEach((val) => {
          options1.push({label: val.entName, value: val.id})
        })
      });
      selectUrl({url: "/gardens/road/queryAll"}).then(res => {
        res.data.forEach((val) => {
          options2.push({label: val.roadName, value: val.id})
        })
      });
      return {
        options1: options1,
        options2: options2,
        value1: [],
        value2: [],
        textarea: "",
        plantIds: []
      }
    },
    mounted() {
      this.bus.$off("alter_all");
      this.bus.$on("alter_all", res => {
        this.plantIds.push(res.id);
      })
    },
    methods: {
      cancel() {
        this.$emit("closeCommonDialog")
      },
      confirm() {
        if (this.value1.length !== 0 || this.value2.length !== 0) {
          executeProgram({
            ids: this.plantIds,
            entIds: this.value1,
            roadIds: this.value2,
            remark: this.textarea
          }).then(res => {
            if (res.statusCode === 200) {
              this.$emit("closeCommonDialog")
            }
          })
        }


      }

    }

  };
</script>
<style lang="scss" scoped>
  @import "execute_program";
</style>
