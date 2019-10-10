<template>
  <div class="emPlayer">
    <el-row>
      <el-col :span="48">
        <video-player class="video-player-box"
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="true"
                      customEventName="customstatechangedeventname"

                      @play="onPlayerPlay($event)"
                      @pause="onPlayerPause($event)"
                      @ended="onPlayerEnded($event)"
                      @waiting="onPlayerWaiting($event)"
                      @playing="onPlayerPlaying($event)"
                      @loadeddata="onPlayerLoadeddata($event)"
                      @timeupdate="onPlayerTimeupdate($event)"
                      @canplay="onPlayerCanplay($event)"
                      @canplaythrough="onPlayerCanplaythrough($event)"

                      @statechanged="playerStateChanged($event)"
                      @ready="playerReadied">
        </video-player>
      </el-col>
    </el-row>
  </div>

</template>

<script>

  import {playerOpen, playerClose} from "@/api/player";
  import 'videojs-flash'

  export default {
    name: "em_player",
    data() {
      return {
        id: "",
        // videojs options
        playerOptions: {
          width: "358",
          // height: '360',
          autoplay: true,
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            // mp4
            /*   type: "video/mp4",
               src: "http://localhost:1109/mv1.mp4",*/
            // webm
            type: "rtmp/mp4",
            // src: "rtmp://192.168.20.19:1935/live/36a5109e84de41bda973f2c4c9a19a92"
            src: "rtmp://192.168.20.19:1935/live/36a5109e84de41bda973f2c4c9a19a93"
          }],
          techOrder: ['flash'],
          poster: "http://localhost:1109/img18.png",
        },
        dataId:""
      }
    },
    props: ["data"],
    components: {},
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      init() {
        console.log(this.data);
        this.id = this.data.id;
      },
      fn(data) {
        console.log("win_player");
        console.log(data);
        this.dataId=data.data.id;
        this.playerOptions.sources=[];
        this.playerOptions.sources.push({
          type: "rtmp/mp4",
          src: data.data.transUrl
        });
      },
      closeFn() {
        let _this=this;
        let _url = process.env.BASE_API;
        playerClose(_url, {
          id: _this.dataId
        }).then(res => {
          console.log("win_player:closeFn");
          console.log(res);
        })
      },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        console.log('example player 1 readied', player)
        player.currentTime(10);
        // console.log('example 01: the player is readied', player)
      }
    },
    created() {
      this.init();
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

      // console.log('this is current player instance object', this.player)
      setTimeout(() => {
        console.log('dynamic change options', this.player)
        // change src
        // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
        // change item
        // this.$set(this.playerOptions.sources, 0, {
        //   type: "video/mp4",
        //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
        // })
        // change array
        // this.playerOptions.sources = [{
        //   type: "video/mp4",
        //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
        // }]
        this.player.muted(false)
      }, 1500)
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "emPlayer";
</style>
