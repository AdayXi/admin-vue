import fetch from 'utils/fetch'

export function page(obj) {
  return fetch({
    url: '/api/admin/gdbTopicMedicine/subMedicineList',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}
export function getObjGene(obj) {
  return fetch({
    url: '/api/admin/gdbTopicSub/subGene/' + obj,
    method: 'get'
  })
}
export function getObjSpot(obj) {
  return fetch({
    url: '/api/admin/gdbTopicSub/subGeneRs',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicMedicine/subMedicine',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}

export function delObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicMedicine/subMedicine/' + obj,
    method: 'delete'
    // headers: {
    //   'Content-type': 'application/json'
    // },
    // data: obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/admin/gdbTopicMedicine/subMedicine',
    method: 'put',
    headers: {
      'Content-type': 'application/json'
    },
    data: obj
  })
}
