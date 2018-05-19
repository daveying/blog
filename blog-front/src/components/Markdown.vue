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
@import '../../node_modules/prismjs/themes/prism.css';
@import '../../node_modules/katex/dist/katex.min.css';
</style>
