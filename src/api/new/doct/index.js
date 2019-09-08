import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbDoctors/queryDoctorList',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbDoctors/saveGdbDoctor',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
    // params: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/gdbDoctors/doctor/' + id,
    method: 'get'
    // params: obj
  })
}

export function delObj(obj) {
  return fetch({
    url: '/api/admin/gdbDoctors/deleteDoctorById',
    method: 'delete',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbDoctors/updateDoctorById',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
    // params: obj
  })
}
