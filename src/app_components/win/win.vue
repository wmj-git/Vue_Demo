<template>
  <div class="win">
    <div :id="id" @contextmenu.prevent="fn(popoverVal=!popoverVal)">
      <el-popover placement="top" v-model="popoverVal">
        工具
      </el-popover>
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'win',
    data() {
      return {
        class: "",
        popoverVal: false
      }
    },
    props: ["id", "data"],
    methods: {
      init() {
        if ((typeof this.data.class) !== "undefined") {
          this.class = this.data.class;
        }
        let _this = this;
        let _left = "";
        let _leftValue = _this.data.left.split("-");
        if (_leftValue[0] === "L") {
          _left = _leftValue[1];
        } else if (_leftValue[0] === "R") {
          _left = "calc(100% - " + _leftValue[1] + ")";
        } else if (_leftValue[0] === "M") {
          _left = " calc((100% - " + _leftValue[1] + ")/2)";

        }
        $("#" + _this.id).window({
          title: _this.data.title,
          width: _this.data.width ? _this.data.width : "auto",
          height: _this.data.height ? _this.data.height : "auto",
          top: _this.data.top ? _this.data.top : "",
          left: _left,
          cls: _this.class,
          collapsible: true,
          minimizable: false,
          maximizable: _this.data.maximizable,
          closable: true,
          modal: false,
          shadow: false,
          draggable: true,
          resizable: _this.data.resizable,
          onBeforeClose: function () {  //点击窗口关闭按钮的时候触发
            if (this) {
              $(this).window('destroy');
            }
            _this.$store.commit("user/win_close", {
              win_obj: {
                system_id: _this.id
              }
            });
          },
          onResize: function () {            //窗口大小改变时触发

          }
        });
      },
      fn(val) {
        this.popoverVal = val;
      }
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      if ($("#" + this.id)) {
        $("#" + this.id).window('destroy');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "win";

  .body {
    overflow-y: auto;
  }
</style>
