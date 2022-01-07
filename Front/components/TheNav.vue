<template>
  <div>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet" />
    <ul class="flex pt-5 pb-5 pl-5 pr-5">
      <li class="mr-6">
        <nuxt-link class="text-blue-500 hover:text-blue-800" to="/">Accueil | </nuxt-link>
        <nuxt-link class="text-blue-500 hover:text-blue-800" to="/message">Chat </nuxt-link>
      </li>
      <li class="mr-6 user">
        <nuxt-link v-if="!$auth.loggedIn" class="text-blue-500 hover:text-blue-800" to="/user/login"
          >Login |
        </nuxt-link>
        <nuxt-link v-if="!$auth.loggedIn" class="text-blue-500 hover:text-blue-800" to="/user/signup"
          >signup
        </nuxt-link>
        <nuxt-link v-if="$auth.loggedIn" class="text-blue-500 hover:text-blue-800" to="/user/profil">Profil</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.user {
  margin-left: auto;
}
</style>
