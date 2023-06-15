<script>

</script>

<template>
  <div class="header_social_media_pic">
    <a target="_blank" href="https://github.com/sherlocksuper">
      <img src="../../pic/icons/iconfont_wechat.png" alt="">
    </a>
    <a target="_blank" href="https://github.com/sherlocksuper">
      <img src="../../pic/icons/iconfont_github.png" alt="">
    </a>
    <a>
      <img src="../../pic/icons/iconfont_email.png" alt="">
    </a>
  </div>
</template>

<style scoped>
.header_social_media_pic {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.header_social_media_pic img {
  height: 30px;
  width: 30px;
  margin: 0 7px;
  transition: all 1s ;
}

.header_social_media_pic img:hover {
  transition: .5s;
  transform: rotate(540deg);
}
</style>