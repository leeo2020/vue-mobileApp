import fetch from './fetch'

// 首页商品列表
// size, page, cate, hot
export function fetchGoodList (params) {
  return fetch({
    url: '/api/v1/jd/good/list',
    method: 'get',
    params
  })
}

// 获取品类
export function fetchAllCates (params) {
  return fetch({
    url: '/api/v1/jd/cates',
    method: 'get',
    params
  })
}

// 获取商品详情
export function fetchGoodInfo (params) {
  return fetch({
    url: '/api/v1/jd/good/detail',
    method: 'get',
    params
  })
}

export function fetchRegist (data) {
  return fetch({
    url: '/api/v1/user/regist',
    method: 'post',
    data
  })
}

export function fetchLogin (data) {
  return fetch({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

export function fetchAddCart (data) {
  return fetch({
    url: '/api/v1/jd/cart/add',
    method: 'post',
    data
  })
}
export function fetchCart (params) {
  return fetch({
    url: '/api/v1/jd/cart/list',
    method: 'get',
    params
  })
}

export function fetchDelCart (params) {
  return fetch({
    url: '/api/v1/jd/cart/del',
    method: 'get',
    params
  })
}

export function fetchUpdCart (data) {
  return fetch({
    url: '/api/v1/jd/cart/update',
    method: 'post',
    data
  })
}

export function fetchOrder (data) {
  return fetch({
    url: '/api/v1/jd/cart/submit',
    method: 'post',
    data
  })
}

export default {
  fetchGoodList,
  fetchAllCates,
  fetchGoodInfo,
  fetchRegist,
  fetchLogin,
  fetchAddCart,
  fetchCart,
  fetchDelCart,
  fetchUpdCart,
  fetchOrder
}
