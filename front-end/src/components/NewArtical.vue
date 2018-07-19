<template>
  <v-container fluid fill-height>
    <vue-split style="width:100%"
      :elements="[
        '#slotOne',
        '#slotTwo'
      ]"
      direction="horizontal"
      :min-size="100"
      :gutter-size="10"
      :snap-offset="50"
      :sizes="[25, 75]"
    >
      <div id="slotOne">
        <h2>foo</h2>
      </div>
      <div id="slotTwo">
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
