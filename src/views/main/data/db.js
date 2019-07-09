export const nav = {
  systemType: ["nav", "navItem", "navList"],
  uiData: [ //默认数据模型
    {
      system_id: "nav",
      system_type: "nav",
      id: "1123",
      parentId: "0",
      layout: {},
      title: "",
      top: "60%",
      left: "",
      show: true,
      resizable: false,
      class: "em-nav-window",
      control_id: "menu",
      activeIndex: ''
    },
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
      id: "23",
      parentId: "1",
      layout: {},
      control_id: "",
      icon: "icon-real-time-monitoring",
      show: false,
      title: "监测数据",
      width: 160,
    },
    {
      system_id: "nav_detectdata",
      system_type: "navItem",
      id: "24",
      parentId: "1123",
      layout: {},
      control_id: "",
      icon: "icon-real-time-monitoring",
      show: false,
      title: "监测数据",
      width: 160,
    },
    {
      system_id: "nav_detectdata",
      system_type: "navItem",
      id: "25",
      parentId: "1",
      layout: {},
      control_id: "",
      icon: "icon-real-time-monitoring",
      show: false,
      title: "监测数据",
      width: 160,
    },
    {
      system_id: "nav_detectdata",
      system_type: "navItem",
      id: "26",
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
      id: "231",
      parentId: "23",
      layout: {},
      "icon": "el-icon-real-time-monitoring",
      "control_id": "time_detective",
      "title": "实时监测",
      "show": false
    }
  ]
};

