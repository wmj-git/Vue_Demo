export const nav = {
  systemType: ["nav", "navItem", "navList"],
  uiData: [ //默认数据模型
    {
      system_id: "nav",
      system_type: "nav",
      id: "1",
      parentId: "0",
      layout: {},
      title: "",
      top: "84%",
      left: "",
      show: true,
      resizable: false,
      class: "em-nav-window",
      control_id: "menu",
      activeIndex: ''
    },
    {
      system_id: "nav_detectdata",
      system_type: "navItem",
      id: "11",
      parentId: "1",
      layout: {},
      control_id: "",
      icon: "icon-real-time-monitoring",
      show: false,
      title: "监测数据",
      width: 160,
    },
    {
      system_id: "nav_time_detective",
      system_type: "navList",
      id: "111",
      parentId: "11",
      layout: {},
      "icon": "el-icon-real-time-monitoring",
      "control_id": "time_detective",
      "title": "实时监测",
      "show": false
    },
    {
      system_id: "nav_oil_detetive",
      system_type: "navList",
      id: "112",
      parentId: "11",
      layout: {},
      "icon": "el-icon-soil-monitoring",
      "control_id": "oil_detetive",
      "title": "土壤监测",
      "show": false
    },
    {
      system_id: "nav_population_detective",
      system_type: "navList",
      id: "113",
      parentId: "11",
      layout: {},
      "icon": "el-icon-people-monitoring",
      "control_id": "population_detective",
      "title": "人流量监测",
      "show": false
    },
    {
      system_id: "nav_air_detective",
      system_type: "navList",
      id: "114",
      parentId: "11",
      layout: {},
      "icon": "el-icon-air-monitoring",
      "control_id": "air_detective",
      "title": "空气监测",
      "show": false
    },
    {
      system_id: "nav_fire_alert",
      system_type: "navList",
      id: "115",
      parentId: "11",
      layout: {},
      "icon": "el-icon-fire-alarm-monitoring",
      "control_id": "fire_alert",
      "title": "火灾报警",
      "show": false
    },
    {
      system_id: "nav_greenprotect",
      system_type: "navItem",
      id: "12",
      parentId: "1",
      layout: {},
      control_id: "",
      show: false,
      title: "绿化养护",
      width: 168,
    },
    {
      system_id: "nav_grid_scope",
      system_type: "navList",
      id: "121",
      parentId: "12",
      layout: {},
      "icon": "el-icon-grid-scope",
      "control_id": "grid_scope",
      "title": "网格范围",
      "show": false
    },
    {
      system_id: "nav_protect_company",
      system_type: "navList",
      id: "122",
      parentId: "12",
      layout: {},
      "icon": "el-icon-unit-manage",
      "control_id": "protect_company",
      "title": "维护单位",
      "show": false
    },
    {
      system_id: "nav_tree_distribution",
      system_type: "navList",
      id: "123",
      parentId: "12",
      layout: {},
      "icon": "el-icon-tree-distribution",
      "control_id": "tree_distribution",
      "title": "特殊树木分布",
      "show": false
    },
    {
      system_id: "nav_querystatics",
      system_type: "navItem",
      id: "13",
      parentId: "1",
      layout: {},
      show: false,
      control_id: "",
      title: "查询统计",
      width: 220,
    },
    {
      system_id: "nav_tree_statistic",
      system_type: "navList",
      id: "131",
      parentId: "13",
      layout: {},
      "icon": "el-icon-tree-analysis",
      "control_id": "tree_statistic",
      "title": "特殊树木统计分析",
      "show": false
    },
    {
      system_id: "nav_soil_temperature_analysis",
      system_type: "navList",
      id: "132",
      parentId: "13",
      layout: {},
      "icon": "el-icon-soil-analysis",
      "control_id": "soil_temperature_analysis",
      "title": "土壤温度统计分析",
      "show": false
    },
    {
      system_id: "nav_soil_humidity_analysis",
      system_type: "navList",
      id: "133",
      parentId: "13",
      layout: {},
      "icon": "el-icon-soil-analysis",
      "control_id": "soil_humidity_analysis",
      "title": "土壤湿度统计分析",
      "show": false
    },
    {
      system_id: "nav_population_analysis",
      system_type: "navList",
      id: "134",
      parentId: "13",
      layout: {},
      "icon": "el-icon-people-analysis",
      "control_id": "population_analysis",
      "title": "人流量统计分析",
      "show": false
    },
    {
      system_id: "nav_air_temperature_analysis",
      system_type: "navList",
      id: "135",
      parentId: "13",
      layout: {},
      "icon": "el-icon-air-analysis",
      "control_id": "air_temperature_analysis",
      "title": "空气温度统计分析",
      "show": false
    },
    {
      system_id: "nav_air_humidity_analysis",
      system_type: "navList",
      id: "136",
      parentId: "13",
      layout: {},
      "icon": "el-icon-air-analysis",
      "control_id": "air_humidity_analysis",
      "title": "空气湿度统计分析",
      "show": false
    },
    {
      system_id: "nav_fire_alert_anaysis",
      system_type: "navList",
      id: "137",
      parentId: "13",
      layout: {},
      "icon": "el-icon-fire-alarm-analysis",
      "control_id": "fire_alert_anaysis",
      "title": "火险报警统计分析",
      "show": false
    },
    {
      system_id: "nav_database",
      system_type: "navItem",
      id: "14",
      parentId: "1",
      layout: {},
      control_id: "",
      show: false,
      title: "基础数据",
      width: 210,
    },
    {
      system_id: "nav_people_manage",
      system_type: "navList",
      id: "141",
      parentId: "14",
      layout: {},
      "icon": "el-icon-personnel-manage",
      "control_id": "people_manage",
      "title": "人员管理",
      "show": false
    },
    {
      system_id: "nav_protect_company_manage",
      system_type: "navList",
      id: "142",
      parentId: "14",
      layout: {},
      "icon": "el-icon-unit-manage",
      "control_id": "protect_company_manage",
      "title": "维护单位管理",
      "show": false
    },
    {
      system_id: "nav_tree_type_manage",
      system_type: "navList",
      id: "143",
      parentId: "14",
      layout: {},
      "icon": "el-icon-tree-type",
      "control_id": "tree_type_manage",
      "title": "树种类型管理",
      "show": false
    },
    {
      system_id: "nav_plant_type_manage",
      system_type: "navList",
      id: "144",
      parentId: "14",
      layout: {},
      "icon": "el-icon-plant-type",
      "control_id": "plant_type_manage",
      "title": "植物类型管理",
      "show": false
    },
    {
      system_id: "nav_tree_material_manage",
      system_type: "navList",
      id: "145",
      parentId: "14",
      layout: {},
      "icon": "el-icon-tree-data",
      "control_id": "tree_material_manage",
      "title": "特殊树木资料管理",
      "show": false
    }, {
      system_id: "nav_grid_manage",
      system_type: "navList",
      id: "146",
      parentId: "14",
      layout: {},
      "icon": "el-icon-grid-manage",
      "control_id": "grid_manage",
      "title": "网格管理",
      "show": false
    }, {
      system_id: "nav_soil_temperature_manage",
      system_type: "navList",
      id: "147",
      parentId: "14",
      layout: {},
      "icon": "el-icon-soil-temp",
      "control_id": "soil_temperature_manage",
      "title": "土壤温度监测点管理",
      "show": false
    }, {
      system_id: "nav_soil_humidity_manage",
      system_type: "navList",
      id: "148",
      parentId: "14",
      layout: {},
      "icon": "el-icon-soil-hum",
      "control_id": "soil_humidity_manage",
      "title": "土壤湿度监测点管理",
      "show": false
    }, {
      system_id: "nav_population_manage",
      system_type: "navList",
      id: "149",
      parentId: "14",
      layout: {},
      "icon": "el-icon-people-point",
      "control_id": "population_manage",
      "title": "人流量监测点管理",
      "show": false
    }, {
      system_id: "nav_air_temperature_manage",
      system_type: "navList",
      id: "1410",
      parentId: "14",
      layout: {},
      "icon": "el-icon-air-temp-point",
      "control_id": "air_temperature_manage",
      "title": "空气温度监测点管理",
      "show": false
    }, {
      system_id: "nav_air_humidity_manage",
      system_type: "navList",
      id: "1411",
      parentId: "14",
      layout: {},
      "icon": "el-icon-air-hum",
      "control_id": "air_humidity_manage",
      "title": "空气湿度监测点管理",
      "show": false
    }, {
      system_id: "nav_fire_alert_manage",
      system_type: "navList",
      id: "1412",
      parentId: "14",
      layout: {},
      "icon": "el-icon-fire-alarm-point",
      "control_id": "fire_alert_manage",
      "title": "火灾报警点管理",
      "show": false
    }, {
      system_id: "nav_systemmanage",
      system_type: "navItem",
      id: "15",
      parentId: "1",
      layout: {},
      control_id: "",
      show: false,
      title: "系统管理",
      width: 150,
    },{
      system_id: "nav_role_manage",
      system_type: "navList",
      id: "151",
      parentId: "15",
      layout: {},
      "icon": "el-icon-role-manage",
      "control_id": "role_manage",
      "title": "角色管理",
      "show": false
    },{
      system_id: "nav_department_manage",
      system_type: "navList",
      id: "152",
      parentId: "15",
      layout: {},
      "icon": "el-icon-maintenance-unit",
      "control_id": "department_manage",
      "title": "部门管理",
      "show": false
    },{
      system_id: "nav_system_record",
      system_type: "navList",
      id: "153",
      parentId: "15",
      layout: {},
      "icon": "el-icon-sys-log",
      "control_id": "system_record",
      "title": "系统日志",
      "show": false
    },{
      system_id: "nav_account_manage",
      system_type: "navList",
      id: "154",
      parentId: "15",
      layout: {},
      "icon": "el-icon-account-manage",
      "control_id": "account_manage",
      "title": "账户管理",
      "show": false
    },{
      system_id: "nav_permissions_management",
      system_type: "navList",
      id: "155",
      parentId: "15",
      layout: {},
      "icon": "el-icon-permissions-manage",
      "control_id": "permissions_management",
      "title": "权限管理",
      "show": false
    },
  ]
};

export const winComponent = {
  systemType: ["win"],
  uiData: []
};
