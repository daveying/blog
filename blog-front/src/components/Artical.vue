<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md8>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-container class="px-3 py-2">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <h2 @click="onBlogClicked(blog)"><a class="blog-link">{{ blog.title }}</a></h2>
                      <p>
                        发布时间: {{ blog.createdDate }}, 浏览量: {{ blog.viewCount }}次
                        <v-chip @click="onTagClicked(tag)" small outline v-for="tag in blog.tags" :key="tag"><a class="tag-link">{{ tag }}</a></v-chip>
                      </p>
                      <vue-markdown>{{blog.md}}</vue-markdown>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4>
          <v-card>
            <v-container>
              <h3 class="mb-2">目录</h3>
              <v-divider></v-divider>
              <v-layout wrap class="mt-2">
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap>
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
import VueMarkdown from 'vue-markdown'
var hljs = require('highlight.js')

var languageOverrides = {
  js: 'javascript',
  html: 'xml'
}
var md = require('markdown-it')({
  html: true,
  linkify: false,
  highlight: function (code, lang) {
    if (languageOverrides[lang]) lang = languageOverrides[lang]
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, code).value
      } catch (e) {}
    }
    return ''
  }
})

export default {
  props: ['id'],
  computed: {
    blog () {
      console.log(this.id)
      return this.$store.getters.blogs.find(blog => blog.id === this.id)
    },
    html () {
      return md.render(this.blog.md)
    }
  },
  methods: {
    onTagClicked (tag) {
      console.log('clicked ' + tag)
      this.$router.push('/blogs')
    },
    onBlogClicked (blog) {
      console.log('clicked ' + blog.title)
      this.$router.push(`/blog/${blog.id}`)
    }
  },
  components: { VueMarkdown }
}
</script>

<style scoped>
.blog-link:hover {
  color: #0074cd;
}
.tag-link:hover {
  color: #0074cd;
}
.blog-link {
  color: #1f4777;
}
.tag-link {
  color: #1f4777;
}
</style>
