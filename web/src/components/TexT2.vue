<template>
  <div v-if="visible" class="alert-container">
    <div class="alert-content">
      <h2 class="alert-title">{{ title }}</h2>
      <p class="alert-message">{{ message }}</p>
      <div class="alert-buttons">
        <button @click="confirm">确认</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ALert',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
      this.close();
    },
    cancel() {
      this.$emit('cancel');
      this.close();
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.alert-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.alert-message {
  font-size: 16px;
  margin-bottom: 20px;
}

.alert-buttons {
  display: flex;
  justify-content: flex-end;
}

.alert-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.alert-buttons button:hover {
  background-color: #0056b3;
}
</style>