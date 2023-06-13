<script>

export default {
  data() {
    return {
      index_show: undefined,
    }
  },
  mounted() {
    this.index_show = 1;
  },
}
</script>

<template>
  <div class=" header_contents_me">
    <transition name="header_contents" mode="out-in" @after-enter="index_show=(index_show%3)+1">
      <h1 class="header_title" v-if="1===index_show" style="--width:44;--length:8">Hello,I am
        Sherlock.A student from
        WeiHai&#128536</h1>
      <h1 class="header_title" v-else-if="2===index_show" style="--width: 30;--length: 6">I am a
        novice web
        developer&#128554</h1>
      <h1 class="header_title" v-else-if="3===index_show" style="--width:42;--length:7">And I
        am trying my best to get
        progress&#128526</h1>
    </transition>
  </div>
</template>

<style scoped>
.header_contents_me {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 85%;
}

.header_title {
  font: bold 150% Consolas, Monaco, monospace;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
}

.header_contents-enter-active {
  animation: show_title calc(var(--length) * 1s) steps(var(--width));
}

@keyframes show_title {
  0% {
    width: 0;
  }
  50% {
    width: calc(var(--width) * 1ch);
  }
  70% {
    width: calc(var(--width) * 1ch);
  }
  100% {
    width: 0;
  }
}


</style>