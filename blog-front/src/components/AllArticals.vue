<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-container>
              <h2>所有标签</h2>
              <v-divider></v-divider>
              <v-layout wrap class="mt-2">
                <span
                  v-for="tag in tags"
                  :key="tag.name"
                >
                  <v-chip
                    small
                    outline
                    label
                    :color="tag.color"
                    @click="onTagClicked(tag.name)"
                  >
                    <a class="tag-link">{{ tag.name === 'all' ? '所有文章' : tag.name }}</a>
                    <span class="ml-1">{{ tag.count }}</span>
                  </v-chip>
                </span>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-container>
              <h2>文章列表 - {{ this.tag === 'all' ? '所有文章' : this.tag }}</h2>
              <v-divider></v-divider>
              <v-layout
                v-for="month in monthArr"
                :key="month.key"
                row
                wrap
              >
                <v-flex xs12>
                  <h3>{{ month.year }}年{{ month.month + 1 }}月</h3>
                </v-flex>
                <v-flex xs12>
                  <ul>
                    <li v-for="item in month.items" :key="item.id">
                      <h3 @click="onBlogClicked(item)">{{ item.title }}</h3>
                    </li>
                  </ul>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <social-network-list></social-network-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
var Base64 = require('js-base64').Base64

export default {
  props: ['tag64'],
  data () {
    return {
      pageIdx: 1
    }
  },
  computed: {
    tag () {
      return Base64.decode(this.tag64)
    },
    monthArr () {
      let selectedBlogs = this.$store.getters.tags[this.tag].blogs
      if (!selectedBlogs[0]) {
        return []
      }
      let arr = [
        {
          month: selectedBlogs[0].createdDate.getMonth(),
          year: selectedBlogs[0].createdDate.getFullYear(),
          items: [selectedBlogs[0]],
          key: 0
        }
      ]
      let arrLen = 1
      for (let i = 1, l = selectedBlogs.length; i < l; i++) {
        if (selectedBlogs[i].createdDate.getFullYear() === arr[arrLen - 1].year && selectedBlogs[i].createdDate.getMonth() === arr[arrLen - 1].month) {
          arr[arrLen - 1].items.push(selectedBlogs[i])
        } else {
          arr.push({
            month: selectedBlogs[i].createdDate.getMonth(),
            year: selectedBlogs[i].createdDate.getFullYear(),
            items: [selectedBlogs[i]],
            key: arrLen++
          })
        }
      }
      return arr
    },
    tags () {
      let tags = this.$store.getters.tags
      let tagArr = []
      for (let t in tags) {
        let tag = {name: t}
        tag.count = t.length
        tagArr.push(tag)
      }
      return tagArr
    }
  },
  methods: {
    onTagClicked (tag) {
      let tag64 = Base64.encode(tag)
      this.$router.push('/blogs/' + tag64)
    },
    onBlogClicked (blog) {
      this.$router.push(`/blog/${blog.id}`)
    }
  }
}
</script>
