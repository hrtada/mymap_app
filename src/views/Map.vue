<template>
  <div>
    <h2>MAP</h2>
    <div>
      <button @click="">範囲指定</button>
      <button @click="">設定</button>
    </div>

    <a href="" @click="create()">ﾎﾟｲﾝﾄ作成画面に遷移（仮）</a>
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
    create(){
      this.$router.push({ path: "/pointcreate" });     
    }
  }
}
</script>


