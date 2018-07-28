<template>
  <v-container fluid fill-height px-0 py-0>
    <vue-split style="width:100%"
      :elements="[
        '#fileNav',
        '#mainWin'
      ]"
      direction="horizontal"
      :min-size="100"
      :gutter-size="5"
      :snap-offset="50"
      :sizes="[25, 75]"
    >
      <div class="file-navigator" id="fileNav">
        <file-navigator></file-navigator>
      </div>
      <div id="mainWin" class="editor">
        <v-container fluid px-0 py-0>
          <v-layout align-content-start>
            <span :class="`editing-item ${i === 1 ? 'selected' : ''}`"
              v-for="(item,i) in 5"
              :key="i">
              {{ `sdfaowejknaldkda${i}.md` }}
            </span>
          </v-layout>
        </v-container>
        <vue-split style="width:100%"
          :elements="['#editor', '#preview']"
          direction="horizontal"
          :min-size="10"
          :gutter-size="7"
          :snap-offset="50"
          :sizes="[50, 50]"
        >
          <div id="editor">
            <MonacoEditor
              height="100%"
              language="typescript"
              :code="code"
              :editorOptions="options"
              @mounted="onMounted"
              @codeChange="onCodeChange"
              >
          </MonacoEditor>
          </div>
          <div id="preview">
            <h1>Preview</h1>
          </div>
        </vue-split>
      </div>
    </vue-split>
  </v-container>
</template>

<script>
import VueSplit from 'vue-splitjs'
import MonacoEditor from 'vue-monaco-editor'

export default {
  created () {
    this.$store.dispatch('setFullWidth', true)
  },
  data () {
    return {
      code: '// Type away! \n',
      options: {
        selectOnLineNumbers: false,
        theme: 'vs'
      }
    }
  },
  methods: {
    onMounted (editor) {
      this.editor = editor
    },
    onCodeChange (editor) {
      console.log(editor.getValue())
    }
  },
  components: {VueSplit, MonacoEditor}
}
</script>

<style>
.gutter {
  background-color: #eaeaea !important;
}
/* .gutter:hover {
  background-color: #e5e5e5 !important;
} */

.selected.editing-item {
  padding: 10px 10px;
  background-color: #fafafa;
  border: solid 1px #fafafa;
}

.editing-item {
  padding: 10px 10px;
  background-color: #eaeaea;
  border: solid 1px #eaeaea;
}

.file-navigator {
  background-color: #f0f0f0;
  border: solid 1px #eaeaea;
}

.editor {
  background-color: #f0f0f0;
  border: solid 1px #eaeaea;
}

</style>
