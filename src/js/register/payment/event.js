import { fetchPost } from '../../common/fetch';
import { $ } from '../../common/utils.js'
// import FormCheck from '../../common/form-check';

export default (opts) => {
  const $form = $('register-payment-form')
  $form.onsubmit = async (e) => {
    e.preventDefault()
    let formValue = {}
    Array.from($form.element).forEach(item => {
      if (item.name) {
        formValue[item.name] = item.value
      }
    })
    let data = await fetchPost('/register/payment', formValue)
    if (data.code === 200) {
      opts.success && opts.success()
    }
  }
}