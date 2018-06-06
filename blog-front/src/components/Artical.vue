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
            :close-on-content-click="false"
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            offset-y
            absolute
          >
            <v-card>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ blog.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      <span v-for="(tag, tagIdx) in blog.tags" :key="tag">
                        {{ tag }}
                        <span v-if="tagIdx + 1 < blog.tags.length" :key="tagIdx"> | </span>
                      </span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn
                      :class="fav ? 'red--text' : ''"
                      icon
                      @click="fav = !fav"
                    >
                      <v-icon>favorite</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-tile
                  v-for="heading in toc"
                  :key="heading.hash"
                >
                  <v-list-tile-title>
                    <a :href="heading.hash">{{ heading.heading }}</a>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card>
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
    <div id="toc-query" style="display:none">
    </div>
  </v-card>
</template>

<script>
var Base64 = require('js-base64').Base64

function readTocObj (tocRoot, tocObj) {
  var children = tocRoot.children
  for (let i = 0, l = children.length; i < l; i++) {
    let aElement = children[i].getElementsByTagName('a')[0]
    let obj = {
      heading: aElement.innerText,
      hash: aElement.hash
    }
    let ulElement = children[i].getElementsByTagName('ul')[0]
    if (ulElement) {
      obj.subHeadings = {}
      readTocObj(ulElement, obj.subHeadings)
    }

    tocObj[aElement.hash] = obj
  }
}

export default {
  props: ['id'],
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    fav: false,
    toc: null
  }),
  computed: {
    blog () {
      return this.$store.getters.blogs.find(blog => blog.id === this.id)
    }
  },
  methods: {
    onTagClicked (tag) {
      let tag64 = Base64.encode(tag)
      this.$router.push('/blogs/' + tag64)
    },
    show (e) {
      e.preventDefault()
      var tocQuery = document.getElementById('toc-query')
      tocQuery.innerHTML = this.$store.getters.toc
      var tocRoot = tocQuery.getElementsByTagName('ul')[0]
      var tocObj = {}
      readTocObj(tocRoot, tocObj)
      this.toc = tocObj
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
