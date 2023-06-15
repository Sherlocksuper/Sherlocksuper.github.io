<script setup>
import {Check, Checked, Edit, Setting, Top} from "@element-plus/icons-vue";
</script>

<script>
export default {
  name: "foot_tools",
  components: {},
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<template>
  <div class="foot-tools-list">
    <button class="ftl-item" @click="scrollToTop">
      <Top style="width: 20px;height: 20px"></Top>
    </button>

    <input type="checkbox">
    <button class="ftl-item settingBtn" style="z-index: 1">
      <Setting class="setting"></Setting>
    </button>

    <button class="ftl-item hidden"></button>
    <button class="ftl-item hidden"></button>

  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.foot-tools-list {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
}

.ftl-item {
  height: 40px;
  width: 40px;
  border-radius: 10%;
  border: none;
  margin-top: 5px;
  background-color: white;
  margin-bottom: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}

input {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 15%;
  bottom: 55px;
  z-index: 2;
  opacity: 0;
}

.ftl-item:hover, input:hover ~ .settingBtn {
  background-color: orange;
}

.hidden {
  width: 0;
  transition: width 1s ease;
}

input:checked ~ .hidden {
  width: 40px;
}

.setting {
  width: 20px;
  height: 20px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
}

</style>