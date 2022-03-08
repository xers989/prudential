import Vue from 'vue'
import VueRouter from 'vue-router'

import UserInfo from '../components/UserInfo.vue'
import UserList from '../components/UserList.vue'


import EventInfo from '../components/EventInfo.vue'
import EventList from '../components/EventList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user/',
    name: 'UserInfo',
    component: UserInfo,
    children: [{
      path: 'list',
      name: 'UserList',
      component: UserList
    }
  ]},
  {
    path: '/event/',
    name: 'EventInfo',
    component: EventInfo,
    children: [{
      path: '/event/list',
      name: 'EventList',
      component: EventList
    }
  ]}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router