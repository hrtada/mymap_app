<template>
  <div>
    <h2>画像選択</h2>
    <p>ギャラリーを表示する</p>
    <button @click="chancel()">ｷｬﾝｾﾙ</button>
    <button @click="">登録</button>
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
    chancel(){
      this.$router.push({ path: "/pointcreate" });     
    }
  }     
}
</script>
