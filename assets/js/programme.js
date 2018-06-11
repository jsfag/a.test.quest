'use strict'
// Utils
const elemQuery = selector => document.querySelector(selector)
const elemMake = tagName => document.createElement(tagName)
const textMake = text => document.createTextNode(text)
const addClass = (el, name) => el.classList.add(name)

Vue.component('modal', {
  template: '#modal-template',
})

const data = new Vue({
  el: '#ROOT',
  data: {
    url: 'assets/data/data.json',
    countries: [],
    filterText: '',
    showModal: false,
    modal: {
      code: '',
      country: ''
    }
  },
  mounted() {
   this.getData()
  },
  methods: {
    async getData() {
      try {
        const dataRow = await fetch(this.url)
        const data = await dataRow.json()
        
        const countries = Object.entries(data)
          .map(([a, b]) => ({ code: a, country: b }))

        this.countries.push(...countries)
        this.sortCountry()
      }catch(err) {
        throw new Error(err)
      }
    },
    sortCode() {
      this.countries.sort((a, b) => a.code > b.code ? 1 : -1)
    },
    sortCountry() {
      this.countries.sort((a, b) => a.country > b.country ? 1 : -1)
    },
    modalOpen() {
      this.showModal = true
    },
    modalClose() {
      this.showModal = false
    },
    addCountry() {
      if(this.modal.code && this.modal.country) {
        this.countries.push({
          code: this.modal.code,
          country: this.modal.country
        })
        this.sortCountry()
        this.modalClose()
      }
    }
  },
  computed: {
    filteredData() {
      const filter = new RegExp(this.filterText, 'i')
      return this.countries.filter(({ country }) => country.match(filter))
    }
  }
})



// class Countries {
//   constructor(url = 'assets/data/data.json') {
//     this.url = url
//     this.data = []
//     this.dataCache = []

//     this.table = elemQuery('#table')
//     this.rows = []
//     this.filter = ''
//     this.getData()
//   }

//   async getData() {
//     try {
//       const dataRow = await fetch(this.url)
//       const data = await dataRow.json()
      
//       const countries = Object.entries(data)
//         .map(([a, b]) => ({ code: a, country: b }))

//       this.dataCache.push(...countries)
//       this.data = this.dataCache
//       this.sortCountry()
//       this.renderData()
//     }catch(err) {
//       throw new Error(err)
//     }
//   }

//   makeRow(code, country) {
//     const row = elemMake('div')
  
//     const colCode = elemMake('div')
//     const colName = elemMake('div')
  
//     const nodeCode = textMake(code)
//     const nodeName = textMake(country)
  
//     colCode.appendChild(nodeCode)
//     colName.appendChild(nodeName)
  
//     addClass(colCode, 'code')
//     addClass(colName, 'country')
  
//     row.appendChild(colCode)
//     row.appendChild(colName)
  
//     this.rows.push(row)
//   }

//   // FETCH -> DATA -> FILTER -> SORT -> RENDER

//   renderData(data = this.dataCache) {
//     this.rows = []
//     data
//       .filter(({ country }) => country.match(this.filter))
//       .forEach(({ code, country }) => this.makeRow(code, country))
    
//     Array.from(table.childNodes).forEach(el => el.remove())
//     // 
//     this.rows.forEach(row => table.appendChild(row))
//   }

//   filtData() {
//     const e = window.event
//     const input = e.target

//     this.filter = new RegExp(input.value, 'i')
//     this.renderData(this.data)
//   }

//   sortCode() {
//     this.data.sort((a, b) => a.code > b.code ? 1 : -1)
//     this.renderData(this.data)
//   }
//   sortCountry() {
//     this.data.sort((a, b) => a.country > b.country ? 1 : -1)
//     this.renderData(this.data)
//   }
  
//   addCountry() {
//     const e = window.event
//     const code = elemQuery('#code').value
//     const country = elemQuery('#country').value
    
//     if(code !== '' && country !== '') {
//       this.data.push({ code, country })
//       this.renderData(this.data)
//       close_modal()
//     }
//   }
// }

// function open_modal() {
//   document.body.classList.add('noscroll')
//   MODAL.style.display = 'block'
// }
// function close_modal() {
//   document.body.classList.remove('noscroll')
//   MODAL.style.display = 'none'
// }

// const data = new Countries()