<template>
  <div class="emDrawer">
    <el-drawer
      :title="set.title"
      :visible.sync="set.visible"
      direction="rtl"
      :modal="set.modal"
      :append-to-body="set.appendToBody"
      :show-close="false"
      :destroy-on-close="true"
      :before-close="handleClose"
      :size="set.size">
      <el-row :gutter="2" v-if="children">
        <template v-for="component in children">
          <el-col :span="component.winSpan" :offset="component.winOffset">
            <component :is="component.component" :data="component"></component>
          </el-col>
        </template>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'
  import emForm from "@/app_components/emForm/emForm";
  import emButtonGroup from "@/app_components/emButtonGroup/emButtonGroup";

  export default {
    name: "emDrawer",
    data() {
      return {
        id: "",
        set: {
          title: "",
          visible: false,
          modal: false,
          appendToBody: true,
          size: "20%"
        },
        children: []
      }
    },
    props: ["data"],
    computed: {},
    components: {
      emForm,
      emButtonGroup
    },
    methods: {
      fn(_obj) {

      },
      init() {
        this.id = this.data.system_id;
        this.set.title = this.data.title ? this.data.title : "";
        this.set.visible = this.data.visible ? this.data.visible : false;
        this.set.modal = this.data.modal ? this.data.modal : true;
        this.set.appendToBody = this.data.appendToBody ? this.data.appendToBody : true;
        this.set.size = this.data.size ? this.data.size : "20%";
        if (this.data.children) {
          this.children = this.children.concat(this.data.children);
        }
      },
      clear() {
        this.children.splice(0, this.children.length);
      },
      visibleFn(_val) {
        this.set.visible = _val.visible;
        this.set.title = _val.set.title;
        if (_val.children) {
          this.children = this.children.concat(_val.children);
        }
      },
      closeFn(_val) {
        console.log(_val);
        this.set.visible = false;
      },
      contentFn(_val) {
        console.log(_val);
      },
      handleClose(done) {
        this.clear();
        done();
      }
    },
    created() {
      this.init();
      vueBus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    },
    updated() {

    },
    beforeDestroy() {
      vueBus.$off(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "emDrawer";
</style>
