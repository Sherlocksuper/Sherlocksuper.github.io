<script>
export default {
  name: "header_show",
  data() {
    return {
      isNavCollapsed: true,
    };
  },
  components: {},
  mounted() {
  },
  methods: {},
};
</script>

<template>
  <nav class="header_tools" :class="{'collapsed':isNavCollapsed}">
    <router-link id="sherlock_logo" to="homepage">sherlock</router-link>
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
  color: #d3d3d3;
  margin: 0 10px 0 20px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 15px;
  font-family: "Microsoft YaHei", serif;
  font-weight: 700;
  border-color: black;
}

a:hover {
  color: #ffffff;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 100%;
  top: 10px;
  left: 0;
  border: 1px solid red;
  overflow: hidden;
  z-index: 2;
}

.header_tools.collapsed {
  height: 0

}

.header_tools_right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
  position: absolute;
  right: 20px;
  width: auto;
}
</style>