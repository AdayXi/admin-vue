import fetch from 'utils/fetch'

export function page(obj) {
  console.log(obj)
  return fetch({
    url: '/api/admin/gdbHealthdataFile/queryHealthdatalist',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json'
    // },
    // data: obj
    params: obj
  })
}

export function getObj(obj) {
  return fetch({
    url: 'api/gene/gdbDb/downloadDbfile',
    method: 'get',
    params: {
      // 由于我后台接口里的参数不仅有 filePath 还有 response ，所以在此 params 要指明要传的是哪一个参数
      path: obj
    }
    // responseType: 'blob' // 这一步也很关键，一定要加上 responseType 值为 blob
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
