import axios from 'axios'

// 添加公共请求头
const getHeader = function (options) {
  if (options === 'form') {
    return Object.assign({ 'content-type': 'application/x-www-form-urlencoded' })
  } else if (options === 'file') {
    return Object.assign({ 'content-type': 'multipart/form-data' })
  }
}

const request = function (method, url, params, options, needTip = false) {
  return new Promise(function (resolve, reject) {
    axios.request({
      headers: getHeader(options),
      baseURL: 'http://47.117.74.124',
      url: url,
      method: method,
      withCredentials: true,
      data: method === 'post' ? params : {},
      params: method === 'get' ? params : {},
      timeout: 120000,
      responseType: 'json'
    }).then(function (response) {
      if (isExpired(response)) {
        location.reload()
        return
      }
      let data = response.data || JSON.parse(response.request.responseText)
      resolve(data)
    }).catch(function (e) {
      reject(e)
    })
  })
}

const isExpired = (response) => {
  let resUrl = response.request.responseURL.split('?')[0]
  let loginUrl = `${location.origin}/orgDev/rz/index.html`
  if (resUrl === loginUrl) {
    return true
  } else {
    return false
  }
}

export default {
  get: function (url, params, options, needTip) {
    return request('get', url, params, options, needTip)
  },
  post: function (url, params, options, needTip) {
    return request('post', url, params, options, needTip)
  }
}
