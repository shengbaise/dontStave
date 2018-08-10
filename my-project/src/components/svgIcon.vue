/*
 * @Author: chenxu
 * @Date: 2018-06-15 10:17:18
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-08 16:06:41
 * @descript: 使用示例：
 * 从阿里库中下载svg，将svg文件放入static/icons/下，使用时将svg import进components/SvgIcon.vue中
 * 组件中使用eg: <svg-icon name="edit"></svg-icon>
 */

<template>
  <svg class="icon">
    <use :xlink:href="uid"></use>
  </svg>
</template>

<script>
import '../../static/icons/dynamic.svg'
import '../../static/icons/home.svg'
import '../../static/icons/my.svg'
import '../../static/icons/object.svg'
import '../../static/icons/back.svg'
// icons
// import '../assets/icons/add.svg'
// import '../assets/icons/business-management.svg'
// import '../assets/icons/contacts.svg'
// import '../assets/icons/customer.svg'
// import '../assets/icons/delete.svg'
// import '../assets/icons/edit.svg'
// import '../assets/icons/email.svg'
// import '../assets/icons/person.svg'
// import '../assets/icons/person-setting.svg'
// import '../assets/icons/quotation.svg'
// import '../assets/icons/sales-report.svg'
// import '../assets/icons/search.svg'
// import '../assets/icons/select.svg'
// import '../assets/icons/setting.svg'
// import '../assets/icons/reduce.svg'
// import '../assets/icons/delete_2.svg'
// import '../assets/icons/delete_3.svg'
// import '../assets/icons/add_1.svg'
// import '../assets/icons/add_2.svg'
// import '../assets/icons/drag.svg'
// import '../assets/icons/filter.svg'
// import '../assets/icons/wrong.svg'
// import '../assets/icons/triangle-down.svg'
// import '../assets/icons/back.svg'

export default {
  name: 'svgIcon',
  props: {
    name: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    uid () {
      return `#${this.name}`
    }
  }
}
</script>

<style scoped lang="scss">
  .svg-icon{
    display: inline-block;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
