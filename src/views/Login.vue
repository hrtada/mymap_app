<template>
  <div>
    <h2>LOGIN</h2>
    <button @click="login()">login</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
    login () {
      this.$router.push({ path: "/map" });
    }
  }
}
</script>
