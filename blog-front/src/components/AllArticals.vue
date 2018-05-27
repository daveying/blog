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
                :key="month"
                row
                wrap
              >
                <h3>{{ month.year }}年{{ month.month }}月</h3>
                <ul>
                  <li v-for="item in month.items" :key="item">
                    <a :href="item.url">{{ item.title }}</a>
                  </li>
                </ul>
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
      pageIdx: 1,
      selectedBlogs: this.$store.getters.tags['all']
    }
  },
  computed: {
    mounthArr () {
      return [
        {
          month: this.selectedBlogs[0].createdDate.month,
          year: this.selectedBlogs[0].createdDate.year,
          items: [this.selectedBlogs[0]]
        }
      ]
      // for (let i = 1, l = this.selectedBlogs.length; i < l; i++) {
      //   let month = {}
      // }
    },
    tag () {
      return Base64.decode(this.tag64)
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
    }
  }
}
</script>
