<template>
    <div class="em_detailDrawer">
      <el-drawer
        title=""
        :visible.sync="show"
        direction="rtl"
        :modal="modal"
        :append-to-body="body"
        size="20%">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item class="picture" v-if="imgUrl!==''">
            <el-image
              :src="baseUrl+imgUrl"
            >
            </el-image>
          </el-form-item>
          <el-form-item :label="item.name" v-for="(item,index) in digital " :key="index">
            <span>{{item.value}}</span>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
</template>

<script>
    export default {
        props: {
        },
      data(){
          return {
            show: false,
            modal: true,
            body: true,
            digital: [],
            imgUrl: '',
            baseUrl: '',
          }
      },
      mounted(){
        this.bus.$on("detail", res => {
          this.showFN();
          console.log(res);
          this.digital = [];
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
                this.digital.push({name: val.name, value: res.row[i]});
              }
            }
          })
        })
      },
      beforeDestroy(){
        this.bus.$off()
      },
      methods:{
        showFN() {
          this.show = true;
        },
      }
    };
</script>
<style lang="scss" scoped>
 @import "em_detailDrawer";
</style>
