<template>
  <v-card flat class="grey lighten-5">
    <v-container class="my-0" fluid style="min-height: 0;" grid-list-xs>
      <v-layout row wrap>
        <v-flex v-for="blog in blogs" :key="blog.id" xs12>
          <ArticalAbstract
            :title="blog.title"
            :createdDate="blog.createdDate"
            :viewCount="blog.viewCount"
            :tags="blog.tags"
          ></ArticalAbstract>
        </v-flex>
      </v-layout>
      <v-layout py-4 class="text-xs-center">
        <v-flex xs12>
          <v-pagination :length="15" v-model="pageIdx" :total-visible="7"></v-pagination>
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
import ArticalAbstract from '@/components/ArticalAbstract.vue'
export default {
  data () {
    return {
      pageIdx: 1
    }
  },
  computed: {
    blogs () {
      return this.$store.getters.blogs
    }
  },
  components: {ArticalAbstract}
}
</script>
