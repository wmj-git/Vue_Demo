<template>
  <div class="emDrawer" :drawer="Data=drawerData">
    <el-drawer
      title=""
      :visible.sync="show"
      direction="rtl"
      :modal="modal"
      :append-to-body="body"
      size="20%">

      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item :label="item.label" v-for="(item,index) in showData " :key="index">
          <span>{{item.value}}</span>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'
  import {showFn} from './data/db'

  export default {
    name: "emDrawer",
    data() {
      return {
        id: "drawer",
        show: false,
        modal: true,
        body: true,
        showData: [
          {
            label: "字段1",
            value: "123",
            valueKey: "",
            type: "info"
          },
          {
            label: "字段2",
            value: "123",
            valueKey: "",
            type: "info"
          },
          {
            label: "字段3",
            value: "123",
            valueKey: "",
            type: "info"
          }
        ],
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
        this.contentFn(_obj);//显示属性

        //
        let _roadId = "";
        let _districtId = "";
        let _layerTitle = "";
        if (_obj.type === "roadAddress" || _obj.type === "protectCompany") {
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
          if (tab.name === "TreeDistribution_" + _obj.type + _content.id) {
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
            layer_name: "TreeDistribution_" + _obj.type + _content.id,
            layer_title: _layerTitle + "(树)",
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
      contentFn(_obj) {
        console.log(_obj);
        this.showData = showFn(_obj);
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
