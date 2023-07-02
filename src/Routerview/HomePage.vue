<script>
import header_show from '@/components/header_show.vue';
import body_show from "@/components/body_show.vue";

export default {
  name: 'App',
  components: {
    body_show,
    header_show,
  },
  data() {
    return {
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
  <div class="page body_background_element" :class="{act:prepared}">
    <div class="total">
      <header_show class="header"></header_show>
      <body_show class="body"></body_show>
      <div class="footer"></div>
    </div>
    <img class="total_background" src="../pic/icons/background.png" alt="">
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
  top: 0;
  left: 0;
  transition: 1s;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
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
}

.total {
  z-index: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 100%;
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
