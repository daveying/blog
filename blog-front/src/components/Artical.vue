<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card @contextmenu="show">
            <v-container class="px-3 py-2">
              <v-layout row wrap>
                <v-flex xs12>
                  <h1 class="blog-title">{{ blog.title }}</h1>
                  <p>
                    发布时间: {{ blog.createdDate.getFullYear() }}年{{ blog.createdDate.getMonth() + 1 }}月{{ blog.createdDate.getDate() }}日, 浏览量: {{ blog.viewCount }}次
                    <v-chip @click="onTagClicked(tag)" small outline v-for="tag in blog.tags" :key="tag"><a class="tag-link">{{ tag }}</a></v-chip>
                  </p>
                  <div>
                    <markdown :md="blog.md"></markdown>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-menu
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            offset-y
            absolute
          >
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="void 0">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap px-2>
      <v-flex xs12>
        <social-network-list></social-network-list>
      </v-flex>
      <v-flex xs12>
        <div class="comments">
        <vue-disqus shortname="xingpeng-blog" :identifier="id" url="http://md.xp-da.com"></vue-disqus>
        </div>
    </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
var Base64 = require('js-base64').Base64

export default {
  props: ['id'],
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  }),
  computed: {
    blog () {
      return this.$store.getters.blogs.find(blog => blog.id === this.id)
    },
    toc () {
      return this.$store.getters.toc
    }
  },
  methods: {
    onTagClicked (tag) {
      let tag64 = Base64.encode(tag)
      this.$router.push('/blogs/' + tag64)
    },
    show (e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    }
  }
}
</script>

<style scoped>
.blog-link:hover {
  color: #0074cd;
}
.tag-link:hover {
  color: #0074cd;
}
.tag-link,
.blog-title,
.blog-link {
  color: #1f4777;
}
</style>
