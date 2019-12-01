import Vue from 'vue'
import App from './App.vue'
import API from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'
import awsconfig from './aws-exports'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import router from './router'
import store from './store'

API.configure(awsconfig);
PubSub.configure(awsconfig);
Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, AmplifyModules)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
