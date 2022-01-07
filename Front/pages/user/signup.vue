<template>
  <div class="container">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet" />

    <h1>Signup page</h1>

    <form class="w-full max-w-sm" @submit.prevent="login">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-username"
            v-model="form.email"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="Email"
          />
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-password"
            v-model="form.password"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>

      <p v-if="error" class="text-red-600">{{ error }}</p>

      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: 'exemple@gmail.com',
        password: 'password',
      },
      error: null,
      success: null,
    }
  },
  methods: {
    login() {
      this.error = null

      //* check if all fields are filled
      if (!this.form.email || !this.form.password) return (this.error = 'Please fill all fields')

      //* Send create user request with axios
      this.$axios
        .post('/api/auth/signup', {
          email: this.form.email,
          password: this.form.password,
        })
        .then(() => {
          this.$router.push('/user/login')
        })
        .catch((error) => {
          error = error.response.data.error
          console.log(error)
          if (error._message === 'User validation failed') {
            return (this.error = 'This user already exists')
          }
          this.error = 'A problem occured, please try check your information and try again later'
        })
    },
  },
}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  min-width: 100%;
  flex-direction: column;
  h1 {
    font-size: 28px;
    margin-bottom: 1rem;
  }
}
</style>
