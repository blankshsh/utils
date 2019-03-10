import axios from 'axios'
import md5 from 'md5'

const key = 'a8a09654b8d209e8d50ef4c855e2c7af' // 高德

function password() {
  let $timestamp = new Date().getTime().toString()
  let $combine = md5('blankshsh' + $timestamp).substring(16)
  return { time: $timestamp, sign: $combine }
}

export function sdxiu(data) {
  return axios({
    url: 'https://api.blankshsh.club/api/sdxiu',
    method: 'POST',
    headers: password(),
    data: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getGps(data) {
  return axios({
    url: 'https://restapi.amap.com/v3/geocode/regeo',
    params: {
      key: key, //webkey
      location: data //经纬度
    }
  }).then(res => {
    // console.log(res)
    return Promise.resolve(res)
  })
}

export function _getAmap(keyword) {
  return axios({
    url: 'https://restapi.amap.com/v3/config/district?',
    params: {
      key: key,
      keywords: keyword,
      subdistrict: 1
    }
  }).then(res => {
    return Promise.resolve(res)
  })
}
