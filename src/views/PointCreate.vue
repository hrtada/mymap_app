<template>
  <div>
    <h2>新しいポイントの作成</h2>
    <tr>
        <td>ラベル：</td>
        <input type = "text">
    </tr>
    <tr>
        <td>日付：</td>
        <input type = "date">
    </tr>
    <tr>
        <td>メモ：</td>
        <input type = "text">
    </tr>
    <tr>
        <td>写真：</td>
        <button>カメラ</button>
        <button>選択</button>
        <img src="" alt="">
    </tr>

    <button>ｷｬﾝｾﾙ</button>
    <button>作成</button>
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
  }
}
</script>
