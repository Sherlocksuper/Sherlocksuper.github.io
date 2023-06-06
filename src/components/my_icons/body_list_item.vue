<script>
export default {
  name: "header_list_item",
  data() {
    return {};
  },
  mounted() {
  },
};
</script>

<template>
  <div class="header_list_item_total">
    <img src="public/pic/testpic.png ">
    <div class="item_content">
      <h1 class="item_content_title">title</h1>
      <p class="item_content_content">content</p>
    </div>
  </div>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header_list_item_total {
  position: relative;
  width: 95%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 5);
  border-radius: 10px;
  background-color: white;
  opacity: 40%;
  margin-top: 10px;
  margin-right: 5px;
}

.header_list_item_total:hover {
  scale: 105%;
  transition: all .5s;
}

.header_list_item_total > img {
  width: 40%;
  height: 95%;
  border-radius: 10px;
  left: 10px;
  margin-left: 10px;
}

.header_list_item_total > img:hover {
  scale: 105%;
  transition: all .5s;
}

.item_content {
  position: relative;
  width: 80%;
  height: 95%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
}

.item_content_title {
  width: 100%;
  height: 20%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}

.item_content_title:hover {
  scale: 105%;
  transition: all .5s;
}

.item_content_content {
  width: 100%;
  height: 80%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 5px;
}

.item_content_content:hover {
  scale: 105%;
  transition: all .5s;
}

.item_content h1, .item_content, div {
  z-index: 5;
}

</style>