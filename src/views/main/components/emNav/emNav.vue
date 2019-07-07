<template>
  <div class="em-nav">
    <win :id="win.id" :data="win">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo em-nav-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <template v-for="item in navItem">
          <el-menu-item :index="item.id" class="">{{item.title}}</el-menu-item>
        </template>
      </el-menu>
    </win>
  </div>
</template>

<script>

  import {db_buttonGroup, system_type, db_data} from "./data/db";
  import win from "@/components/win/win";
  import {findByThisUser} from "@/api/resource";  //权限

  export default {
    data() {
      return {
        id: "nav",
        win: {
          id: "nav_win",
          title: "",
          top: "84%",
          left: "",
          show: true,
          resizable: false,
          class: "em-nav-window"
        },
        buttonGroup: JSON.parse(JSON.stringify(db_buttonGroup)),
        control_id: "menu",
        activeIndex: '',
        nav: {},
        navItem: []
      };
    },
    components: {
      win
    },
    methods: {
      init() {
        console.log("db_data");
        console.log(db_data);
      },
      findByThisUserFn() {//更新权限数据
        findByThisUser().then((response) => {
          this.$store.commit("user/set_permissions", response.data);
        });
      },
      handleSelect(key, keyPath) {
        console.log(key);
        let _this = this;
        // console.log(keyPath);
        let _controlId = this.control_id;
        let _title = null;
        let _list = null;
        let _width = null;
        this.buttonGroup.forEach(function (obj) {

          if (obj.id === key) {
            _title = obj.title;
            _list = obj.children;
            _width = obj.width;
          }
        });
        let _show = null;
        this.$store.state.win.win.forEach(function (el) {
          if (el.id === _controlId) {
            _show = el.show;
          }
        });

        if (_show) {
          this.bus.$emit(this.control_id, {
            title: _title,
            list: _list,
            width: _width
          });
        } else {
          this.$store.commit('win/win_open', {
            win_obj: {
              id: _controlId
            }
          });
          setTimeout(function () {
            _this.bus.$emit(_this.control_id, {
              title: _title,
              list: _list,
              width: _width
            });
          }, 200);

        }
        // console.log(_show);
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
  @import "_nav.scss";
</style>
