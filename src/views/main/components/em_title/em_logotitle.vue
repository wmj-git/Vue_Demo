<template>
  <div class="">
     <win :id="win.id" :data="win">
       <div class="em-home-title" id="title">
         <img src="../../../../assets/image/logo.png" bindload="imageLoad"/>
         <div class="em-title-container">
            <canvas id="canvas" ></canvas>
         </div>
       </div>
     </win>
  </div>

</template>

<script>
    import win from "@/components/win/win"
    import {title} from './em_logo_title'
    export default {
        name: "em_atitle",
        components: {
          win
        },
        mounted(){
          title();
        },
      data(){
           return{
             win: {
               id: "em_title",
               title: "",
               top: 0,
               left: 4,
               width:"365px",
               show: true,
               resizable:false,
               class:"em-title-window"
             },
           }
      },
      methods:{
        imageLoad: function(e) {
          var $width=e.detail.width,    //获取图片真实宽度
            $height=e.detail.height,
            ratio=$width/$height;    //图片的真实宽高比例
          var viewWidth=718,           //设置图片显示宽度，左右留有16rpx边距
            viewHeight=718/ratio;    //计算的高度值
          var image=this.data.images;
          //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
          image[e.target.dataset.index]={
            width:viewWidth,
            height:viewHeight
          }
          this.setData({
            images:image
          })
        }
       }

    }
</script>

<style scoped lang="scss">
@import "em_logo_title.scss";
</style>
