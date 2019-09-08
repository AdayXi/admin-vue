module.exports = file => () => import('@/views/' + file + '.vue')

// const dsds = function(file) {
//   return function() {
//     return import('@/views/' + file + '.vue')
//   }
// }
