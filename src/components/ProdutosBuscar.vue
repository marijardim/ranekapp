<template>
  <form>
    <input name='search' id='search' type='text' v-model='search' placeholder='Buscar...'>
    <input @click='searchProducts' id='lupa' type='sumbit'/>
  </form>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    searchProducts () {
      this.$router.push({ query: { q: this.search } })
      console.log(this.search)
    }
  }
}
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
}
#search {
  width: 100%;
  padding: 20px;
  border: none;
}
#search:focus, #search:hover {
  outline: none;
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
}
#lupa {
  width: 62px;
  height: 62px;
  background: url(../assets/search.svg) no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}
</style>
