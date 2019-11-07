<template>
  <div class="emButtonGroup">
    <div :class="set.class">
        <template v-if="set.groupType==='none'">
          <el-row>
              <el-button v-for="(btn,index) in group"
                         :key="index"
                         :ref="btn.system_id"
                         :size="btn.size"
                         :type="btn.type"
                         :icon="btn.icon"
                         :disabled="btn.disabled"
                         :plain="btn.plain ? btn.plain : false "
                         :round="btn.round ? btn.round : false "
                         :circle="btn.circle ? btn.circle : false "
                         :class="btn.class ? btn.class : ''"
                         @click="fn(btn.fn,{'btn':btn,'control_type':btn.control_type})">
                {{btn.title}}
              </el-button>
          </el-row>
        </template>
        <template v-else-if="set.groupType==='group'">
          <el-button-group>
            <el-button v-for="(btn,index) in group"
                       :key="index"
                       :ref="btn.system_id"
                       :size="btn.size"
                       :type="btn.type"
                       :icon="btn.icon"
                       :disabled="btn.disabled"
                       :plain="btn.plain ? btn.plain : false "
                       :round="btn.round ? btn.round : false "
                       :circle="btn.circle ? btn.circle : false "
                       :class="btn.class ? btn.class : ''"
                       @click="fn(btn.fn,{'btn':btn,'control_type':btn.control_type})">
              {{btn.title}}
            </el-button>
          </el-button-group>
        </template>

    </div>
  </div>

</template>

<script>
  import vueBus from '@/utils/vueBus'

  export default {
    name: "emButtonGroup",
    data() {
      return {
        id: "",
        set: {
          groupType: "",
          class: ""
        },
        group: []
      }
    },
    props: ["data"],
    components: {},
    methods: {
      fn(_fn, _obj) {
        let _controlType = _obj.control_type ? _obj.control_type : "";
        switch (_controlType) {
          case "win":
            this.$store.commit('user/win_open', {
              win_obj: {
                system_id: _obj.btn.control_id
              }
            });
            break;
          case "component":
            vueBus.$emit(_obj.btn.control_id, {
              fn:_obj.btn.fn,
              data:_obj.btn
            });
            break;
          default:
            this[_fn](_obj);
        }
      },
      init() {

        this.id = this.data.system_id;
        this.set.groupType = this.data.groupType ? this.data.groupType : "none";
        this.set.class = this.data.class;
        //获取行按钮数据
        if (this.data.children) {
          let _group = [];
          this.data.children.forEach(function (_obj) {
            if (_obj.system_type === "win_component_buttonGroup_item") {
              _group.push(_obj);
            }
          });
          this.group = _group;
        }
      },
      // 路由指向
      routerFn(_obj) {
        this.$router.push(_obj.path);
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
    beforeDestroy() {
      vueBus.$off(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "emButtonGroup";
</style>
