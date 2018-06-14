<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card @dblclick="show" @contextmenu="show">
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
                      @click="onFavClicked()"
                    >
                      <v-icon>mdi-thumb-up</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <div
                  v-for="(item, idx) in toc"
                  :key="item.hash"
                >
                  <v-list-tile
                    @click="$vuetify.goTo(decodeURI(item.hash));hideMenu();"
                  >
                    <v-list-tile-title>{{ idx + 1 }}. {{ item.heading }}</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    v-for="(subItem, subIdx) in item.subHeadings"
                    :key="subItem.hash"
                    @click="$vuetify.goTo(decodeURI(subItem.hash));hideMenu();"
                  >
                    <v-list-tile-sub-title>{{ idx + 1}}.{{ subIdx + 1 }}. {{ subItem.heading }}</v-list-tile-sub-title>
                  </v-list-tile>
                </div>
              </v-list>
            </v-card>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-snackbar
        :timeout="timeout"
        left
        bottom
        v-model="hintShow"
        color="success"
      >
        在文章阅读页面{{ isMobile ? '双击' : '右击' }}可以查看文章目录
        <v-btn flat color="pink" @click.native="hideHint()">Close</v-btn>
      </v-snackbar>
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

function readTocObj (tocRoot, tocArr) {
  var children = tocRoot.children
  for (let i = 0, l = children.length; i < l; i++) {
    let aElement = children[i].getElementsByTagName('a')[0]
    let obj = {
      heading: aElement.innerText,
      hash: aElement.hash
    }
    let ulElement = children[i].getElementsByTagName('ul')[0]
    if (ulElement) {
      obj.subHeadings = []
      readTocObj(ulElement, obj.subHeadings)
    }

    tocArr.push(obj)
  }
}

export default {
  props: ['id'],
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    fav: false,
    toc: null,
    timeout: 6000,
    hintShow: false
  }),
  computed: {
    blog () {
      return this.$store.getters.blogs.find(blog => blog.id === this.id)
    },
    isMobile () {
      return this.$store.getters.isMobile
    }
  },
  created () {
    if (this.$store.getters.hintShow === true) {
      setTimeout(() => {
        this.hintShow = true
      }, 100)
    }
    if (this.blog.like === true) {
      this.fav = true
    }
  },
  methods: {
    onTagClicked (tag) {
      let tag64 = Base64.encode(tag)
      this.$router.push('/blogs/' + tag64)
    },
    show (e) {
      if (!this.$store.getters.toc) {
        return
      }
      if ((e.type === 'dblclick' && this.isMobile) || (e.type === 'contextmenu' && !this.isMobile)) {
        e.preventDefault()
        var tocQuery = document.getElementById('toc-query')
        tocQuery.innerHTML = this.$store.getters.toc
        var tocRoot = tocQuery.getElementsByTagName('ul')[0]
        var tocArr = []
        readTocObj(tocRoot, tocArr)
        this.toc = tocArr
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      }
    },
    hideMenu (timeout) {
      setTimeout(() => {
        this.showMenu = false
      }, timeout && 10)
    },
    hideHint () {
      setTimeout(() => {
        this.hintShow = false
      }, 0)
      this.$store.dispatch('setHintShow', false)
    },
    onFavClicked () {
      this.fav = !this.fav
      this.$store.dispatch('setLike', {id: this.id, value: this.fav})
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
