<template>
  <v-card>
    <v-container class="px-3 py-2">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>{{ title }}</h2>
          <p>
            创建时间: {{ createdDate }}, 浏览量: {{ viewCount }}次
            <v-chip small outline v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius molestias exercitationem dolores, a totam molestiae dolorem eligendi nesciunt pariatur aperiam voluptatum! Quaerat soluta minima, quidem quasi sapiente id vero porro?</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
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
