<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12 class="grey lighten-5 text-xs-center">
        <v-divider></v-divider>
        Contact me at following sites
      </v-flex>
      <v-flex xs12 class="grey lighten-5 text-xs-center">
        <v-btn
          v-for="icon in footerIcons"
          :key="icon"
          icon
          class="mx-3"
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      footerIcons: ['add_alert', 'error', 'error_outline', 'warning', 'airplay']
    }
  }
}
</script>
