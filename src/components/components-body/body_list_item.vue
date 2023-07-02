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
  },
  methods: {
    toDetailPage() {
      this.$router.push({name: 'Ti', params: {id: this.index}})
    }
  },
};
</script>
<template>
  <div class="body_list_item_total body_background_element" :class="{isReverse:this.index%2===1}" @click="toDetailPage">
    <div class="item_img_box">
      <img :src=url alt="">
    </div>
    <div class="item_content">
      <h1 class="item_content_title  body_text_element">{{ this.index }}</h1>
      <p class="item_content_content  body_text_element">content</p>
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
  margin-top: 20px;
  overflow: hidden;
  transition: all .5s;
}

.body_list_item_total.isReverse {
  flex-direction: row-reverse;
}

.item_img_box {
  width: 40%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 55%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 40px;
  margin-right: 80px;
}

.body_list_item_total.isReverse .item_content {
  margin-left: 100px;
  margin-right: 0;
}

.item_content_title {
  width: 96%;
  height: 20%;
  font-size: 30px;
  font-weight: bold;
  text-align: start;
}


.item_content_content {
  width: 96%;
  height: 50%;
  font-size: 20px;
  margin-top: 5px;
  text-align: start;
}
</style>