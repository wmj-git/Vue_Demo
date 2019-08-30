<template>
  <div class="em-menu">    <!--二级菜单-->
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
        console.log(keyPath);
        let _this = this;
        let _key = null;
        let _obj = null;

        this.group.forEach(function (obj) {
          if (key === obj.id) {
            _key = obj.control_id;
            _obj = obj;
          }
        });

        if (!_obj) {
          return
        }

        let _tg = true;
        if (_obj.control_type === "scene") {//场景交互
          let tabs = this.$store.getters["scene/layerData"];
          tabs.forEach((tab) => {
            if (tab.name === _obj.layer_name) {
              _tg = false;
            }
          });

          if (_tg) {
            _obj.control_id = _this.$store.getters["scene/type"];
            _this.bus.$emit(_obj.control_id, _obj);
          }

        } else if (_obj.control_type === "none") {//本组件交互
          this[_obj.fn](_obj);
        } else {
          this.$store.commit('win/win_open', {
            win_obj: {
              id: _key
            }
          });
        }

      }
    },
    mounted() {

      // 非父子信息通信
      this.bus.$on(this.id, function (obj) {
        // console.log(obj);
        this.group = obj.list;
        // console.log(this.group);
        $("#" + this.id).window("setTitle", obj.title);
        $("#" + this.id).window("resize", {
          width: obj.width
        });
      }.bind(this));
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  };
</script>
<style lang="scss" scoped>
  @import "_menu.scss";
</style>




