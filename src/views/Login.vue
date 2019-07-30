<template>
  <div>
    <UserInfo :screenName="screen"></UserInfo>
    <h2>LOGIN</h2>
    <button id ='login' @click="login()">login</button>
  </div>
</template>

<script>
import UserInfo from './UserInfo'
export default {
  data () {
    return {
      screen: "login"
    }
  },
  created() {
  },
  components: { UserInfo },
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
