
function makeId () {
  return Math.random().toString(36).substring(2)
}

export default {
  name: 'ConsoleSDK',
  appUid: '',
  makeId: makeId,
  init: function () {
    window.addEventListener('message', this.processMessage.bind(this), false)
  },
  subscribe: function (topic) {
    this.sendEvent('Onion.CDK.Subscribe', {topic: topic})
  },
  publish: function (topic, content) {

  },
  service: function (name, command, callback) {
    this.sendEvent('Onion.CDK.Service', {
      service: name,
      command: command
    })
  },
  // createService: function (name) {
  //   // var serviceStatus = 'stopped'
  //   // TODO: init iframe call go get service status
  //   return {
  //     status (callback) {
  //       // this.service
  //     },
  //     start () {
  //
  //     },
  //     stop () {
  //
  //     }
  //   }
  // },
  sendEvent: function (event, content) {
    var eventId = makeId()
    window.parent.postMessage({
      event: event,
      instance: this.appUid,
      eventId: eventId,
      content: content
    }, '*')
    return eventId
  },
  sendCmd: function (command, params) {
    this.sendEvent('Onion.CDK.Command', {
      cmd: command,
      params: params
    })
  },
  sendToast: function (message) {
    this.sendEvent('Onion.CDK.Toast', {
      message: message
    })
  },
  processMessage: function (e) {
    if (e.data.event === 'Onion.CDK.Init') {
      var appUid = e.data.appUid
      this.appUid = appUid
      this.onInit()
    } else if (e.data.event === 'Onion.CDK.Service') {
      this.onService(
        e.data.content.name,
        e.data.content.command,
        e.data.content.result)
    } else if (e.data.event === 'Onion.CDK.Message') {
      this.onMessage(
        e.data.content.topic,
        e.data.content.content)
    } else if (e.data.event === 'Onion.CDK.Command') {
      this.onCmd(
        e.data.content.cmd,
        e.data.content.resp)
    }
  },
  onInit () {},
  onService (name, command, result) {},
  onMessage () {},
  onCmd () {}
}
