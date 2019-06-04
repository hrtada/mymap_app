<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="drive()">アクセル</button>
    <button>ブレーキ</button>
  </div>
</template>

<script>
import Car from './sample/Car'

export default {
  name: 'app',
  data () {
    return {
      car: null,
      intervalId: 0
    }
  },
  created() {
    this.car = new Car()
    this.intervalId = setInterval(this.car.monitorStatus, 1000)
  },
  methods: {
    drive () {
      clearInterval(this.intervalId)
      this.car.drive()
      this.intervalId = setInterval(this.car.monitorStatus, 1000)
      return
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
