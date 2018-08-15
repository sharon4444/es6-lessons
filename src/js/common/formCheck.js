const formatText = (key) => {
  return '您填写的' + key + '格式不正确'
};

const rules = {
  email: (v) => {
    if (!v.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        return {
            type: 'email',
            message: formatText('邮箱')
        }
    }
  },
  mobile: (v) => {
    if (!v.match(/^1(3|4|5|7|8)\d{9}$/)) {
        return {
            type: 'mobile',
            message: formatText('手机号')
        }
    }
  },
  present: v => {
    if (v.trim() === '') {
      return {
        type: 'present',
        message: '必填'
      }
    }
  }
}

const check = (form) => {
  if (!(form && form.elements)) {
    return false
  }
  const elements = form.elements
  const checkResults = []
  Array.from(elements).filter(item => {
    return item.getAttribute('valid')
  }).map(item => {
    let errorResult = []
    const value = item.value
    const valids = item.getAttribute('valid').split(',')
    valids.forEach(valid => {
      if (rules[valid]) {
        let result = rules[valid](value)
        result && errorResult.push(result)
      }
    })
    if (errorResult.length) {
      checkResults.push({
        dom: item,
        errorArr: errorArr,
        name: item.name,
        message: errorArr[0].message,
        type: errorArr[0].type
      })
    }
  })
  return checkResults
}
export { check }