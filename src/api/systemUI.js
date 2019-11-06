// 默认数据模型
export const systemData = [
  // 菜单
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
    "control_id": "nav_systemManage_account_win",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_account_win",
    "system_type": "win",
    "winLayout": "2",
    "title": "账户管理-窗口",
    "top": "148px",
    "left": "M-880px",
    "width": 880,
    "show": false,
    "resizable": true,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-table-window",
    "setHeight": "300px",
    "minPercent": 10,
    "defaultPercent": 30,
    "paneL": true,
    "paneR": true
  },
  {
    "system_id": "nav_systemManage_account_win_emButtonGroup1",
    "system_type": "win_component_buttonGroup",
    "title": "按钮组",
    "paneType": "paneL",
    "winOffset": 0,
    "winSpan": 48,
    "component": "emButtonGroup",
    "groupType": "group",
    "class": "",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_account_win_emButtonGroup1_item1",
    "system_type": "win_component_buttonGroup_item",
    "title": "确定",
    "type": "primary",
    "size": "",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_account_win_emButtonGroup1_item2",
    "system_type": "win_component_buttonGroup_item",
    "title": "确定",
    "type": "primary",
    "size": "",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_account_win_emButtonGroup2",
    "system_type": "win_component_buttonGroup",
    "title": "按钮组",
    "paneType": "paneR",
    "winOffset": 0,
    "winSpan": 12,
    "component": "emButtonGroup",
    "groupType": "",
    "class": "",
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
    "left": "M-880px",
    "width": 880,
    "show": false,
    "resizable": true,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-table-window"
  },
  {
    "system_id": "nav_systemManage_role_win_emForm",
    "system_type": "win_component_form",
    "title": "角色管理-表单",
    "winSpan": 48,
    "component": "emForm",
    "labelWidth": "",
    "class": "form-table",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_text",
    "system_type": "win_component_formItem",
    "title": "中文名",
    "winSpan": 8,
    "inputType": "text",
    "label": "",
    "valueKey": "roleCname",
    "defaultValue": "",
    "placeholder": "中文名",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": false, "message": "请输字段", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button",
    "system_type": "win_component_formButton",
    "title": "查询",
    "winSpan": 4,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "el-icon-search",
    "disabled": false,
    "control_type": "table",
    "control_id": "nav_systemManage_role_win_emTable",
    "fn": "queryFn",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button1",
    "system_type": "win_component_formButton",
    "title": "添加",
    "winSpan": 4,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "el-icon-plus",
    "disabled": false,
    "control_type": "table",
    "control_id": "nav_systemManage_role_win_emTable",
    "fn": "addDialog",
    "fn_type": "dialog",
    "dialog_id": "dialog_table",
    "dialog_fn": "visibleFn"
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button1_emForm",
    "system_type": "win_component_form",
    "title": "添加表单",
    "winSpan": 48,
    "component": "emForm",
    "labelPosition": "",
    "labelWidth": "80px",
    "class": "form-dialog",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button1_emForm_text1",
    "system_type": "win_component_formItem",
    "title": "英文名",
    "winSpan": 24,
    "inputType": "text",
    "label": "英文名",
    "valueKey": "roleEname",
    "defaultValue": "",
    "placeholder": "请输入",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输字母", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button1_emForm_text2",
    "system_type": "win_component_formItem",
    "title": "中文名",
    "winSpan": 24,
    "inputType": "text",
    "label": "中文名",
    "valueKey": "roleCname",
    "defaultValue": "",
    "placeholder": "请输入",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输中文", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button1_emForm_text3",
    "system_type": "win_component_formItem",
    "title": "角色编码",
    "winSpan": 24,
    "inputType": "text",
    "label": "角色编码",
    "valueKey": "roleCode",
    "defaultValue": "",
    "placeholder": "请输入",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button1_emForm_text4",
    "system_type": "win_component_formItem",
    "title": "备注",
    "winSpan": 24,
    "inputType": "text",
    "label": "备注",
    "valueKey": "remark",
    "defaultValue": "123",
    "placeholder": "请输入",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button1_emForm_button1",
    "system_type": "win_component_formButton",
    "title": "确定",
    "winOffset": 24,
    "winSpan": 12,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "table",
    "control_id": "nav_systemManage_role_win_emTable",
    "fn": "addFn",
    "fn_type": "",
    "dialog_id": "dialog_table",
    "dialog_fn": "closeFn"
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button1_emForm_button2",
    "system_type": "win_component_formButton",
    "title": "取消",
    "winSpan": 12,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "dialog",
    "control_id": "dialog_table",
    "fn": "closeFn",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2",
    "system_type": "win_component_formButton",
    "title": "修改",
    "winSpan": 4,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "el-icon-edit",
    "disabled": false,
    "control_type": "table",
    "control_id": "nav_systemManage_role_win_emTable",
    "fn": "addDialog",
    "fn_type": "dialog",
    "dialog_id": "dialog_table",
    "dialog_fn": "visibleFn",
    "dialog_title": "修改",
    "dialog_dataType": "currentRow_update"
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2_emForm",
    "system_type": "win_component_form",
    "title": "添加表单",
    "winSpan": 48,
    "component": "emForm",
    "labelPosition": "",
    "labelWidth": "80px",
    "class": "form-dialog",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2_emForm_text1",
    "system_type": "win_component_formItem",
    "title": "英文名",
    "winSpan": 24,
    "inputType": "text",
    "label": "英文名",
    "valueKey": "roleEname",
    "defaultValue": "",
    "placeholder": "请输入",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输字母", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2_emForm_text2",
    "system_type": "win_component_formItem",
    "title": "中文名",
    "winSpan": 24,
    "inputType": "text",
    "label": "中文名",
    "valueKey": "roleCname",
    "defaultValue": "",
    "placeholder": "请输入",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输中文", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2_emForm_text3",
    "system_type": "win_component_formItem",
    "title": "角色编码",
    "winSpan": 24,
    "inputType": "text",
    "label": "角色编码",
    "valueKey": "roleCode",
    "defaultValue": "",
    "placeholder": "请输入",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2_emForm_text4",
    "system_type": "win_component_formItem",
    "title": "备注",
    "winSpan": 24,
    "inputType": "text",
    "label": "备注",
    "valueKey": "remark",
    "defaultValue": "123",
    "placeholder": "请输入",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2_emForm_text5",
    "system_type": "win_component_formItem",
    "title": "ID",
    "winSpan": 24,
    "inputType": "text",
    "label": "ID",
    "valueKey": "id",
    "defaultValue": "",
    "placeholder": "ID",
    "disabled": true,
    "Validate": {
      "data": [
        {"required": false, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2_emForm_button1",
    "system_type": "win_component_formButton",
    "title": "确定",
    "winOffset": 24,
    "winSpan": 12,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "table",
    "control_id": "nav_systemManage_role_win_emTable",
    "fn": "updateFn",
    "fn_type": "",
    "dialog_id": "dialog_table",
    "dialog_fn": "closeFn"
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button2_emForm_button2",
    "system_type": "win_component_formButton",
    "title": "取消",
    "winSpan": 12,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "dialog",
    "control_id": "dialog_table",
    "fn": "closeFn",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emForm_button3",
    "system_type": "win_component_formButton",
    "title": "删除",
    "winOffset": 0,
    "winSpan": 4,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "el-icon-delete",
    "disabled": false,
    "control_type": "table",
    "control_id": "nav_systemManage_role_win_emTable",
    "fn": "delFn",
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
    "control_id": "nav_systemManage_role_win_emForm",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win_emTable_columnBtn1",
    "system_type": "win_component_table_columnBtn",
    "title": "权限分配",
    "label": "操作1",
    "minWidth": 12,
    "control_type": "columnBtn_win_tree",
    "control_id": "nav_systemManage_role_win1",
    "fn": "setCheckedKeys",
    "fn_type": "table",
    "tree_id": "nav_systemManage_role_win1_emTree"
  },
  {
    "system_id": "nav_systemManage_role_win_emTable_columnBtn2",
    "system_type": "win_component_table_columnBtn",
    "title": "关联用户",
    "label": "操作2",
    "minWidth": 12,
    "control_type": "columnBtn_win",
    "control_id": "nav_systemManage_role_win2",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win1",
    "system_type": "win",
    "winLayout": "1",
    "title": "权限分配-窗口",
    "top": "148px",
    "left": "M-640px",
    "width": 480,
    "show": false,
    "modal": true,
    "resizable": true,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-table-window"
  },
  {
    "system_id": "nav_systemManage_role_win1_emTree",
    "system_type": "win_component_tree",
    "title": "权限",
    "winOffset": 0,
    "winSpan": 48,
    "component": "emTree",
    "propsChildren": "children",
    "propsLabel": "resourceName",
    "checkbox": true,
    "buttons": false,
    "treeDataType": "permissions",
    "checkedKeysType": "table",
    "checkedKeysUrl": "/user/role/queryResource",
    "checkedKeysParams": {
      "params_id": "id"
    },
    "updateCheckedType": "table",
    "updateCheckedUrl": "/user/role/setRoleResource",
    "updateCheckedParams": {
      "params_resourceIds": "CheckedKeys",
      "params_roleId": "id"
    },
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win1_emButtonGroup",
    "system_type": "win_component_buttonGroup",
    "title": "按钮组",
    "winSpan": 48,
    "component": "emButtonGroup",
    "groupType": "",
    "class": "",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win1_emButtonGroup_item1",
    "system_type": "win_component_buttonGroup_item",
    "title": "确定",
    "type": "primary",
    "size": "",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "component",
    "control_id": "nav_systemManage_role_win1_emTree",
    "fn": "updateCheckedKeys",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win1_emButtonGroup_item2",
    "system_type": "win_component_buttonGroup_item",
    "title": "取消",
    "type": "primary",
    "size": "",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "win",
    "control_id": "nav_systemManage_role_win1",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_role_win2",
    "system_type": "win",
    "winLayout": "1",
    "title": "关联用户-窗口",
    "top": "148px",
    "left": "M-640px",
    "width": 640,
    "height": 600,
    "show": false,
    "resizable": true,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-table-window"
  },
  {
    "system_id": "nav_systemManage_role_win2_emTransfer",
    "system_type": "win_component_transfer",
    "title": "穿梭框",
    "winSpan": 48,
    "component": "emTransfer",
    "class": "",
    "control_type": "",
    "control_id": "",
    "fn": "",
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
    "winLayout": "2",
    "title": "权限管理-窗口",
    "top": "148px",
    "left": "M-800px",
    "width": 800,
    "show": false,
    "resizable": false,
    "maximizable": false,
    "closable": false,
    "draggable": false,
    "class": "em-table-window",
    "setHeight": "500px",
    "minPercent": 20,
    "defaultPercent": 30,
    "paneL": true,
    "paneR": true
  },
  {
    "system_id": "nav_systemManage_permissions_win_emTree",
    "system_type": "win_component_tree",
    "title": "权限",
    "paneType": "paneL",
    "winOffset": 0,
    "winSpan": 48,
    "component": "emTree",
    "propsChildren": "children",
    "propsLabel": "resourceName",
    "checkbox": false,
    "buttons": true,
    "treeDataType": "permissions",
    "handleNodeClickType": "form",
    "handleNodeClickControlId": "nav_systemManage_permissions_win_emForm",
    "handleNodeClickFn": "setForm",
    "appendUrl": "/user/resource/addResource",
    "removeUrl": "/user/resource/del",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm",
    "system_type": "win_component_form",
    "title": "权限管理-表单",
    "paneType": "paneR",
    "winOffset": 0,
    "winSpan": 48,
    "component": "emForm",
    "labelWidth": "80px",
    "class": "form-table",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text1",
    "system_type": "win_component_formItem",
    "title": "ID",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "id",
    "defaultValue": "",
    "placeholder": "",
    "disabled": true,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text2",
    "system_type": "win_component_formItem",
    "title": "名称",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "resourceName",
    "defaultValue": "",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text3",
    "system_type": "win_component_formItem",
    "title": "组件类型",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "resourceCode",
    "defaultValue": "win",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text4",
    "system_type": "win_component_formItem",
    "title": "父ID",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "parentId",
    "defaultValue": "",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text5",
    "system_type": "win_component_formItem",
    "title": "接口类型",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "resourceType",
    "defaultValue": "",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text6",
    "system_type": "win_component_formItem",
    "title": "接口地址",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "resourceUrl",
    "defaultValue": "",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text7",
    "system_type": "win_component_formItem",
    "title": "UI数据",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "description",
    "defaultValue": "",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text8",
    "system_type": "win_component_formItem",
    "title": "状态",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "dataStatus",
    "defaultValue": "",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text9",
    "system_type": "win_component_formItem",
    "title": "显示名称",
    "winSpan": 24,
    "inputType": "select",
    "label": "",
    "valueKey": "isMeum",
    "defaultValue": "",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": {
      "data": [
        {"label": "是", "value": true},
        {"label": "否", "value": false}
      ]
    },
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_text10",
    "system_type": "win_component_formItem",
    "title": "权重",
    "winSpan": 24,
    "inputType": "text",
    "label": "",
    "valueKey": "weight",
    "defaultValue": "",
    "placeholder": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输入", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": [],
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_button1",
    "system_type": "win_component_formButton",
    "title": "UI编辑",
    "winOffset": 21,
    "winSpan": 9,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "",
    "control_id": "",
    "fn": "addDrawer",
    "fn_type": "editUI",
    "drawer_key": "description",
    "drawer_id": "drawer_data",
    "drawer_fn": "visibleFn",
    "drawer_title": "UI属性"
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_button2",
    "system_type": "win_component_formButton",
    "title": "提交",
    "winOffset": 0,
    "winSpan": 9,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "",
    "control_id": "",
    "fn": "submitForm",
    "fn_type": "permissionsTree",
    "tree_id": "nav_systemManage_permissions_win_emTree",
    "tree_fn": "treeDataFn"
  },
  {
    "system_id": "nav_systemManage_permissions_win_emForm_button3",
    "system_type": "win_component_formButton",
    "title": "重置",
    "winOffset": 0,
    "winSpan": 9,
    "inputType": "button",
    "type": "primary",
    "class": "",
    "icon": "",
    "disabled": false,
    "control_type": "",
    "control_id": "",
    "fn": "resetForm",
    "fn_type": ""
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
    "system_id": "dialog_table",
    "system_type": "system_layout_dialog",
    "dialogLayout": "1",
    "title": "对话框_表格",
    "modal": true,
    "visible": false,
    "width": "480px",
    "control_id": "",
    "control_type": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "dialog_table_emForm",
    "system_type": "system_layout_dialog_form",
    "title": "表单",
    "winSpan": 48,
    "component": "emForm",
    "labelWidth": "",
    "class": "",
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "dialog_table_emForm_select",
    "system_type": "system_layout_dialog_formItem",
    "title": "下拉",
    "winSpan": 16,
    "inputType": "select",
    "label": "",
    "valueKey": "name",
    "defaultValue": "",
    "disabled": false,
    "Validate": {
      "data": [
        {"required": true, "message": "请输字段", "trigger": "change"}
      ]
    },
    "options_url": "none",
    "options": {
      "data": [
        {"label": "dsfs", "value": "dsfs1"}
      ]
    },
    "control_type": "",
    "control_id": "",
    "fn": "",
    "fn_type": ""
  },
  {
    "system_id": "drawer_data",
    "system_type": "system_layout_drawer",
    "dialogLayout": "1",
    "title": "",
    "modal": true,
    "visible": false,
    "appendToBody": true,
    "size": "20%",
    "control_id": "",
    "control_type": "",
    "fn": "",
    "fn_type": ""
  },
  {"data":[{"required":false,"message":"请输入","trigger":"change"}]}
  ]
