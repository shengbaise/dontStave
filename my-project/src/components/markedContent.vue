<!-- 处理markedContent -->
<template>
    <div class="markdown-body">
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script>
let marked = require('marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

export default {
  name: 'MarkedContent',
  props: {
    mdString: {
      type: String,
      default: ''
    }
  },
  computed: {
    compiledMarkdown () {
      let htmlContent = this.mdString
      const content = marked(htmlContent || '', {
        sanitize: false
      })
      return this.handleStyle(content)
    }
  },
  methods: {
    handleStyle (content) {
      /* eslint-disable */
			const result = content.replace(/\<img/g, '<img style="width: 100%;" mode="widthFix"')
        .replace(/\<h3/g, '<h3 style="margin-top: 24px;margin-bottom: 16px;font-weight: 600;line-height: 1.25;font-size: 1.25em;color: #24292e;"')
        .replace(/\<p/g, '<p style="margin-top: 0;margin-bottom: 16px;"')
        .replace(/\<h2/g, '<h2 style="font-size: 1.5em;margin-top: 24px;margin-bottom: 16px;font-weight: 600;line-height: 1.25;"')
        .replace(/\<code/g, `<code style="padding: .2em .4em;margin: 0;font-size: 85%;background-color: rgba(27,31,35,0.1);border-radius: 3px;color: #bd4147;display: inline-block;"`)
				.replace(/\<li/g, `<li style="color: #24292e;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size: 16px;line-height: 1.5;"`)
				.replace(/\<blockquote/g, '<blockquote style="padding: 0 1em;color: #6a737d;border-left: .25em solid #dfe2e5;margin-bottom: 16px;font-size: 18px;font-weight: 300;"')
			/* eslint-enable */
      return result
    }
  }
}
</script>

<style lang="scss">
.markdown-body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  line-height: 1.5;
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 32rpx;
  line-height: 1.5;
  word-wrap: break-word;
}
</style>
