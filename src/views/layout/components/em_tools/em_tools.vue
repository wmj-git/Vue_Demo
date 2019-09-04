<template>
  <div class="em_tool">
    <win :id="win.id" :data="win">
      <div class="em-nav">
        <input type="checkbox" class="em-nav-cb" id="menu-cb">
        <div class="em-nav-content">
          <ul class="em-nav-items" id="subnav">
            <li v-for="(item,key) in tool" class="em-nav-item">
              <!-- <span class="nav__item-text" prefix-icon="el-icon-users">{{item}}</span>-->
              <el-tooltip class="item" placement="top-start">
                <div slot="content">{{item.value}}</div>
                <el-button :ref="item.id" :icon="item.icon" class="em-nav-item-text"
                           @click="fn(item,key)"></el-button>
              </el-tooltip>
            </li>
          </ul>
        </div>
        <label class="em-nav-btn" for="menu-cb"></label>
      </div>
    </win>
  </div>
</template>

<script>

  import win from "@/components/win/win"

  export default {
    name: "em_bottom",
    components: {
      win
    },
    data() {
      return {
        win: {
          id: "em_tool",
          title: "",
          top: "",
          left: "",
          show: true,
          width: 450,
          height:"88px",
          resizable: false,
          class: "em-tool-window"
        },
        input: ''
      }
    },
    computed: {
      tool: function () {
        return this.$store.getters["scene/toolbar"];
      }
    },
    methods: {
      fn(item, key) {
        console.log(item);
        console.log(key);

        switch (item.control_type) {
          case "tool":
            this[item.fn](item);
            break;
          case "emit":
            this.bus.$emit(item.control_id, item);
            if (item.trigger !== "none") {
              let _item = this.tool[key];
              this.tool[key].trigger = !(_item.trigger);
            }
            break;
          case "scene":
            if (!(item.control_id)) {
              item.control_id = this.$store.getters["scene/type"];//获取地图对象
            }
            this.bus.$emit(item.control_id, item);
            if (item.trigger !== "none") {
              let _item = this.tool[key];
              this.tool[key].trigger = !(_item.trigger);
              // console.log(this.tool[key].trigger);
            }
            break;
        }
      },
      handleData(_obj) {
        let _show = _obj.trigger;
        let _controlId = _obj.control_id;
        if (_show) {
          this.$store.commit('win/win_open', {
            win_obj: {
              id: _controlId
            }
          });
        } else {
          this.$store.commit('win/win_close', {
            win_id: _controlId
          });
        }
      }

    },
    updated() {
      var subnav = document.getElementById('subnav'),
        aLi = document.querySelectorAll('#subnav li'),
        w = parseFloat(subnav.offsetWidth / aLi.length);//通过ul的宽度除以li的个数来计算每个li的宽度
      console.log("个数：" + aLi.length);
      for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.width = w + 'px';
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "em_tools";
</style>

