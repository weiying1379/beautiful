//引入axios
import axios from 'axios'

//请求基本路径
axios.defaults.baseURL='http://127.0.0.1:5000'
// 头像上传地址
export var head_img=axios.defaults.baseURL+'/users/avatar_upload'
// 商品图片上传
export var item_img=axios.defaults.baseURL+'/goods/goods_img_upload'
//商品图片访问地址
export var find_img=axios.defaults.baseURL+'/upload/imgs/goods_img/'
//店铺图片上传
export var shop_img=axios.defaults.baseURL+'/shop/upload'
// 商品地址
export var shop_myimg=axios.defaults.baseURL+'/upload/shop/'
//登录API
// account:账号
// password:密码
// export function login(account,password){
//     return axios.post('/user/checkLogin',{
//         account,password
//     })
// }
export var login=(account,password)=>axios.post('/users/checkLogin',{account,password})
// 添加账户
export var addName=(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})

// 验证token(用户令牌)
export var checktoken=(token)=>axios.get('/users/checktoken',{params:{token}})
//获取列表
export var getLst=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})
// 删除列表
export var del=(id)=>axios.get('/users/del',{params:{id}})
// 删除多个列表
export var dels=(ids)=>axios.get('/users/batchdel',{params:{ids}})
// 修改账户
export var chenges=(id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})
//检测原密码
export var oldPasswords=(oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}})
//修改密码
export var modifypwd=(newPwd,id)=>axios.post('/users/editpwd',{newPwd,id})
//获取个人信息
export var info=(id)=>axios.get('/users/accountinfo',{params:{id}})
//获取商品列表
export var orderlist=(params)=>axios.get('/order/list',{params})
//删除菜单
export var delMenu=(id)=>axios.get('/goods/del',{params:{id}})
//编辑菜单
export var edtMenu=(name,category,price,imgUrl,goodsDesc,id)=>axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id})
//获取订单列表
export var itemlist = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })
//查询订单
export var find=(id)=>axios.get('/order/detail',{params:{id}})
//获取分类列表
export var classList=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})
//添加分类
export var addcate=(cateName,state)=>axios.post('/goods/addcate',{cateName,state})
//删除分类
export var removeClass=(id)=>axios.get('/goods/delcate',{params:{id}})
//修改分类
export var modifyClass=(obj)=>axios.post('/goods/editcate',obj)
//获取所有菜单列表
export var modifyList=()=>axios.get('/goods/categories',{params:{}})
//添加商品
export var addmore=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})
// 修改订单
export var modifyordr=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})
//获取店铺详情
export var getshop=()=>axios.get('/shop/info')
//店铺修改
export var changeshop=(obj)=>axios.post('/shop/edit',obj)
//首页报表
export var index_list=()=>axios.get('/order/totaldata')
//订单报表
export var rpt=(date)=>axios.get('/order/ordertotal',{params:{date}})
// export xxx       //多次暴露                 接： import {name ,login } from 'xxx'
// export default   //默认暴露，只能暴露一次   接: import xxx from 'xxx'
