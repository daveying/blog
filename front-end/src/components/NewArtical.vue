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
          <v-layout align-content-start class="item-container">
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
          @onDrag="onDrag()"
        >
          <div id="editor">
            <MonacoEditor
              height="100%"
              language="markdown"
              :code="code"
              :editorOptions="options"
              :theme="`vs`"
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
      code: '# Type away! \n',
      options: {
        selectOnLineNumbers: true,
        roundedSelection: true,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: false,
        glyphMargin: false
      }
    }
  },
  methods: {
    onMounted (editor) {
      this.editor = editor
    },
    onCodeChange (editor) {
      console.log(editor.getValue())
    },
    onDrag () {
      this.editor.layout()
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
  background-color: #fffffe;
  border: solid 1px #fffffe;
}

.editing-item {
  padding: 10px 10px;
  background-color: #eaeaea;
  border: solid 1px #eaeaea;
}

.item-container {
  background-color: #f0f0f0;
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
