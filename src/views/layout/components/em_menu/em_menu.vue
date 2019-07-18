<template>
  <div class="em-menu">
    <el-row>
      <el-col :span="48">
        <el-menu :default-active="activeIndex"
                 @select="handleSelect"
                 :collapse="isCollapse">
          <template v-for="item in group">
            <el-menu-item :index="item.id">
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
            if(key===_obj.id){
              _key=_obj.control_id;
            }
        });
        this.$store.commit('win/win_open', {
          win_obj: {
            id: _key
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
        $("#" + this.id).window("setTitle", obj.title);
        $("#" + this.id).window("resize", {
          width: obj.width
        });
        $("#" + this.id).window({
          onBeforeClose:function(){
            var className = document.getElementsByClassName('el-menu-item');
            $(className).removeClass('is-active');
          }
        });
      }.bind(this));
    }
  };
</script>
<style lang="scss" scoped>
  @import "_menu.scss";
</style>




