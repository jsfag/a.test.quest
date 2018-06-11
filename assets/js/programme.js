'use strict';

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
      if(!this.modal.code && !this.modal.country) return

      const row = new Object({
        code: this.modal.code,
        country: this.modal.country
      })

      this.countries.push(row)
      this.modal.code = ''
      this.modal.country = ''

      this.sortCountry()
      this.modalClose()
    }
  },
  computed: {
    filteredData() {
      const filter = new RegExp(this.filterText, 'i')
      return this.countries.filter(({ country }) => country.match(filter))
    }
  }
})