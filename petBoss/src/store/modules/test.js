  const state={
  count:0
}
 const getters={
    done:state =>{
      return state.count
    }
 }
 const mutations={
  addNumber(state,price){
    console.log(state)
    state.count +=price;
  },
  subtract(state,price){
    state.count -=price;
  }
}
 const actions={
  test({commit},price){
    commit('addNumber',price)
  },
  text({commit},price){
    commit('subtract',price)
  }
}
export default {state , actions,mutations,getters}
