export const db_buttonGroup = [
  {
    id: "nav_detectdata",
    control_id: "",
    icon: "icon-real-time-monitoring",
    show: false,
    title: "监测数据",
    width: 160,
    list: [
      {
        "icon": "el-icon-real-time-monitoring",
        "id": "nav_time_detective",
        "control_id": "time_detective",
        "title": "实时监测",
        "show": false
      },
      {
        "id": "nav_oil_detetive",
        "type": "info",
        "title": "土壤监测",
        "show": false,
        icon: "el-icon-soil-monitoring",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "4",
        layer_name: "oil_detetive",
        layer_title: "土壤",
        api_name: "marker",
        data_url: "/gardens/temhumpoints/queryAll",
        data_maker_iconUrl: "../../static/image/marker_2.png",
        params_pointType: "S",
        maker_titleKey: "pointsName",
        clusters_color: "#ffc62e"
      },
      {
        "id": "nav_population_detective",
        "title": "人流量监测",
        "show": false,
        "type": "info",
        icon: "el-icon-people-monitoring",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "4",
        layer_name: "population_detective",
        layer_title: "人流量",
        api_name: "marker",
        data_url: "/gardens/humantraffic/queryAll",
        data_maker_iconUrl: "../../static/image/marker_2.png",
        maker_titleKey: "monitorName",
        clusters_color: "#666111"
      },
      {
        "id": "nav_air_detective",
        "title": "空气监测",
        "show": false,
        "type": "info",
        icon: "el-icon-air-monitoring",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "4",
        layer_name: "air_detective",
        layer_title: "空气",
        api_name: "marker",
        data_url: "/gardens/temhumpoints/queryAll",
        data_maker_iconUrl: "../../static/image/marker_2.png",
        params_pointType: "A",
        maker_titleKey: "pointsName",
        clusters_color: "#181966"
      },
      {
        "id": "nav_fire_alert",
        "title": "火灾报警",
        "show": false,
        "type": "info",
        icon: "el-icon-fire-alarm-monitoring",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "4",
        layer_name: "fire_alert",
        layer_title: "火灾",
        api_name: "marker",
        // data_url: "/gardens/firealarm/queryAll",
        data_url: "/gardens/firealarm/queryAllByPage",
        data_maker_iconUrl: "../../static/image/marker_2.png",
        params_pageNum: -1,
        maker_titleKey: "fireAlarmName",
        clusters_color: "#66100d"
      }
    ]
  },
  {
    id: "nav_greenprotect",
    control_id: "",
    show: false,
    title: "绿化养护",
    width: 168,
    list: [
      {
        "id": "nav_road_address",
        "title": "道路地址",
        "show": false,
        type: "info",
        icon: "el-icon-road",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "3",
        layer_name: "road_address",
        layer_title: "道路",
        api_name: "geom",
        data_url: "/gardens/road/queryAll",
        geomType: "line",
        geom_titleKey: "roadName",
        strokeWidth: 2,
        strokeColor: "[0, 100, 255, 255]",
        fillColor: "[0, 100, 255, 255]"
      },
      {
        "id": "nav_district",
        "title": "行政区划",
        "show": false,
        type: "info",
        icon: "el-icon-road",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "3",
        layer_name: "district",
        layer_title: "行政区划",
        api_name: "geom",
        data_url: "/gardens/district/queryAllByPage",
        params_pageNum: -1,
        geomType: "polygon",
        geom_titleKey: "districtName",
        strokeWidth: 4,
        strokeColor: "[125, 255, 0, 180]",
        fillColor: "[60, 100, 12, 150]"
      },
      {
        "id": "nav_protect_company",
        "title": "养护单位",
        "show": false,
        type: "info",
        icon: "el-icon-unit-manage",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "3",
        layer_name: "protect_company",
        layer_title: "养护单位",
        api_name: "geom",
        data_url: "/gardens/ent/queryAll",
        geomType: "line",
        geom_titleKey: "entName",
        strokeWidth: 2,
        strokeColor: "[0, 255, 0, 255]",
        fillColor: "[0, 100, 255, 255]"
      },
      {
        "icon": "el-icon-yh-plan",
        "id": "nav_protect_plan",
        "control_id": "protect_plan",
        "title": "养护计划",
        "show": false
      },
      {
        "icon": "el-icon-yh-record",
        "id": "nav_protect_record",
        "control_id": "protect_record",
        "title": "养护记录",
        "show": false
      },
      {
        "id": "nav_tree_distribution",
        "title": "特殊树木分布",
        "show": false,
        "type": "info",
        icon: "el-icon-tree-distribution",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "4",
        layer_name: "tree_distribution",
        layer_title: "树木分布",
        api_name: "marker",
        data_url: "/gardens/tree/queryVicinityTree",
        data_maker_iconUrl: "../../static/image/marker_1.png",
        params_lo: 114.03188276054428,
        params_la: 22.619840297782094,
        params_distance: 10000,
        maker_titleKey: "treeName",
        clusters_color: "#46ff71"
      }
    ]
  },
  {
    id: "nav_querystatics",
    show: false,
    control_id: "",
    title: "查询统计",
    width: 220,
    list: [
      {
        "icon": "el-icon-tree-analysis",
        "id": "nav_tree_statistic",
        "control_id": "tree_statistic",
        "title": "特殊树木统计分析",
        "show": false
      },
      {
        "icon": "el-icon-soil-analysis",
        "id": "nav_soil_temperature_analysis",
        "control_id": "soil_temperature_analysis",
        "title": "土壤温度统计分析",
        "show": false
      },
      {
        "icon": "el-icon-soil-analysis",
        "id": "nav_soil_humidity_analysis",
        "control_id": "soil_humidity_analysis",
        "title": "土壤湿度统计分析",
        "show": false
      },
      {
        "icon": "el-icon-people-analysis",
        "id": "nav_population_analysis",
        "control_id": "population_analysis",
        "title": "人流量统计分析",
        "show": false
      },
      {
        "icon": "el-icon-air-analysis",
        "id": "nav_air_temperature_analysis",
        "control_id": "air_temperature_analysis",
        "title": "空气温度统计分析",
        "show": false
      },
      {
        "icon": "el-icon-air-analysis",
        "id": "nav_air_humidity_analysis",
        "control_id": "air_humidity_analysis",
        "title": "空气湿度统计分析",
        "show": false
      },
      {
        "icon": "el-icon-fire-alarm-analysis",
        "id": "nav_fire_alert_anaysis",
        "control_id": "fire_alert_anaysis",
        "title": "火险报警统计分析",
        "show": false
      }
    ]
  },
  {
    id: "nav_database",
    control_id: "",
    show: false,
    title: "基础数据",
    width: 210,
    list: [
      {
        "icon": "el-icon-personnel-manage",
        "id": "nav_people_manage",
        "control_id": "people_manage",
        "title": "人员管理",
        "show": false
      },
      {
        "icon": "el-icon-unit-manage",
        "id": "nav_protect_company_manage",
        "control_id": "protect_company_manage",
        "title": "养护单位管理",
        "show": false
      },
      {
        "icon": "el-icon-tree-type",
        "id": "nav_tree_type_manage",
        "control_id": "tree_type_manage",
        "title": "树种类型管理",
        "show": false
      },
      {
        "icon": "el-icon-plant-type",
        "id": "nav_plant_type_manage",
        "control_id": "plant_type_manage",
        "title": "植物类型管理",
        "show": false
      },
      {
        "icon": "el-icon-tree-data",
        "id": "nav_tree_material_manage",
        "control_id": "tree_material_manage",
        "title": "特殊树木资料管理",
        "show": false
      },
      {
        "icon": "el-icon-grid-manage",
        "id": "nav_grid_manage",
        "control_id": "grid_manage",
        "title": "网格管理",
        "show": false
      },
      {
        "id": "nav_road_manage",
        "title": "道路管理",
        "show": false,
        type: "info",
        icon: "el-icon-road",
        control_type: "",
        control_id: "road_address",
      },
      {
        "icon": "el-icon-jkd-management",
        "id": "nav_monitor_points_manage",
        "control_id": "monitor_points_manage",
        "title": "监控点管理",
        "show": false
      },
      {
        "icon": "el-icon-soil-temp",
        "id": "nav_soil_temperature_manage",
        "control_id": "soil_temperature_manage",
        "title": "土壤温度监测点管理",
        "show": false
      },
      {
        "icon": "el-icon-soil-hum",
        "id": "nav_soil_humidity_manage",
        "control_id": "soil_humidity_manage",
        "title": "土壤湿度监测点管理",
        "show": false
      },
      {
        "icon": "el-icon-people-point",
        "id": "nav_population_manage",
        "control_id": "population_manage",
        "title": "人流量监测点管理",
        "show": false
      },
      {
        "icon": "el-icon-air-temp-point",
        "id": "nav_air_temperature_manage",
        "control_id": "air_temperature_manage",
        "title": "空气温度监测点管理",
        "show": false
      },
      {
        "icon": "el-icon-air-hum",
        "id": "nav_air_humidity_manage",
        "control_id": "air_humidity_manage",
        "title": "空气湿度监测点管理",
        "show": false
      },
      {
        "icon": "el-icon-fire-alarm-point",
        "id": "nav_fire_alert_manage",
        "control_id": "fire_alert_manage",
        "title": "火灾报警点管理",
        "show": false
      }
    ]
  },
  {
    id: "nav_systemmanage",
    control_id: "",
    show: false,
    title: "系统管理",
    width: 150,
    list: [
      {
        "icon": "el-icon-account-manage",
        "id": "nav_account_manage",
        "control_id": "account_manage",
        "title": "账户管理",
        "show": false
      },
      {
        "icon": "el-icon-role-manage",
        "id": "nav_role_manage",
        "control_id": "role_manage",
        "title": "角色管理",
        "show": false
      },
      {
        "icon": "el-icon-permissions-manage",
        "id": "nav_permissions_management",
        "control_id": "permissions_management",
        "title": "权限管理",
        "show": false
      },
      {
        "icon": "el-icon-maintenance-unit",
        "id": "nav_department_manage",
        "control_id": "department_manage",
        "title": "机构管理",
        "show": false
      },
      {
        "icon": "el-icon-sys-log",
        "id": "nav_system_record",
        "control_id": "system_record",
        "title": "系统日志",
        "show": false
      },


    ]
  }
];

