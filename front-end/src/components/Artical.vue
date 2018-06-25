<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-container class="px-3 py-2">
              <v-layout row wrap>
                <v-flex xs12>
                  <h1 class="blog-title">{{ blog.title }}</h1>
                  <p>
                    发布时间: {{ blog.year }}年{{ blog.month }}月{{ blog.day }}日, 浏览量: {{ blog.viewCount }}次
                    <v-chip @click="onTagClicked(tag)" small outline v-for="tag in blog.tags" :key="tag"><a class="tag-link">{{ tag }}</a></v-chip>
                  </p>
                  <div>
                    <markdown :abstract="false" :blog="blog"></markdown>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <v-btn v-if="previousBlog" @click="onBlogClicked(previousBlog)" color="primary" small fab dark>
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <span v-if="previousBlog">{{ previousBlog ? previousBlog.title : '' }}</span>
        <v-spacer></v-spacer>
        <span v-if="nextBlog">{{ nextBlog ? nextBlog.title : '' }}</span>
        <v-btn v-if="nextBlog" @click="onBlogClicked(nextBlog)" color="primary" small fab dark>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
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
  </v-card>
</template>

<script>

export default {
  props: ['id'],
  data: () => ({
    timeout: 6000,
    hintShow: false
  }),
  computed: {
    blog () {
      var encodedId = encodeURIComponent(this.id)
      var blogs = this.$store.getters.blogs
      var idx = blogs.findIndex(blog => {
        return blog.id === encodedId
      })
      if (idx !== -1) {
        return {
          ...blogs[idx],
          year: blogs[idx].createdDate.getFullYear(),
          month: blogs[idx].createdDate.getMonth() + 1,
          day: blogs[idx].createdDate.getDate()
        }
      }
      return {}
    },
    previousBlog () {
      var encodedId = encodeURIComponent(this.id)
      var blogs = this.$store.getters.blogs
      var idx = blogs.findIndex(blog => {
        return blog.id === encodedId
      })
      if (idx - 1 >= 0) {
        return blogs[idx - 1]
      }
      return undefined
    },
    nextBlog () {
      var encodedId = encodeURIComponent(this.id)
      var blogs = this.$store.getters.blogs
      var idx = blogs.findIndex(blog => {
        return blog.id === encodedId
      })
      return blogs[idx + 1]
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
  },
  methods: {
    onTagClicked (tag) {
      let tag64 = encodeURIComponent(tag)
      this.$router.push('/blogs/' + tag64)
    },
    onBlogClicked (blog) {
      this.$router.push(`/blog/${blog.id}`)
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
