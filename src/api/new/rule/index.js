import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbIntegralRules/querygdbIntegralRule',
    method: 'post',
    // data: obj,
    params: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/gdbIntegralRules/integralRule/' + id,
    method: 'get'
    // params: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbIntegralRules/savegdbIntegralRule',
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
    url: '/api/admin/gdbIntegralRules/deletegdbIntegralRule',
    method: 'delete',
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
