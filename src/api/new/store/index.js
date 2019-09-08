import fetch from 'utils/fetch'

export function doctor(obj) {
  return fetch({
    url: '/api/admin/gdbHospital/hospital/all',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function channel(obj) {
  return fetch({
    url: '/api/admin/gdbChannels/queryChannel',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function dept(obj) {
  return fetch({
    url: '/api/admin/gdbDepts/queryDeptList',
    method: 'post',
    // data: obj,
    params: obj
  })
}
