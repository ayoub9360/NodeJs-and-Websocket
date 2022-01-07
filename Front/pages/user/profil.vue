<template>
  <div class="profil">
    <p>UserId : {{ $auth.user._id }}</p>
    <p>Email : {{ $auth.user.email }}</p>
    <p @click="$auth.logout()">Logout</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>

<style lang="scss" scoped>
.profil {
  min-height: calc(100vh - 64px);
  background-color: rgba(243, 244, 246, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
