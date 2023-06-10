<script>
import header_show from '@/components/my_icons/header_show.vue';
import body_show from "@/components/my_icons/body_show.vue";

export default {
  name: 'App',
  components: {
    body_show,
    header_show,
  },
  data() {
    return {
      mainPage: 'page',
      prepared: false,
    };
  },
  mounted() {
    let pageFadeTimer = setTimeout(() => {
      this.prepared = true;
    }, 10);
  },
  methods: {}
};
</script>

<template>
  <div :class="[mainPage,{act:prepared}]">
    <div class="total">
      <div class="header">
        <header_show></header_show>
      </div>
      <body_show class="body"></body_show>
      <div class="footer"></div>
    </div>
    <img class="total_background" src="../pic/img_1.png" alt="">
  </div>
</template>

<style scoped>
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
  top: 0;
  left: 0;
  transition: 1s;
  opacity: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page.act {
  opacity: 1;
}

.total_background {
  position: absolute;
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

.total::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

.total::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #555;
  background-clip: padding-box;
}

.total::-webkit-scrollbar-thumb:hover {
  background-color: white;
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


header_show {
  height: 100%;
  width: 100%;
  z-index: 1;
}
</style>
