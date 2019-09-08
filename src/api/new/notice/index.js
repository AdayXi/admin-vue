import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: 'api/admin/gdbNotice/queryGdbNoticetList',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/gdbNotice/notice/' + id,
    method: 'get'
    // params: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbNotice/saveGdbNotice',
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
    url: '/api/admin/gdbNotice/deleteGdbNotice',
    method: 'delete',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbNotice/updateGdbNotice',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
    // params: obj
  })
}
