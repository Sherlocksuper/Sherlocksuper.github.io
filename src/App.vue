<script setup>
import foot_tools from "@/components/components-foot/foot_tools.vue";
</script>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    test() {
      window.scrollTo(0, 0);
    }
  },
};

</script>
<template style="overflow-x: hidden">
  <div class="my_app">
    <router-view></router-view>
  </div>
  <foot_tools class="foot_tools"></foot_tools>
</template>
<style scoped>
.my_app {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

router-view {
  z-index: 0;
}

.foot_tools {
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 50px;
  z-index: 1;
}

.my_app::-webkit-scrollbar {
  width: 6px;
  background-color: white;
}

.my_app::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #ff889e;
  background-clip: padding-box;
}


</style>