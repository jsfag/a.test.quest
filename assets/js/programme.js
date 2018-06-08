'use strict'
// Utils
const elemQuery = selector => document.querySelector(selector)
const elemMake = tagName => document.createElement(tagName)
const textMake = text => document.createTextNode(text)
// const elemAppend = (root, child) => root.appendChild(child)
const addClass = (el, name) => el.classList.add(name)

function addRow(cityCode = '', countryName = '') {
  const root = elemQuery('#table')
  const row = makeRow(cityCode, countryName)
  root.appendChild(row)
}

function makeRow(cityCode, countryName) {
  const row = elemMake('div')
  
  const colCode = elemMake('div')
  const colName = elemMake('div')

  const nodeCode = textMake(cityCode)
  const nodeName = textMake(countryName)

  colCode.appendChild(nodeCode)
  colName.appendChild(nodeName)

  addClass(colCode, 'code')
  addClass(colName, 'country')

  row.appendChild(colCode)
  row.appendChild(colName)

  return row
}

// addRow('RU', 'Russia')

const countries = []
window.onload = init()

async function init() {
  try {
    const dataRow = await fetch('assets/data/data.json')
    const data = await dataRow.json()
    // 
    for(const item in data) {
      countries.push({
        code: item,
        country: data[item]
      })
    }
    processData(sortName(countries))(addRow)
  }catch(err) {
    throw new Error(err)
  }
}

const processData = data => fn => data.forEach((item, i) => fn(item.code, item.country, i))

function replaceTable(code, country, i) {
  const table = elemQuery('#table')
  
  if(!table.childNodes[i]) return

  const row = makeRow(code, country)
  table.replaceChild(row, table.childNodes[i])
}

const sortCode = arr => arr.sort((a, b) => a.code > b.code ? 1 : -1)
const sortName = arr => arr.sort((a, b) => a.country > b.country ? 1 : -1)

const sortHandler = fn => processData(fn(countries))(replaceTable)

function filteredCountries() {
  const e = window.event
  const input = e.target
  const filter = new RegExp(input.value, 'i')
  const table = elemQuery('#table')
  
  if(input.value) {
    // 
    Array.from(table.childNodes).forEach(el => el.remove())
    const filCountries = countries.filter(({ country }) => country.match(filter))
    processData(filCountries)(addRow)
  }
}