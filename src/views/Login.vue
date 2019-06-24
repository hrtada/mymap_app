<template>
  <div>
    <h2>LOGIN</h2>
    <button id ='login' @click="login()">login</button>
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

<style>
#login{
  padding: 5px 12px;
  margin: 40px;
}

</style>
