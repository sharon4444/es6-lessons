import '../common/polyfill.js'
import render from './render.js'
// import bindEvent from './event.js'

const login = (opts = {}) => {
  const defaultOpts = {
    loginBtnText: '登 录',
    accountPlaceHolder: '手机号/邮箱/账号',
    accountLabel: '',
    passwordPlaceHolder: '请填写密码',
    passwordLabel: '',
    verifyPlaceHolder: '验证码',
    accountMax: '30',
    passwordMax: '30',
    showRemember: true,
    autocomplete: false
  }
  const options = Object.assign(defaultOpts, opts)
  render(options)
  // bindEvent(options)
}
export {login}