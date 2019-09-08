import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbDepts/queryDeptList',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/gdbDepts/dept/' + id,
    method: 'get'
    // params: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbDepts/saveGdbDept',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
    // params: obj
  })
}

export function delObj(obj) {
  return fetch({
    url: '/api/admin/gdbDepts/deleteDept',
    method: 'delete',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbDepts/updateDept',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
    // params: obj
  })
}
