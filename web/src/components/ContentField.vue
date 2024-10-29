<script>

</script>

<template>
  <div class="container content-field">
    <div class="card">
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.content-field {
  margin-top: 20px;
}

.card {
  opacity: 0.8; /* 调整透明度值，0.0为全透明，1.0为不透明 */
}

</style>
