<!-- 处理markedContent -->
<template>
  <div class="markdown-body">
    <wxparser :rich-text=compiledMarkdown />
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
      // return content
    }
  },
  methods: {
    handleStyle (content) {
      /* eslint-disable */
      const result = content
        // .replace(/\<img/g, '<img style="width: 100%;" mode="widthFix"')
        .replace(/\<code/g, `<code style="padding: .2em .4em;margin: 0;font-size: 85%;background-color: rgba(27,31,35,0.1);border-radius: 3px;color: #bd4147;display: inline-block;"`)
        .replace(/\<blockquote/g, '<blockquote style="padding: 0 1em;color: #6a737d;border-left: .25em solid #dfe2e5;margin-bottom: 16px;font-size: 18px;font-weight: 300;"')
        // .replace(/li/g, 'div')
        // .replace(/ul/g, 'div')
        // .replace(/ol/g, 'div')
      /* eslint-enable */
      console.info(content, 'content')
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
  .wxparser--wxParser-h2,
  .wxparser--wxParser-h3,
  .wxparser--wxParser-h4 {
    margin: 0 !important;
  }
  .wxparser--wxParser-li-text,
  .wxparser--wxParser-ol-li-text {
    line-height: 1.5em !important;
  }
  .wxparser--wxParser-ol-li {
    margin: 0 !important;
    color: #333;
    font-size: 14px;
  }
  .wxparser--wxParser-li{
    font-size: 14px;
    // margin-bottom: 6px;
    color: #333;
    letter-spacing: 2px;
  }
  .wxparser--wxParser-ol {
    margin: 0 6px !important;
  }
  .wxparser--wxParser-inline {
    height: 0;
  }
  .wxparser--wxParser-li,
  .wxparser--wxParser-ol,
  .wxparser--wxParser-ul,
  .wxparser--wxParser-h1,
  .wxparser--wxParser-h2,
  .wxparser--wxParser-h3,
  .wxparser--wxParser-p {
    .wxparser--wxParser-inline {
      height: auto !important;
    }
  }
}
</style>
