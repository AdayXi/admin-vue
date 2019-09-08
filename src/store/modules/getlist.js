import { doctor, channel, dept } from 'api/new/store/index'
const getlis = {
  state: {
    doctor: [],
    channel: [],
    dept: [],
    listQuery: {
      page: 1,
      limit: 1000
    }
  },
  mutations: {
    getdoctor(state, obj) {
      state.doctor = obj.res
    },
    getchanel(state, obj) {
      state.channel = obj.res
    },
    getdept(state, obj) {
      state.dept = obj.res
    }
  },
  actions: {
    getdoctor(context) {
      doctor(context.state.listQuery).then(response => {
        console.log(response.data.rows)
        context.commit({
          type: 'getdoctor',
          res: response.data.rows
        })
      })
      console.log(context.state.doctor)
    },
    getchannel(context) {
      channel(context.state.listQuery).then(response => {
        context.commit({
          type: 'getdoctor',
          res: response
        })
      })
    },
    getdept(context) {
      dept(context.state.listQuery).then(response => {
        context.commit({
          type: 'getdoctor',
          res: response
        })
      })
    }
  }
}

export default getlis
