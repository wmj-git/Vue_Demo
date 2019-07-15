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
                <el-button :ref="item.id" :icon="item.icon"  class="em-nav-item-text" @click="fn(item,key)"></el-button>
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
          left:"calc(100% - 450px)",
          right:20,
          show: true,
          width: 450,
          resizable: false,
          class: "em-tool-window"
        },
        input: '',
        tool: [
          {id:"tool_flyToScene",value: "场景", icon: "el-icon-scene",control_id:"scene",fn:"toScene",trigger:"none"},
          {id:"tool_transparent",value: "透明", icon: "el-icon-transparent",control_id:"em_slider",fn:"showFn",trigger:true},
          {id:"tool_coordinates",value: "坐标", icon: "el-icon-coordinates",control_id:"scene",fn:"xyz",trigger:true},
          {id:"tool_data",value: "数据", icon: "el-icon-data",control_id:"scene",fn:"scene_data",trigger:true},
          {id:"tool_distance",value: "距离", icon: "el-icon-distance",control_id:"scene",fn:"measure_drawLine",trigger:"none"},
          {id:"tool_area",value: "面积", icon: "el-icon-area",control_id:"scene",fn:"measure_drawPloy",trigger:"none"},
          {id:"tool_hightly",value: "高度", icon: "el-icon-highly",control_id:"scene",fn:"",trigger:"none"},
          {id:"tool_label",value: "清除", icon: "el-icon-remove2",control_id:"scene",fn:"measure_clear",trigger:"none"}
        ]
      }
    },
    created() {
    },
    mounted(){
      var subnav = document.getElementById('subnav'),
        aLi = document.querySelectorAll('#subnav li'),
        w = parseFloat(subnav.offsetWidth / aLi.length);//通过ul的宽度除以li的个数来计算每个li的宽度
      console.log("个数："+aLi.length);
      for(var i=0;i<aLi.length;i++){
        aLi[i].style.width = w + 'px';
      }
    },
    methods: {
      fn(item,key) {
        console.log(item);
        console.log(key);
        this.bus.$emit(item.control_id,item);
        if(item.trigger!=="none"){
          let _item=this.tool[key];
          this.tool[key].trigger=!(_item.trigger);
          console.log(this.tool[key].trigger);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "em_tools";
</style>

