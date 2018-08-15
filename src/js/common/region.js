import { $ } from './utils.js'
import { fetchJson } from './fetch.js'

const render = Symbol('render')
const event = Symbol('event')
class Region {
  constructor (opts) {
    if (!opts.container) {
      throw '请填写container配置'
    } else if (!opts.name) {
      throw '请填写那么配置'
    } else {
      this[render](opts)
      this[event](opts)
    }
  }
  [render](opts) {
    const tpl = `
      <div class="region-select-wrapper">
        <select id="region-province-select"></select>
        <select id="region-city-select"></select>
        <select id="region-area-select"></select>
        <input id="region-selected" type="hidden" name="${opts.name}" valid="${opts.present ? 'present' : ''}"
      </div>
    `
    opts.container.innerHTML = tpl
  }
  async [event](opts) {
    let regionData = await fetchJson('/region-data', {})
    regionData = regionData.data
    const $provinceSelect = $('region-province-select')
    const $citySelect = $('region-city-select')
    const $areaSelect = $('region-area-select')
    const $result = $('region-selected')

    let provinceSelected;
    let citySelected;
    let areaSelected;

    let provinceOptions = '<option></option>'

    for (let item of regionData) {
      provinceOptions += `<option value="${item.id}">${item.name}</option>`
    }
    $provinceSelect.innerHTML = provinceOptions

    const provinceChange = () => {
      const i = parseInt($provinceSelect.value)
      const cityData = regionData[i - 1].city
      let cityOptions = ''
      provinceSelected = i
      for (let item of cityData) {
        cityOptions += `<option value="${item.id}">${item.name}</option>`
      }
      $citySelect.innerHTML = cityOptions
    }

    const cityChange = () => {
      const j = parseInt($citySelect.value)
      citySelected = j
      const areaData = regionData[provinceSelected - 1].city[j - 1].district
      let areaOptions = ''
      for (let item of areaData) {
        areaOptions += `<option value="${item.id}">${item.name}</option>`
      }
      $areaSelect.innerHTML = areaOptions
    }

    const areaChange = () => {
      areaSelected = parseInt($areaSelect.value)
      $result.value = `${provinceSelected},${citySelected},${areaSelected}`
    }

    $provinceSelect.onchange = (e) => {
      provinceChange()
      cityChange()
      areaChange()
    }
    $cityceSelect.onchange = (e) => {
      cityChange()
      areaChange()
    }
    $areaSelect.onchange = (e) => {
      areaChange()
    }
  }
}

export default Region