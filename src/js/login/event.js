import { $ } from '../common/utils.js'
import { fetchPost } from '../common/fetch.js'
import { check } from '../common/formCheck.js'
export default (opts = {}) => {
  const $loginForm = $('login-form')
  const $loginAccount = $('login-account')
  const $loginPwd = $('login-password')
  const $clearAccount = $('clear-account')
  const $clearPwd = $('clear-password')
  const $remember = $('login-remember')
  const $error = $('login-error')
  $loginForm.onsubmit = async (e) => {
    e.preventDefault(e)
    const checkResults = check($loginForm)
    if (!checkResults.length) {
      let remember = 0
      if ($remember.checked) {
        remember = 1
      }
      const data = await fetchPost('/login', {
        count: $loginAccount.value,
        password: $loginPwd.value,
        remember: remember
      })
      if (data.code === 200) {
        opts.success && opts.success()
      } else {
        $error.innerHTML = data.message
      }
    } else {
      const name = checkResults[0].name
      const type = checkResults[0].type
      if (type === 'present') {
        if (name === 'account') {
          $error.innerHTML = '请填写您的用户名'
        } else if (name === 'password') {
          $error.innerHTML = '请填写您的密码'
        }
      }
    }
  }
  $clearAccount.onClick = () => {
    $loginAccount.value = ''
    $clearAccount.style.display = 'none'
  }
  $clearPwd.onClick = () => {
    $loginPwd.value = ''
    $clearPwd.style.display = 'none'
  }
  $loginAccount.oninput = () => {
    if (this.value.length) {
      $clearAccount.style.display = 'block'
    } else {
      $clearAccount.style.display = 'none'
    }
    $error.innerHTML = ''
  }
  $loginPwd.oninput = () => {
    if (this.value.length) {
      $clearPwd.style.display = 'block'
    } else {
      $clearPwd.style.display = 'none'
    }
    $error.innerHTML = ''
  }
}