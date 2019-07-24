<template>
<div id="app">
<body class="layout-default">
  <section class="hero is-fullheight is-medium is-primary">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <article class="card is-rounded">
                <div class="card-content">
                  <h1 class="is-size-4 has-text-weight-bold"> Login</h1>
                    <input class="input" type="email" placeholder="Email">
                    <input class="input" type="password" placeholder="Password">
                  <p class="control">
                    <label class="checkbox">
                      <input type="checkbox">
                      Remember me
                    </label>
                  </p>
                  <p class="control">
                    <button id ='login' @click="login()" class="button is-primary is-medium is-fullwidth">
                      Login
                    </button>
                  </p>
                </div>
              </article>
            </div>
          </div>
    </div>
  </section>
</body>
</div>
</template>

<script>
import 'bulma/css/bulma.css';//CSSフレームワーク
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

</style>
