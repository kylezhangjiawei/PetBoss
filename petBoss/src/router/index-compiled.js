import Vue from 'vue';
import VueRouter from 'vue-router';
import Logo from '@/components/Logo/Logo';
import Register from '@/components/Register/Register';
import Resetpwd from '@/components/Resetpwd/Resetpwd';
import Changepwd from '@/components/Changepwd/Changepwd';
import Signin from '@/components/Signin/Signin';
import Index from '@/components/Index/Index';
import Indexhtml from '../components/Index/Indexhtml';
import Peoplehtml from '../components/Index/Peoplehtml';
import Peopledetail from '../components/Index/people/Peopledetail';
import Administration from '../components/Index/people/Administration';
import Openup from '../components/Index/people/Openup';
import Producthtml from '../components/Index/Producthtml';
import Storage from '../components/Index/storage/Put-in-storage';
import Storagedetail from '../components/Index/storage/Storagedetail';
import Allot from '../components/Index/storage/Allot-list';
import Stock from '../components/Index/storage/Stock-ask';
import Stockdetail from '../components/Index/storage/Stock-ask-detail';
import Stockrequest from '../components/Index/storage/Stock-ask-request';
import Messages from '../components/Index/Message.vue';
import Detail from '../components/Index/Detail';
import Performancehtml from '../components/Index/Performancehtml.vue';
import Analyzehtml from '../components/Index/Analyzehtml.vue';
import Members from '../components/Index/performance/Member-number';
import MembersDetail from '../components/Index/performance/Member-detail';
import MemberStructure from '../components/Index/performance/Member-structure';
import MemberIncrease from '../components/Index/performance/Member-increase';
import Turnover from '../components/Index/performance/Turnover';
import TurnoverMonth from '../components/Index/performance/Turnover-month';
import TurnoverDetail from '../components/Index/performance/Turnover-detail';
import Marketing from '../components/Index/performance/Marketing';
import SalePolicy from '../components/Index/performance/Sales-policy';
import StoredValueSales from '../components/Index/performance/Stored-value-sales';
import Myshop from '../components/Index/shop/My-shop';
import MembershipCard from '../components/Index/shop/Membership-card';
import MemberCardDetail from '../components/Index/shop/Member-card-detail';
import ChangeCard from '../components/Index/shop/Change-card';
import AddMemberCard from '../components/Index/shop/Add-member-card';
import CardColor from '../components/Index/shop/Card-color';
import CardMsg from '../components/Index/shop/Card-msg';
import BlockupCard from '../components/Index/shop/Blockup-card';
import DiscountsPro from '../components/Index/shop/Discounts-pro';
Vue.use(VueRouter);

