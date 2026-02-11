<template>
  <div class="container my-4 animated fadeInUp">
    <div class="row text-center">
      <h1 class="mx-auto">SustainaBot</h1>
      <h4>A buddy to talk to about sustainability and life!</h4>
    </div>
    <section class="chat-box rounded w-lg-75 w-100">
      <div class="chat-box-list-container" ref="chatbox">
        <ul class="chat-box-list">
          <li class="message" v-for="(message, idx) in messages" :key="idx" :class="message.author">
            <p class="p-3 rounded my-2">
              {{ message.text }}
            </p>
          </li>
        </ul>
      </div>
      <div class="chat-inputs">
        <input type="text" v-model="message" @keyup.enter="sendMessage" class="m-3 rounded" />
        <button class="btn btn-success my-3 mx-2" @click="sendMessage">Send</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatBox',
  data: () => ({
    message: '',
    messages: []
  }),
  mounted() {
    this.messages.push({
      text: "Hello there! I'm SustainaBot, a friendly chatbot dedicated to discussing sustainability in Singapore and beyond. I'm here to chat about all things eco-friendly and inspire positive change! 🌿♻️ Let's talk sustainability!",
      author: 'server'
    })
  },
  methods: {
    sendMessage() {
      const message = this.message

      this.messages.push({
        text: message,
        author: 'client'
      })

      this.$nextTick(() => {
        this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
      })

      this.message = ''

      axios
        .get(`https://dracknor420.pythonanywhere.com/api?description=${message}`)
        .then((response) => {
          this.messages.push({
            text: response.data.responses,
            author: 'server'
          })
          this.$nextTick(() => {
            this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
          })
        })
        .catch((error) => {
          // Handle error here
          console.error(error)
          this.messages.push({
            text: 'Hi, sadly SustainaBot is down right now. This is likely because OpenAI is having an outage. Please try again later',
            author: 'server'
          })
          this.$nextTick(() => {
            this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
.chat-box,
.chat-box-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}

.chat-box-list-container {
  overflow: scroll;
  margin-bottom: 1px;
  bottom: 0px;
}

.chat-box-list {
  padding-left: 10px;
  padding-right: 10px;

  span {
    padding: 8px;
    color: white;
    border-radius: 4px;
  }

  .server {
    p {
      background: white;
      border: 1px solid green;
      color: green;
      float: left;
      max-width: 80%;
    }
  }

  .client {
    p {
      background: green;
      color: white;
      padding: 10px;
      min-width: auto;
      margin-top: 15px;
      margin-bottom: 0px;
      float: right;
    }
  }
}

.chat-box {
  margin: 10px;
  border: 1px solid #999;
  width: 75vw;
  height: 75vh;
  margin-left: auto;
  margin-right: auto;
  align-items: space-between;
  justify-content: space-between;
}

.chat-inputs {
  display: flex;

  input {
    line-height: 3;
    width: 100%;
    border: 1px solid #999;
    border-bottom-left-radius: 4px;
    padding-left: 15px;
  }

  button {
    width: 145px;
    color: white;
    border-color: #999;
  }
}
</style>
