export const db_form_data = {
  "id": {
    type: "text",
    label: "id",
    disabled: true,
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: []
  },
  "weight": {
    type: "text",
    label: "权重",
    disabled: false,
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: []
  },
  "resourceName": {
    type: "text",
    label: "名称",
    disabled: false,
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: []
  },
  "isMeum": {
    type: "select",
    label: "显示名称",
    disabled: false,
    Validate: [
      {required: false, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: [
      {label: "是", value: true},
      {label: "否", value: false}
    ]
  },
  "resourceCode": {
    type: "text",
    label: "功能类型",
    disabled: false,
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: []
  },
  "parentId": {
    type: "text",
    label: "父ID",
    disabled: false,
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: []
  },
  "resourceType": {
    type: "text",
    label: "接口类型",
    disabled: false,
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: []
  },
  "resourceUrl": {
    type: "text",
    label: "接口地址",
    disabled: false,
    options_url: "",
    options: [
      {label: "选项1", value: "n1"},
      {label: "选项2", value: "n2"},
      {label: "选项3", value: "n3"}
    ],
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ]
  },
  "description": {
    type: "text",
    label: "UI数据",
    disabled: false,
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: []
  },
  "dataStatus": {
    type: "text",
    label: "状态",
    disabled: false,
    Validate: [
      {required: true, message: '请输字段', trigger: 'change'},
    ],
    options_url: "",
    options: []
  }
};