let _cc = [
  {"data": [[114.01988811902551, 22.63467040718065], [114.02122061718877, 22.638667901670445], [114.02262925810423, 22.642741538912425], [114.0239617562675, 22.64651060514566]]},
  {"data": [[114.02594146782434, 22.63086326957132], [114.0295582485532, 22.630672912690855], [114.03085267534037, 22.628959700766657], [114.02715975185933, 22.62781755948386]]},
  {"data": [[114.04208373128789, 22.637830331396398], [114.04303551569022, 22.634099336539254], [114.04162687477476, 22.633033338008644], [114.0391522353287, 22.632919123880363]]},
  {"data": [[114.02981523034182, 22.623831962299093], [114.02998655153425, 22.623218061359587], [114.029068079586, 22.622951561726936], [114.02928223107652, 22.622294830489334]]},
  {"data": [[114.02759281376238, 22.623037222323152], [114.02809725949561, 22.621628581407702], [114.0264601903236, 22.621614304641668], [114.0262983869752, 22.622732651314408]]},
  {"data": [[[114.12251903112897, 22.667637839416436], [114.11419091760857, 22.59565914399007], [114.24030235091756, 22.606961583767763], [114.18973880454367, 22.68667352746308]]]},
  {"data": [[[113.75727176673402, 22.77828277618754], [113.80426612159917, 22.679535144445587], [113.9006342923353, 22.769359797415678], [113.81973261813707, 22.84490768435079],[113.78760989455836, 22.824682265801233]]]},
  {"data": [[[114.10813756880974, 22.580666160192333], [114.11148784990594, 22.54472678116027], [114.07128447675143, 22.54990448830896], [114.06732505363773, 22.590564717976587]]]},
];
