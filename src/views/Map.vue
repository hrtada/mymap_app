<template>
  <div>
    <h2>MAP</h2>
    <div>
      <button @click="">範囲指定</button>
      <button @click="">設定</button>
    </div>

    <a @click="create()">ﾎﾟｲﾝﾄ作成画面に遷移（仮）</a>
  </div>
</template>

<script>
import Point from '../model/Point'
export default {
  data () {
    return {
    }
  },
  created() {
    const point = new Point(11, 43);
    console.log(point.getPos());
  },
  methods: {
    create(){
      this.$router.push({ path: "/pointcreate" });     
    }
  }
}
</script>


