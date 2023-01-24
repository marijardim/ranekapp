<template>
  <section class="user">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{name: 'user'}">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{name: 'buy'}">Compras</router-link>
        </li>
        <li>
          <router-link :to="{name: 'sell'}">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{name: 'user-edit'}">Editar Usuário</router-link>
        </li>
        <li>
          <button @click.prevent='logout'>Deslogar</button>
        </li>
      </ul>
    </nav>
    <router-view v-slot='{ Component }'>
      <transition name='fade'>
        <component :is='Component' />
      </transition>
    </router-view>
  </section>
</template>

<script>
export default {
  name: 'UserView',
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.user {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  gap: 30px;
  padding: 20px;
}
@media screen and (max-width: 500px) {
  .user {
    grid-template-columns: 1fr;
    margin: 0px auto;
  }
}
.sidenav a, .sidenav button{
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}
.sidenav a.router-link-exact-active{
  background: #87f;
  color: #fff;
}
.sidenav button{
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.sidenav a:hover, .sidenav button:hover{
  background: #fff;
  color: #000;
}
.sidenav a.router-link-exact-active:hover{
  background: #87f;
  color: #fff;
}
</style>
