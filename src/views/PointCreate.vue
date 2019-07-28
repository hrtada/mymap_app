<template>
  <div>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="field">
          <label class="label">ラベル</label>
            <div class="control">
              <div class="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
        </div>

        <div class="field">
          <label class="label">日付</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input">
            </div>
        </div>

        <div class="field">
          <label class="label">メモ</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea"></textarea>
            </div>
        </div>

        <div class="field">
          <label class="label">写真</label>
            <div class="control">
              <button @click="open()" class="button is-rounded">フォルダ選択</button>
            </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button @click="entry()" class="button is-link">登録</button>
          </div>
          <div class="control">
            <button @click="chancel()" class="button is-link">ｷｬﾝｾﾙ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import * as firebase from "firebase/app";
import "firebase/firestore";
import 'bulma/css/bulma.css';//CSSフレームワーク

let db = null;

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
    },
    entry(){

    }
  }
}
</script>

<style>

</style>
