<template>
  <div class="bg">
    <header class="navbar">
      <section class="navbar-section">
      </section>
      <section class="navbar-section my-1">
        <a @click="startStream" class="btn mr-1" :disabled="streamButtonDisabled">{{streamButtonText}}</a>
      </section>
    </header>
    <div class="bg">
      <!-- <img id="stream" src="streamUrl" onerror="this.src='./apps/onion-webcam/not_available.jpg'"> -->
      <div class="vertical center-justified layout center">
        <img class="centered" :src="streamUrl" onerror="static/img/not_available.jpg">
      </div>
    </div>
  </div>
</template>

<script>
import OnionCDK from '@/OnionCDK.js'

var devMode = process.env.NODE_ENV === 'development'
var devHost = process.env.DEV_HOST

export default {
  name: 'App',
  components: {},
  data () {
    return {
      port: 8080,
      bStreaming: false,
      bReady: false
    }
  },
  methods: {
    created () {
      console.log(window.location.hostname)
    },
    startStream () {
      if (this.bStreaming) {
        // stream is currently running, stop it
        OnionCDK.service('mjpg-streamer', 'stop')
      } else {
        // stream is stopped, start it
        OnionCDK.service('mjpg-streamer', 'start')
      }
      // TODO: need to find a place to configure mjpg-streamer
      // OnionCDK.sendCmd('getBatteryLevels', [])
    }
  },
  mounted () {
    console.log(window.location.hostname)
    OnionCDK.onService = function (name, command, result) {
      console.log(name, command, result)
      if (command === 'list' && typeof result !== 'undefined') {
        console.log('list: setting bStreaming to ' + result)
        this.bStreaming = result
        this.bReady = true
      } else if (command === 'start' && typeof result !== 'undefined') {
        console.log('start: setting bStreaming to ' + result)
        this.bStreaming = result
      } else if (command === 'stop' && typeof result !== 'undefined') {
        console.log('stop: setting bStreaming to ' + result)
        this.bStreaming = !result
      }
      // TODO: add handling for STOP and START commands
    }
    OnionCDK.onInit = function () {
      // check if streaming service is running
      OnionCDK.service('mjpg-streamer', 'list')
    }
    OnionCDK.init()
  },
  computed: {
    streamUrl () {
      return `http://${devMode ? devHost : window.location.hostname}:${this.port}/?action=stream`
    },
    streamButtonText () {
      return (this.bStreaming ? 'Stop Stream' : 'Start Stream')
    },
    streamButtonDisabled () {
      // TODO: this needs to be updated so that button reacts based on changes in bReady
      // return !this.bReady
      return false
    }
  }
}
</script>

<style>
html, body {
    height: 100% !important;
    height: 100%;
}
body {
  margin: 0;
  padding: 0;
  background-color: white;
}
.navbar {
  background-color: #9b59b6;
}
.bg {
  background-color: #95a5a6;
  height:100%;
}
</style>
