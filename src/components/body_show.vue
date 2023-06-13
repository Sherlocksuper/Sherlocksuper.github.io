<script>
import body_side_card from "@/components/components-body/body_sider_card.vue"
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
  <div class="body_total">
    <div class="body_main">
      <body_list_item v-for="picUrl in list_info" :url="picUrl"></body_list_item>
    </div>
    <body_side_card class="body_side_me"></body_side_card>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body_total {
  margin: auto;
  width: 80%;
  border: 1px solid red;
  height: auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: row;
}

.body_main {
  width: 75%;
  height: auto;
  border: 4px solid green;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}

.body_side_me {
  width: 23%;
  height: 200px;
  border-radius: 5px;
  margin: 20px auto;

}

</style>