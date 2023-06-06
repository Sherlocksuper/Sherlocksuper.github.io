<script>
export default {
  name: "header_show",
  data() {
    return {
      index_show: undefined,
    };
  },
  mounted() {
    this.index_show = 1;
  },
  methods: {}
};

</script>

<template>
  <div class="header_total">
    <div class="header_tools">
    </div>

    <div class="header_contents">
      <div class="header_contents_me">
        <transition name="header_contents" mode="out-in" @after-enter="index_show=(index_show%3)+1">
          <h1 class="header_title" v-if="1===index_show" style="--width:44;--length:6;--animate-delay: 0">Hello,I am
            Sherlock.A student from
            WeiHai&#128536</h1>
          <h1 class="header_title" v-else-if="2===index_show" style="--width:30;--length:4;--animate-delay: 7">I am a
            novice web
            developer&#128554</h1>
          <h1 class="header_title" v-else-if="3===index_show" style="--width:42;--length:5;--animate-delay: 11">And I am
            trying my best to get
            progress&#128526</h1>
        </transition>
      </div>
    </div>

  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header_total, .header_contents {
  display: flex;
  justify-content: center;
  width: 80%;
  align-items: center;
  flex-direction: column;
  height: 90%;
  position: relative;
}

.header_tools {
  width: 80%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
}

.header_contents_me {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 60%;
}

.header_contents .header_title {
  font: bold 100% Consolas, Monaco, monospace;
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
  70% {
    width: calc(var(--width) * 1ch);
  }
  100% {
    width: 0;
  }
}

</style>