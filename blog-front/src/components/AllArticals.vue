<template>
  <v-container fluid mx-0 px-0>
    <v-layout v-for="blog in blogs" :key="blog.id">
      <v-flex xs12>
        <ArticalAbstract
          :title="blog.title"
          :createdDate="blog.createdDate"
          :viewCount="blog.viewCount"
          :tags="blog.tags"
        ></ArticalAbstract>
      </v-flex>
    </v-layout>
  </v-container>
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
