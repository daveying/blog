<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md8>
          <v-layout row wrap>
            <v-flex v-for="blog in showingBlog" :key="blog.id" xs12>
              <v-card hover tile style="cursor: default">
                <v-container class="px-3 py-2">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <h1 @click="onBlogClicked(blog)"><a class="blog-link">{{ blog.title }}</a></h1>
                      <br>
                      <p>
                        <span class="grey--text text--darken-1">发布时间: {{ blog.createdDate.getFullYear() }}年{{ blog.createdDate.getMonth() + 1 }}月{{ blog.createdDate.getDate() }}日, 浏览量: {{ blog.viewCount }}次</span>
                        <v-chip @click="onTagClicked(tag)" small outline v-for="tag in blog.tags" :key="tag"><a class="tag-link">{{ tag }}</a></v-chip>
                      </p>
                    </v-flex>
                    <v-flex xs12>
                      <div @click="onBlogClicked(blog)" style="cursor: pointer">
                        <markdown :abstract="true" :blog="blog"></markdown>
                      </div>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-spacer></v-spacer><v-btn color="info" flat @click="onBlogClicked(blog)">继续阅读<v-icon right dark>navigate_next</v-icon></v-btn>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row py-4 class="text-xs-center">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
              <v-pagination :length="pageLength" v-model="pageIdx"></v-pagination>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4>
          <v-card tile>
            <v-container>
              <h2 class="mb-2">标签列表</h2>
              <v-divider></v-divider>
              <v-layout wrap class="mt-2">
                <v-chip
                  small
                  outline
                  label
                  v-for="tag in tags"
                  :key="tag.name"
                  @click="onTagClicked(tag.name)"
                >
                  <a class="tag-link">{{ tag.name === 'all' ? '所有文章' : tag.name }}</a>
                  <span class="ml-1">{{ tag.count }}</span>
                </v-chip>
              </v-layout>
            </v-container>
          </v-card>
          <v-card v-if="recentViewed.length > 0" class="mt-2" tile>
            <v-container>
              <h2>最近浏览</h2>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-list two-line>
                    <div
                      v-for="item in recentViewed"
                      :key="item.id"
                    >
                      <v-list-tile
                        ripple
                        @click="onBlogClicked(item)"
                      >
                        <v-list-tile-content>
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                          <v-list-tile-sub-title>
                            <v-icon small>mdi mdi-calendar-range</v-icon>{{item.createdDate.getFullYear()}}-{{pad(item.createdDate.getMonth() + 1)}}-{{pad(item.createdDate.getDate())}}
                            <v-icon small>mdi mdi-tag</v-icon><span v-for="(tag, tagIdx) in item.tags" :key="tag">
                              {{ tag }}
                              <span v-if="tagIdx + 1 < item.tags.length" :key="tagIdx"> | </span>
                            </span>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>
                            <v-icon small>mdi mdi-eye-outline</v-icon> {{ item.viewCount }}
                          </v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                    </div>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-card class="mt-2" tile>
            <v-container>
              <h2>最受欢迎</h2>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-list two-line>
                    <div
                      v-for="item in favArray"
                      :key="item.id"
                    >
                      <v-list-tile
                        ripple
                        @click="onBlogClicked(item)"
                      >
                        <v-list-tile-content>
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                          <v-list-tile-sub-title>
                            <v-icon small>mdi mdi-calendar-range</v-icon>{{item.createdDate.getFullYear()}}-{{pad(item.createdDate.getMonth() + 1)}}-{{pad(item.createdDate.getDate())}}
                            <v-icon small>mdi mdi-tag</v-icon><span v-for="(tag, tagIdx) in item.tags" :key="tag">
                              {{ tag }}
                              <span v-if="tagIdx + 1 < item.tags.length" :key="tagIdx"> | </span>
                            </span>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-list-tile-action-text>
                            <v-icon small>mdi mdi-eye-outline</v-icon> {{ item.viewCount }}
                          </v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                    </div>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-card class="mt-2" tile v-if="$store.getters.env === 'development'">
            <v-container>
              <h2 class="mb-2">关于作者</h2>
              <v-divider></v-divider>
              <v-layout wrap class="mt-2">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, nostrum! Nam necessitatibus at nobis optio facere qui quaerat quae non dicta eaque, et doloremque voluptatibus eum quod adipisci, praesentium ducimus.</p>
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
    </v-layout>
  </v-card>
</template>

<script>

export default {
  data () {
    return {
      pageIdx: 1,
      numPerPage: 5
    }
  },
  created () {
    this.$store.dispatch('setFullWidth', false)
  },
  computed: {
    blogs () {
      return this.$store.getters.blogs
    },
    recentViewed () {
      let recentViewed = [...this.$store.getters.recentViewed]
      let showCount = 5
      if (recentViewed.length < showCount) return recentViewed
      return recentViewed.splice(0, showCount)
    },
    favArray () {
      let blogs = [...this.blogs]
      let sortedBlog = blogs.sort((a, b) => {
        return parseInt(a.viewCount) < parseInt(b.viewCount) ? 1 : -1
      })
      let showCount = 8
      if (sortedBlog.length < showCount) return sortedBlog
      return sortedBlog.splice(0, showCount)
    },
    showingBlog () {
      if (!this.blogs) return []
      return this.blogs.slice((this.pageIdx - 1) * this.numPerPage, this.pageIdx * this.numPerPage > this.blogs.length ? this.blogs.length : this.pageIdx * this.numPerPage)
    },
    pageLength () {
      if (!this.blogs) return 0
      return Math.ceil(this.blogs.length / this.numPerPage)
    },
    tags () {
      let tags = this.$store.getters.tags
      let tagArr = []
      for (let t in tags) {
        let tag = {name: t}
        tag.count = tags[t].count
        tagArr.push(tag)
      }
      return tagArr
    }
  },
  methods: {
    onTagClicked (tag) {
      let tag64 = encodeURIComponent(tag)
      this.$router.push('/blogs/' + tag64)
    },
    onBlogClicked (blog) {
      this.$store.dispatch('pushRecentViewed', blog)
      this.$router.push(`/blog/${blog.id}`)
    },
    pad (n) {
      return (n < 10) ? ('0' + n) : n
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
.blog-link {
  color: #1f4777;
}
.tag-link {
  color: #1f4777;
}
</style>
