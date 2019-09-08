import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbTopicGene/queryTopicGeneList',
    method: 'post',
    params: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicGene/saveTopicGene',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function delObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicGene/deleteTopicGene',
    method: 'delete',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicGene/updateTopicGene',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}
