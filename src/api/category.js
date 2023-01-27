import service from "../service";
// import qs from 'qs'

export function deleCategory (ids) {
  return service({
    method:'delete',
    url:'/category',
    params: { ids }
  })
}

export function addCategory(params) {
  return service({
    method:'post',
    url:'/category',
    params
  })
}

export function editCategory(params) {
  return service({
    method:'put',
    url:'/category',
    params
  })
}

//编辑页面反查询接口
export function queryCategoryById(id) {
  return service({
    method:'get',
    url:`/category/${id}`,
  })
}

//查询列表接口
export function  getCategoryPage(params) {
  return service({
    method:'get',
    url:  '/category/page',
    params
  })
}