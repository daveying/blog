<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-xs>
      <v-layout row wrap>
        <v-flex v-for="blog in blogs" :key="blog.id" xs12 my-1>
          <v-card>
            <v-container class="px-3 py-2">
              <v-layout row wrap>
                <v-flex xs12>
                  <h2 @click="onBlogClicked(blog)"><a class="blog-link">{{ blog.title }}</a></h2>
                  <p>
                    发布时间: {{ blog.createdDate }}, 浏览量: {{ blog.viewCount }}次
                    <v-chip @click="onTagClicked(tag)" small outline v-for="tag in blog.tags" :key="tag"><a class="tag-link">{{ tag }}</a></v-chip>
                  </p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius molestias exercitationem dolores, a totam molestiae dolorem eligendi nesciunt pariatur aperiam voluptatum! Quaerat soluta minima, quidem quasi sapiente id vero porro? <a @click="onBlogClicked(blog)" class="blog-link">[继续阅读...]</a></p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap py-4 class="text-xs-center">
        <v-flex xs8 offset-xs2>
          <v-pagination circle :length="15" v-model="pageIdx"></v-pagination>
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
      pageId: '123'
    }
  },
  computed: {
    blogs () {
      return this.$store.getters.blogs
    }
  },
  methods: {
    onTagClicked (tag) {
      console.log('clicked ' + tag)
      this.$router.push('/blogs')
    },
    onBlogClicked (blog) {
      console.log('clicked ' + blog.title)
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
