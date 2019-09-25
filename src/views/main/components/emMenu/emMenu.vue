<template>
  <div class="emMenu">
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
    name: "emMenu",
    data() {
      return {
        id: "",
        group: [],
        activeIndex: '',
        isCollapse: false
      }
    },
    props: ["data"],
    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
        let _control_id = null;
        this.group.forEach(function (_obj) {
          if (key === _obj.system_id) {
            _control_id = _obj.control_id;
          }
        });
        this.$store.commit('user/win_open', {
          win_obj: {
            system_id: _control_id
          }
        });
      }
    },
    created() {

    },
    mounted() {
      this.id = this.data.system_id;

      // 非父子信息通信
      this.bus.$on(this.id, function (obj) {
        console.log("menu");
        console.log(obj);
        this.group = obj.list;
        $("#" + obj.id).window("setTitle", obj.title);
        $("#" + obj.id).window("resize", {
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
  @import "emMenu";
</style>




