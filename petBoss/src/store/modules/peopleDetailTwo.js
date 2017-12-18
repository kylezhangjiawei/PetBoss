const state={
  peopeldetailtwo:[],
  peopledetail:[]
}
const getters={
  peopleDetail:state =>{
  return state.peopeldetailtwo
},
  peopledatas:state =>{
  return state.peopledetail
}
}
const mutations={
  addDatas(state,datas){
    state.peopeldetailtwo = datas;
  },
  savePeople(state,data){
    state.peopledetail = data;
  }
}
const actions={
  addPeopleDetail({commit},datas){
    commit('addDatas',datas)
  },
  savePeopleDetail({commit},datas){
    commit('savePeople',datas)
  },
}
export default {state , actions,mutations,getters}
