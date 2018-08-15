import { $ } from '../common/utils.js'
const render = Symbol('render')
const event = Symbol('event')
const style = '<style></style>'

class Slider {
  constructor (opts) {
    this.opts = opts
    if (!opts.container) {
      throw '请填写container配置'
    } else {
      this[render](this.opts)
      this[event](this.opts)
    }
  }
  [render](opts){
    const unsuccessTip = opts.unsuccessTip || ''
    const tpl = style + `
      <div id="vs-wrapper" class="vs-wrapper">
        <div id="vs-moved-bg"></div>
        <div id="vs-move-btn></div>
        <div id="vs-unmoved-bg"></div>
        <span id="vs-text" class="vs-text">
          ${ unsuccessTip}
        </span>
      </div>
    `
    opts.container.innerHTML = tpl
  }
  [event](opts){
    const $btn = $('vs-move-btn')
    const $moved = $('vs-moved-bg')
    const $wrapper = $('vs-wrapper')
    const $text = $('vs-text')
    const reset = () => {
      this.startX = 0
      this.startY = 0
      this.start = false
      this.end = false
      this.offsetArr = []
      $btn.style.left = 0 + 'px'
      $moved.style.width = 0 + 'px'
    }
    $btn.onmousedown = () => {
      this.start = true
      this.startX = e.pageX
      this.startY = e.pageY
      this.offsetArr = []
    }
    $btn.onmousemove = () => {
      if (this.start && !this.end) {
        let offsetX = e.pageX - this.startX
        let offsetY = e.pageY - this.startY
        this.offsetArr.push(offsetX + ',' + offsetY)
        $btn.style.left = offsetX + 'px'
        $moved.style.width = offsetX + 'px'
        let r1 = parseInt(window.getComputedStyle($moved).width)
        let r2 = parseInt(window.getComputedStyle($wrapper).width) - parseInt(window.getComputedStyle($btn).width)
        if (r1 >= r2) {
          this.start = false
          this.end = true
          $btn.style.left = r2 + 'px'
          $moved.style.width = r2 + 'px'
          opts.success && opts.success($wrapper, $text, this.offsetArr)
        }
      }    
    }
    $btn.onmouseup = () => {
      if (!this.end) {
        reset()
      }
    }
  }
  reset () {
    this[render](this.opts)
    this[event](this.opts)
  }
}
export default Slider