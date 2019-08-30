<template>
  <div class="emDrawer" :drawer="Data=drawerData">
    <el-drawer
      title=""
      :visible.sync="show"
      direction="rtl"
      :modal="modal"
      :append-to-body="body"
      size="20%">
      123456
    </el-drawer>
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'

  export default {
    name: "emDrawer",
    data() {
      return {
        id: "drawer",
        show: false,
        modal: true,
        body: true,
        Data: "",
      }
    },
    props: ["data"],
    watch: {
      Data: function (val) {
        // this[val.fn](val);
      }
    },
    computed: {
      drawerData: function () {
        let _drawerData = this.$store.getters["scene/drawer"];
        return _drawerData;
      }
    },
    components: {},
    methods: {
      init() {

      },
      showFN(_obj) {
        console.log(_obj);
        this.show = true;

        let _content = _obj.content;


        let _roadId = "";
        let _districtId = "";
        let _layerTitle = "";
        if (_obj.type === "road") {
          _roadId = _content.id;
          _layerTitle = _content.roadName;
        } else if (_obj.type === "district") {
          _districtId = _content.id;
          _layerTitle = _content.districtName;
        } else {
          return;
        }


        let _tg = true;
        let tabs = this.$store.getters["scene/layerData"];
        tabs.forEach((tab) => {
          if (tab.name === _obj.type+"Tree_"+_content.id) {
            _tg = false;
          }
        });

        if (_tg) {
          let control_id = this.$store.getters["scene/type"];
          // 场景加数据图层
          this.bus.$emit(control_id, {
            trigger: true,
            fn: "scene_data",
            data_type: "4",
            layer_name: _obj.type+"Tree_"+_content.id,
            layer_title: _layerTitle+"(树)",
            api_name: "marker",
            data_url: "/gardens/tree/queryAllByPage",
            data_maker_iconUrl: "../../static/image/marker_1.png",
            params_pageNum: -1,
            params_roadId: _roadId,
            params_districtId: _districtId,
            maker_titleKey: "treeName",
            clusters_color: "#46ff71"
          });
        }

      },
      fn(_obj) {

      }
    },
    created() {
      this.init();
      vueBus.$on("set_drawer", obj => {
        this[obj.fn](obj);
      });
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    },
    updated() {

    },
    beforeDestroy() {
      vueBus.$off("set_drawer");
      this.bus.$off(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "emDrawer";
</style>
