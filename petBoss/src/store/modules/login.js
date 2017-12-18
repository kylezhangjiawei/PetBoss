import axios from 'axios'
import { Toast } from 'mint-ui';
const state={
	sign:localStorage.getItem('sign') || {},
  storeId:localStorage.getItem('storeId') || {},
  key:localStorage.getItem('Key') || {},
  names:localStorage.getItem('Name') || {},
  userName:localStorage.getItem('userName') || {},
  userPhone:localStorage.getItem('userPhone') || {}
}

const mutations={
	userSignIn(state,sign){
		localStorage.setItem('sign',sign)
	},
	userStoreId(state,storeid){
	  localStorage.setItem('storeId',storeid)
  },
  userKey(state,key){
	  localStorage.setItem('Key',key)
  },
  userName(state,names){
  	  localStorage.setItem('Name',names)
  },
  userNames(state,username){
    localStorage.setItem('userName',username)
  },
  userPhone(state,userphone){
    localStorage.setItem('userPhone',userphone)
  }
}

const actions ={
	getSign({commit},Payload){
	return	axios({
			method:'post',
			url:'https://api.yongdaoyun.com/pub/entrance',
			data:{
				sign:Payload.sign,
				method:Payload.method,
				system_id:Payload.system_id,
				timestamp:Payload.timestamp,
				phone:Payload.phone,
				password:Payload.password
			}
		}).then((res) =>{
			console.log(res);
    if (res.data.err_code == "0000"){
      let store = res.data.store_data;
      let ids = '';
      let key ='';
      let name = '';
      let usernames = '';
      let userphone = res.data.phone;
      store.forEach( (item,index,array) =>{
        console.log(item.store_id);
        ids = item.store_id;
        key = item.key;
        name = item.store_name;
        usernames = item.user_name;
      })
      commit('userSignIn',res.data.sign);
      commit('userStoreId',ids);
      commit('userKey',key);
      commit('userName',name);
      commit('userNames',usernames);
      commit('userPhone',userphone);
    } else {
      let ids = '';
      commit('userStoreId',ids);
      Toast({
        message: res.data.err_msg,
        position: 'top',
        duration: 2000,
        className:'wrongTip'
      });
    }
		}).catch((err) => {
      console.log(err)
		})
	}
};

export default{
	state,
	mutations,
	actions
}
