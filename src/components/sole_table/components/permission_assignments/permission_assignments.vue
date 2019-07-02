<template>
    <div class="permission_assignments">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </div>
</template>

<script>
    import {findByThisUser} from "@/api/resource"
    export default {
        props: {
        },
        data() {
          const generateData=_=>{
            // const data=[];
            // findByThisUser().then(res=>{
            //    console.log(res)
            // })
          };
          return {
            data: [{
              id: 1,
              label: '一级 1',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }, {
              id: 2,
              label: '一级 2',
              children: [{
                id: 5,
                label: '二级 2-1'
              }, {
                id: 6,
                label: '二级 2-2'
              }]
            }, {
              id: 3,
              label: '一级 3',
              children: [{
                id: 7,
                label: '二级 3-1'
              }, {
                id: 8,
                label: '二级 3-2'
              }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            }
          };
        },
        beforeCreate(){
          findByThisUser().then(res=>{
            console.log(res);
          })
        },
        methods:{
          recieveRoles(userId){
            this.userId=userId;
          },
        }
    };
</script>
<style lang="scss" scoped>
  @import "permission_assignments";
</style>
