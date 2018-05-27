<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md9>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-container class="px-3 py-2">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <!-- <h2 @click="onBlogClicked(blog)"><a class="blog-link">{{ blog.title }}</a></h2> -->
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
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md3>
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
var Base64 = require('js-base64').Base64

export default {
  props: ['id'],
  computed: {
    blog () {
      console.log(this.id)
      return this.$store.getters.blogs.find(blog => blog.id === this.id)
    }
  },
  methods: {
    onTagClicked (tag) {
      let tag64 = Base64.encode(tag)
      this.$router.push('/blogs/' + tag64)
    },
    onBlogClicked (blog) {
      console.log('clicked ' + blog.title)
      this.$router.push(`/blog/${blog.id}`)
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
