<template>
  <div>
    <vue-markdown class="markdown-body">{{ md }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  props: ['md'],
  components: { VueMarkdown }
}
</script>

<style>
@import '../style/github-markdown.css';
@import url(https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism.min.css);
@import url(https://unpkg.com/katex@0.6.0/dist/katex.min.css);
</style>
