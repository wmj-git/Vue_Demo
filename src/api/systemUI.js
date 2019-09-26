import request from '@/utils/request';


export const systemData = [ //默认数据模型
  {
    "system_id": "nav", "system_type": "nav", "title": "", "top": "", "left": "", "show": true, "resizable": false,
    "class": "em-nav-window",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": "",
    "menu_id": "winMenu",
    "activeIndex": "nav_systemManage"
  },
  {
    "system_id": "nav_systemManage",
    "system_type": "navItem",
    "title": "系统管理",
    "control_type": "",
    "control_id": "winMenu_body",
    "fn": "",
    "fn_type": "",
    "show": false,
    "width": 230
  },
  {
    "system_id": "nav_systemManage_account",
    "system_type": "navList",
    "title": "账户管理",
    "show": false,
    "icon": "el-icon-account-manage",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role",
    "system_type": "navList",
    "title": "角色管理",
    "show": false,
    "icon": "el-icon-role-manage",
    "control_type": "",
    "control_id": "nav_systemManage_role_win",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win",
    "system_type": "win",
    "winLayout": "1",
    "title": "角色管理",
    "top": "148px",
    "left": "M-800px",
    "width": 800,
    "show": false,
    "resizable": false,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-table-window"
  },
  {
    "system_id": "nav_systemManage_role_win_emForm",
    "system_type": "win_component_form",
    "title": "角色管理-表单组",
    "winSpan": 48,
    "component": "emForm",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emTable",
    "system_type": "win_component_table",
    "title": "角色管理表格数据",
    "winSpan": 48,
    "component": "emTable",
    "maxHeight": "380",
    "tableColumn": {
      "data": [
        {
          "label": "英文名",
          "prop": "roleEname",
          "width": 100
        },
        {
          "label": "中文名",
          "prop": "roleCname",
          "width": 100
        },
        {
          "label": "角色编码",
          "prop": "roleCode",
          "width": 100
        },
        {
          "label": "备注",
          "prop": "remark",
          "width": 100
        }
      ]
    },
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emTable_columnBtn",
    "system_type": "win_component_table_columnBtn",
    "title": "权限分配",
    "label": "设置",
    "minWidth":12,
    "control_type": "",
    "control_id": "",
    "fn": "handleEdit",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emTable_columnBtn",
    "system_type": "win_component_table_columnBtn",
    "title": "关联用户",
    "label": "设置",
    "minWidth":12,
    "control_type": "",
    "control_id": "",
    "fn": "handleEdit",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions",
    "system_type": "navList",
    "title": "权限管理",
    "show": false,
    "icon": "el-icon-permissions-manage",
    "control_type": "",
    "control_id": "nav_systemManage_permissions_win",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win",
    "system_type": "win",
    "winLayout": "1",
    "title": "权限管理-窗口",
    "top": "148px",
    "left": "M-800px",
    "width": 800,
    "show": false,
    "resizable": false,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-table-window"
  },
  {
    "system_id": "nav_systemManage_department",
    "system_type": "navList",
    "title": "机构管理",
    "show": false,
    "icon": "el-icon-maintenance-unit",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_record",
    "system_type": "navList",
    "title": "系统日志",
    "show": false,
    "icon": "el-icon-sys-log",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase",
    "system_type": "navItem",
    "title": "基础数据",
    "show": false,
    "width": 230,
    "control_type": "",
    "control_id": "winMenu_body",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_peopleManage",
    "system_type": "navList",
    "title": "人员管理",
    "show": false,
    "icon": "el-icon-personnel-manage",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_protectCompanyManage",
    "system_type": "navList",
    "title": "养护单位管理",
    "show": false,
    "icon": "el-icon-unit-manage",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_treeTypeManage",
    "system_type": "navList",
    "title": "树种类型管理",
    "show": false,
    "icon": "el-icon-tree-type",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_plantTypeManage",
    "system_type": "navList",
    "title": "植物类型管理",
    "show": false,
    "icon": "el-icon-plant-type",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_treeMaterialManage",
    "system_type": "navList",
    "title": "特殊树木资料管理",
    "show": false,
    "icon": "el-icon-tree-data",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_gridManage",
    "system_type": "navList",
    "title": "网格管理",
    "show": false,
    "icon": "el-icon-grid-manage",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_roadManage",
    "system_type": "navList",
    "title": "道路管理",
    "show": false,
    "icon": "el-icon-road",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_monitorPointsManage",
    "system_type": "navList",
    "title": "监控点管理",
    "show": false,
    "icon": "el-icon-jkd-management",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_soilTemperatureManage",
    "system_type": "navList",
    "title": "土壤温度监测点管理",
    "show": false,
    "icon": "el-icon-soil-temp",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_soilHumidityManage",
    "system_type": "navList",
    "title": "土壤湿度监测点管理",
    "show": false,
    "icon": "el-icon-soil-hum",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_populationManage",
    "system_type": "navList",
    "title": "人流量监测点管理",
    "show": false,
    "icon": "el-icon-people-point",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_airTemperatureManage",
    "system_type": "navList",
    "title": "空气温度监测点管理",
    "show": false,
    "icon": "el-icon-air-temp-point",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_airHumidityManage",
    "system_type": "navList",
    "title": "空气湿度监测点管理",
    "show": false,
    "icon": "el-icon-air-hum",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_dataBase_fireAlertManage",
    "system_type": "navList",
    "title": "火灾报警点管理",
    "show": false,
    "icon": "el-icon-fire-alarm-point",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },

  {
    "system_id": "scene_data",
    "system_type": "win",
    "winLayout": "1",
    "title": "场景数据",
    "top": "132px",
    "left": "R-234px",
    "width": 230,
    "height": 720,
    "show": true,
    "resizable": false,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-scene-window"
  },
  {
    "system_id": "scene_data_emTabs",
    "system_type": "win_component",
    "title": "场景数据树形显示",
    "winSpan": 48,
    "component": "",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "winMenu",
    "system_type": "win",
    "winLayout": "1",
    "title": "功能菜单",
    "left": "L-4px",
    "top": "132px",
    "width": 230,
    "height": 720,
    "show": true,
    "resizable": false,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-menu-window"
  },
  {
    "system_id": "winMenu_body",
    "system_type": "win_menu_body",
    "winSpan": 48,
    "component": "emMenu",
    "control_id": "",
    "control_type": "",
    "fn": "",
    "fn_type": ""
  }
]
