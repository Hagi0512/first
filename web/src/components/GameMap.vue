<script>
import { GameMap } from "@/assets/scripts/GameMap";
import { onMounted, ref } from "vue";

export default {
  setup() {
    let parent = ref(null);
    let canvas = ref(null);
    let gameMap = null;

    onMounted(() => {
      restartGameMap();
    });

    const restartGameMap = () => {
      if (gameMap) {
        gameMap = null; // 清除旧的地图实例
      }
      gameMap = new GameMap(canvas.value.getContext('2d'), parent.value);
    };

    return {
      parent,
      canvas,
      restartGameMap
    };
  },

  data() {
    return {
      isPopupVisible: false,
      isWindowVisible: false,
      timer: null
    };
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true;
    },
    handleClick() { // 打开弹窗并且重新随机地图
      this.showPopup();
      this.restartGameMap();
      this.toggleWindow();
    },
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

<template>
  <div class="center-content">
      <div class="app">
        <button class="roll" @click="handleClick">重随机地图</button>
        <transition name="fade-slide">
          <div v-if="isWindowVisible" class="small-window">
          <h4>地图随机完毕！</h4>
            <button class="close_button" @click="toggleWindow">关闭</button>
          </div>
        </transition>
      </div>
  </div>
  <div ref="parent" class="gamemap">
    <canvas ref="canvas" tabindex="0"></canvas>
  </div>
</template>

<style scoped>
div.gamemap {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close_button {
  font-size: 13px;
}

.roll {
  background-color: #d17a4a;
  border-radius: 15px;
}
.center-content {
  text-align: center;
}

.app {
  text-align: center;
}

.small-window {
  width: 80%;
  max-width: 300px;
  border: 1px solid black;
  padding: 10px;
  background-color: white;
  position: fixed;
  top: 0;
  left: 50%;
  border-end-end-radius: 15px;
  border-end-start-radius: 15px;
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

