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
    </v-container>
  </v-card>
</template>

<script>
import ArticalAbstract from '@/components/ArticalAbstract.vue'
export default {
  computed: {
    blogs () {
      return this.$store.getters.blogs
    }
  },
  components: {ArticalAbstract}
}
</script>
