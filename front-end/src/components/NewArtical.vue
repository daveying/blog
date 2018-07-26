<template>
  <v-container fluid style="height:100%" px-0 py-0>
    <vue-split style="width:100%"
      :elements="[
        '#fileNav',
        '#mainWin'
      ]"
      direction="horizontal"
      :min-size="100"
      :gutter-size="7"
      :snap-offset="50"
      :sizes="[25, 75]"
    >
      <div id="fileNav">
        <file-navigator></file-navigator>
      </div>
      <div id="mainWin">
        <v-container fluid px-0 py-0>
          <v-layout align-content-start>
            <span class="editing-item selected"
              v-for="(item,i) in 5"
              :key="i">
              sdfaowejknaldkda.md
            </span>
          </v-layout>
        </v-container>
        <vue-split style="width:100%"
          :elements="['#editor', '#preview']"
          direction="horizontal"
          :min-size="10"
          :gutter-size="7"
          :snap-offset="50"
          :sizes="[50, 50]"
        >
          <div id="editor">
            <h1>Editor</h1>
          </div>
          <div id="preview">
            <h1>Preview</h1>
          </div>
        </vue-split>
      </div>
    </vue-split>
  </v-container>
</template>

<script>
import VueSplit from 'vue-splitjs'

export default {
  created () {
    this.$store.dispatch('setFullWidth', true)
  },
  components: {VueSplit}
}
</script>

<style>
.gutter {
  background-color: #fafafa !important;
}
/* .gutter:hover {
  background-color: #e5e5e5 !important;
} */

.editing-item {
  padding: 5px 10px;
}

</style>
