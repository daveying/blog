<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          @click="onClicked()"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-items>
        <v-layout justify-space-around align-center>
          <v-avatar @click="sideNav = !sideNav" style="cursor: pointer" color="blue" size="35">
            <img src="/static/photo.jpg" alt="logo">
          </v-avatar>
        </v-layout>
      </v-toolbar-items>
      <v-toolbar-title style="cursor: pointer" @click="sideNav = !sideNav">
          Xingpeng
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid mx-0>
        <router-view></router-view>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12 class="grey lighten-5 text-xs-center">
            <v-btn
              v-for="icon in footerIcons"
              :key="icon"
              icon
              class="mx-3 white--text"
            >
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 class="grey lighten-5 text-xs-center">
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum.
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 class="grey lighten-5 text-xs-center">
            &copy;2018 — <strong>Xingpeng Da</strong>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      footerIcons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram']
    }
  },
  methods: {
    onClicked () {

    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'home', title: '首页', link: '/' },
        { icon: 'library_books', title: '所有文章', link: '/blogs' },
        { icon: 'folder_shared', title: '读书', link: '/reading' },
        { icon: 'face', title: '关于', link: '/about' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  name: 'App'
}
</script>
