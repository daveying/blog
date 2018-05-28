<template>
  <div>
    <vue-markdown
      class="markdown-body"
      @rendered="rendered()"
      :toc="true"
      toc-id="toc"
      @toc-rendered="tocRendered"
    >{{ md }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'
export default {
  props: ['md'],
  methods: {
    tocRendered (tocHtml) {
      console.log('toc generated')
      console.log(tocHtml)
    },
    rendered () {
      // wait for DOM generation
      setTimeout(() => Prism.highlightAll(), 30)
    }
  },
  components: { VueMarkdown, Prism }
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
  font-size: 1.2em;
}

.markdown-body pre code::before,
.markdown-body pre code::after {
  content: none;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  color: #1f4777;
}

</style>
