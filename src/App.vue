<script>
import header_show from './components/my_icons/header_show.vue';
import body_show from "@/components/my_icons/body_show.vue";

export default {
  name: 'App',
  components: {
    body_show,
    header_show,
  },
  data() {
    return {
      mainpage: 'page',
      prepared: false,
    };
  },
  mounted() {
    let pageFadeTimer = setTimeout(() => {
      this.prepared = true;
      clearTimeout(timer);
    }, 10);
  },
  methods: {}
};
</script>

<template>
  <div :class="[mainpage,{act:prepared}]">
    <div class="total">
      <div class="header">
        <header_show></header_show>
      </div>
      <div class="body">
        <body_show></body_show>
      </div>
      <div class="footer"></div>
    </div>
    <img class="total_background" src="pic/testpic.png" alt="">
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 1s;
  opacity: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page.act {
  transition: 1s;
  opacity: 1;
}

img {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
  opacity: 40%;
}

.total {
  z-index: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.header {
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
}

.header header_show {
  margin-top: 20px;
  top: 80px;
}

.body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

header_show {
  height: 100%;
  width: 100%;
  z-index: 1;
}
</style>
