<script>
import body_side_card from "@/components/components-body/body_side_card.vue"
import body_list_item from "@/components/components-body/body_list_item.vue";

export default {
  name: "body_show",
  data() {
    return {
      list_info: [
        'src/pic/cartoon/cartoon_5t5.png',
        'src/pic/cartoon/cartoon_567.png',
        'src/pic/cartoon/cartoon_wind.png',
        'src/pic/cartoon/cartoon_Volleyball_sun.png',
        'src/pic/cartoon/cartoon_psioncy100_sifu.png',
        'src/pic/cartoon/cartoon_Fictional_reasoning.png',
        'src/pic/cartoon/cartoon_conan.png',
      ]
    };
  },
  components: {
    body_list_item,
    body_side_card,
  },
  mounted() {
  },
};
</script>

<template>
  <div class="body_total body_background_element ">
    <div class="body_main">
      <body_list_item v-for="(picUrl, index) in list_info" :url="picUrl" :index="index"></body_list_item>
    </div>
    <div class="body_side_me">
      <body_side_card></body_side_card>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* div {
  display: flex;
}

.body_total {
  margin: auto;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  position: relative;
}

.body_main {
  width: 60%;
  height: auto;
  border-radius: 5px;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  transition: all .5s;
}

.body_side_me {
  width: 23%;
  height: auto;
  border-radius: 5px;
  margin-top: 20px;
  transition: all .5s;
}

</style>