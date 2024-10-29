<script>
  import GameMap from "@/components/GameMap.vue";
  export default {
    components: {
      GameMap
    }
  }
</script>

<template>
  <div class="playground">
    <GameMap />
  </div>
</template>

<style scoped>
div.playground {
  width: 45vw;
  height: 70vh;
  background: rgba(250, 235, 215, 0);
  margin: 80px auto;
  opacity: 0.95;
}
</style>
