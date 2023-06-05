<script>
export default {
  name: "header_show",
  data() {
    return {
    };
  },
  mounted() {
  },
};

</script>

<template>
  <div class="header_total">
    <div class="header_tools">

    </div>
    <div class="header_contents">
      <h1 class="header_title1">Hello,I am Sherlock.A student from WeiHai&#128536</h1>
      <h1 class="header_title2">I am a novice web developer&#128554</h1>
      <h1 class="header_title3">And I am trying my best to get progress&#128526</h1>
    </div>
  </div>
</template>

<style scoped>
.header_total,.header_contents {
  display: flex;
  justify-content: center;
  width: 80%;
  align-items: center;
  flex-direction: column;
  height: 300px;
}

.header_tools {
  width: 80%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
}


.header_contents>h1 {
  font: bold 200% Consolas, Monaco, monospace;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
  opacity: 90%;
  margin-top: 20px;
}

.header_title1 {
  animation: show_title1 steps(44) 6s;
  animation-fill-mode: forwards;
}

.header_title2 {
  animation: show_title2 steps(30) 4s;
  animation-delay: 7s;
  animation-fill-mode: forwards;
}

.header_title3 {
  animation: show_title3 steps(42) 5s;
  animation-delay: 11s;
  animation-fill-mode: forwards;
}

@keyframes show_title1 {
  0% {
    width: 0;
  }
  100% {
    width: 44ch;
  }
}

@keyframes show_title2 {
  0% {
    width: 0;
  }
  100% {
    width: 30ch;
  }
}


@keyframes show_title3 {
  0% {
    width: 0;
  }
  100% {
    width: 42ch;
  }
}

</style>