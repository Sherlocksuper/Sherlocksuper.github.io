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
  <div class="side_card_total">
    <img class="side_card_head" src="../../pic/icons/head_pic.jpg" alt="">
    <h1 class="side_card_name">Sherlock</h1>
    <header_social_media class="side_card_social_media"></header_social_media>
  </div>
</template>
<style scoped>
.side_card_total {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--el-box-shadow);
  transition: all .5s;
  background-color: #F2F3F5;
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