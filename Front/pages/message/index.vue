<template>
  <div class="card-container">
    <h1 v-if="messages[0].length < 1">No post available</h1>
    <div ref="messages" class="message-container">
      <ul v-for="(item, index) in messages[0]" :key="index">
        <li>User name : {{ item.userName }}</li>
        <li>Message : {{ item.message }}</li>
        <li>Date : {{ item.date }}</li>
        <li>----------------</li>
      </ul>
    </div>

    <form class="w-full max-w-sm" @submit.prevent="sendMessage">
      <div class="md:flex md:items-center mb-6">
        <div v-if="$auth.loggedIn" class="md:w-2/3">
          <input
            id="inline-password"
            v-model="message"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="Message"
            autocomplete="off"
            @keyup.enter="sendMessage"
          />
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Envoyer
          </button>
        </div>
      </div>

      <p v-if="error" class="text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'
export default {
  middleware: 'auth',
  asyncData() {
    return new Promise((resolve) => socket.emit('last-messages', (messages) => resolve({ messages })))
  },
  data() {
    return { message: '' }
  },
  watch: {
    messages: 'scrollToBottom',
  },
  beforeMount() {
    socket.on('new-message', (message) => {
      this.messages[0].push(message)
    })
  },
  mounted() {
    socket.on('connection', (message) => {
      this.messages[0].push(message)
    })
    this.scrollToBottom()
  },
  methods: {
    sendMessage() {
      if (!this.message.trim()) {
        return
      }
      const message = {
        userId: this.$auth.user._id,
        userName: this.$auth.user.email,
        message: this.message,
        date: new Date().toJSON(),
      }
      this.messages[0].push(message)
      this.message = ''
      socket.emit('send-message', message)
      this.scrollToBottom()
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.card-container {
  min-height: calc(100vh - 64px);
  background-color: rgba(243, 244, 246, 1);
  padding: 64px;
  display: flex;
  flex-direction: column;
  .message-container {
    height: 400px;
    width: 100%;
    max-width: 384px;
    margin: auto;
    background: white;
    padding: 32px;
    box-sizing: border-box;
    border-radius: 8px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }
  form {
    margin: auto;
    div {
      width: 100%;
      display: flex;
    }
  }
}
</style>
