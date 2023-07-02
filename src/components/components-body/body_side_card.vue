<script setup>
import header_social_media from "../components-header/header_social_media.vue";
</script>

<script>
export default {
  name: "body_side_card",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {},
  components: {}
};
</script>

<template>
  <div class="side_card_total body_background_element">
    <img class="side_card_head  body_text_element" src="../../pic/icons/head_pic.jpg" alt="">
    <h1 class="side_card_name body_text_element">Sherlock</h1>
    <header_social_media class="side_card_social_media"></header_social_media>
  </div>
</template>
<style scoped>
.side_card_total {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: var(--el-box-shadow);
  transition: all .5s;
}

.side_card_total:hover {
  box-shadow: var(--el-box-shadow-dark);
}

.side_card_head {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  transition: all 1s;
  margin-top: 20px;
}

.side_card_head:hover {
  transform: rotate(720deg);
  transition: all .5s;
}


.side_card_name {
  font-size: 25px;
  font-weight: 100;
  margin-top: 10px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.side_card_social_media {
}

</style>