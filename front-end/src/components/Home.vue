<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md8>
          <v-layout row wrap>
            <v-flex v-for="blog in blogs" :key="blog.id" xs12>
              <v-card>
                <v-container class="px-3 py-2">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <h2 @click="onBlogClicked(blog)"><a class="blog-link">{{ blog.title }}</a></h2>
                      <p>
                        发布时间: {{ blog.createdDate.getFullYear() }}年{{ blog.createdDate.getMonth() + 1 }}月{{ blog.createdDate.getDate() }}日, 浏览量: {{ blog.viewCount }}次
                        <v-chip @click="onTagClicked(tag)" small outline v-for="tag in blog.tags" :key="tag"><a class="tag-link">{{ tag }}</a></v-chip>
                      </p>
                    </v-flex>
                    <v-flex xs12>
                      <div>
                        <markdown :md="blog.abstract"></markdown>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row py-4 class="text-xs-center">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
              <v-pagination :length="15" v-model="pageIdx"></v-pagination>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4>
          <v-card>
            <v-container>
              <h3 class="mb-2">标签列表</h3>
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
          <v-card class="mt-2">
            <v-container>
              <h3 class="mb-2">关于作者</h3>
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
// var Base64 = require('js-base64').Base64

export default {
  data () {
    return {
      pageIdx: 1,
      pageId: '123'
    }
  },
  computed: {
    blogs () {
      return this.$store.getters.blogs
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
