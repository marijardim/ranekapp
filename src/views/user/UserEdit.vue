<template>
  <section>
    <UserForm>
      <button class="btn" @click.prevent='attUser'>Atualizar dados</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import { api } from '@/services/index.js'

export default {
  name: 'UserEdit',
  components: { UserForm },
  methods: {
    attUser () {
      api.put(`/user/${this.$store.state.user.id}`, this.$store.state.user)
        .then(() => {
          this.$store.dispatch('getUser')
          this.$router.push({ name: 'user' })
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
