<template>
  <div class="em_detail">
    <win :id="win.id" :data="win">
      <el-button @click="hideDetail" icon="el-icon-close"></el-button>
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item class="picture" v-if="imgUrl!==''">
          <el-image
            :src="baseUrl+imgUrl"
          >
          </el-image>
        </el-form-item>
        <el-form-item :label="item.name" v-for="(item,index) in data " :key="index">
          <span>{{item.value}}</span>
        </el-form-item>

      </el-form>
    </win>
  </div>
</template>

<script>
  import Win from "../../../../components/win/win";

  export default {
    components: {Win},
    props: {},
    data() {
      return {
        id: "detail",
        data: [],
        imgUrl: '',
        baseUrl: '',
        win: {
          id: "em_detail",
          title: "",
          top: '',
          left: '',
          show: true,
          resizable: false,
          class: "em_detail_window"
        },
      }
    },

    mounted() {
      this.bus.$on(this.id, res => {
        console.log(res);
        this.data = [];
        if (res.imgUrl) {
          this.imgUrl = res.imgUrl;
          this.baseUrl = res.baseUrl;
        } else {
          this.imgUrl = '';
          this.baseUrl = '';
        }
        res.label.forEach(val => {
          console.log(val);
          for (let i in res.row) {
            if (i === val.prop) {
              this.data.push({name: val.name, value: res.row[i]});
            }

          }
        })
      })
    },
    methods: {
      hideDetail() {
        $(".em_detail").removeClass("addWidth");
      }

    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  };
</script>
<style scoped lang="scss">
  @import "_em_detail";
</style>
