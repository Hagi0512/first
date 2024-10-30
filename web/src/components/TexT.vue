<template>
  <div class="app">
    <button @click="toggleWindow">生成窗口</button>

    <transition name="fade-slide">
      <div v-if="isWindowVisible" class="small-window">
        <p>这是一个从顶部淡入淡出的小窗口</p>
        <button @click="toggleWindow">关闭窗口</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isWindowVisible: false,
      timer: null
    };
  },
  methods: {
    toggleWindow() {
      this.isWindowVisible = !this.isWindowVisible;
      if (this.isWindowVisible) {
        this.startTimer();
      } else {
        clearTimeout(this.timer);
      }
    },
    startTimer() {
      this.timer = setTimeout(() => {
        this.isWindowVisible = false;
      }, 3000); // 3秒后自动收回
    }
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  }
}
</script>

<style scoped>
.app {
  text-align: center;
}

.small-window {
  width: 80%;
  max-width: 300px;
  border: 1px solid black;
  padding: 10px;
  background-color: lightgray;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.fade-slide-enter-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.fade-slide-leave-active {
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
}

.fade-slide-enter, .fade-slide-leave-to {
  transform: translate(-50%, -100%);
  opacity: 0;
}

.fade-slide-enter-to {
  transform: translate(-50%, 0);
  opacity: 1;
}

.fade-slide-leave {
  transform: translate(-50%, -100%);
  opacity: 0;
}
</style>