var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Logo',
    component: Logo
  }, {
    path: '/Register',
    name: 'Register',
    component: Register
  }, {
    path: '/Resetpwd',
    name: 'Resetpwd',
    component: Resetpwd
  }, {
    path: '/Changepwd',
    name: 'Changepwd',
    component: Changepwd
  }, {
    path: '/Signin',
    name: 'Signin',
    component: Signin
  }, {
    path: '/Index',
    component: Index,
    // meta: {
    //   auth: true
    // },
    meta: {
      requiresAuth: true
    },
    children: [{ path: '', name: 'Indexhtml', component: Indexhtml }, { path: 'Peoplehtml', name: 'Peoplehtml', component: Peoplehtml }, { path: 'Producthtml', name: 'Producthtml', component: Producthtml }, { path: 'Performancehtml', name: 'Performancehtml', component: Performancehtml }, { path: 'Analyzehtml', name: 'Analyzehtml', component: Analyzehtml }]
  }, {
    path: '/Peoplehtml/Peopledetail',
    name: 'Peopledetail',
    component: Peopledetail
  }, {
    path: '/Peoplehtml/Administration',
    name: 'Administration',
    component: Administration
  }, {
    path: '/Peoplehtml/Administration/Openup',
    name: 'Openup',
    component: Openup
  }, {
    path: '/Producthtml/Put-in-storage',
    name: 'Storage',
    component: Storage
  }, {
    path: '/Producthtml/Put-in-storage/Storagedetail',
    name: 'Storagedetail',
    component: Storagedetail
  }, {
    path: '/Producthtml/Allot',
    name: 'Allot',
    component: Allot
  }, {
    path: '/Producthtml/Stock',
    name: 'Stock',
    component: Stock
  }, {
    path: '/Producthtml/Stock/detail',
    name: 'Stockdetail',
    component: Stockdetail
  }, {
    path: '/Producthtml/Stock/request',
    name: 'Stockrequest',
    component: Stockrequest
  }, {
    path: '/Indexhtml/Message',
    name: 'Messages',
    component: Messages
  }, {
    path: '/Indexhtml/Message/Detaile',
    name: 'Detail',
    component: Detail
  }, {
    path: '/Performancehtml/Members',
    name: 'Members',
    component: Members
  }, {
    path: '/Performancehtml/Members/MembersDetail',
    name: 'MembersDetail',
    component: MembersDetail
  }, {
    path: '/Performancehtml/Members/MemberStructure',
    name: 'MemberStructure',
    component: MemberStructure
  }, {
    path: '/Performancehtml/Members/MemberIncrease',
    name: 'MemberIncrease',
    component: MemberIncrease
  }, {
    path: '/Performancehtml/Members/Turnover',
    name: 'Turnover',
    component: Turnover
  }, {
    path: '/Performancehtml/Members/Turnover/TurnoverMonth',
    name: 'TurnoverMonth',
    component: TurnoverMonth
  }, {
    path: '/Performancehtml/Members/Turnover/TurnoverDetail',
    name: 'TurnoverDetail',
    component: TurnoverDetail
  }, {
    path: '/Performancehtml/Marketing',
    name: 'Marketing',
    component: Marketing
  }, {
    path: '/Performancehtml/SalePolicy',
    name: 'SalePolicy',
    component: SalePolicy
  }, {
    path: '/Performancehtml/StoredValueSales',
    name: 'StoredValueSales',
    component: StoredValueSales
  }, {
    path: '/Index/Myshop',
    name: 'Myshop',
    component: Myshop
  }, {
    path: '/Index/Myshop/MembershipCard',
    name: 'MembershipCard',
    component: MembershipCard
  }, {
    path: '/Index/Myshop/MembershipCard/MemberCardDetail',
    name: 'MemberCardDetail',
    component: MemberCardDetail
  }, {
    path: '/Index/Myshop/MembershipCard/ChangeCard',
    name: 'ChangeCard',
    component: ChangeCard
  }, {
    path: '/Index/Myshop/MembershipCard/AddMemberCard',
    name: 'AddMemberCard',
    component: AddMemberCard
  }, {
    path: '/Index/Myshop/MembershipCard/AddMemberCard/CartColor',
    name: 'CardColor',
    component: CardColor
  }, {
    path: '/Index/Myshop/MembershipCard/AddMemberCard/CardMsg',
    name: 'CardMsg',
    component: CardMsg
  }, {
    path: '/Index/Myshop/MembershipCard/BlockupCard',
    name: 'BlockupCard',
    component: BlockupCard
  }, {
    path: '/Index/Myshop/MembershipCard/DiscountsPro',
    name: 'DiscountsPro',
    component: DiscountsPro
  }]
});
router.beforeEach(function (to, from, next) {
  //判断是否需要登录权限
  if (to.matched.some(function (record) {
    return record.meta.requiresAuth;
  })) {
    //判断是否登录
    if (!localStorage.getItem('sign')) {
      next({
        path: '/Register',
        query: { redirect: to.fullPath }
      });
    } else {
      //如果没有登录跳转到登录页面
      next();
    }
  } else {
    next();
  }
});

export default router;

//# sourceMappingURL=index-compiled.js.map