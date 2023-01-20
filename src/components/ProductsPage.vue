<template>
  <ul v-if='totalPages > 1'>
    <li v-for='page in pageRange' :key='page'>
      <router-link :to='{query: query(page) }'>{{ page }}</router-link>
    </li>
  </ul>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ProductsPage',
  props: {
    productsPerPage: {
      type: Number,
      default: 1
    },
    productsTotal: {
      type: Number,
      default: 1
    }
  },
  methods: {
    query (page) {
      return {
        ...this.$route.query,
        _page: page
      }
    }
  },
  computed: {
    totalPages () {
      const total = this.productsTotal / this.productsPerPage
      return total !== Infinity ? Math.ceil(total) : 0
    },
    pageRange () {
      const current = Number(this.$route.query._page)
      const totalRange = 9
      const offset = Math.ceil(totalRange/2)
      const totalPages = this.totalPages
      const pagesArray = []

      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i)
      }
      
      pagesArray.splice(0, current-offset)
      pagesArray.splice(totalRange, totalPages)
      return pagesArray
    }
  }
}
</script>

<style scoped>
ul{
  grid-column: 1/-1;
}
li{
  display: inline-block;
}
li a{
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}
li a.router-link-exact-active, li a:hover {
  background: #87f;
  color: #fff;
}
</style>
