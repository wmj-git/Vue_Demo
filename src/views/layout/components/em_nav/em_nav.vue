<template>
  <div class="em_nav">     <!--一级菜单-->
    <win :id="win.id" :data="win">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo em-nav-menu "
        mode="horizontal"
        @select="handleSelect"
      >
        <template v-for="item in buttonGroup">
          <el-menu-item :index="item.id" class="">{{item.title}}</el-menu-item>
        </template>
      </el-menu>
    </win>
  </div>
</template>

<script>
  import {findByThisUser} from "@/api/resource";  //权限
  // import Tools from "@/utils/Tools"
  import {db_buttonGroup} from "./data/db";
  import win from "@/components/win/win";


  export default {
    data() {
      return {
        id: "nav",
        win: {
          id: "nav_win",
          title: "",
          top: "",
          left: "",
          show: true,
          resizable: false,
          class: "em-nav-window"
        },
        buttonGroup: JSON.parse(JSON.stringify(db_buttonGroup)),
        control_id: "menu",
        activeIndex: ''
      };
    },
    components: {
      win
    },
    methods: {
      init() {

      },
      findByThisUserFn() {//更新权限数据
        findByThisUser().then((response) => {
          this.$store.commit("user/set_permissions", response.data);
        });
      },
      handleSelect(key, keyPath) {
        console.log(key);
        console.log(this);
        let _this = this;
        let _controlId = this.control_id;
        let _title = null;
        let _list = null;
        let _width = null;

        for(let i=0;i<this.buttonGroup.length;i++){
          if (this.buttonGroup[i].id === key) {
            _title = this.buttonGroup[i].title;
            _list = this.buttonGroup[i].list;
            _width = this.buttonGroup[i].width;
          }
        }
        let _show = null;
        let _win=this.$store.state.win.win;
        for(let i=0;i<_win.length;i++){
          if (_win[i].id === _controlId) {
            _show = _win[i].show;
          }
        }


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
        console.log(_show);
      }
    },
    created() {
      this.init();
      this.bus.$on(this.id,  function (obj)  {
        this[obj.fn](obj);
      }.bind(this));
      console.log(JSON.parse(JSON.stringify(db_buttonGroup)))
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }

  };
</script>
<style lang="scss" scoped>
  @import "_nav.scss";
</style>
