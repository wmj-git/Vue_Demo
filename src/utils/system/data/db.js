export const nav = {//主菜单类型
  systemType: [
    "nav",
    "navItem",
    "navList"
  ],
  dataType: {
    "nav": {
      description: {},//配置数据
      resourceCode: {}//字段label
    },
    "navItem": {
      description: {},
      resourceCode: {}
    },
    "navList": {
      description: {},
      resourceCode: {}
    }
  }
};

export const winComponent = {//win组件类型
  systemType: [
    "win",
    "win_menu_body",
    "win_component",
    "win_component_table",
    "win_component_table_columnBtn",
    "win_component_form",
    "win_component_formItem",
    "win_component_formButton",
    "win_component_buttonGroup",
    "win_component_buttonGroup_item",
    "win_component_tree",
    "win_component_transfer"

  ],
  dataType: []
};

export const systemComponent = {//类型
  systemType: [
    "system",
    "system_layout",
    "system_layout_dialog",
    "system_layout_dialog_form",
    "system_layout_dialog_formItem",
    "system_layout_dialog_formButton",
    "system_layout_dialog_buttonGroup",
    "system_layout_dialog_buttonGroup_item",
    "system_layout_drawer"
  ],
  dataType: []
};
