import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbTopicSub/topicSubPage',
    method: 'post',
    params: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/gdbTopicSub/subList/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicSub/topicSub',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/gdbTopicSub/topicSub/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicSub/topicSub',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}
export function getTopic(obj) {
  return fetch({
    url: '/api/admin/gdbTopic/queryTopic',
    method: 'post',
    params: obj
  })
}

export function Doctorlike(obj) {
  return fetch({
    url: '/api/admin/gdbTopicSub/like',
    method: 'post',
    params: {
      mobile: obj
    }
  })
}

export function addSubUser(obj) {
  return fetch({
    url: '/api/admin/gdbTopicSub/user',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function delSubUser(id) {
  return fetch({
    url: '/api/admin/gdbTopicSub/subUser/' + id,
    method: 'delete'
  })
}

export function setSubUserAdmin(obj) {
  return fetch({
    url: '/api/admin/gdbTopicSub/subAdmin',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}
