<template>
  <div>
    <h2>ポイントの編集</h2>
    
     <form action="">
      <p>
        ラベル：<select name="lavel"></select>
      </p>
      <p>
        日付：<input type="date" name="date">
      </p>
      <p>
        メモ：<textarea name="memo" cols="30" rows="10"></textarea>
      </p>
      <p>
        写真：
        <button @click="">カメラ</button>
        <button @click="open()">選択</button>
        <img src="" alt="">
      </p>
      <button @click="chancel()">ｷｬﾝｾﾙ</button>
      <button @click="chancel()">削除</button>
      <button @click="">作成</button>
    </form>
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
    open(){
      this.$router.push({ path: "/picture" });     
    },
    chancel(){
      this.$router.push({ path: "/map" });  
    }
  }
}
</script>
