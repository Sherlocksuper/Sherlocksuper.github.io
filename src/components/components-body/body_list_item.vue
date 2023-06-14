<script>
export default {
  name: "header_list_item",
  props: {
    url: String,
    index: Number,
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.index);
  },
};
</script>
<template>
  <div class="body_list_item_total" :class="{isReverse:index===1}">
    <div class="item_img_box">
      <img :src=url alt="">
    </div>
    <div class="item_content">
      <h1 class="item_content_title">{{ this.index }}</h1>
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

.body_list_item_total {
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
}

.body_list_item_total.isReverse {
  flex-direction: row-reverse;
}

.item_img_box {
  width: 35%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid red;
}

.item_img_box img {
  transition: all 1s .5s;
}

.body_list_item_total:hover img {
  scale: 105%;
  transition: all .5s;
}

.body_list_item_total:hover {
  box-shadow: var(--el-box-shadow-dark);
}

.item_content {
  position: relative;
  width: 65%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
}

.item_content_title {
  width: 96%;
  height: 20%;
  font-size: 30px;
  font-weight: bold;
  text-align: start;
  border: 1px solid red;
}

.item_content_content {
  width: 96%;
  height: 50%;
  font-size: 20px;
  margin-top: 5px;
  text-align: start;
  border: 1px solid red;
}

</style>