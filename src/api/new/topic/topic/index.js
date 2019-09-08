import fetch from 'utils/fetch'
// 获取课题
export function page(obj) {
  return fetch({
    url: '/api/admin/gdbTopic/queryTopic',
    method: 'post',
    params: obj
  })
}

// 获取医生列表
export function getObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopic/queryDoctorList',
    method: 'post',
    params: obj
  })
}
// 添加课题
export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopic/saveTopic',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}
// 删除课题
export function delObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopic/deleteTopic',
    method: 'delete',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopic/updateTopicById',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function setadmin(obj) {
  return fetch({
    url: '/api/admin/gdbTopic/topicSetAdmin',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}
