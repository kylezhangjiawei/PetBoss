import _Promise from 'babel-runtime/core-js/promise';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
//import Vuex from 'vuex'
import store from './store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import { Validator } from 'vee-validate';
import axios from 'axios';
import { Indicator, Toast } from 'mint-ui';

//表单验证为中文
Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary: {
    zh_CN: { messages: zh_CN }
  }
});
Validator.addLocale(zh_CN);
//name为中文
var dictionary = {
  zh_CN: {
    attributes: {
      mobile: '手机号码',
      password: '密码',
      passwordagin: '二次密码'
    }
  }
};
//设置自定义规则
//手机号自定义规则
Validator.extend('mobile', {
  messages: {
    zh_CN: function zh_CN(field) {
      return '请正确输入11位' + field;
    }
  },
  validate: function validate(value) {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);
  }
});
//密码自定义规则
Validator.extend('password', {
  messages: {
    zh_CN: function zh_CN(field) {
      return '输入有误或格式不正确';
    }
  },
  validate: function validate(value) {
    return value.length >= 6;
  }
});
Validator.updateDictionary(dictionary);
Vue.prototype.$http = axios;
//表单验证错误-中文提醒

Vue.use(MintUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App: App }
});

//全局注册数据加载前动画
axios.defaults.timeout = 5000;
var loadinginstace;
axios.interceptors.request.use(function (config) {
  loadinginstace = Indicator.open('加载中..');
  return config;
}), function (error) {
  loadinginstace = Indicator.close();
  Toast({
    message: '加载超时',
    duration: 2000
  });
  return _Promise.reject(error);
};
axios.interceptors.response.use(function (data) {
  loadinginstace = Indicator.close();
  return data;
}), function (error) {
  loadinginstace = Indicator.close();
  Toast({
    message: '加载失败',
    duration: 2000
  });
  return _Promise.reject(error);
};
//模态框组件
var myComponent = Vue.extend({
  template: '  <transition name="modal">\n' + '    <div class="modal-mask">\n' + '      <div class="modal-wrapper">\n' + '        <div class="modal-container">\n' + '\n' + '          <div class="modal-header">\n' + '            <slot name="header">\n' + '            </slot>\n' + '          </div>\n' + '\n' + '          <div class="modal-body">\n' + '            <slot name="body">\n' + '            </slot>\n' + '          </div>\n' + '\n' + '          <div class="modal-footer">\n' + '            <slot name="footer">\n' + '            </slot>\n' + '          </div>\n' + '        </div>\n' + '      </div>\n' + '    </div>\n' + '  </transition>'
});

Vue.component('modal', myComponent);

//# sourceMappingURL=main-compiled.js.map