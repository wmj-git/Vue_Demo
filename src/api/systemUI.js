import request from '@/utils/request';


export const systemData = [ //默认数据模型
  {"system_id": "nav", "system_type": "nav", "title": "", "top": "", "left": "", "show": true, "resizable": false,
    "class": "em-nav-window",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": "",
    "menu_id": "winMenu",
    "activeIndex": "nav_database"
  },
  {
    "system_id": "nav_systemManage",
    "system_type": "navItem",
    "title": "系统管理",
    "control_type": "",
    "control_id": "winMenu_body",
    "fn": "",
    "data_type": "",
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
    "data_type": ""
  },
  {
    "system_id": "nav_systemManage_role",
    "system_type": "navList",
    "title": "角色管理",
    "show": false,
    "icon": "el-icon-role-manage",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "data_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions",
    "system_type": "navList",
    "title": "权限管理",
    "show": false,
    "icon": "el-icon-permissions-manage",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "data_type": ""
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
    "data_type": ""
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
    "data_type": ""
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
    "system_type": "win",
    "winSpan": 48,
    "component": "",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "data_type": ""
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
  },
  {
    system_id: "role_manage",
    system_type: "win",
    id: "a2",
    parentId: "0",
    winLayout: "1",
    title: "角色管理",
    top: 80,
    left: 400,
    width: 700,
    class: "em-table-window",
    show: false
  },
  {
    system_id: "role_manage_form",
    system_type: "win_form",
    id: "b2",
    parentId: "a2",
    winSpan: 48,
    component: "emForm"
  },
  {
    system_id: "role_manage_table",
    system_type: "win_table",
    id: "b3",
    parentId: "a2",
    winSpan: 48,
    component: "emTable",
    maxHeight: "380",
    resourceUrl: "",
    tableColumn: " [\n" +
      "    {\n" +
      "      \"label\": \"英文名\",\n" +
      "      \"prop\": \"roleEname\",\n" +
      "      \"width\": \"100\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"label\": \"中文名\",\n" +
      "      \"prop\": \"roleCname\",\n" +
      "      \"width\": \"100\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"label\": \"角色编码\",\n" +
      "      \"prop\": \"roleCode\",\n" +
      "      \"width\": \"80\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"label\": \"备注\",\n" +
      "      \"prop\": \"remark\",\n" +
      "      \"width\": \"\"\n" +
      "    }\n" +
      "  ]"
  },
  {
    system_id: "role_manage_table_btn_1",
    system_type: "win_table_btn",
    id: "b2",
    parentId: "a2",
    label: "操作",
    value: "权限分配",
    fn: "handleEdit"
  },
  {
    system_id: "role_manage_table_btn_2",
    system_type: "win_table_btn",
    id: "b2",
    parentId: "a2",
    label: "操作",
    value: "关联用户",
    fn: "handleEdit"
  },
  {
    system_id: "department_manage",
    system_type: "win",
    id: "a3",
    parentId: "0",
    winLayout: "1",
    title: "部门管理",
    top: 80,
    left: 400,
    width: 700,
    height: 560,
    class: "em-table-window",
    show: false
  },
  {
    system_id: "department_manage_table",
    system_type: "win_table",
    id: "b2",
    parentId: "a3",
    winSpan: 12,
    component: "emTable"
  },
  {
    system_id: "department_manage_table",
    system_type: "win_table",
    id: "b2",
    parentId: "a3",
    winSpan: 36,
    component: "emTable"
  },
  {
    system_id: "department_manage_table",
    system_type: "win_table",
    id: "b3",
    parentId: "a3",
    winSpan: 48,
    component: "emTable"
  }
];
