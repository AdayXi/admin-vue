import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbTopicLocus/queryTopicLocusList',
    method: 'post',
    params: obj
  })
}
export function getObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicLocus/getlocusBySub',
    method: 'post',
    params: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicLocus/saveTopicLocus',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function delObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicLocus/deleteTopicLocus',
    method: 'delete',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicLocus/updateTopicLocus',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}
