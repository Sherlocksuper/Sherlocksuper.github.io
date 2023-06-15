<script>
import header_social_media from "@/components/components-header/header_social_media.vue";
import header_magic_scrollText from "@/components/components-header/header_magic_scrollText.vue"
import header_nav from "@/components/components-header/header_nav.vue";

export default {

  name: "header_show",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {},
  components: {
    header_social_media,
    header_magic_scrollText,
    header_nav,
  }
};

</script>
<template>
  <div class="header_total">
    <header_nav></header_nav>
    <div class="header_contents">
      <h1 class="header_main_logo">Sherlock</h1>
      <header_social_media class="header_social_media"></header_social_media>
      <header_magic_scroll-text class="header_magic_text"></header_magic_scroll-text>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header_total, .header_contents {
  display: flex;
  justify-content: center;
  width: 80%;
  align-items: center;
  flex-direction: column;
  height: 90%;
  position: relative;
}

.header_main_logo {
  font-size: 140px;
  font-family: "Brush Script MT", cursive;
  font-weight: 100;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.header_social_media {
  position: absolute;
  top: 60%;
}

.header_magic_text {
  width: 100%;
  height: auto;
  position: absolute;
  top: 65%;
}


</style>