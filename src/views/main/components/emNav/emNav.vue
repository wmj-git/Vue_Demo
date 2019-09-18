<template>
  <div class="em-nav">
    <win :id="id" :data="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo em-nav-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <template v-for="item in navItem">
          <el-menu-item :index="item.system_id" class="">{{item.title}}</el-menu-item>
        </template>
      </el-menu>
    </win>
  </div>
</template>

<script>
  import win from "@/app_components/win/win";
  import {findByThisUser} from "@/api/resource";  //权限

  export default {
    data() {
      return {
        id: "",
        control_id: "",//数据传输对象
        activeIndex: '',
        nav: {},
        navItem: []
      };
    },
    props: ["data"],
    components: {
      win
    },
    methods: {
      init() {
        this.id=this.data.system_id;
        this.control_id=this.data.control_id;
        this.activeIndex=this.data.activeIndex;
        this.nav = this.data;
        if(this.data.children){
          let _navItem=[];
          this.data.children.forEach(function (_obj) {
            if(_obj.system_type==="navItem"){
              _navItem.push(_obj);
            }
          });
          this.navItem = _navItem;
        }

        console.log("db_data");
        console.log(this.data);
      },
      findByThisUserFn() {//更新权限数据
        findByThisUser().then((response) => {
          this.$store.commit("user/set_permissions", response.data);
        });
      },
      handleSelect(key, keyPath) {
        console.log(this.activeIndex);
        console.log(key);
        let _this = this;
        let _controlId = this.control_id;
        let _title = null;
        let _list = null;
        let _width = null;
        this.navItem.forEach(function (obj) {

          if (obj.system_id === key) {
            _title = obj.title;
            _list = obj.children;
            _width = obj.width;
          }
        });
        let _show = null;
        this.$store.state.user.win.forEach(function (el) {
          if (el.system_id === _controlId) {
            _show = el.show;
          }
        });

        if (_show) {
          this.bus.$emit(_this.control_id, {
            id:"winMenu",
            title: _title,
            list: _list,
            width: _width
          });
        } else {
          this.$store.commit('user/win_open', {
            win_obj: {
              system_id: _controlId
            }
          });
          setTimeout(function () {
            _this.bus.$emit(_this.control_id, {
              id:"winMenu",
              title: _title,
              list: _list,
              width: _width
            });
          }, 200);
        }
      }
    },
    created() {
      this.init();
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }

  };
</script>
<style lang="scss" scoped>
  @import "_nav.scss";
</style>
