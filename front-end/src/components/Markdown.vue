<template>
  <div>
    <div @dblclick="show" @contextmenu="show">
      <vue-markdown
        class="markdown-body"
        @rendered="rendered()"
        :toc="true"
        :toc-last-level="3"
        @toc-rendered="tocRendered"
        :source="this.abstract ? blog.abstract : blog.md"
      ></vue-markdown>
    </div>
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
              @click="$vuetify.goTo(decodeURIComponent(item.hash));hideMenu();"
            >
              <v-list-tile-title>{{ idx + 1 }}. {{ item.heading }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-for="(subItem, subIdx) in item.subHeadings"
              :key="subItem.hash"
              @click="$vuetify.goTo(decodeURIComponent(subItem.hash));hideMenu();"
            >
              <v-list-tile-sub-title>{{ idx + 1}}.{{ subIdx + 1 }}. {{ subItem.heading }}</v-list-tile-sub-title>
            </v-list-tile>
          </div>
        </v-list>
      </v-card>
    </v-menu>
    <div id="toc-query" style="display:none">
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'

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
  props: ['blog', 'abstract'],
  data () {
    return {
      x: 0,
      y: 0,
      fav: this.blog.like,
      showMenu: false,
      tocHtml: '',
      toc: null
    }
  },
  methods: {
    tocRendered (tocHtml) {
      this.tocHtml = tocHtml
    },
    rendered () {
      // wait for DOM generation
      setTimeout(() => Prism.highlightAll(), 30)
    },
    show (e) {
      if (!this.tocHtml || this.abstract) return
      if ((e.type === 'dblclick' && this.isMobile) || (e.type === 'contextmenu' && !this.isMobile)) {
        e.preventDefault()
        var tocQuery = document.getElementById('toc-query')
        tocQuery.innerHTML = this.tocHtml
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
    onFavClicked () {
      this.fav = !this.fav
      this.$store.dispatch('setLike', {id: this.blog.id, value: this.fav})
    },
    hideMenu (timeout) {
      setTimeout(() => {
        this.showMenu = false
      }, timeout && 10)
    }
  },
  components: { VueMarkdown, Prism }
}
</script>

<style>
@import '../../node_modules/github-markdown-css/github-markdown.css';
@import '../../node_modules/prismjs/themes/prism.css';
@import '../../node_modules/katex/dist/katex.min.css';
.markdown-body code {
  padding: 2px 5px;
  margin: 0px;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-weight: normal;
  font-size: 1em;
  display: initial;
}

.markdown-body code::before,
.markdown-body code::after {
  content: none;
}

.markdown-body pre code {
  font-weight: normal;
  font-size: 1.2em;
}

.markdown-body pre code::before,
.markdown-body pre code::after {
  content: none;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  color: #1f4777;
}

</style>
