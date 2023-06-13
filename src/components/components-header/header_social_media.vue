<script>

</script>

<template>
  <div class="header_social_media_pic">
    <a target="_blank" href="https://github.com/sherlocksuper">
      <img src="src/pic/icons/iconmonstr-wechat-5-240.png" alt="">
    </a>
    <a target="_blank" href="https://github.com/sherlocksuper">
      <img src="src/pic/icons/iconmonstr-github-5-240.png" alt="">
    </a>
    <a>
      <img src="src/pic/icons/iconmonstr-email-3-240.png" alt="">
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