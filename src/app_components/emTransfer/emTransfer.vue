<template>
  <div class="emTransfer">
    12321321321321323
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'

  export default {
    name: "emTransfer",
    data() {
      return {
        id: "",
        set: {}
      }
    },
    props: ["data"],
    computed: {},
    components: {},
    methods: {
      fn(_obj) {

      },
      init() {
        this.id = this.data.system_id;
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
  @import "emTransfer";
</style>
