<template>
  <div>
    <vue-markdown class="markdown-body" :prerender="prerender" :postrender="postrender">{{ md }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  props: ['md'],
  methods: {
    prerender (mdSource) {
      console.log('perrender', mdSource)
      return mdSource
    },
    postrender (htmlData) {
      console.log('postrender', htmlData)
      return htmlData
    }
  },
  components: { VueMarkdown }
}
</script>

<style>
@import '../../node_modules/github-markdown-css/github-markdown.css';
@import '../../node_modules/prismjs/themes/prism.css';
@import '../../node_modules/katex/dist/katex.min.css';
.markdown-body code {
  padding: 2px 5px;
  margin: 0px;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-weight: normal;
  font-size: 1em;
  display: initial;
}

.markdown-body code::before,
.markdown-body code::after {
  content: none;
}

.markdown-body pre code {
  font-weight: normal;
}

.markdown-body pre code::before,
.markdown-body pre code::after {
  content: none;
}
</style>
