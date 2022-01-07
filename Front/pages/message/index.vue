<template>
  <div class="card-container">
    <div ref="messages" class="message-container">
      <ul
        v-for="(item, index) in messages[0]"
        :key="index"
        :class="{ singleMessageALT: item.userName === $auth.user.username }"
        class="singleMessage"
      >
        <li>{{ item.userName }}</li>
        <li class="messageContent">{{ item.message }}</li>
        <li>{{ getDate(item.date) }}</li>
      </ul>
      <div v-if="messages[0].length < 1" class="noMessage">
        <img src="@/assets/images/empty.png" alt="empty" />
        <h1>Aucun messages</h1>
      </div>
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
    getDate(date) {
      return new Date(date).toLocaleString()
    },
    sendMessage() {
      if (!this.message.trim()) {
        return
      }
      const message = {
        userId: this.$auth.user._id,
        userName: this.$auth.user.username,
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
    padding: 12px;
    box-sizing: border-box;
    border-radius: 8px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    .noMessage {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // background: lime;
      height: 100%;
      width: 100%;
      img {
        width: 20%;
        margin-bottom: 3%;
      }
    }
    .singleMessage {
      // background: blue;
      margin: 1% 30% 1% 1%;

      .messageContent {
        background: rgb(235, 235, 235);
        color: rgb(63, 63, 63);
        // background: rgb(139,92,246);
        width: max-content;
        max-width: 248px;
        margin-right: auto;
        border-radius: 30px;
        padding: 5% 5%;
        word-break: break-all;
      }
      li:first-child,
      li:nth-child(3) {
        color: #8b8b8b;
        margin-left: 13px;
        font-size: 10px;
      }
    }
    .singleMessageALT {
      // background: blue;
      margin: 1% 1% 1% 30%;
      text-align: right;

      .messageContent {
        // background: rgb(235, 235, 235);
        color: rgb(255, 255, 255);
        background: rgb(139, 92, 246);
        width: max-content;
        max-width: 248px;
        margin-right: 0;
        margin-left: auto;
        border-radius: 30px;
        padding: 5% 5%;
        word-break: break-all;
      }
      li:first-child,
      li:nth-child(3) {
        color: #8b8b8b;
        font-weight: bold;
        margin-right: 13px;
        font-size: 11px;
      }
    }
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
