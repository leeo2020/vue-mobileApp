import axios from 'axios'

const baseURL = 'http://localhost:8081'

const instance = axios.create({
	baseURL,
	timeout: 10000,
	headers: {}
})

instance.interceptors.request.use(config => {
	config.headers.Authorization = localStorage.getItem('token')
	return config
}, err => {
	return Promise.reject(err)
})

instance.interceptors.response.use(
	res => {
		let rst=null
		if((res.data&& res.data.code!==-1)||(res.data&& res.data.err!==-1)){
			rst=res.data.data
		}else if((res.data&& res.data.code===-1)||(res.data&& res.data.err===-1)){
			console.log('无token')
		}
		return rst
	},
	err => {
		return Promise.reject(err)
	})

export default instance