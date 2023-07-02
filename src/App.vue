<script setup>
import foot_tools from "@/components/components-foot/foot_tools.vue";
</script>
<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.defaultTheme();
  },
  methods: {
    defaultTheme() {
      let theme = document.querySelector(':root');
      theme.setAttribute('theme', 'light');
    },
  }
};

</script>
<template>
  <div class="my_app">
    <router-view></router-view>
  </div>
  <foot_tools class="foot_tools"></foot_tools>
</template>
<style>

:root[theme='light'] {
  --head-text-color: #f5f7fa;
  --body-text-color: #303133;
  --background-color: #f5f7fa;
}

:root[theme='dark'] {
  --head-text-color: #303133;
  --body-text-color: #f5f7fa;
  --background-color: #303133;
}

.head_text_element {
  color: var(--head-text-color);
  transition: all .5s;
}

.body_text_element {
  color: var(--body-text-color);
}

.body_background_element {
  background-color: var(--background-color);
}

</style>
<style scoped>

.my_app {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: -1;
}

router-view {
  z-index: 0;
}

.foot_tools {
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 50px;
  z-index: 0;
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