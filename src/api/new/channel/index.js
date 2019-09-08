import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbChannels/queryChannel',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/gdbChannels/channel/' + id,
    method: 'get'
    // params: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbChannels/saveGdbChannel',
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
    url: '/api/admin/gdbChannels/deleteChannel',
    method: 'delete',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbChannels/updateChannel',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
    // params: obj
  })
}
