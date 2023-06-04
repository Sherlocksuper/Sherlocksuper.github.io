<script>
import header_list_item from "@/components/my_icons/header_list_item.vue";
export default {
  name: "body_show",
  data() {
    return {
    };
  },
  components: {
    header_list_item,
  },
  mounted() {
  },
};
</script>

<template>
  <div class="body_total">
    <div class="body_main">
      <header_list_item></header_list_item>
    </div>
    <div class="body_side_me"></div>
  </div>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body_total {
  width: 80%;
  border: 1px solid red;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.body_main{
  width: 75%;
  height: 100%;
  position: absolute;
  border: 4px solid yellow;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

}
.body_side_me{
  width: 23%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
  border: 4px solid black;
  right: 0;
}

</style>