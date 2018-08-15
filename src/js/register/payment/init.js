import '../../common/polyfill.js'
import render from './render.js'
import event from './event.js'

const regPayment = (opts = {}) => {
  const defaultOpts = {
    paymentPlaceholder = '1',
    paymentPasswordPlaceholder = '2'
  }
  const options = Object.assign(opts, defaultOpts)
  render(options)
  event(options)
}
export { regPayment }