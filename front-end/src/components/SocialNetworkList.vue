<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs12 class="grey lighten-5 text-xs-center">
        <v-divider></v-divider>
        Contact me at following sites
      </v-flex>
      <v-flex xs12 class="grey lighten-5 text-xs-center">
        <v-tooltip
          bottom
          v-for="item in socialNetworks"
          :key="item.iconName"
        >
          <v-btn
            icon
            slot="activator"
            class="mx-3"
            :href="item.url"
            target="_blank"
            exact
          >
            <i :class="`mdi mdi-${item.iconName} mdi-24px`"></i>
          </v-btn>
          <span>{{ item.tooltip }}</span>
        </v-tooltip>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      footerIcons: ['github-face', 'linkedin', 'facebook', 'twitter', 'google-plus'],
      socialNetworks: [
        {
          iconName: 'github-face',
          url: 'https://github.com/daveying',
          tooltip: 'github'
        },
        {
          iconName: 'linkedin',
          url: 'https://www.linkedin.com/in/xingpengda',
          tooltip: 'linkedin'
        },
        {
          iconName: 'facebook',
          url: '',
          tooltip: 'facebook'
        },
        {
          iconName: 'twitter',
          url: '',
          tooltip: 'twitter'
        },
        {
          iconName: 'google-plus',
          url: '',
          tooltip: 'google+'
        }
      ]
    }
  },
  methods: {
    achorClicked () {
      console.log('achorClicked')
    }
  }
}
</script>
