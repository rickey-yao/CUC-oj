import Announcements from '@/views/home/Announcements'
import UserHome from '@/views/user/UserHome'
import InfoHome from '@/views/user/info/InfoHome'
import AccountInfo from '@/views/user/info/AccountInfo'
import ProfileInfo from '@/views/user/info/ProfileInfo'

export default [
  {
    path: '/',
    name: 'Home',
    component: Announcements
  },
  {
    path: '/userHome',
    name: 'UserHome',
    component: UserHome
  },
  {
    path: '/userInfo',
    component: InfoHome,
    children: [
      {
        path: '',
        name: 'DefaultInfo',
        component: ProfileInfo
      },
      {
        path: 'profile',
        name: 'ProfileInfo',
        component: ProfileInfo
      },
      {
        path: 'account',
        name: 'AccountInfo',
        component: AccountInfo
      }
    ]
  }

]
