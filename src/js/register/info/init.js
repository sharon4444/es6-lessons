import '../../common/polyfill.js'
import render from './render.js'
import bindEvent from './event.js'
const regInfo = (opts = {}) => {
  const defaultOpts = {}
  const options = Object.assign(opts, defaultOpts)
  render(options)
  bindEvent(options)
}
export {regInfo}
