import {fetchGoodList} from "@/utils/api";

export default{
	namespaced:true,
	state:{
		goodObj:{}
	},mutations:{
		updateGoodObj(state,payload){
			state.goodObj[payload.k]=payload.v
			state.goodObj=JSON.parse(JSON.stringify(state.goodObj))
		},
		clearGoodObj(state){
			state.goodObj={}
		}
	},
actions:{
		fetchList(store,params){
			fetchGoodList(params).then(res=>{
				let payload={
					k:params.index,
					v:res.list
				}
			store.commit('updateGoodObj',payload)}
		)}
	}
}