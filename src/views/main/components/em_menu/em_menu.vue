<template>
  <div class="em-menu">
    <el-row>
      <el-col :span="48">
        <el-menu :default-active="activeIndex"
                 @select="handleSelect"
                 :collapse="isCollapse">
          <template v-for="item in group">
            <el-menu-item :index="item.system_id">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "em_menu",
    data() {
      return {
        id: "menu",
        group: [],
        activeIndex: '',
        isCollapse: false
      }
    },
    props: ["data"],
    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
        let _key = null;
        this.group.forEach(function (_obj) {
<<<<<<< HEAD
            if(key===_obj.id){
=======
            if(key===_obj.system_id){
>>>>>>> 6f2e57197f53efb31f52954bd0a3c1ff872f8cd9
              _key=_obj.control_id;
            }
        });
        this.$store.commit('win/win_open', {
          win_obj: {
<<<<<<< HEAD
            id: _key
=======
            system_id: _key
>>>>>>> 6f2e57197f53efb31f52954bd0a3c1ff872f8cd9
          }
        });
      }
    },
    created() {

    },
    mounted() {
      // 非父子信息通信
      this.bus.$on(this.id, function (obj) {
        console.log(obj);
        this.group = obj.list;
<<<<<<< HEAD
        $("#" + this.id).window("setTitle", obj.title);
        $("#" + this.id).window("resize", {
=======
        $("#" + obj.id).window("setTitle", obj.title);
        $("#" + obj.id).window("resize", {
>>>>>>> 6f2e57197f53efb31f52954bd0a3c1ff872f8cd9
          width: obj.width
        });

      }.bind(this));
    }
  };
</script>
<style lang="scss" scoped>
  @import "_menu.scss";
</style>




