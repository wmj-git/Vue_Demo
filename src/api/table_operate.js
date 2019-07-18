import request from '@/utils/request'
export function add(obj) {
  switch (obj.id) {
    case "soil_temperature_manage_table":
      obj.params.pointType = "S";
      obj.params.temperatureOrHumidity = "T";
      break;
    case "soil_humidity_manage_table":
      obj.params.pointType = "S";
      obj.params.temperatureOrHumidity = "H";
      break;
    case "air_temperature_manage_table":
      obj.params.pointType = "A";
      obj.params.temperatureOrHumidity = "T";
      break;
    case "air_humidity_manage_table":
      obj.params.pointType = "A";
      obj.params.temperatureOrHumidity = "H";

  }
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}

  export function dele(obj) {          //表格数据删
    return request({
      url: obj.url,
      method: 'delete',
      data: obj.params
    })
  }

  export function find(obj) {         //表格数据查
    return request({
      url: obj.url,
      method: 'get',
      params: obj.params
    })
  }

  export function modify(obj) {        //表格数据改
    return request({
      url: obj.url,
      method: 'post',
      data: obj.params
    })
  }

  export function selectUrl(obj) {        //增加和修改的弹出来select获取数据
    return request({
      url: obj.url,
      method: 'get',
    })
  }

export function downCsvmodel(obj) {         //下载上传表格的模板
  return request({
    url: obj.url,
    method: 'get',
  })
}
export function upLoad(obj) {         //上传表格
  return request({
    url: obj.url,
    method: 'post',
  })
}
export function resetPassword(id) {         //账户密码重置
  return request({
    url: "/user/userext/resetPwd/"+id,
    method: 'get'
  })
}

export function getPictureImg(obj) {       //获取图片
  return request({
    url: obj.url+obj.id,
    method: 'get',
  })
}
export function roleList() {       //下拉选择角色时调此方法
  return request({
    url: "/user/role/queryPage",
    method: 'get'
  })
}
export function userList() {       //查询全部用户时调此方法
  return request({
    url: "/user/userext/queryAllUser",
    method: 'get'
  })
}
export function roadList() {       //查询全部路段时调此方法
  return request({
    url: "/gardens/road/queryAll",
    method: 'get'
  })
}
export function setRoles(obj) {       //为用户设置角色的方法
  return request({
    url: "/user/userext/addUserRole",
    method: 'post',
    data:obj
  })
}
export function setRoads(obj) {               //为单位设置道路的方法
  return request({
    url: "/gardens/ent/addEntRoad",
    method: 'post',
    data:obj
  })
}
export function roleInformation(obj) {        //根据用户id查询角色
  return request({
    url: "/user/role/queryRoleByUserId",
    method: 'get',
    params: obj
  })
}
export function userInformation(obj) {       //根据角色id查询用户
  return request({
    url: "/user/userext/queryUserExtByRoleId",
    method: 'get',
    params: obj
  })
}
export function roadInformation(obj) {       //根据养护单位id查询道路
  return request({
    url: "/gardens/road/queryByEndId",
    method: 'get',
    params: obj
  })
}
export function delEntRoad(obj) {       //删除养护单位的养护路段
  return request({
    url: "/gardens/ent/delEntRoad",
    method: 'post',
    data: obj
  })
}

export function executeProgram(obj) {       //执行计划生成记录
  return request({
    url: "",
    method: 'post',
    data: obj
  })
}

export function completeProgram(obj) {       //统计计划所需材料
  return request({
    url: "/gardens/fertilizationProgram/skipProgram",
    method: 'post',
    data: obj
  })
}






