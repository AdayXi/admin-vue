import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbHospital/hospital/all',
    method: 'post',
    // data: obj,
    params: obj
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

export function getObj(obj) {
  return fetch({
    url: '/api/admin/gdbHospital/hospital/all',
    method: 'post',
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
