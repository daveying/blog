<template>
  <v-container fluid fill-height px-0 py-0>
    <vue-split style="width:100%"
      :elements="[
        '#fileNav',
        '#editor'
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
      <div id="editor">
        <h2>bar</h2>
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
  background-color: #f5f5f5 !important;
}
.gutter:hover {
  background-color: #e5e5e5 !important;
}
</style>
