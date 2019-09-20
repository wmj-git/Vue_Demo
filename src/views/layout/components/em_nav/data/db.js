export const db_buttonGroup = [
  {
    id: "nav_detectdata",
    control_id: "",
    icon: "icon-real-time-monitoring",
    show: false,
    title: "监测数据",
    width: 230,
    list: [
      {
        "icon": "el-icon-real-time-monitoring",
        "id": "nav_time_detective",
        "control_id": "time_detective",
        "title": "报警监测",
        "show": false
      },
      {
        "id": "nav_oil_detective",
        "type": "info",
        "title": "土壤监测",
        "show": false,
        icon: "el-icon-soil-monitoring",
        trigger: true,
        control_type: "scene",
        control_id: "",
        fn: "scene_data",
        data_type: "4",
        layer_name: "oilDetective",
        layer_title: "土壤",
        api_name: "marker",
        data_url: "/gardens/temhumpoints/queryAll",
        data_maker_iconUrl: "../../static/image/marker_3.png",
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
        layer_name: "populationDetective",
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
        layer_name: "airDetective",
        layer_title: "空气",
        api_name: "marker",
        data_url: "/gardens/temhumpoints/queryAll",
        data_maker_iconUrl: "../../static/image/marker_4.png",
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
        layer_name: "fireAlert",
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
    width: 230,
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
        layer_name: "roadAddress",
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
        layer_name: "protectCompany",
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
        layer_name: "TreeDistribution",
        layer_title: "树木分布",
        api_name: "marker",
        data_url: "/gardens/tree/queryAllByPage",
        data_maker_iconUrl: "../../static/image/marker_1.png",
        params_pageNum: -1,
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
    width: 230,
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
    width: 230,
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
    width: 230,
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

