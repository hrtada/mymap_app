<template>
  <div>
    <span id="loginState">Not Login</span>
    <div>{{this.$store.state.loginUser}}</div>
    <div>{{screenName}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    screenName: {
      type: String,
      default: 'No Screen',
      required: true
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style>
#loginState{
  padding: 5px 12px;
  margin: 40px;
  color: blue;
}
</style>
