<script>
export default {
  name: "header_list_item",
  props: ['url'],
  data() {
    return {};
  },
  mounted() {
  },
};
</script>
<template>
  <div class="header_list_item_total">
    <div class="item_img_box">
      <img :src=this.url alt="">
    </div>
    <div class="item_content">
      <h1 class="item_content_title">title</h1>
      <p class="item_content_content">content</p>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header_list_item_total {
  position: relative;
  width: 95%;
  height: 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: var(--el-box-shadow);
  background-color: white;
  margin-top: 20px;
  overflow: hidden;
  transition: all .5s;
  opacity: 85%;
}

.header_list_item_total .item_img_box {
  width: 35%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header_list_item_total .item_img_box img {
  transition: all 1s .5s;
}

.header_list_item_total:hover img {
  scale: 105%;
  transition: all .5s;
}

.header_list_item_total:hover {
  box-shadow: var(--el-box-shadow-dark);
}

.item_content {
  position: relative;
  width: 60%;
  height: 95%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 15px;
}

.item_content_title {
  width: 96%;
  height: 20%;
  border: 1px solid red;
  font-size: 30px;
  font-weight: bold;
  text-align: start;
}

.item_content_content {
  width: 96%;
  height: 50%;
  border: 1px solid red;
  font-size: 20px;
  margin-top: 5px;
  text-align: start;
}

</style>