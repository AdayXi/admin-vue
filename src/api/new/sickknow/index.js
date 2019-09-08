import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbCaseFiles/casefile',
    method: 'post',
    // data: obj
    params: obj
  })
}

export function getObj(obj) {
  return fetch({
    url: '/api/admin/gdbCase/verifycase',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbCase/savecase',
    method: 'post',
    // data: obj
    params: obj
  })
}

export function delObj(obj) {
  return fetch({
    url: '/api/admin/gdbCaseFiles/checkcasefile',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbIntegralRules/updategdbIntegralRule',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
    // params: obj
  })
}
