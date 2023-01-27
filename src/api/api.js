//项目中我们大多时候都会把队友的接口请求封装成api来调用
import service from "../service";
import qs from 'qs'


//登陆接口
export function login(data) {
  return service({
    method: 'post',
    // url: '/employee/login',
    url: '/login',
    data
  })
}

//员工列表查询
export function employee(params) {
  return service({
    method:'get',
    url: '/employee',
    params
  })
}
//员工列表删除接口
export function employeeDel(id) {
  return service({
    method:'delete',
    url: `/employee/${id}`,  //拼接用·包？

  })
}

//信息列表新增接口
// export function info(data) {
//     data = qs.stringify(data)
//     return service({
//         method: 'post',
//         url: '/info',
//         data
//     })
// }

//信息列表新增和修改接口
export function info(type, data) {
  data = qs.stringify(data)
  let obj = {method:type, url: '/info', data}
  return service(obj)
}