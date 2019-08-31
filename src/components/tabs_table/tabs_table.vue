<template>
    <div class="tabs_table">
      <el-tabs :tab-position="tabPosition">

        <el-tab-pane :label="data['echart_table'].title">
          <echart_table :data="data['echart_table']"></echart_table>
        </el-tab-pane>
        <el-tab-pane :label="data['sole_table'].title">
          <sole_table :data="data['sole_table']"></sole_table>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import sole_table from "@/components/sole_table/sole_table"
  import echart_table from "@/components/echart_table/echart_table"
  export default {
    components:{
      sole_table,
      echart_table
    },
    props: ["data"],
    data() {
      return {
        tabPosition: 'left'
      };
    },
    created(){
       console.log(this.data["echart_table"]);
    }


  };
</script>
<style lang="scss" scoped>
  @import "_tabs_table";
</style>
