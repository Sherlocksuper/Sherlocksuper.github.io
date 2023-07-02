<script setup>
import {Check, Checked, Edit, Setting, Sunny, Switch, Top} from "@element-plus/icons-vue";
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
    scrollToTop() {
      let element = document.querySelector('.my_app');
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    changeLayout() {
      let ele = document.querySelector('.body_main');
      let element = document.querySelector('.body_side_me');
      if (element.style.width === '0px') {
        ele.style.width = '60%';
        element.style.width = '300px';
      } else {
        ele.style.width = '80%';
        element.style.width = '0px';
      }
    },
    changeTheme() {
      let theme = document.querySelector(':root');
      console.log("origin" + theme.getAttribute('theme'));
      if (theme.getAttribute('theme') === 'dark') {
        theme.setAttribute('theme', 'light');
      } else {
        theme.setAttribute('theme', 'dark');
      }
    },
  },
};
</script>
<template>
  <div class="foot-tools-list">
    <button class="ftl-item" @click="scrollToTop">
      <top></top>
    </button>
    <input type="checkbox">
    <button class="ftl-item settingBtn" style="z-index: 1">
      <setting class="setting"></setting>
    </button>
    <button class="ftl-item hidden">
      <Switch @click="changeLayout"></Switch>
    </button>
    <button class="ftl-item hidden">
      <Sunny @click="changeTheme"></Sunny>
    </button>
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

.ftl-item > * {
  width: 20px;
  height: 20px;
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
  animation: rotate 2s linear infinite
}

input:checked ~ .settingBtn .setting {
  animation: rotate 2s linear infinite reverse;
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