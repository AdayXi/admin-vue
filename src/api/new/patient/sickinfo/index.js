import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbDisease/info',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/gdbDisease/info/' + id,
    method: 'get'
    // params: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbHospital/hospital',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/gdbHospital/hospital/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbHospital/hospital/',
    method: 'put',
    data: obj
    // params: obj
  })
}
