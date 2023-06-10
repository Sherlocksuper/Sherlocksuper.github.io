<script>
import body_list_item from "@/components/my_icons/body_list_item.vue";

export default {
  name: "body_show",
  data() {
    return {};
  },
  components: {
    body_list_item,
  },
  mounted() {
  },
};
</script>

<template>
  <div class="body_total">
    <div class="body_main">
      <body_list_item v-for="numbers in 5"></body_list_item>
    </div>
    <div class="body_side_me"></div>
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
  height: 100px;
  border-radius: 5px;
  border: 4px solid black;
  margin:15px auto;
}

</style>