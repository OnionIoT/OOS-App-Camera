webpackJsonp([1],{NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW");function i(){return Math.random().toString(36).substring(2)}var a={name:"ConsoleSDK",appUid:"",makeId:i,init:function(){window.addEventListener("message",this.processMessage.bind(this),!1)},subscribe:function(t){this.sendEvent("Onion.CDK.Subscribe",{topic:t})},publish:function(t,e){},service:function(t,e,n){this.sendEvent("Onion.CDK.Service",{service:t,command:e})},sendEvent:function(t,e){var n=i();return window.parent.postMessage({event:t,instance:this.appUid,eventId:n,content:e},"*"),n},sendCmd:function(t,e){this.sendEvent("Onion.CDK.Command",{cmd:t,params:e})},sendToast:function(t){this.sendEvent("Onion.CDK.Toast",{message:t})},processMessage:function(t){if("Onion.CDK.Init"===t.data.event){var e=t.data.appUid;this.appUid=e,this.onInit()}else"Onion.CDK.Service"===t.data.event?this.onService(t.data.content.name,t.data.content.command,t.data.content.result):"Onion.CDK.Message"===t.data.event?this.onMessage(t.data.content.topic,t.data.content.content):"Onion.CDK.Command"===t.data.event&&this.onCmd(t.data.content.cmd,t.data.content.resp)},onInit:function(){},onService:function(t,e,n){},onMessage:function(){},onCmd:function(){}},o=(Object({NODE_ENV:"production"}).DEV_HOST,{name:"App",components:{},data:function(){return{port:8080,bStreaming:!1,bTimelapse:!1,bReady:!1,isLoading:!0,token:""}},methods:{created:function(){console.log(window.location.hostname),this.startStream()},startStream:function(){this.bStreaming?a.service("mjpg-streamer","stop"):a.service("mjpg-streamer","start")},saveToken:function(){this.isLoading=!0,a.sendCmd("/www/apps/oos-app-camera/save-token.sh",[this.token])},toggleRecording:function(){this.isLoading=!0,this.bTimelapse?a.service("oos-app-timelapse","stop"):a.service("oos-app-timelapse","start")}},mounted:function(){a.onService=function(t,e,n){switch(this.isLoading=!1,t){case"oos-app-timelapse":"list"===e&&void 0!==n?this.bTimelapse=n:"start"===e&&void 0!==n?this.bTimelapse=n:"stop"===e&&void 0!==n&&(this.bTimelapse=!n);break;case"mjpg-streamer":"list"===e&&void 0!==n?(this.bStreaming=n,this.bReady=!0):"start"===e&&void 0!==n?this.bStreaming=n:"stop"===e&&void 0!==n&&(this.bStreaming=!n)}}.bind(this),a.onCmd=function(t,e){switch(this.isLoading=!1,t){case"/www/apps/oos-app-camera/save-token.sh":a.sendToast("Token Saved");break;case"cat":this.token=e||""}}.bind(this),a.onInit=function(){a.service("mjpg-streamer","list"),a.service("oos-app-timelapse","list"),a.sendCmd("cat",["/www/apps/oos-app-camera/token.txt"])},a.init()},computed:{streamUrl:function(){return"http://"+window.location.hostname+":"+this.port+"/?action=stream"},streamButtonText:function(){return this.bStreaming?"Stop Stream":"Start Stream"}}}),r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container bg"},[n("div",{staticClass:"card"},[n("div",{staticClass:"card-image"},[n("img",{staticClass:"stream img-responsive",attrs:{src:t.streamUrl,onerror:"static/img/not_available.jpg"}})]),t._v(" "),t._m(0)]),t._v(" "),n("div",{staticClass:"card"},[n("div",{staticClass:"card-header"},[n("div",{staticClass:"card-title h5"},[t._v("Timelapse "+t._s(t.bTimelapse?"(Recording)":""))]),t._v(" "),n("div",{staticClass:"card-subtitle text-gray"},[t._v("Periodic snapshots will be sent directly to your Dropbox")])]),t._v(" "),n("div",{staticClass:"card-body"},[n("div",{staticClass:"input-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.token,expression:"token"}],staticClass:"form-input",attrs:{type:"text",placeholder:"Dropbox App Token"},domProps:{value:t.token},on:{input:function(e){e.target.composing||(t.token=e.target.value)}}}),t._v(" "),n("button",{staticClass:"btn btn-primary input-group-btn",class:{loading:t.isLoading},on:{click:t.saveToken}},[t._v("Save")])]),t._v(" "),t._m(1)]),t._v(" "),n("div",{staticClass:"card-footer"},[n("button",{staticClass:"btn btn-primary btn-block",class:{loading:t.isLoading},on:{click:t.toggleRecording}},[t._v(t._s(t.bTimelapse?"Stop Recording":"Start Recording"))])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("div",{staticClass:"card-title h5"},[this._v("Live Stream")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-subtitle text-gray"},[e("a",[this._v("How to get the App Token?")])])}]};var c=n("VU/8")(o,r,!1,function(t){n("qOir")},null,null).exports;n("i8c9");s.a.config.productionTip=!1,new s.a({el:"#app",components:{App:c},template:"<App/>"})},i8c9:function(t,e){},qOir:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.5af9f1d7e81fffb5dfd2.js.map