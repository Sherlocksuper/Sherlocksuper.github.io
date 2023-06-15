<script>
export default {
  name: "header_show",
  data() {
    return {};
  },
  components: {},
  mounted() {
  },
  methods: {},
};
</script>
<template>
  <nav class="header_tools">
    <router-link id="sherlock_logo" to="homepage">sherlock</router-link>
    <img class="header_my_headPic" src="../../pic/icons/head_pic.jpg" alt="">
    <div class="header_tools_right">
      <router-link to="Time">时间</router-link>
      <router-link to="Time">关于</router-link>
      <router-link to="Time">关于</router-link>
    </div>
  </nav>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: white;
  margin: 0 10px 0 20px;
  border-radius: 5px;
  font-size: 25px;
  font-weight: 150;
  font-family: "Comic Sans MS", cursive, sans-serif;
  writing-mode: horizontal-tb;
  white-space: nowrap;
}

a::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background-color: lightskyblue;
  transition: 0.5s;
}

a:hover::after {
  width: 100%;
}

.header_tools {
  position: absolute;
  height: auto;
  width: 100%;
  top: 20px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.header_tools_right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 100px;
  overflow: hidden;
  height: 100%;
  width: 0;
  transition: all 1s;
}

.header_my_headPic {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  position: absolute;
  right: 40px;
  transition: all 1s;
}

.header_my_headPic:hover {
  transform: rotate(360deg);
  transition: all 0.4s ease;
}

.header_my_headPic:hover ~ .header_tools_right {
  width: 300px;
  transition: all 0.4s ease;
}

.header_tools_right:hover {
  width: 300px;
  transition: all 0.4s ease;
}

.header_tools_right a {
  font-size: 20px;
}
</style>