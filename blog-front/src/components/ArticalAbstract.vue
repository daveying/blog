<template>
  <v-container fluid mx-0 px-0>
    <v-card>
      <v-layout row wrap>
        <v-flex xs12>
          <h2>{{ title }}</h2>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          创建时间: {{ createdDate }}, 浏览量: {{ viewCount }}次
          <v-chip small outline v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius molestias exercitationem dolores, a totam molestiae dolorem eligendi nesciunt pariatur aperiam voluptatum! Quaerat soluta minima, quidem quasi sapiente id vero porro?</p>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'createdDate', 'viewCount', 'tags']
  // data () {
  //   return {
  //     title: '第一篇文章',
  //     createdDate: new Date(),
  //     viewCount: 1234,
  //     tags: ['HTML', 'WebGL', 'THREE']
  //   }
  // }
}
</script>
