import { debounce } from '../../utils/util'

Component({

  behaviors: [],

  properties: {
    isReadonly: {
      type: Boolean,
      value: false
    },
    top: {
      type: Number,
      value: 0
    },
    width: {
      type: [Number, String],
      value: '80%'
    },
    marginRight: {
      type: [Number, String],
      value: '40px'
    }
  },
  data: {
    isSelectType: false,
    searchContent: '',
    currentSearchType: '科技',
    typeItems: [
      {name: 'scienceTechnology', value: '科技'},
      {name: 'recipe', value: '食谱'},
      {name: 'animInfo', value: '生物'},
      {name: 'nature', value: '自然'}
    ],
    timer: null,
    begin: null
  }, // 私有数据，可用于模版渲染
  methods: {
    handleClick () {
      this.triggerEvent('click')
    },
    selectSearchType () {
      if (!this.data.isSelectType) {
        this.setData({
          isSelectType: true
        })
      } else {
        this.setData({
          isSelectType: false
        })
      }
    },
    searchTypeRadioChange (e) {
      this.currentSearchType = e.target.value
    },
    search () {
      if (this.data.searchContent) {
        this.triggerEvent('search', this.data.searchContent)
      }
    },
    handleFocus () {
      this.triggerEvent('handle-search')
    },
    setInputValue (value) {
      this.setData({
        searchContent: value
      })
    },
    handleInput ({detail}) {
      debounce(this.setInputValue, 2000, false)(detail.value)
      // this.setInputValue(detail.value)
    }
  }
})
