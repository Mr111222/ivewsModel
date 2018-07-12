import Vue from 'vue'
import Router from 'vue-router'

//后台
const Backstage = () => import ('@/components/backstage/Backstage')
const Backlogin = () => import ('@/components/backstage/Backlogin')
const commodityAdmin = () => import ('@/components/backstage/contentadmin/commodityAdmin')
const companyProfile = () => import ('@/components/backstage/contentadmin/companyProfile')
const cakeStory = () => import ('@/components/backstage/contentadmin/cakeStory')
const companyEdit = () => import ('@/components/backstage/contentadmin/companyEdit')
const sceneAdmin = () => import ('@/components/backstage/contentadmin/sceneAdmin')
const shopEdit = () => import ('@/components/backstage/shopadmin/shopEdit')
const shopList = () => import ('@/components/backstage/shopadmin/shopList')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'backlogin',
      component: Backlogin,
    },
    {
      path: '/backstage',
      component: Backstage,
      children: [
        {
          path: 'shopedit',
          component: shopEdit
        }, {
          path: 'commodityadmin',
          component: commodityAdmin
        }, {
          path: 'companyprofile',
          component: companyProfile
        },
        {
          path: 'companyedit',
          component: companyEdit
        }, {
          path: 'sceneadmin',
          component: sceneAdmin
        },
        {
          path:'shoplist',
          component:shopList
        },
        {
          path:'cakestory',
          component:cakeStory
        }
      ]
    },
  ]
})
