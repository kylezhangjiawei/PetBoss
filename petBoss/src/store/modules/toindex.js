const state={
  memberData:[]
}
const getters={
  memberDatas:state =>{
  return state.memberData
}
}
const mutations={
  memberDetail(state,item){
   state.memberData = item
  }
}
const actions={
  memberDatas({commit},item){
    commit('memberDetail',item);
  }
}
export default {state , actions,mutations,getters}