import { createRouter, createWebHashHistory } from 'vue-router'

import MarsView from './views/MarsView.vue'
import LaunchView from './views/LaunchView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: LaunchView,
      path: '/:id'
    },
    {
      component: MarsView,
      path: '/'
    }
  ]
})
