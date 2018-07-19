<template>
  <v-container fluid fill-height>
    <v-card>
      <h1>Hello</h1>
    </v-card>
  </v-container>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('setFullWidth', true)
  }
}
</script>
