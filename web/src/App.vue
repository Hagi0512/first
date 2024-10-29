<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
  components: {
    NavBar
  }
}
</script>

<style>
body{
  background: url("assets/image/1.jpg") no-repeat center center fixed;
  background-size:1800px;
  background-position-y: 30px;
}
</style>