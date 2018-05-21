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
                <v-chip
                  small
                  outline
                  label
                  v-for="tag in tags"
                  :key="tag.name"
                  @click="onTagClicked(tag)"
                >
                  <a class="tag-link">{{ tag.name }}</a>
                  <span class="ml-1">{{ tag.count }}</span>
                </v-chip>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-container>
              <h2>文章列表 - {{ tag }}</h2>
              <v-divider></v-divider>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <social-network-list></social-network-list>
        </v-flex>
        <v-flex xs12>
          <div class="comments">
            <vue-disqus shortname="xingpeng-blog" :identifier="pageId" url="http://md.xp-da.com"></vue-disqus>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
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
  }
}
</script>
