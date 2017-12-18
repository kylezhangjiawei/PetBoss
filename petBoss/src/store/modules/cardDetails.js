const state={
  cardData:[]
}
const getters={
  cardDatas:state =>{
  return state.cardData
}
}
const mutations={
  cardDetail(state,item){
   state.cardData = item
  }
}
const actions={
  cardDatas({commit},item){
    commit('cardDetail',item);
  }
}
export default {state , actions,mutations,getters}
