<template>
  <div class="card">
    <nuxt-link :to="`/product/get/${data._id}`">
      <div class="mb-5 ml-5 max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" :src="data.imageUrl" alt="Sunset in the mountains" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ data.title }}</div>
          <p class="text-gray-700 text-base">Price : {{ data.price }}</p>
          <p class="text-gray-700 text-base">{{ data.description }}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <nuxt-link :to="`/product/update/${data._id}`">
            <span class="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >Update</span
            >
          </nuxt-link>
          <button
            class="inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            @click.prevent="deletePost"
          >
            Delete
          </button>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    async deletePost() {
      // TODO: Delete post

      try {
        await this.$axios.delete('/api/post/' + this.data._id)
        this.$axios.get('/api/post/').then((response) => {
          this.$nuxt.refresh()
        })
      } catch (error) {
        this.error = error.message
      }

      this.$axios
        .delete('/api/post/' + this.data._id)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  img {
    height: 260px;
  }
  span {
    z-index: 2;
  }
}
</style>
